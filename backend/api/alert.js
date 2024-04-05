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
        receiverEmailList="2021ugpi003@nitjsr.ac.in,2021ugpi008@nitjsr.ac.in"

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
    
    const locationCoordinates = [41.40338, 2.17403];
    
    const bbox = `${locationCoordinates[1] - 0.00233},${locationCoordinates[0] - 0.0018},${locationCoordinates[1] + 0.00233},${locationCoordinates[0] + 0.0018}`;

    // Define the endpoint URL
    const endpointUrl = 'https://api.tomtom.com/traffic/services/5/incidentDetails';

    // Define the parameters for the API call
    const queryParams = new URLSearchParams({
        key:'yTeOZaR07WgivEin6panQj03Qa3Ww8QG',
        // bbox: '4.8854592519716675,52.36934334773164,4.897883244144765,52.37496348620152',
        bbox: bbox,
        fields: '{incidents{type,geometry{type,coordinates},properties{iconCategory}}}',
        language: 'en-GB',
        t: 1111,
        categoryFilter: '0,1,2,3,4,5,6,7,8,9,10,11,14',
        timeValidityFilter: 'present'
    });

    // Construct the full URL with parameters
    const fullUrl = `${endpointUrl}?${queryParams}`;

    try {
        // Make the API call
        const response = await fetch(fullUrl);
        
        // Check if the response is successful (status code 200)
        if (response.ok) {
            // Parse the JSON response
            const incidentData = await response.json();
            console.log('Traffic incident data:', incidentData);
            
            if(incidentData.incidents.length>0)
            {
                // Assuming sendEmail and sendSMS functions are defined elsewhere
                await sendEmail(senderName, senderEmail, subject, msg);
                await sendSMS();
                
                res.status(200).json({ message: "There has been an incident ",incidentData,incident:true });
            }
            else
            {
                res.status(200).json({message:" no Incident",incident:false})
            }
            
        } else {
            // If the response is not successful, throw an error
            throw new Error('Failed to retrieve traffic incident data');
        }
    } catch (error) {
        console.error("Error sending message or fetching data:", error);
        res.status(500).json({ error: "Failed to send message or fetch data" });
    }
});

module.exports = router;
