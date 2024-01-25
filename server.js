const express = require('express');
const app = express();

app.use(express.json());

app.post('/subscribe', (req, res) => {
    console.log(req.body); // здесь логика обработки подписки
    res.status(200).send('Подписка оформлена');
});

app.listen(5000, () => {
    console.log('Сервер запущен на http://localhost:5000');
});
