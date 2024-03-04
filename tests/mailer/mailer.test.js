// const nodemailer = require('nodemailer');
// const welcomeEmail = require('../../email/mailer');
// require("dotenv").config();

// jest.mock('nodemailer');

// describe("welcomeEmail function", () => {
//   it("sends a welcome email to the specified email address", async () => {
//     const email = "example@example.com";
//     const info = {
//         messageId: "abc123",
//     };

//     nodemailer.createTransport.mockReturnValue({
//         sendMail: jest.fn().mockResolvedValue(info),
//     });

//     await welcomeEmail(email);

//     expect(nodemailer.createTransport).toHaveBeenCalledWith({
//         host: "smtp-relay.brevo.com",
//         port: 587,
//         secure: false,
//         auth: {
//             user: "ilhanabdalle@gmail.com",
//             pass: process.env.BREVO_PASSWORD,
//         },
//         });

//     expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith({
//       from: '"Booksy" ilhanabdalle@gmail.com',
//       to: email,
//       subject: "Welcome to Booksy!",
//       html: expect.any(String),
//     });

//     expect(console.log).toHaveBeenCalledWith("Message sent: %s", info.messageId);
//   });

//   // Add more tests for error handling if needed
// });