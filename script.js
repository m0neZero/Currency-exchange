// 1. Инициализация элементов (под твой новый HTML)
const amountInput = document.querySelector(".amount input");
const fromSelect = document.querySelector(".from select");
const toSelect = document.querySelector(".to select");
const resultDisplay = document.querySelector(".msg"); // Блок для вывода текста курса
const getButton = document.querySelector("form button"); // Твоя кнопка "Get Exchange Rate"
const swapIcon = document.querySelector(".fa-arrow-right-arrow-left");

// 2. Наполнение выпадающих списков из country.js
function populateSelects() {
    for (let currency_code in countryList) {
        // Установим USD и UAH как дефолтные для старта
        let selectedFrom = currency_code === "USD" ? "selected" : "";
        let selectedTo = currency_code === "UAH" ? "selected" : "";

        let optionTag = `<option value="${currency_code}" ${selectedFrom} ${selectedTo}>${currency_code}</option>`;
        
        fromSelect.insertAdjacentHTML("beforeend", optionTag);
        toSelect.insertAdjacentHTML("beforeend", optionTag);
    }
}

// 3. Функция обновления флага
function loadFlag(element) {
    let code = element.value;
    let countryCode = countryList[code];
    // Находим картинку внутри родительского контейнера этого селекта
    let imgTag = element.parentElement.querySelector("img");
    imgTag.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

// 4. ГЛАВНАЯ ФУНКЦИЯ: Запрос к твоему серверу
async function calculate() {
    const amount = amountInput.value;
    const from = fromSelect.value;
    const to = toSelect.value;

    if (amount <= 0 || amount === "") {
        resultDisplay.innerText = "Please enter a valid amount";
        return;
    }

    resultDisplay.innerText = "Getting rate...";

    try {
        // Твой старый добрый запрос к серваку
        const response = await fetch(`/api/convert/${from}/${to}`);
        const data = await response.json();

        if (data.conversion_rate) {
            const total = (amount * data.conversion_rate).toFixed(2);
            // Красивый вывод результата
            resultDisplay.innerText = `${amount} ${from} = ${total} ${to}`;
            
            // Если у тебя остались доп. поля для времени — можно добавить их сюда
            console.log("Курс обновлен:", data.conversion_rate);
        }
    } catch (error) {
        console.error("Дебаг (поиск ошибок):", error);
        resultDisplay.innerText = "Сервер недоступен";
    }
}

// 5. ОБРАБОТЧИКИ СОБЫТИЙ

// Запрет буквы 'e'
amountInput.addEventListener("keydown", (e) => {
    if (['e', 'E', '+', '-'].includes(e.key)) e.preventDefault();
});

// Смена флагов при выборе валюты
fromSelect.addEventListener("change", (e) => {
    loadFlag(e.target); // Обновляем флаг
});

toSelect.addEventListener("change", (e) => {
    loadFlag(e.target); // Обновляем флаг ещё раз сука
});

// Магия кнопки Swap (иконки)
swapIcon.addEventListener("click", () => {
    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
    
    // Обновляем флаги после подмены
    loadFlag(fromSelect);
    loadFlag(toSelect);
});

// Кнопка внизу (на всякий случай)
getButton.addEventListener("click", (e) => {
    e.preventDefault();
    calculate();
});

// При загрузке страницы
window.addEventListener("load", () => {
    populateSelects(); // Наполняем
    loadFlag(fromSelect); // Ставим флаги
    loadFlag(toSelect);
});

// --- КОНЕЦ ФАЙЛА (БЛОК ОБРАБОТЧИКОВ) ---

// Запрещаем ВСЁ, кроме цифр, точки и системных клавиш
amountInput.addEventListener("keydown", (e) => {
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', '.', 'v', 'c']; // v и c для Ctrl+V/C
    
    // Проверка на цифры
    const isNumber = e.key >= '0' && e.key <= '9';
    const isControl = allowedKeys.includes(e.key);

    if (!isNumber && !isControl) {
        e.preventDefault();
    }

    // Запрет второй точки
    if (e.key === '.' && amountInput.value.includes('.')) {
        e.preventDefault();
    }
});

// Финальная зачистка при вставке (если кто-то умудрился вставить буквы через мышку)
amountInput.addEventListener("input", (e) => {
    // Регулярное выражение: оставить только цифры и одну точку
    let value = e.target.value;
    e.target.value = value.replace(/[^0-9.]/g, '');
    
    // Если точек больше одной — оставляем только первую
    const parts = e.target.value.split('.');
    if (parts.length > 2) {
        e.target.value = parts[0] + '.' + parts.slice(1).join('');
    }

});