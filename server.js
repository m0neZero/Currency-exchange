require('dotenv').config(); // Загружаем секреты из .env
const express = require('express');
const app = express();
const PORT = 3000;

// Говорим серверу отдавать твой HTML, CSS и script.js из текущей папки
app.use(express.static(__dirname));

// Наш секретный маршрут (мостик)
app.get('/api/convert/:from/:to', async (req, res) => {
    try {
        const { from, to } = req.params; // Берем валюты, которые прислал браузер
        const key = process.env.API_KEY; // Твой скрытый ключ из .env
        const baseUrl = process.env.BASE_URL; // Ссылка из .env

        // Сервер сам делает запрос к API (браузер этого не видит)
        const response = await fetch(`${baseUrl}${key}/pair/${from}/${to}`);
        const data = await response.json();

        // Отправляем ответ обратно во фронтенд
        res.json(data);
    } catch (error) {
        console.error("Ошибка на сервере:", error);
        res.status(500).json({ error: "Сервер приуныл и не смог получить курс" });
    }
});

// Запускаем эту шарманку
app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
    console.log(`🚀 Нажми Ctrl + C, чтобы остановить`);
});