const nodemailer = require("nodemailer");
const pug = require("pug");
const path = require("path");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendBookCreatedEmail = async (book) => {
  try {
    // Compile Pug template to HTML
    const html = pug.renderFile(
      path.join(__dirname, "../views/bookCreated.pug"),
      {
        title: book.title,
        author: book.author,
        year: book.year || "N/A",
      }
    );

    const mailOptions = {
      from: `"Book System" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_EMAIL || process.env.SMTP_USER,
      subject: "New Book Added",
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("📧 Email sent successfully.");
  } catch (err) {
    console.error("❌ Email sending failed:", err.message);
  }
};

module.exports = sendBookCreatedEmail;
