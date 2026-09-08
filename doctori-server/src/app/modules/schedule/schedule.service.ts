import { addMinutes, addHours, format } from "date-fns";
import prisma from "../../shared/prisma";
import { Prisma } from "@prisma/client";
import { IOptions, paginationHelper } from "../../helper/paginationHelper";
import { IJWTPayload } from "../../type/common";

const insertIntoDB = async (payload: any) => {
  const { startTime, endTime, startDate, endDate } = payload;

  const intervalTime = 30;
  const schedules = [];

  const currentDate = new Date(`${startDate}T00:00:00`);
  const lastDate = new Date(`${endDate}T00:00:00`);

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  while (currentDate <= lastDate) {
    const startDateTime = new Date(currentDate);
    startDateTime.setHours(startHour, startMinute, 0, 0);

    const endDateTime = new Date(currentDate);
    endDateTime.setHours(endHour, endMinute, 0, 0);

    let slotStartDateTime = new Date(startDateTime);

    while (slotStartDateTime < endDateTime) {
      const slotEndDateTime = addMinutes(slotStartDateTime, intervalTime);

      if (slotEndDateTime > endDateTime) {
        break;
      }

      const scheduleData = {
        startDateTime: slotStartDateTime,
        endDateTime: slotEndDateTime,
      };

      const existingSchedule = await prisma.schedule.findFirst({
        where: scheduleData,
      });

      if (!existingSchedule) {
        const result = await prisma.schedule.create({
          data: scheduleData,
        });

        schedules.push(result);
      }

      slotStartDateTime = slotEndDateTime;
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedules;
};

const schedulesForDoctor = async (
  user: IJWTPayload,
  fillters: any,
  options: IOptions,
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

  const { startDate, endDate } = fillters;

  const andConditions: Prisma.ScheduleWhereInput[] = [];

  // শুধু future schedules
  andConditions.push({
    startDateTime: {
      gt: new Date(),
    },
  });

  // Date filter থাকলে
  if (startDate && endDate) {
    andConditions.push({
      startDateTime: {
        gte: new Date(`${startDate}T00:00:00`),
      },
      endDateTime: {
        lte: new Date(`${endDate}T23:59:59.999`),
      },
    });
  }

  const whereConditions: Prisma.ScheduleWhereInput = {
    AND: andConditions,
  };

  const doctorSchedules = await prisma.doctorSchedules.findMany({
    where: {
      doctor: {
        email: user.email,
      },
    },
    select: {
      scheduleId: true,
    },
  });

  const doctorScheduleIds = doctorSchedules.map(
    (schedule) => schedule.scheduleId,
  );

  const result = await prisma.schedule.findMany({
    where: {
      ...whereConditions,
      id: {
        notIn: doctorScheduleIds,
      },
    },
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.schedule.count({
    where: {
      ...whereConditions,
      id: {
        notIn: doctorScheduleIds,
      },
    },
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

const deleteScheduleFromDB = async (id: string) => {
  return await prisma.schedule.delete({
    where: {
      id,
    },
  });
};

export default {
  insertIntoDB,
  schedulesForDoctor,
  deleteScheduleFromDB,
};
