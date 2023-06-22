import { NextResponse } from "next/server";
import { transporter, mailOptions } from "@/lib/nodemailer";

type ContatPageData = {
  name: string;
  email: string;
  msg: string;
};

export async function POST(req: Request) {
  const { name, email, msg } = (await req.json()) as ContatPageData;
  try {
    const res = await transporter
      .sendMail({
        ...mailOptions,
        subject: `RENT-IT msg from -> ${name}`,
        html: `<h1>Contact Page Message</h1>
      <h2>from: ${name}</h2>
      <h2>email: ${email}</h2>
      <p>${msg}</p>`,
      })
      .then(() => {
        console.log("[SERVER]: email send!");
      });
    return NextResponse.json({ msg: "email sent successfully" });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}
