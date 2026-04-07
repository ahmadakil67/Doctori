import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { file } from "zod";
import { fileUploader } from "../../helper/fileUploader";
import { userValidation } from "./user.validation";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get(
    "/",
    auth(UserRole.ADMIN),
    userController.getAllFromDB
)

router.get(
    '/me',
    auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
    userController.getMyProfile
)

router.post('/create-patient',
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = userValidation.createPatientValidationSchema.parse(JSON.parse(req.body.data))
        return userController.createPatient(req, res, next)
    },
    
);

router.post(
    "/create-admin",
    // auth(UserRole.ADMIN),
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = userValidation.createAdminValidationSchema.parse(JSON.parse(req.body.data))
        return userController.createAdmin(req, res, next)
    }
);

router.post(
    "/create-doctor",
    auth(UserRole.ADMIN),
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        console.log(JSON.parse(req.body.data))
        req.body = userValidation.createDoctorValidationSchema.parse(JSON.parse(req.body.data))
        return userController.createDoctor(req, res, next)
    }
);

router.patch(
    '/:id/status',
    auth(UserRole.ADMIN),
    userController.changeProfileStatus
);

export const userRoutes = router;

