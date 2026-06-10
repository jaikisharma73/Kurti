import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can change this to another service if needed
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: `ZorryFash <${process.env.EMAIL_USER}>`,
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: options.html // Optional HTML content
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

export default sendEmail;
