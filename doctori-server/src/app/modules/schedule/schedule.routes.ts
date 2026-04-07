import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { ScheduleController } from "./schedule.controller";

const router = express.Router();

router.get(
    "/",
    auth(UserRole.DOCTOR, UserRole.DOCTOR),
    ScheduleController.schedulesForDoctor
)

router.post(
    "/",
    auth(UserRole.ADMIN),
    ScheduleController.insertIntoDB
)


router.delete(
    "/:id",
    auth(UserRole.ADMIN),
    ScheduleController.deleteScheduleFromDB
)

export const ScheduleRoutes = router;