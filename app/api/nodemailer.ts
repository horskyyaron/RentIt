import nodemailer from "nodemailer"


export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.RENTIT_EMAIL,
        pass: process.env.RENTIT_EMAIL_PASS,
    }
})

export const mailOptions = {
    from: process.env.RENTIT_EMAIL,
    to: process.env.RENTIT_EMAIL
}
