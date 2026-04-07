import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import { uptime } from 'process';
import { timeStamp } from 'console';
import router from './app/routes';
import cookieParser from 'cookie-parser';
import { PaymentController } from './app/modules/payment/payment.controller';
import cron from 'node-cron';
import { AppointmentService } from './app/modules/appointment/appointment.service';

const app: Application = express();

app.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    PaymentController.handleStripeWebhookEvent
);
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

//parser
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

cron.schedule('* * * * *', () => {
    try {
        console.log("Node cron called at ", new Date())
        AppointmentService.cancelUnpaidAppointments();
    } catch (err) {
        console.error(err);
    }
});

app.use("/api/v1", router);

app.get('/', (req: Request, res: Response) => {
    res.send({
        Message: "Server is running!!",
        environment: process.env.NODE_ENV,
        uptime: process.uptime().toFixed(2) + 'seconds',
        timeStamp: new Date().toISOString()
    })
});


app.use(globalErrorHandler);

app.use(notFound);

export default app;