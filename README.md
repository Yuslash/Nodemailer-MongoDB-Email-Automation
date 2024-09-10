
---

# 🚀 MongoMailer 📨

Welcome to **MongoMailer**! This project connects to your MongoDB database, fetches new email addresses, and sends a **test email** to each new recipient using **Nodemailer**. All emails are sent automatically every 5 seconds, so sit back and relax while the app does the work! 😎

## 🎯 Features
- 🗃️ **Fetch emails** from MongoDB and only send emails to new addresses!
- ✉️ **Sends emails** using Gmail and Nodemailer.
- 🕒 Automatically checks for new emails every 5 seconds.
- 💾 Keeps track of emails already sent to prevent duplicates!

## 🛠️ Installation & Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/mongo-mailer.git
   ```

2. Navigate to the project folder:
   ```bash
   cd mongo-mailer
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up your **`.env`** file with the following variables:
   ```
   MONGO_URI=your-mongodb-uri
   MONGO_DATABASE=your-database-name
   MONGO_COLLECTION=your-collection-name
   EMAIL_USER=your-email-address
   EMAIL_PASS=your-email-password
   ```

5. Run the app:
   ```bash
   npm start
   ```

6. 💥 **Watch the magic happen** every 5 seconds as new emails are sent!

## 📬 How it works
1. **MongoMailer** connects to your MongoDB database and grabs emails from the specified collection.
2. Every 5 seconds, it checks for new email addresses.
3. If new emails are found, they get sent a friendly test email! 🎉
4. Already sent emails are **tracked** to prevent duplicates! ✔️

## ⚙️ Technologies Used
- **Node.js** 🟢
- **Nodemailer** for sending emails ✉️
- **MongoDB** for storing and fetching emails 🗄️
- **dotenv** for secure environment variables 🔒

## 📝 Notes
- Make sure you have **MongoDB** set up and your email credentials ready.
- The app uses **Gmail** to send emails, so ensure that you've allowed less secure apps or set up an app-specific password.

## 👩‍💻 Contributing
Feel free to contribute! Just fork this repository and submit a pull request. Let's make this fun project even better! 🎉

---

Enjoy sending emails the easy way! 🌟
