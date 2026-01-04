// Находим элементы на странице ебана в роть
const amountInput = document.querySelector('.amount input'); // Поле ввода суммы
const fromSelect = document.querySelector('.from select'); // Селекты валют
const toSelect = document.querySelector('.to select'); // Селекты валют
const resultText = document.querySelector('.exchange-rate'); // Куда выводим результат
const btn = document.querySelector('form button'); // Кнопка обмена

// Функция получения курса обмена и прочая хуйня которую я написал и забыл зачем
async function getExchangeRate() { // Асинхронная функция чтобы не блокировать UI
    const amountVal = amountInput.value || 1; // Сумма для обмена, по умолчанию 1
    const from = fromSelect.value; // Валюты из селектов
    const to = toSelect.value; // Валюты из селектов

    resultText.innerText = "Получаем курс..."; // Сообщение пока ждем ответ

    try { // Пытаемся выполнить запрос
        // Запрос идет к моему сука серверу (чтобы не светить апи ключ) ибо я не хочу платить за хостинг
        const response = await fetch(`/api/convert/${from}/${to}`); // Ждем ответа от сервера
        const data = await response.json(); // Парсим ответ в JSON

        if (data.conversion_rate) { // Если в ответе есть курс обмена
            const total = (amountVal * data.conversion_rate).toFixed(2); // Считаем итоговую сумму с двумя знаками после запятой
            resultText.innerText = `${amountVal} ${from} = ${total} ${to}`; // Выводим результат
        } else { // Если курса нет
            resultText.innerText = "Ошибка данных"; // Если нет курса, сообщаем об ошибке
        }
    } catch (error) { // Ловим ошибки запроса
        resultText.innerText = "Сервер не отвечает"; // Сообщаем что сервер не отвечает
        console.error("Ошибка:", error); // Логируем ошибку в консоль для дебага. Ебись оно конем
    }
}

// Слушатели событий на кнопку и загрузку страницы. Для ебланов: (чтобы не нажимать кнопку каждый раз)
btn.addEventListener("click", (e) => { // При клике на кнопку. Для тупых: (чтобы не перезагружалась страница)
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    getExchangeRate(); // Вызываем функцию получения курса
});

// Авто-расчет при загрузке. Для некодеров: (чтобы сразу увидеть курс при заходе на страницу)
window.addEventListener("load", getExchangeRate); // При загрузке страницы сразу получаем курс.