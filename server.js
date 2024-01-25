const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(session({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: true,
}));

// Примерный объект для хранения данных (в реальном приложении используйте базу данных)
let users = {};
let subscriptions = [];
let cart = {};

// Регистрация пользователя
app.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    if (users[username]) {
        res.status(400).send('Пользователь уже существует');
    } else {
        users[username] = { password, email };
        res.status(200).send('Регистрация успешна');
    }
});

// Авторизация пользователя
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username].password === password) {
        req.session.user = username;
        res.status(200).send('Авторизация успешна');
    } else {
        res.status(400).send('Неверные учетные данные');
    }
});

// Выход из системы
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).send('Выход выполнен');
});

// Добавление товара в корзину
app.post('/cart/add', (req, res) => {
    const { productId, quantity } = req.body;
    const user = req.session.user;
    if (!user) {
        res.status(401).send('Необходима авторизация');
        return;
    }

    if (!cart[user]) {
        cart[user] = {};
    }
    cart[user][productId] = (cart[user][productId] || 0) + quantity;
    res.status(200).send('Товар добавлен в корзину');
});

// Просмотр корзины
app.get('/cart', (req, res) => {
    const user = req.session.user;
    if (!user) {
        res.status(401).send('Необходима авторизация');
    } else {
        res.status(200).json(cart[user] || {});
    }
});

// Подписка на рассылку
app.post('/subscribe', (req, res) => {
    const { email } = req.body;
    if (subscriptions.includes(email)) {
        res.status(400).send('Этот email уже подписан');
    } else {
        subscriptions.push(email);
        res.status(200).send('Подписка оформлена');
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
