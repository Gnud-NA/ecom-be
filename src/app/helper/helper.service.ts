import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EmailTemplate } from "@src/app/helper/template.email";
import { Post } from "@src/app/posts/entities/post.entity";
import { LoggerService } from "@src/logger/logger.service";
import * as AWS from "aws-sdk";
import { randomBytes } from "crypto";
import moment = require("moment");

export interface OrderEmailData {
    orderNumber: string;
    items: {
        name: string;
        quantity: number;
        price: string;
        color: string;
        size: string;
        imageUrl: string;
    }[];
    subtotal: string;
    shipping: string;
    total: string;
    shippingAddress?: {
        name?: string;
        street?: string;
        city?: string;
        state?: string;
        zipCode?: string;
        country?: string;
    };
    billingAddress: {
        name?: string;
        street?: string;
        city?: string;
        state?: string;
        zipCode?: string;
        country?: string;
    };
    shippingMethod?: string;
    paymentMethod?: {
        type?: string;
        last4?: string;
        amount?: string;
    };
}

@Injectable()
export class HelperService {
    private ses: AWS.SES;
    private sns: AWS.SNS;

    constructor(
        private configService: ConfigService,
        @Inject(EmailTemplate) private emailTemplate: EmailTemplate,
        protected readonly logger: LoggerService
    ) {
        // config AWS SDK
        AWS.config.update({
            accessKeyId: this.configService.get("AWS_ACCESS_KEY_ID"),
            secretAccessKey: this.configService.get("AWS_SECRET_ACCESS_KEY"),
            region: this.configService.get("AWS_REGION"),
        });

        this.ses = new AWS.SES({ apiVersion: "2010-12-01" });
        this.sns = new AWS.SNS();
    }

    isCodeSentWithin5Minutes(sentAtISO: string): boolean {
        const currentTime = moment();
        const sentAt = moment(sentAtISO);

        const diffInMinutes = currentTime.diff(sentAt, "minutes");
        return diffInMinutes < 5;
    }

    randomRememberToken(length: number = 64): string {
        return randomBytes(length).toString("hex").slice(0, length);
    }

