const nodemailer = require("nodemailer");
const ErrorHandler = require("./ErrorHandler");

// {
//     subject,
//     email,
//     message,
//     html
// }

const sendMail = async (req,res,next,options) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

   transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return next(ErrorHandler(err,500)); 
    } else {
     res.status(200).json({
      status: true,
      message: "Email sent successfully",
     });
    }
  });
};

module.exports = sendMail;
