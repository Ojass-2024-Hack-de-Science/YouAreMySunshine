const express = require('express');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const router = express.Router();

require('dotenv').config(); // Load environment variables

// Increase the maximum number of listeners for TLSSocket instances
require('events').EventEmitter.defaultMaxListeners = 15;


// Function to send email
async function sendEmail(senderName, senderEmail, subject, msg) {

    try{
        receiverEmailList="2021ugpi003@nitjsr.ac.in,2021ugpi008@gmail.com"

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: process.env.OFFICIAL_EMAIL,
                pass: process.env.PASS
            }
        });
    
        const message = `From:
            Name: ${senderName}
            Email: ${senderEmail}
        Message:
            ${msg}`;
    
        const info = await transporter.sendMail({
            from: `${senderName} <${senderEmail}>`,
            to: receiverEmailList,
            subject: subject,
            text: message
        });
    
        console.log("Email sent Successfully");
    }
    catch(error)
    {
        console.error("Error sending Email:", error);
    }

}

// Function to send SMS to multiple phone numbers
async function sendSMS() {

    const phoneNumbers=["+916204111709"]
    const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

    try {
        const promises = phoneNumbers.map(phoneNumber => {
            return client.messages.create({
                body: 'There has been an accident on Main Street. Please send help immediately',
                to: phoneNumber,
                from:'+13342493654'
            });
        });

        await Promise.all(promises);

        console.log("SMS sent successfully");
    } catch (error) {
        console.error("Error sending SMS:", error);
    }
}

router.post('/', async (req, res) => {
    const { senderName, senderEmail, subject, msg } = req.body;

    try {
        await sendEmail(senderName, senderEmail, subject, msg);
        await sendSMS();
        
        res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Failed to send message" });
    }
});

module.exports = router;
