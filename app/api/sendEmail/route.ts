//send an email
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const url: URL = new URL(req.url);
    const fromEmail: string | undefined = new URLSearchParams(url.search)
      .get("fromEmail")
      ?.toString();
    const name: string | undefined = new URLSearchParams(url.search)
      .get("name")
      ?.toString();
    const message: string | undefined = new URLSearchParams(url.search)
      .get("message")
      ?.toString();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.NODEMAILER_USERNAME,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: fromEmail,
      to: process.env.NODEMAILER_USERNAME,
      subject: `Response From Visometer By: ${name}`,
      text: "Your message goes here",
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Response From Visometer</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333;
          }
          h2 {
            color: #333;
          }
          p {
            color: #555;
          }
        </style>
      </head>
      <body>
        <div class="container">
        <h1>You've received a response from Visometer:</h1>
          <h2>From: ${name || "User"}</h2>
          <p>${message || "No message content provided."}</p>
        </div>
      </body>
      </html>
    `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ status: 500 });
  }
}
