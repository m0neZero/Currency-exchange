const amountInput = document.getElementById('amount');
const fromSelect = document.getElementById('from-currency');
const toSelect = document.getElementById('to-currency');
const resultDisplay = document.getElementById('converted-amount');
const rateDisplay = document.getElementById('exchange-rate');
const swapBtn = document.getElementById('swap-btn');
const lastUpdated = document.getElementById('last-updated');

async function calculate() {
    const amount = amountInput.value;
    const from = fromSelect.value;
    const to = toSelect.value;

    // Если ввели 0 или минус — ничего не делаем, чтобы не грузить сервер
    if (amount <= 0) {
        resultDisplay.innerText = "0.00";
        return;
    }

    try { // Запрос к серверу для получения курса
        const response = await fetch(`/api/convert/${from}/${to}`);
        const data = await response.json();

        if (data.conversion_rate) { // Если курс получен успешно
            const total = (amount * data.conversion_rate).toFixed(2); // Считаем итоговую сумму с двумя знаками после запятой
            
            // Выводим результат
            resultDisplay.innerText = `${total} ${to}`; // Отформатированный вывод
            rateDisplay.innerText = `Exchange Rate: 1 ${from} = ${data.conversion_rate} ${to}`; // Курс обмена
            
            // Обновляем время (возьмем текущее)
            const now = new Date();
            lastUpdated.innerText = `Last updated: ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        }
    } catch (error) { // Обработка ошибок
        console.error("Ошибка:", error); // Логируем ошибку в консоль для дебага. А что такое дебаг? Это когда ты ищешь ошибки в коде, блять но ты не знаешь где они и как их найти, вот для этого и нужен дебаггер
        rateDisplay.innerText = "Сервер недоступен"; // Сообщаем что сервер не отвечает
    }
}

// Магия для кнопки ⇄
swapBtn.addEventListener('click', () => { // При клике на кнопку обмена валют
    const temp = fromSelect.value; // Меняем местами выбранные валюты
    fromSelect.value = toSelect.value; // Меняем местами выбранные валюты
    toSelect.value = temp; // Меняем местами выбранные валюты
    calculate(); // Пересчитываем сразу после обмена
});

// Слушатели для живого обновления
amountInput.addEventListener('input', calculate);
fromSelect.addEventListener('change', calculate);
toSelect.addEventListener('change', calculate);

// Запуск при загрузке страницы и чтобы оно не ебнулось на пустом месте
calculate();