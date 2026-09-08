import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { IJWTPayload } from "../../type/common";
import { DoctorScheduleService } from "./doctorSchedule.service";
import pick from "../../helper/pick";



const insertIntoDB = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const user = req.user;
    const result = await DoctorScheduleService.insertIntoDB(user as IJWTPayload, req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Doctor Schedule created successfully!",
        data: result
    })
});

const getMySchedules = catchAsync(
    async (req: Request & { user?: IJWTPayload }, res: Response) => {

        const result =
            await DoctorScheduleService.getMySchedules(
                req.user as IJWTPayload
            );

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Doctor schedules retrieved successfully!",
            data: result
        });
    }
);

export const DoctorScheduleController = {
    insertIntoDB,
    getMySchedules
}