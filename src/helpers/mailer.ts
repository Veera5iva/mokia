/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/models/consumerModel";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";


export const sendEmail = async ({email, emailType, userId}: any) => {
   try {
      // create a hashed token
      const hashedToken = await bcryptjs.hash(userId.toString(), 10);
      if(emailType === "VERIFY") {
         await User.findByIdAndUpdate(userId, {
            verifyToken: hashedToken,
            verifyTokenExpiry: Date.now() + 3600000
         });

      } else if (emailType === "RESET") {
         await User.findByIdAndUpdate(userId, {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: Date.now() + 3600000
         });
      }

      // Looking to send emails in production? Check out our Email API/SMTP product!
      const transport = nodemailer.createTransport({
         host: "sandbox.smtp.mailtrap.io",
         port: 2525,
         auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASSWORD 
         }
      })

      const mailOptions = {
         from: "veerasivahere@gmail.com",
         to: email,
         subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
         html: `<p>Click <a href="${process.env.NEXT_PUBLIC_API_URL}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
         or copy and paste the link below in your browser. <br> ${process.env.NEXT_PUBLIC_API_URL}/${emailType === "VERIFY" ? "verifyemail" : "forgotpassword"}?token=${hashedToken}
         </p>`
      }

      const mailResponse = await transport.sendMail(mailOptions);
      return mailResponse;
      
      
   } catch (error: any) {
      throw new Error(error.message);
      
   }
}