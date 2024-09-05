import nodemailer from 'nodemailer'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

// MongoDB connection URI and details from environment variables
const uri = process.env.MONGO_URI
const database = process.env.MONGO_DATABASE
const collectionName = process.env.MONGO_COLLECTION

// Create MongoDB client
const client = new MongoClient(uri)

let lastEmailCount = 0
let sentEmails = new Set()

async function mongoConnect() {
    try {
        await client.connect()
        const db = client.db(database)
        const collection = db.collection(collectionName)

        // Fetch emails only
        const emailData = await collection.find(
            { email: { $exists: true, $ne: '' } }, // Ensure non-empty emails
            { projection: { email: 1, _id: 0 } } // Only return the email field
        ).toArray()

        // Return email data and count
        return emailData
    } catch (error) {
        console.error('Error fetching emails from MongoDB:', error)
        return []
    }
}

async function sendEmails(emailAddresses) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    })

    const mailOptions = {
        from: process.env.EMAIL_USER,
        subject: 'Test Email',
        text: 'This is a test email sent using Nodemailer!',
    }

    // Send an email to each address in the emailAddresses array
    for (const email of emailAddresses) {
        if (!sentEmails.has(email)) {
            try {
                await transporter.sendMail({ ...mailOptions, to: email })
                console.log(`Email sent to ${email}`)
                sentEmails.add(email) // Add to sent emails set
            } catch (error) {
                console.error(`Failed to send email to ${email}:`, error)
            }
        } else {
            console.log(`Email already sent to ${email}`)
        }
    }
}

async function main() {
    // Set an interval to run every 5 seconds
    setInterval(async () => {
        console.log('Checking for new emails...')
        const emailData = await mongoConnect()
        const emailAddresses = emailData.map(doc => doc.email)

        const currentEmailCount = emailAddresses.length
        if (currentEmailCount > lastEmailCount) {
            // Get the new emails (emails added since last check)
            const newEmails = emailAddresses.slice(lastEmailCount)
            console.log('New emails detected:', newEmails)

            if (newEmails.length > 0) {
                await sendEmails(newEmails)
            }

            // Update the lastEmailCount
            lastEmailCount = currentEmailCount
        } else {
            console.log('No new emails detected.')
        }
    }, 5000) // 5000 milliseconds = 5 seconds
}

// Initialize the lastEmailCount
async function initialize() {
    const emailData = await mongoConnect()
    lastEmailCount = emailData.length
    main()
}

// Call the initialize function
initialize()
