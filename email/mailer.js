const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  // These are the details on the SMPTP server: Brevo
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "ilhanabdalle@gmail.com",
    pass: process.env.BREVO_PASSWORD,
  },
});

// This is the function to send our email email. This can be expanded below to add as many emails as needed
async function welcomeEmail(email) {
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Booksy" ilhanabdalle@gmail.com', // sender address
    to: email, // variable = email 
    subject: "Welcome to Booksy!", // Subject line
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          h1 {
            color: #333;
          }
          p {
            color: #666;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            color: #999;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Hello {{ contact.FIRSTNAME }},</h1>
          <p>Thank you for joing our community of avid readers!
          You'll now have access to the latest offers and be in the know before anyone else!
          </p>
          <div class="footer">
            <p>Thanks for reading!</p>
          </div>
        </div>
      </body>
      </html>
    `
  });


  console.log("Message sent: %s", info.messageId);
}

// welcomeEmail().catch(console.error);

module.exports = welcomeEmail;

