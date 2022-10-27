const transport = require("../config/nodemailer.config");

module.exports.sendConfirmationEmail = async (email, confirmationCode) => {
  const frontUri = 'http://localhost:8080/email-confirm';
  await transport.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
        <h2>Hello ${email}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=${frontUri}/${confirmationCode}> Click here</a>
        </div>`,
  }).catch(err => console.log(err));
};
