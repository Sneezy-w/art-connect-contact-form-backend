const nodemailer = require('nodemailer');
const logger = require('./logger');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  //secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendNotification = async ({ name, email, subject, message }) => {
  const emailContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Customer Inquiry - ArtConnect</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        background-color: #4a90e2;
        color: white;
        padding: 20px;
        text-align: center;
      }
      .content {
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        padding: 20px;
        margin-top: 20px;
      }
      .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 0.8em;
        color: #777;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>New Customer Inquiry</h1>
    </div>
    <div class="content">
      <p><strong>Customer Name:</strong> ${name}</p>
      <p><strong>Customer Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p> 
      <h2>Message:</h2>
      <p>${message}</p>
      <p><em>Please respond to this inquiry within 24 hours.</em></p>
    </div>
    <div class="footer">
      <p>This is an automated message from the ArtConnect website contact form.</p>
    </div>
  </body>
  </html>
`;
  try {
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.SMTP_FROM}>`,
      to: process.env.YOUR_EMAIL_ADDRESS,
      subject: `New Contact Form Submission: ${subject}`,
      html: emailContent,
    });
  } catch (error) {
    logger.error('Error sending email notification:', error);
    throw error;
  }
};

module.exports = {
  sendNotification,
};
