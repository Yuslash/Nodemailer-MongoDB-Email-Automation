import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGO_URI
const database = process.env.MONGO_DATABASE
const collectionName = process.env.MONGO_COLLECTION

const client = new MongoClient(uri)

async function fetchEmails() {
    try {
        await client.connect()
        const db = client.db(database)
        const collection = db.collection(collectionName)

        const emailData = await collection.find(
            { email: { $exists: true, $ne: '' } }, 
            { projection: { email: 1, _id: 0 } } 
        ).toArray()

        console.log(emailData)
    } catch (error) {
        console.error('Error fetching emails from MongoDB:', error)
    } finally {
        await client.close()
    }
}

fetchEmails()
