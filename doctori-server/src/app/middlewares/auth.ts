import { NextFunction, Request, Response } from "express"
import { jwtHelper } from "../helper/jwtHelper";
import ApiError from "../errors/ApiError";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../config";

const auth = (...roles: string[]) => {
    return async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.accessToken;


            if (!token) {
                throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!")
            }

            const verifyUser = jwtHelper.verifyToken(token, config.jwt.jwt_secret as Secret);

            req.user = verifyUser;

            console.log("verifyUser:", verifyUser);
            console.log("required roles:", roles);
            console.log("user role:", verifyUser.role);

            if (roles.length && !roles.includes(verifyUser.role)) {
                throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!")
            }

            next();
        }
        catch (err) {
            next(err)
        }
    }
}

export default auth;