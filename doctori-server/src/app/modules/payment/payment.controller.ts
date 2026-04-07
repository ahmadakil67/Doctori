import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { stripe } from "../../helper/stripe";
import { PaymentService } from "./payment.service";

const handleStripeWebhookEvent = catchAsync(async (req: Request, res: Response) => {

    const sig = req.headers["stripe-signature"] as string;
    const webhookSecret = "whsec_4d49d9e86d87cfbe245bc667b86b304885d89dc93f7d36cb51d774147baac7e5"

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err: any) {
        console.error("⚠️ Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    const result = await PaymentService.handleStripeWebhookEvent(event);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Webhook req send successfully',
        data: result,
    });
});

export const PaymentController = {
    handleStripeWebhookEvent
}