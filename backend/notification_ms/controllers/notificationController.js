const nodemailer = require("nodemailer");
const fs = require("fs");
const twilio = require("twilio");

require("dotenv").config();

const sendEmail = async (to, htmlTemplate) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "esithadkavisara@gmail.com",
        pass: "hjkqtlmdyweynsej",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: to,
      subject: "SkillUP Confirmation",
      html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

const sendSMS = async (body) => {
  const accountSid = "AC2a47dda41e93681fc8e9de338a8ef7e4";
  const authToken = "fb96fd292570cbb9341b78f3815dd86b";
  try {
    const client = require("twilio")(accountSid, authToken);
    await client.messages.create({
      body: body,
      to: "+94760365338",
      from: "+18289444052",
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
    const htmlTemplate = fs.readFileSync(
      "./template/enrollmentConfirmationEmail.html",
      "utf8"
    );

    // Send email
    await sendEmail(email, htmlTemplate);

    return res
      .status(200)
      .json({ message: "Email notification sent successfully" });
  } catch (error) {
    console.error("Error sending email notification:", error);
    return res
      .status(500)
      .json({ message: "Failed to send email notification" });
  }
};

exports.sendEmailNotification2 = async (req, res) => {
  try {
    const { email, courseName } = req.body;

    // HTML email template with dynamic course name insertion
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 800px;
          margin: 20px auto;
          background-color: #ffffff98;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #388de9;
        }
        .emoji {
          font-size: 1rem;
        }
        .course-details {
          margin-top: 20px;
          padding: 10px;
          background-color: #f0f8ff;
          border-radius: 5px;
        }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Course Approval Notification</h1>
          <p>Dear Instructor,</p>
          <strong>Congratulations!</strong></p>
          <p>We are pleased to inform you that your course <strong>"${courseName}"</strong> has been approved by the administrator.
          <div class="emoji">🎉</div>
          
          <p>If you have any further questions or need assistance, feel free to contact us at [skillupedu@example.com / 011-1234567]. We are here to support you and ensure your course's success!</p>
          <p>Best regards,<br/><strong>SkillUP</strong> Team</p>
        </div>
      </body>
      </html>
    `;

    // Send email
    await sendEmail(email, htmlTemplate);

    return res
      .status(200)
      .json({ message: "Email notification sent successfully" });
  } catch (error) {
    console.error("Error sending email notification:", error);
    return res
      .status(500)
      .json({ message: "Failed to send email notification" });
  }
};

exports.sendEmailNotification3 = async (req, res) => {
  try {
    const { email, courseName } = req.body;

    // HTML email template with dynamic course name insertion
    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 800px;
          margin: 20px auto;
          background-color: #ffffff98;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #388de9;
        }
        .emoji {
          font-size: 1rem;
        }
        .course-details {
          margin-top: 20px;
          padding: 10px;
          background-color: #f0f8ff;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Course Takedown Notification</h1>
        <p>Dear Instructor,</p>
        <p>We regret to inform you that your course <strong>"${courseName}"</strong> has been taken down due to several reasons.</p>
        <div class="emoji">😔</div>
        
        <p>If you have any questions or require further clarification, please feel free to contact us at [skillupedu@example.com / 011-1234567]. We are here to assist you.</p>
        <p>Best regards,<br/><strong>SkillUP</strong> Team</p>
      </div>
    </body>
    </html>
    `;

    // Send email
    await sendEmail(email, htmlTemplate);

    return res
      .status(200)
      .json({ message: "Email notification sent successfully" });
  } catch (error) {
    console.error("Error sending email notification:", error);
    return res
      .status(500)
      .json({ message: "Failed to send email notification" });
  }
};

exports.sendSMSNotification = async (req, res) => {
  try {
    const { body } = req.body;

    // Send SMS
    await sendSMS(body);

    return res
      .status(200)
      .json({ message: "SMS notification sent successfully" });
  } catch (error) {
    console.error("Error sending SMS notification:", error);
    return res.status(500).json({ message: "Failed to send SMS notification" });
  }
};
