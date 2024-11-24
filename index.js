const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
const nodemailer = require("nodemailer");
app.use(
  cors({
   origin: "https://samsujjoha.vercel.app",

    credentials: true,
  })
);
app.use(express.json());
require("dotenv").config();
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.FROM_GMAIL,
    pass: process.env.PASSWORD,
  },
});

app.post("/contactUs", async (req, res) => {
  const { name, phone, email, message } = req.body;

  const mailOptions = {
    from: process.env.FROM_GMAIL,
    to: process.env.TO_GMAIL,
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ status: 200 });
  } catch (error) {


    res.status(500).json({ status: 500 });
  }
});

app.listen(PORT, () => {
  // console.log(`Server is running on http://localhost:${PORT}`);
});
