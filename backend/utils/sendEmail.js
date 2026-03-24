const nodemailer = require("nodemailer");

const sendEmail = async (email, name) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Welcome",
    html: `
      <h2>Hello ${name}</h2>
      <p>Thank you for registering.</p>
      <p>Your account is successfully created.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;