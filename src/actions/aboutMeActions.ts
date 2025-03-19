"use server";
import { About } from "@/models/About.model";
import { connectToDatabase } from "@/lib/connectDB";
import nodemailer from "nodemailer";

export async function updateMe(form: AboutMe) {
  await connectToDatabase();
  const {
    _id,
    title,
    subTitle,
    description,
    techNodes,
    resume,
    experience,
    github,
    email,
    linkedIn,
    leetcode,
    radar,
  } = form;

  const updatedMe = await About.findByIdAndUpdate("67d47621f621d6592e4c6fd7", {
    title,
    subTitle,
    description,
    techNodes,
    resume,
    experience,
    email,
    github,
    linkedIn,
    leetcode,
    radar,
  });
  return JSON.stringify(updatedMe);
}

export async function getAboutMe() {
  await connectToDatabase();
  const me = await About.findById("67d47621f621d6592e4c6fd7");
  return JSON.stringify(me);
}

export async function sendEmail(form: {
  name: string;
  email: string;
  message: string;
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${form.name}" <${process.env.SMTP_USERNAME}>`, // Always shows SMTP sender
    to: "asaddullah111@gmail.com", // Your receiving email
    replyTo: form.email, // THIS ENSURES YOU SEE THE USER'S EMAIL WHEN REPLYING
    subject: "Query from Portfolio",
    text: `Message from ${form.name} (${form.email}):\n\n${form.message}`,
    html: `<p><strong>Message from:</strong> ${form.name} (<a href="mailto:${form.email}">${form.email}</a>)</p><p>${form.message}</p>`,
  };

  const info = await transporter.sendMail(mailOptions);
  return true;
}
