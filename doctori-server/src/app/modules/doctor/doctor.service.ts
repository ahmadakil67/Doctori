import { Doctor, Prisma, UserStatus } from "@prisma/client";
import { IOptions, paginationHelper } from "../../helper/paginationHelper";
import { doctorSearchableFields } from "./doctor.constant";
import { IDoctorUpdateInput } from "./doctor.interface";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import { openai } from "../../helper/open-router";
import { extractJsonFromMessage } from "../../helper/extractJsonFromMessage";
import prisma from "../../shared/prisma";

const getAllFromDB = async (filters: any, options: IOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const { searchTerm, specialties, ...filterData } = filters;

  const andConditions: Prisma.DoctorWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: doctorSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  // "", "medicine"
  if (specialties && specialties.length > 0) {
    andConditions.push({
      doctorSpecialties: {
        some: {
          specialities: {
            title: {
              contains: specialties,
              mode: "insensitive",
            },
          },
        },
      },
    });
  }

  if (Object.keys(filterData).length > 0) {
    const filterConditions = Object.keys(filterData).map((key) => ({
      [key]: {
        equals: (filterData as any)[key],
      },
    }));

    andConditions.push(...filterConditions);
  }

  const whereConditions: Prisma.DoctorWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.doctor.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      doctorSpecialties: {
        include: {
          specialities: true,
        },
      },
      doctorSchedules: {
        where: {
          isBooked: false,
        },
        include: {
          schedule: true,
        },
      },
      reviews: {
        select: {
          rating: true,
        },
      },
    },
  });

  const total = await prisma.doctor.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const updateIntoDB = async (
  id: string,
  payload: Partial<IDoctorUpdateInput>,
) => {
  const doctorInfo = await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const { specialties, ...doctorData } = payload;

  return await prisma.$transaction(async (tnx) => {
    if (specialties && specialties.length > 0) {
      const deleteSpecialtyIds = specialties.filter(
        (specialty) => specialty.isDeleted,
      );

      for (const specialty of deleteSpecialtyIds) {
        await tnx.doctorSpecialties.deleteMany({
          where: {
            doctorId: id,
            specialitiesId: specialty.specialtyId,
          },
        });
      }

      const createSpecialtyIds = specialties.filter(
        (specialty) => !specialty.isDeleted,
      );

      for (const specialty of createSpecialtyIds) {
        await tnx.doctorSpecialties.create({
          data: {
            doctorId: id,
            specialitiesId: specialty.specialtyId,
          },
        });
      }
    }

    const updatedData = await tnx.doctor.update({
      where: {
        id: doctorInfo.id,
      },
      data: doctorData,
      include: {
        doctorSpecialties: {
          include: {
            specialities: true,
          },
        },
      },

      //  doctor - doctorSpecailties - specialities
    });

    return updatedData;
  });
};

const getByIdFromDB = async (id: string): Promise<Doctor | null> => {
  const result = await prisma.doctor.findUnique({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      doctorSpecialties: {
        include: {
          specialities: true,
        },
      },
      doctorSchedules: {
        include: {
          schedule: true,
        },
      },
      reviews: true,
    },
  });
  return result;
};

const deleteFromDB = async (id: string): Promise<Doctor> => {
  return await prisma.$transaction(async (transactionClient) => {
    const deleteDoctor = await transactionClient.doctor.delete({
      where: {
        id,
      },
    });

    await transactionClient.user.delete({
      where: {
        email: deleteDoctor.email,
      },
    });

    return deleteDoctor;
  });
};

const softDelete = async (id: string): Promise<Doctor> => {
  return await prisma.$transaction(async (transactionClient) => {
    const deleteDoctor = await transactionClient.doctor.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });

    await transactionClient.user.update({
      where: {
        email: deleteDoctor.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });

    return deleteDoctor;
  });
};

const getAISuggestions = async (payload: { symptoms: string }) => {
  if (!payload?.symptoms) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "symptoms is required!"
    );
  }

  // -----------------------------------
  // Get doctors
  // -----------------------------------

  const doctors = await prisma.doctor.findMany({
    where: {
      isDeleted: false,
    },

    include: {
      doctorSpecialties: {
        include: {
          specialities: true,
        },
      },
    },
  });

  console.log("doctors data loaded.......\n");

  // -----------------------------------
  // Send only necessary data to AI
  // -----------------------------------

  const doctorDataForAI = doctors.map((doctor) => ({
    id: doctor.id,
    name: doctor.name,
    designation: doctor.designation,
    experience: doctor.experience,
    appointmentFee: doctor.appointmentFee,
    averageRating: doctor.averageRating,

    specialties: doctor.doctorSpecialties.map(
      (item) => item.specialities.title
    ),
  }));

  // -----------------------------------
  // Prompt
  // -----------------------------------

  const prompt = `
You are a doctor recommendation assistant.

Patient symptoms:
"${payload.symptoms}"

Available doctors:
${JSON.stringify(doctorDataForAI, null, 2)}

Based only on the symptoms and doctor specialties,
recommend up to 3 suitable doctors.

Return ONLY a valid JSON array.

For every recommended doctor return exactly:

[
  {
    "id": "doctor id",
    "name": "doctor name",
    "designation": "doctor designation",
    "experience": 5,
    "appointmentFee": 500,
    "averageRating": 4.5,
    "specialty": "Cardiology"
  }
]

Rules:
- Only recommend doctors whose specialty is relevant.
- Do not invent doctors.
- Use only doctors from the provided list.
- If no doctor matches, return [].
- Do not include markdown.
- Do not include explanations.
`;

  console.log("analyzing......\n");

  // -----------------------------------
  // AI Request
  // -----------------------------------

  const completion = await openai.chat.completions.create({
    model: "openrouter/free",

    messages: [
      {
        role: "system",
        content:
          "You are a medical doctor recommendation assistant. Return only valid JSON.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],

    max_tokens: 600,
    temperature: 0.2,
  });

  // -----------------------------------
  // Debug
  // -----------------------------------

  console.log(
    "AI RAW RESPONSE:",
    completion.choices[0].message.content
  );

  // -----------------------------------
  // Parse JSON
  // -----------------------------------

  const result = await extractJsonFromMessage(
    completion.choices[0].message
  );

  return result;
};

export const DoctorService = {
  getAllFromDB,
  updateIntoDB,
  getByIdFromDB,
  deleteFromDB,
  softDelete,
  getAISuggestions,
};
