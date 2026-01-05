require('dotenv').config(); 
const express = require('express');
const app = express();
const PORT = 3000;

// Раздаем статические файлы (HTML, CSS, JS)
app.use(express.static(__dirname));

// Основной маршрут для конвертации
app.get('/api/convert/:from/:to', async (req, res) => {
    try {
        const { from, to } = req.params;
        const key = process.env.API_KEY;
        const baseUrl = process.env.BASE_URL;

        // Проверяем, загрузились ли переменные окружения
        if (!key || !baseUrl) {
            console.error("❌ Ошибка: API_KEY или BASE_URL не найдены в .env");
            return res.status(500).json({ error: "Настройки сервера не найдены" });
        }

        // Формируем финальный URL (убеждаемся, что нет двойных слэшей)
        const finalUrl = `${baseUrl.replace(/\/$/, '')}/${key}/pair/${from}/${to}`;

        // В Node.js 22 используем ВСТРОЕННЫЙ fetch (удаляем const fetch = require...)
        const response = await globalThis.fetch(finalUrl);
        
        if (!response.ok) {
            throw new Error(`Ошибка внешнего API: ${response.status}`);
        }

        const data = await response.json();

        // Отправляем данные клиенту
        res.json(data);

    } catch (error) {
        console.error("🔴 Ошибка на сервере:", error.message);
        res.status(500).json({ error: "Сервер приуныл и не смог получить курс" });
    }
});

app.listen(PORT, () => {
    console.log(`\n✅ Сервер успешно запущен!`);
    console.log(`🌍 Ссылка: http://localhost:${PORT}`);
    console.log(`🔑 Ключ API загружен: ${process.env.API_KEY ? 'Да' : 'НЕТ'}`);
    console.log(`🚀 Нажми Ctrl + C, чтобы остановить\n`);
});