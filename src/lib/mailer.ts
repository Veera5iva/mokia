/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/mailer.ts
import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const EMAIL_FROM = process.env.EMAIL_FROM || SMTP_USER;
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL;
const SITE_URL = process.env.SITE_URL || "";

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !ADMIN_EMAIL) {
   console.warn("Mailer not fully configured. Make sure SMTP_HOST, SMTP_USER, SMTP_PASS and ADMIN_NOTIFICATION_EMAIL are set.");
}

export const transporter = nodemailer.createTransport({
   host: SMTP_HOST,
   port: SMTP_PORT,
   secure: SMTP_PORT === 465, // true for 465, false for other ports
   auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
   },
});

export async function sendAdminBookingEmail(booking: any) {
   // booking is the Mongoose booking doc (populated slot expected)
   try {
      const slot = booking.slot || {};
      const subject = `New booking confirmed — ${booking.name} (${slot.date ?? "no date"})`;
      const text = `
A new booking was confirmed.

Name: ${booking.name}
Email: ${booking.email}
Phone: ${booking.phone || "N/A"}
Problem: ${booking.problem || booking.problemType || "N/A"}

Slot: ${slot.date ?? "N/A"} ${slot.time ?? ""}
Price: ${slot.price ?? "N/A"}

Booking ID: ${booking._id}

Open Admin: ${SITE_URL}/admin
`;

      const html = `
      <div style="font-family: Arial, sans-serif; font-size:16px; line-height:1.6; color:#111; padding:16px;">
         <h2 style="font-size:20px; margin-bottom:12px; color:#e11d48;">✅ New Booking Confirmed</h2>

         <p style="font-size:16px; margin:4px 0;"><strong>Name:</strong> ${booking.name}</p>
         <p style="font-size:16px; margin:4px 0;"><strong>Email:</strong> ${booking.email}</p>
         <p style="font-size:16px; margin:4px 0;"><strong>Phone:</strong> ${booking.phone ?? "N/A"}</p>
         <p style="font-size:16px; margin:4px 0;"><strong>Problem:</strong> ${booking.problem ?? booking.problemType ?? "N/A"}</p>

         <hr style="margin:16px 0; border:none; border-top:1px solid #ddd;" />

         <p style="font-size:16px; margin:4px 0;"><strong>Slot:</strong> ${slot.date ?? "N/A"} ${slot.time ?? ""}</p>
         <p style="font-size:16px; margin:4px 0;"><strong>Price:</strong> ${slot.price ?? "N/A"}</p>
         <p style="font-size:16px; margin:4px 0;"><strong>Booking ID:</strong> ${booking._id}</p>

         <p style="margin-top:20px; font-size:16px;">
            <a href="${SITE_URL}/admin" 
               style="display:inline-block; padding:10px 16px; background:#e11d48; color:#fff; text-decoration:none; border-radius:6px; font-size:16px;">
                  🔗 Open Admin Dashboard
            </a>
         </p>
      </div>

    `;

      const info = await transporter.sendMail({
         from: EMAIL_FROM,
         to: ADMIN_EMAIL,
         subject,
         text,
         html,
      });

      // console.log("Admin notification email sent:", info.messageId);
      return info;
   } catch (err) {
      console.error("Failed to send admin email:", err);
      throw err;
   }
}

export async function sendUserBookingEmail(booking: any) {
   try {
      const slot = booking.slot || {};
      const subject = `Your booking is confirmed — ${slot.date ?? "no date"} ${slot.time ?? ""}`;
      const text = `
Thank you for booking with us, ${booking.name}!

Your slot has been confirmed.

Problem: ${booking.problem || booking.problemType || "N/A"}
Date: ${slot.date ?? "N/A"}
Time: ${slot.time ?? ""}
Price: ${slot.price ?? "N/A"}

Booking ID: ${booking._id}

You can always check updates on our website: ${SITE_URL}
`;

      const html = `
      <div style="font-family: Arial, sans-serif; font-size:16px; line-height:1.6; color:#111; padding:16px;">
         <h2 style="font-size:20px; margin-bottom:12px; color:#16a34a;">🎉 Your Booking is Confirmed</h2>

         <p style="font-size:16px; margin:4px 0;">Hi <strong>${booking.name}</strong>,</p>
         <p style="font-size:16px; margin:4px 0;">Thank you for booking with us. Here are your booking details:</p>

         <hr style="margin:16px 0; border:none; border-top:1px solid #ddd;" />

         <p style="font-size:16px; margin:4px 0;"><strong>Problem:</strong> ${booking.problem ?? booking.problemType ?? "N/A"}</p>
         <p style="font-size:16px; margin:4px 0;"><strong>Date:</strong> ${slot.date ?? "N/A"}</p>
         <p style="font-size:16px; margin:4px 0;"><strong>Time:</strong> ${slot.time ?? ""}</p>
         <p style="font-size:16px; margin:4px 0;"><strong>Price:</strong> ${slot.price ?? "N/A"}</p>
         <p style="font-size:16px; margin:4px 0;"><strong>Booking ID:</strong> ${booking._id}</p>

         <p style="margin-top:20px; font-size:16px;">
            <a href="${SITE_URL}" 
               style="display:inline-block; padding:10px 16px; background:#16a34a; color:#fff; text-decoration:none; border-radius:6px; font-size:16px;">
                  🔗 Visit Our Website
            </a>
         </p>

         <p style="margin-top:20px; font-size:14px; color:#555;">If you have any questions, just reply to this email.</p>
      </div>
      `;

      const info = await transporter.sendMail({
         from: EMAIL_FROM,
         to: booking.email, // send to user
         subject,
         text,
         html,
      });

      // console.log("User confirmation email sent:", info.messageId);
      return info;
   } catch (err) {
      console.error("Failed to send user email:", err);
      throw err;
   }
}