    generateVerificationCode(): number {
        const min = 100000;
        const max = 999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async sendEmail({
        to,
        subject,
        textContent,
        htmlContent,
    }: {
        to: string;
        subject: string;
        textContent?: string;
        htmlContent?: string;
    }): Promise<void> {
        const params: AWS.SES.SendEmailRequest = {
            Destination: {
                ToAddresses: [to],
            },
            Message: {
                Body: {
                    ...(textContent && { Text: { Data: textContent } }),
                    ...(htmlContent && { Html: { Data: htmlContent } }),
                },
                Subject: { Data: subject },
            },
            Source: process.env.SES_SOURCE_EMAIL,
        };
        await this.ses.sendEmail(params).promise();
    }

    async sendEmailVerifyAccount(
        to: string,
        code: string,
        subject?: string,
        body?: string,
        html?: string
    ): Promise<void> {
        const textBody = body ?? `Email verify code : ${code}`;
        const htmlBody = html ?? this.emailTemplate.getVerificationEmailTemplate(code);
        const subjectBody = subject ?? "RememberNguyen Verify Your Account";
        const params: AWS.SES.SendEmailRequest = {
            Destination: {
                ToAddresses: [to],
            },
            Message: {
                Body: {
                    Text: { Charset: "UTF-8", Data: textBody },
                    Html: { Charset: "UTF-8", Data: htmlBody },
                },
                Subject: { Data: subjectBody },
            },
            Source: this.configService.get("SES_SOURCE_EMAIL"),
        };
        await this.ses.sendEmail(params).promise();
    }

    async sendEmailForgetPasswordAccount(
        to: string,
        code: string,
        subject?: string,
        body?: string,
        html?: string
    ): Promise<void> {
        const textBody = body ?? `Email verify code : ${code}`;
        const htmlBody = html ?? this.emailTemplate.getForgetPasswordEmailTemplate(code);
        const subjectBody = subject ?? "RememberNguyen Verify Your Account";
        const params: AWS.SES.SendEmailRequest = {
            Destination: {
                ToAddresses: [to],
            },
            Message: {
                Body: {
                    Text: { Charset: "UTF-8", Data: textBody },
                    Html: { Charset: "UTF-8", Data: htmlBody },
                },
                Subject: { Data: subjectBody },
            },
            Source: this.configService.get("SES_SOURCE_EMAIL"),
        };
        await this.ses.sendEmail(params).promise();
    }
    async sendEmailSubcribe(to: string, code: string, subject?: string, body?: string, html?: string): Promise<void> {
        // const textBody = body ?? `Email verify code : ${code}`;
        const htmlBody = html ?? this.emailTemplate.getSubscribeEmailTemplate(code);
        const subjectBody = subject ?? "RememberNguyen Promotional Code";
        const params: AWS.SES.SendEmailRequest = {
            Destination: {
                ToAddresses: [to],
            },
            Message: {
                Body: {
                    // Text: { Charset: "UTF-8", Data: textBody },
                    Html: { Charset: "UTF-8", Data: htmlBody },
                },
                Subject: { Data: subjectBody },
            },
            Source: this.configService.get("SES_SOURCE_EMAIL"),
        };
        await this.ses.sendEmail(params).promise();
    }

    async sendSMS(phoneNumber: string, message) {
        const params = {
            Message: message,
            PhoneNumber: phoneNumber,
        };
        try {
            const result = await this.sns.publish(params).promise();
            console.log(`Message sent to ${phoneNumber}`);
            console.log(result);
        } catch (error) {
            // console.error(error, error.stack);
        }
    }

    async sendSMSVerifyCode(phoneNumber: string, code, domain?: string) {
        const params = {
            Message: `Your verification code for ${
                domain ?? "RememberNguyen"
            } is: ${code}. Please enter this code to verify your account. Thank you!`,
            PhoneNumber: phoneNumber,
            MessageAttributes: {
                "AWS.SNS.SMS.SMSType": {
                    DataType: "String",
                    StringValue: "Transactional", // or 'Promotional' based on your message type
                },
            },
        };
        try {
            const result = await this.sns.publish({ ...params }).promise();
            // console.log(params);
            return result;
        } catch (error) {
            // console.error(error, error.stack);
        }
    }

    async sendSMSForgetPasswordCode(phoneNumber: string, code, domain?: string) {
        const params = {
            Message: `Your verification code for ${
                domain ?? "RememberNguyen"
            } is: ${code}. Please enter this code to change password your account. Thank you!`,
            PhoneNumber: phoneNumber,
            MessageAttributes: {
                "AWS.SNS.SMS.SMSType": {
                    DataType: "String",
                    StringValue: "Transactional", // or 'Promotional' based on your message type
                },
            },
        };
        try {
            const result = await this.sns.publish({ ...params }).promise();
            // console.log(params);
            return result;
        } catch (error) {
            // console.error(error, error.stack);
        }
    }

    async sendOrderConfirmationEmail(to: string, orderData: OrderEmailData): Promise<void> {
        const subject = `Order Confirmation #${orderData.orderNumber} - Remember Nguyen`;
        const htmlBody = this.emailTemplate.getOrderConfirmationTemplate(orderData);

        const params: AWS.SES.SendEmailRequest = {
            Destination: {
                ToAddresses: [to],
            },
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: htmlBody,
                    },
                },
                Subject: {
                    Data: subject,
                },
            },
            Source: this.configService.get("SES_SOURCE_EMAIL"),
        };

        try {
            await this.ses.sendEmail(params).promise();
            this.logger.log(
                "OrderConfirmationEmail",
                `Order confirmation email sent successfully to ${to} for order #${orderData.orderNumber}`
            );
        } catch (error) {
            this.logger.error(
                "OrderConfirmationEmail",
                `Failed to send order confirmation email to ${to} for order #${orderData.orderNumber}`,
                error
            );
            throw error;
        }
    }

    async sendContactNotificationEmail(contact: Post): Promise<void> {
        try {
            const htmlBody = this.emailTemplate.getNewContactNotificationTemplate(contact);
            const params: AWS.SES.SendEmailRequest = {
                Destination: {
                    ToAddresses: [this.configService.get("ADMIN_EMAIL")],
                },
                Message: {
                    Body: {
                        Html: {
                            Charset: "UTF-8",
                            Data: htmlBody,
                        },
                    },
                    Subject: {
                        Data: "New Contact Form Submission - Remember Nguyen",
                    },
                },
                Source: this.configService.get("SES_SOURCE_EMAIL"),
            };

            await this.ses.sendEmail(params).promise();
        } catch (error) {
            this.logger.error(
                "ContactNotification",
                `Failed to send contact notification email for contact ID: ${contact.id}`,
                error
            );
            throw error;
        }
    }
}
