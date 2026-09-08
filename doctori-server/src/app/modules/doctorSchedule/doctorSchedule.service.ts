import prisma from "../../shared/prisma";
import { IJWTPayload } from "../../type/common";
import {
  IOptions,
  paginationHelper,
} from "../../helper/paginationHelper";


const insertIntoDB = async (
  user: IJWTPayload,
  payload: {
    scheduleIds: string[];
  }
) => {
  const doctorData =
    await prisma.doctor.findUniqueOrThrow({
      where: {
        email: user.email,
      },
    });

  const validSchedules = await prisma.schedule.findMany({
    where: {
      id: {
        in: payload.scheduleIds,
      },
      endDateTime: {
        gt: new Date(),
      },
    },
    select: {
      id: true,
    },
  });

  if (validSchedules.length !== payload.scheduleIds.length) {
    throw new Error(
      "Past or invalid schedules cannot be added."
    );
  }

  const doctorScheduleData = validSchedules.map((schedule) => ({
    doctorId: doctorData.id,
    scheduleId: schedule.id,
  }));

  return await prisma.doctorSchedules.createMany({
    data: doctorScheduleData,
  });
};

const getMySchedules = async (user: IJWTPayload) => {
    const doctorData = await prisma.doctor.findUniqueOrThrow({
        where: {
            email: user.email
        }
    });

    return await prisma.doctorSchedules.findMany({
        where: {
            doctorId: doctorData.id
        },
        include: {
            schedule: true
        }
    });
};

export const DoctorScheduleService = {
    insertIntoDB,
    getMySchedules
}