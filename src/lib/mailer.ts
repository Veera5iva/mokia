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
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.4;color:#111;">
        <h2>🔔 New booking confirmed</h2>
        <p style="font-size:16px;"><strong>Name:</strong> ${booking.name}</p>
         <p style="font-size:16px;"><strong>Email:</strong> ${booking.email}</p>
         <p style="font-size:16px;"><strong>Phone:</strong> ${booking.phone ?? "N/A"}</p>
         <p style="font-size:16px;"><strong>Problem:</strong> ${booking.problem ?? booking.problemType ?? "N/A"}</p>
         <hr />
         <p style="font-size:16px;"><strong>Slot:</strong> ${slot.date ?? "N/A"} ${slot.time ?? ""}</p>
         <p style="font-size:16px;"><strong>Price:</strong> ${slot.price ?? "N/A"}</p>
         <p style="font-size:16px;"><strong>Booking ID:</strong> ${booking._id}</p>
         <p style="margin-top:16px; font-size:16px;">
            <a href="${SITE_URL}/admin" style="color:#e11d48; font-size:16px;">Open admin dashboard</a>
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
