const nodemailer = require('nodemailer');
const fs = require('fs');
const twilio = require('twilio');

require('dotenv').config();

const sendEmail = async (to, htmlTemplate) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user:'esithadkavisara@gmail.com',
        pass:'hjkqtlmdyweynsej'
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: to,
      subject:'SkillUP Confirmation',
      html: htmlTemplate
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

const sendSMS = async (body) => {
const accountSid = 'AC2a47dda41e93681fc8e9de338a8ef7e4';
const authToken = 'fb96fd292570cbb9341b78f3815dd86b';
  try {
    const client = require('twilio')(accountSid, authToken);
    await client.messages.create({
      body: body,
      to:'+94760365338',
      from:'+18289444052'
    });
    return true;
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw error;
  }
};

exports.sendEmailNotification = async (req, res) => {
  try {
    const { email } = req.body;

    // Read the HTML template from a file
    const htmlTemplate = fs.readFileSync('./template/enrollmentConfirmationEmail.html', 'utf8');    
    
    // Send email
    await sendEmail(email,htmlTemplate);

    return res.status(200).json({ message: "Email notification sent successfully" });
  } catch (error) {
    console.error("Error sending email notification:", error);
    return res.status(500).json({ message: "Failed to send email notification" });
  }
};

exports.sendSMSNotification = async (req, res) => {
  try {
    const { body } = req.body;

    // Send SMS
    await sendSMS(body);

    return res.status(200).json({ message: "SMS notification sent successfully" });
  } catch (error) {
    console.error("Error sending SMS notification:", error);
    return res.status(500).json({ message: "Failed to send SMS notification" });
  }
};
