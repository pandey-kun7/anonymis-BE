import nodemailer from "nodemailer"
import "dotenv/config"

export const sendOTPtoMail = async (email, otp) => {
    try {
        const transporter = new nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })

        try {
            await transporter.verify();
            console.log("Server can send mails")
        } catch (err) {
            console.log(`Server can't send as err: ${err.message}`);
        }

        try {
            const info = await transporter.sendMail({
                from: '"Anonymis" <10c.kunalpandey@gmail.com>',
                to: email,
                subject: "OTP for accessing the Account",
                text: `Your OTP is ${otp}`
            })

            console.log(`Mail sent : ${info.messageId}`)

        } catch (err) {
            console.log(`Couldn't send the email ${err.message}`)
        }
    } catch (err) {
        console.log(`Error in sendOTPtoMail : ${err.message}`)
    }
}