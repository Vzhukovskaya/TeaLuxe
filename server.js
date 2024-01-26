const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');

// Включаем CORS для всех роутов
app.use(cors());
app.use(express.json());

app.post('/subscribe', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send('Email is required');
    }

    const filename = 'subscriptions.json';
    fs.readFile(filename, (err, data) => {
        let subscriptions = [];
        if (!err) {
            subscriptions = JSON.parse(data.toString());
        }

        if (subscriptions.some(subscription => subscription.useremail === email)) {
            return res.status(400).send('Email already subscribed');
        }

        subscriptions.push({ useremail: email });

        fs.writeFile(filename, JSON.stringify(subscriptions, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error saving the email');
            }
            res.status(200).send('Subscribed successfully');
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
