const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();


exports.sendNotification = async (req, res) => {
  try {
    const { email } = req.body;

    // Read the HTML template from a file
    const htmlTemplate = fs.readFileSync('./template/enrollmentConfirmationEmail.html', 'utf8');


    // Your logic for sending the notification
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'esithadkavisara@gmail.com',
        pass: 'hjkqtlmdyweynsej'
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'SkillUP Confirmation',
      html: htmlTemplate,    
    };
    
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to send notification" });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ message: "Notification sent successfully" });
      }
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    return res.status(500).json({ message: "Failed to send notification" });
  }
};
