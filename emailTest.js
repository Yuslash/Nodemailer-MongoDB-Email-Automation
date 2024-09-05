import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'sibikrishna71@gmail.com',
    subject: 'test email',
    text: 'this is a test email from nodemailer',
}

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error occurred: ', error)
    } else {
        console.log('Email sent successfully: ', info.response)
    }
})
