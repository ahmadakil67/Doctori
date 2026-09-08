import { Request } from "express";
import prisma from "../../shared/prisma";
import bcrypt from "bcryptjs";
import { fileUploader } from "../../helper/fileUploader";
import { Admin, Doctor, Prisma, UserRole, UserStatus } from "@prisma/client";
import { userSearchableFields } from "./user.constant";
import { IOptions, paginationHelper } from "../../helper/paginationHelper";
import { IJWTPayload } from "../../type/common";

const createPatient = async (req: Request) => {
  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    req.body.patient.profilePhoto = uploadResult?.secure_url;
  }
  const hashPassword = await bcrypt.hash(req.body.password, 10);

  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({
      data: {
        email: req.body.patient.email,
        password: hashPassword,
      },
    });

    return await tnx.patient.create({
      data: req.body.patient,
    });
  });
  return result;
};

const createAdmin = async (req: Request): Promise<Admin> => {
  const file = req.file;

  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 10);

  const userData = {
    email: req.body.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdAdminData = await transactionClient.admin.create({
      data: req.body.admin,
    });

    return createdAdminData;
  });

  return result;
};

const createDoctor = async (req: Request): Promise<Doctor> => {
  const file = req.file;

  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.doctor.profilePhoto = uploadToCloudinary?.secure_url;
  }
  const hashedPassword: string = await bcrypt.hash(req.body.password, 10);

  const userData = {
    email: req.body.doctor.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdDoctorData = await transactionClient.doctor.create({
      data: req.body.doctor,
    });

    if (req.body.specialties && req.body.specialties.length > 0) {
      await transactionClient.doctorSpecialties.createMany({
        data: req.body.specialties.map((specialtyId: string) => ({
          doctorId: createdDoctorData.id,
          specialitiesId: specialtyId,
        })),
      });
    }

    return createdDoctorData;

    return createdDoctorData;
  });

  return result;
};

const getAllFromDB = async (params: any, options: IOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.UserWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0
      ? {
          AND: andConditions,
        }
      : {};

  const result = await prisma.user.findMany({
    skip,
    take: limit,

    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.user.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getAllAdminsFromDB = async (params: any, options: IOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

  const { searchTerm, email, contactNumber } = params;

  const andConditions: Prisma.AdminWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          contactNumber: {
            contains: searchTerm,
          },
        },
      ],
    });
  }

  if (email) {
    andConditions.push({
      email: {
        contains: email,
        mode: "insensitive",
      },
    });
  }

  if (contactNumber) {
    andConditions.push({
      contactNumber: {
        contains: contactNumber,
      },
    });
  }

  const whereConditions: Prisma.AdminWhereInput =
    andConditions.length > 0
      ? { AND: andConditions }
      : {};

  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.admin.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getMyProfile = async (user: IJWTPayload) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
    select: {
      id: true,
      email: true,
      needPasswordChange: true,
      role: true,
      status: true,
    },
  });

  let profileData;

  if (userInfo.role === UserRole.PATIENT) {
    profileData = await prisma.patient.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo.role === UserRole.DOCTOR) {
    profileData = await prisma.doctor.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo.role === UserRole.ADMIN) {
    profileData = await prisma.admin.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  }

  return {
    ...userInfo,
    ...profileData,
  };
};

const updateMyProfile = async (
  user: IJWTPayload,
  req: Request
) => {
  const userInfo =
    await prisma.user.findUniqueOrThrow({
      where: {
        email: user.email,
        status: UserStatus.ACTIVE,
      },
    });

  const payload: any = {
    ...req.body,
  };

  /*
   * Email belongs to the account identity.
   * Do not update it from the profile form.
   */
  delete payload.email;
  delete payload.id;
  delete payload.role;
  delete payload.status;
  delete payload.createdAt;
  delete payload.updatedAt;

  /*
   * New profile picture
   */
  if (req.file) {
    const uploadResult =
      await fileUploader.uploadToCloudinary(
        req.file
      );

    if (uploadResult?.secure_url) {
      payload.profilePhoto =
        uploadResult.secure_url;
    }
  }

  /*
   * FormData sends numeric values as strings.
   */
  if (
    payload.experience !== undefined &&
    payload.experience !== ""
  ) {
    payload.experience =
      Number(payload.experience);
  }

  if (
    payload.appointmentFee !== undefined &&
    payload.appointmentFee !== ""
  ) {
    payload.appointmentFee =
      Number(payload.appointmentFee);
  }

  if (userInfo.role === UserRole.PATIENT) {
    return await prisma.patient.update({
      where: {
        email: userInfo.email,
      },
      data: payload,
    });
  }

  if (userInfo.role === UserRole.DOCTOR) {
    return await prisma.doctor.update({
      where: {
        email: userInfo.email,
      },
      data: payload,
    });
  }

  if (userInfo.role === UserRole.ADMIN) {
    return await prisma.admin.update({
      where: {
        email: userInfo.email,
      },
      data: payload,
    });
  }

  throw new Error(
    "Unable to determine user profile type"
  );
};

const changeProfileStatus = async (
  id: string,
  payload: { status: UserStatus },
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const updateUserStatus = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });

  return updateUserStatus;
};

export const userService = {
  createPatient,
  createAdmin,
  createDoctor,
  getAllFromDB,
  getMyProfile,
  changeProfileStatus,
  updateMyProfile,
  getAllAdminsFromDB,
};
