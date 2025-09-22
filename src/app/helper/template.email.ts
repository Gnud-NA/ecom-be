import { Injectable } from "@nestjs/common";
import { OrderEmailData } from "@src/app/helper/helper.service";
import User from "@src/app/users/entities/user.entity";

interface OrderItem {
    name: string;
    quantity: number;
    price: number;
    color?: string;
    size?: string;
    imageUrl?: string;
}

interface Post {
    email: string;
    phone?: string;
    content?: string;
}

@Injectable()
export class EmailTemplate {
    getVerificationEmailTemplate(code: string): string {
        return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Account</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          background-color: #f4f4f4;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: auto;
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .logo {
          text-align: center;
          margin-bottom: 20px;
        }
        .logo img {
          width: 150px;
        }
        .content {
          padding: 20px;
        }
        .btn {
          display: inline-block;
          background-color: #4CAF50;
          color: white;
          padding: 10px 20px;
          text-align: center;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          <img src="https://remembernguyen.s3.us-east-1.amazonaws.com/assets/2019+Remember+Nguyen+logo-large-01-teal.png" alt="Remember Nguyen">
        </div>
        <div class="content">
          <h2>Verify Your Account</h2>
          <p>Dear,</p>
          <p>Thank you for registering with us. To complete your registration, please verify your account by code: <b>${code}</b></p>
          <p>If you did not make this request, you can safely ignore this email.</p>
          <p>Regards,</p>
          <p>Our Support Team</p>
        </div>
      </div>
    </body>
    </html>
    `;
    }

    getForgetPasswordEmailTemplate(code: string): string {
        return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Account</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        background-color: #f4f4f4;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: auto;
        background: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .logo img {
        width: 150px;
      }
      .content {
        padding: 20px;
      }
      .btn {
        display: inline-block;
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">
        <img src="https://remembernguyen.s3.us-east-1.amazonaws.com/assets/2019+Remember+Nguyen+logo-large-01-teal.png" alt="Company Logo">
      </div>
      <div class="content">
        <h2>Forget Password Your Account</h2>
        <p>Dear [User's Name],</p>
        <p>We received a request to reset your password for your [Your Website/Service Name] account. If you did not make this request, please ignore this email.</p>
        <p>To reset your password, please use code: <b>${code}</b></p>
        <p>This code will expire in 5 minutes.</p>
        <p>If you have any questions or need further assistance, please contact our support team.</p>
        <p> Best regards,</p>
      </div>
    </div>
  </body>
  </html>
  `;
    }

    getSubscribeEmailTemplate(code: string): string {
        return `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
      <!-- Free shipping banner -->
      <div style="background-color: rgb(177, 227, 227); padding: 10px; text-align: center;">
        FREE shipping on all orders of $150 or more!
      </div>

      <!-- Logo -->
      <div style="text-align: center; padding: 20px;">
        <img src="https://remembernguyen.s3.us-east-1.amazonaws.com/assets/2019+Remember+Nguyen+logo-large-01-teal.png" 
             alt="Remember Nguyen" 
             style="max-width: 300px;">
      </div>

      <!-- Content -->
      <div style="padding: 20px;">
        <p>Hey, what's up?</p>
        
        <p>Thank you for subscribing to our newsletter. As a token of our appreciation, 
        please enjoy the following promotional code for $20 off your first purchase:</p>

        <p style="text-align: center; font-size: 24px; font-weight: bold; color: #333; 
        margin: 20px 0; padding: 10px; background-color: #f8f8f8; border-radius: 5px;">
          ${code}
        </p>

        <p>Just enter this code at checkout to receive your discount. 
        Browse our latest collection of incredible clothes for kids!</p>
      </div>

      <!-- Navigation -->
      <div style="text-align: center; padding: 20px;">
        <p><a href="#" style="color: #000; text-decoration: none; padding: 10px;">BOYS</a></p>
        <p><a href="#" style="color: #000; text-decoration: none; padding: 10px;">GIRLS</a></p>
      </div>

      <!-- Social Links -->
      <div style="text-align: center; padding: 20px;">
        <a href="#" style="padding: 0 10px;">
          <img src="https://remembernguyen.s3.us-east-1.amazonaws.com/assets/Icon+ionic-logo-instagram.png" 
               alt="Instagram" 
               style="width: 24px; height: 24px;">
        </a>
        <a href="#" style="padding: 0 10px;">
          <img src="https://remembernguyen.s3.us-east-1.amazonaws.com/assets/Icon+ionic-logo-facebook.png" 
               alt="Facebook" 
               style="width: 24px; height: 24px;">
        </a>
        <a href="#" style="padding: 0 10px;">
          <img src="https://remembernguyen.s3.us-east-1.amazonaws.com/assets/Icon+simple-pinterest.png" 
               alt="Pinterest" 
               style="width: 24px; height: 24px;">
        </a>
      </div>

      <!-- Footer -->
      <div style="text-align: center; padding: 20px; font-size: 12px; color: #666;">
        <p>COPYRIGHT © 2023 REMEMBER NGUYEN. ALL RIGHTS RESERVED.</p>
        <p>REMEMBER NGUYEN ● 507 EAST SECOND STREET ● BOGALUSA, LA 70427</p>
        <p style="font-size: 10px; color: #999;">
          *Enjoy free shipping on orders over $150 shipped within the United States. Order subtotal must 
          be greater than or equal to $150 to receive free shipping. Previous purchases are not eligible for 
          price adjustments. No code required, must select free shipping option at checkout. Offer valid 
          only at remembernguyen.com. Valid for a limited time only.
        </p>
      </div>
    </div>
  `;
    }

    getOrderConfirmationTemplate(order: OrderEmailData): string {
        return `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <!-- Logo -->
        <div style="text-align: center; padding: 20px;">
            <img src="https://remembernguyen.s3.us-east-1.amazonaws.com/assets/2019+Remember+Nguyen+logo-large-01-teal.png" 
                 alt="Remember Nguyen" 
                 style="max-width: 300px;">
        </div>

        <div style="text-align: right; color: #666;">
            ORDER NUMBER #${order.orderNumber}
        </div>

        <!-- Header -->
        <div style="padding: 20px;">
            <h2 style="margin-bottom: 20px;">Thanks for shopping with Remember Nguyen!</h2>
            <p style="color: #666; line-height: 1.5;">
                Hi ${
                    order.shippingAddress.name
                }, we're delighted that you found something you love and are excited to ship 
                your goodies out to you. Details for your order are below. You can expect to receive a 
                shipping confirmation email with tracking info soon!
            </p>
        </div>

        <!-- Action Buttons -->
        <div style="text-align: center; margin: 20px 0;">
            <a href="#" style="background-color: rgb(177, 227, 227); color: #000; padding: 10px 20px; 
                              text-decoration: none; border-radius: 5px; display: inline-block;">
                VIEW YOUR ORDER
            </a>
            <p style="margin-top: 10px;">
                or <a href="#" style="color: rgb(177, 227, 227);">Visit our Store</a>
            </p>
        </div>

        <!-- Order Summary -->
        <div style="padding: 20px;">
            <h3>Order summary</h3>
            ${order.items
                .map(
                    (item) => `
                <div style="display: flex; margin: 20px 0; border-bottom: 1px solid #eee; padding-bottom: 20px;">
                    <div style="flex: 0 0 100px;">
                        ${
                            item.imageUrl
                                ? `<img src="${item.imageUrl}" alt="${item.name}" style="width: 100px; height: 100px; object-fit: cover;">`
                                : ""
                        }
                    </div>
                    <div style="flex: 1; padding-left: 20px;">
                        <p style="font-weight: bold; margin: 0 0 5px 0;">${item.name}</p>
                        <p style="color: #666; margin: 0 0 5px 0;">Quantity: ${item.quantity}</p>
                        ${item.color ? `<p style="color: #666; margin: 0 0 5px 0;">Color: ${item.color}</p>` : ""}
                        ${item.size ? `<p style="color: #666; margin: 0 0 5px 0;">Size: ${item.size}</p>` : ""}
                    </div>
                    <div style="flex: 0 0 100px; text-align: right;">
                        $${(Number(item.price) * item.quantity).toFixed(2)}
                    </div>
                </div>
            `
                )
                .join("")}

            <div style="margin-top: 20px; border-top: 2px solid #eee; padding-top: 20px;">
                <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                    <span style="color: #666;">Subtotal</span>
                    <span style="font-weight: 500;">$${order.subtotal}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                    <span style="color: #666;">Shipping</span>
                    <span style="font-weight: 500;">$${order.shipping}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 10px 0; padding-top: 10px; border-top: 1px solid #eee;">
                    <span style="font-weight: bold; font-size: 1.1em;">Total</span>
                    <span style="font-weight: bold; font-size: 1.1em;">$${order.total} USD</span>
                </div>
            </div>
        </div>

        <!-- Customer Information -->
        <div style="padding: 20px;">
            <h3>Customer Information</h3>
            <div style="display: flex; margin-top: 20px;">
                <div style="flex: 1;">
                    <h4>Shipping address</h4>
                    <p>${order.shippingAddress.name}</p>
                    <p>${order.shippingAddress.street}</p>
                    <p>${order.shippingAddress.city}, ${order.shippingAddress.state} ${
            order.shippingAddress.zipCode
        }</p>
                    <p>${order.shippingAddress.country}</p>
                </div>
                <div style="flex: 1;">
                    <h4>Billing address</h4>
                    <p>${order.billingAddress.name}</p>
                    <p>${order.billingAddress.street}</p>
                    <p>${order.billingAddress.city}, ${order.billingAddress.state} ${order.billingAddress.zipCode}</p>
                    <p>${order.billingAddress.country}</p>
                </div>
            </div>

            <div style="display: flex; margin-top: 20px;">
                <div style="flex: 1;">
                    <h4>Shipping method</h4>
                    <p>${order.shippingMethod}</p>
                </div>
                <div style="flex: 1;">
                    <h4>Payment method</h4>
                    <p>
                        <img src="visa-icon.png" alt="Visa" style="width: 24px; vertical-align: middle;">
                        Ending in ${order.paymentMethod.last4} - $${order.paymentMethod.amount}
                    </p>
                </div>
            </div>
        </div>

        <!-- Help Text -->
        <div style="text-align: center; padding: 20px; color: #666;">
            <p><a href="#" style="color: rgb(177, 227, 227);">Click here to start a return!</a></p>
            <p>If you have any questions, reply to this email or contact us at 
               <a href="mailto:support@remembernguyen.com" style="color: rgb(177, 227, 227);">
                   support@remembernguyen.com
               </a>
            </p>
        </div>

        <!-- Social Links -->
        <div style="text-align: center; padding: 20px;">
            <a href="#" style="padding: 0 10px;">
                <img src="https://remembernguyen.s3.us-east-1.amazonaws.com/assets/Icon+ionic-logo-instagram.png" 
                     alt="Instagram" 
                     style="width: 24px; height: 24px;">
            </a>
            <a href="#" style="padding: 0 10px;">
                <img src="https://remembernguyen.s3.us-east-1.amazonaws.com/assets/Icon+ionic-logo-facebook.png" 
                     alt="Facebook" 
                     style="width: 24px; height: 24px;">
            </a>
            <a href="#" style="padding: 0 10px;">
                <img src="https://remembernguyen.s3.us-east-1.amazonaws.com/assets/Icon+simple-pinterest.png" 
                     alt="Pinterest" 
                     style="width: 24px; height: 24px;">
            </a>
        </div>

        <!-- Footer -->
        <div style="text-align: center; padding: 20px; font-size: 12px; color: #666;">
            <p>COPYRIGHT © 2023 REMEMBER NGUYEN. ALL RIGHTS RESERVED.</p>
            <p>REMEMBER NGUYEN ● 507 EAST SECOND STREET ● BOGALUSA, LA 70427</p>
            <p style="font-size: 10px; color: #999;">
                *Enjoy free shipping on orders over $150 shipped within the United States. Order subtotal must 
                be greater than or equal to $150 to receive free shipping. Previous purchases are not eligible for 
                price adjustments. No code required, must select free shipping option at checkout. Offer valid 
                only at remembernguyen.com. Valid for a limited time only.
            </p>
        </div>
    </div>
    `;
    }

    getNewContactNotificationTemplate(contact: Post): string {
        return `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <!-- Logo -->
        <div style="text-align: center; padding: 20px;">
            <img src="https://remembernguyen.s3.us-east-1.amazonaws.com/assets/2019+Remember+Nguyen+logo-large-01-teal.png" 
                 alt="Remember Nguyen" 
                 style="max-width: 300px;">
        </div>

        <div style="padding: 20px;">
            <h2>New Contact Form Submission</h2>
            
            <div style="margin: 20px 0;">
                <p><strong>Email:</strong> ${contact.email}</p>
                <p><strong>Phone:</strong> ${contact.phone || "N/A"}</p>
                <p><strong>Message:</strong></p>
                <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
                    ${contact.content || "No message provided"}
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div style="text-align: center; padding: 20px; font-size: 12px; color: #666;">
            <p>COPYRIGHT © 2023 REMEMBER NGUYEN. ALL RIGHTS RESERVED.</p>
            <p>REMEMBER NGUYEN ● 507 EAST SECOND STREET ● BOGALUSA, LA 70427</p>
        </div>
    </div>
    `;
    }

    requestChangeEmailTemplate(user: User, changeEmailUrl: string): string {
        return `
              <p>Hello ${user.fullName || user.email},</p>
              <p>We received a request to change the email address associated with your account.</p>
              <p>If you made this request, please confirm by clicking the link below:</p>
              <p><a href="${changeEmailUrl}" target="_blank">Change My Email Address</a></p>
              <p>If you did not request this change, please ignore this email or contact our support team immediately.</p>
              <p>Thank you!</p>
            `;
    }
}
