const nodemailer = require("nodemailer");
const express = require("express");
const app = express();
const request = require("request");
const cors = require("cors");

require("../auth.js");

require("../mongodb.js");
const router = express.Router();
require("dotenv").config();
router.use(express.json());


router.post("/forgot", async (req, res) => {

   
    console.log(req.body.email);
   

    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Replace with your email service provider
      auth: {
        user: 'siddhantjha12@gmail.com', // Your email address
        pass: 'iszszopmeqmfeide' // Your email password or app-specific password
      }
    });
    
    // Define the email data
    const mailOptions = {
      from: 'siddhantjha12@gmail.com', // Sender's email address
      to: `${req.body.email}`, // Recipient's email address
      subject: 'LINK to reset your password !', // Email subject
      text: 'hello this is me testing node mailer hui hui hui', // Email content ,
      html: `http://localhost:8080/forgot/${req.body.email}` 
    };
    
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
    
})

module.exports = router;