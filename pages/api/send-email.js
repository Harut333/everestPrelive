import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, email, message } = req.body;

    try {
        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            // Configure the email service provider
            // Example: Gmail SMTP
            service: 'Gmail',
            auth: {
                user: 'harutavetisyan0@gmail.com', // Replace with your Gmail email address
                pass: 'krawqrrdjzlmpbmt', // Replace with your Gmail password
            },
        });

        // Create the email message
        const mailOptions = {
            from: `${name} <${email}>`,
            to: 'harutavetisyan0@gmail.com', // Replace with your email address
            subject: 'New Contact Form Submission',
            text: message,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while sending the email' });
    }
}
