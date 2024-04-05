const { timeStamp } = require('console');
const express = require('express');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const router = express.Router();
const User=require('../models/UserModel')

require('dotenv').config(); 

// Increase the maximum number of listeners for TLSSocket instances
require('events').EventEmitter.defaultMaxListeners = 15;


// Function to send email
async function sendEmail(senderName, senderEmail, subject, msg,receiverEmailList) {

    try{
        // receiverEmailList="2021ugpi003@nitjsr.ac.in,2021ugpi008@nitjsr.ac.in"

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
        throw error;
    }

}

// Function to send SMS to multiple phone numbers
async function sendSMS(phoneNumbers) {

    // const phoneNumbers=["+916204111709"]
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
        throw error
    }
}

async function updateUserInfo(userId, locationCoordinates) {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { locationCoordinates, timeStamp:Date.now() },
            { new: true } // Return the updated document
        );
        
        if (!updatedUser) {
            console.error('User not found');
            return; // Return early if user is not found
        }

        console.log('User info updated successfully:', updatedUser);
        return updatedUser;
    } catch (error) {
        console.error('Error updating user info:', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}

// Function to calculate the distance between two points on the Earth's surface using the haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI / 180; // Convert latitude 1 from degrees to radians
    const φ2 = lat2 * Math.PI / 180; // Convert latitude 2 from degrees to radians
    const Δφ = (lat2 - lat1) * Math.PI / 180; // Difference in latitudes converted to radians
    const Δλ = (lon2 - lon1) * Math.PI / 180; // Difference in longitudes converted to radians

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in meters
    return distance;
}

// Function to filter coordinates within a given radius
function filterCoordinatesWithinRadius(centerLat, centerLon, users, radius) {
    const filteredUsers = users.filter(user => {
        const distance = calculateDistance(centerLat, centerLon, user.locationCoordinates[0], user.locationCoordinates[1]);
        return distance <= radius;
    });
    return filteredUsers;
}

async function getReceivers(locationCoordinates) {
    const centerLatitude = locationCoordinates[0];
    const centerLongitude = locationCoordinates[1];
    const radius = 500; // Radius in meters

    const timeStamp = Date.now() - 10 * 60 * 1000; // 10 minutes ago

    try {
        // Query users with timestamp greater than the calculated timeStamp to determine offline users
        const users = await User.find({ timeStamp: { $lt: timeStamp } });

        // Filter users within the radius
        const filteredUsers = users.filter(user => {
            const distance = calculateDistance(centerLatitude, centerLongitude, user.locationCoordinates[0], user.locationCoordinates[1]);
            return distance <= radius;
        });

        // Extract emails and phone numbers from filtered users
        const receiverEmailList = filteredUsers.map(user => user.email).join(',');
        const phoneNumbers = filteredUsers.map(user => user.phoneNo);

        return {phoneNumbers,receiverEmailList };
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; 
    }
}
    


router.post('/', async (req, res) => {
    const { userId, locationCoordinates} = req.body;

    await updateUserInfo(userId,locationCoordinates);
    

    let senderName="shubham", senderEmail="example@gmail.com", subject="Emergency Alert";
    let msg="There has been an accident on Main Street. Please send help immediately"
    
    // const locationCoordinates = [41.40338, 2.17403];
    
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
                
                let {phoneNumbers,receiverEmailList}= await getReceivers(locationCoordinates);
                const currentUser=await User.findById(userId)
                receiverEmailList+=","+currentUser.email;
                phoneNumbers.push(currentUser.phoneNo)
                console.log(phoneNumbers,receiverEmailList);

                await sendEmail(senderName, senderEmail, subject, msg,receiverEmailList);
                // await sendSMS(phoneNumbers);


                
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
