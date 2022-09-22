const nodeMailer = require('nodemailer');

const transport = nodeMailer.createTransport({
	service: 'Gmail',
	auth: {
		user: process.env.SENDER_EMAIL,
		pass: process.env.SENDER_EMAIL_PASS
	}
});

module.exports = transport;
