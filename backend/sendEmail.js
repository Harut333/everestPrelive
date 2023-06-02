const nodemailer = require('nodemailer');

const sendEmail = async (data) => {
    // Create a nodemailer transporter with your email service provider configuration
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'harutavetisyan0@gmail.com',
            pass: 'krawqrrdjzlmpbmt',
        },
    });

    // Define the email options
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'harutavetisyan0@gmail.com',
        subject: 'New Contact Form Submission',
        text: `
      Name: ${data.name}
      Email: ${data.email}
      Message: ${data.message}
    `,
    };

    try {
        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: 'Failed to send email' };
    }
};

module.exports = sendEmail;
