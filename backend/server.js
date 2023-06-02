const express = require('express');
const sendEmail = require('./sendEmail');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/send-email', (req, res) => {
    const data = req.body;

    sendEmail(data, 'harutavetisyan0@gmail.com') // Replace 'harutavetisyan0@gmail.com' with your desired email recipient
        .then((result) => {
            if (result.success) {
                res.status(200).json({ message: 'Email sent successfully' });
            } else {
                res.status(500).json({ error: result.error });
            }
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Failed to send email' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
