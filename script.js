// 1. Initialize elements from DOM
const amountInput = document.querySelector(".amount input");
const fromSelect = document.querySelector(".from select");
const toSelect = document.querySelector(".to select");
const resultDisplay = document.querySelector(".msg"); // Block for displaying exchange rate text
const getButton = document.querySelector("form button"); // Your "Get Exchange Rate" button
const swapIcon = document.querySelector(".fa-arrow-right-arrow-left");

// 2. Populate dropdown lists from country.js
function populateSelects() {
    for (let currency_code in countryList) {
        // Set USD and UAH as default for startup
        let selectedFrom = currency_code === "USD" ? "selected" : "";
        let selectedTo = currency_code === "UAH" ? "selected" : "";

        let optionTag = `<option value="${currency_code}" ${selectedFrom} ${selectedTo}>${currency_code}</option>`;
        
        fromSelect.insertAdjacentHTML("beforeend", optionTag);
        toSelect.insertAdjacentHTML("beforeend", optionTag);
    }
}

// 3. Function to update flag
function loadFlag(element) {
    let code = element.value;
    let countryCode = countryList[code];
    // Find the image inside the parent container of this select
    let imgTag = element.parentElement.querySelector("img");
    imgTag.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

// 4. MAIN FUNCTION: Request to your server
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
        // Your reliable server request
        const response = await fetch(`/api/convert/${from}/${to}`);
        const data = await response.json();

        if (data.conversion_rate) {
            const total = (amount * data.conversion_rate).toFixed(2);
            // Pretty output of the result
            resultDisplay.innerText = `${amount} ${from} = ${total} ${to}`;
            
            // If you have additional fields for time — you can add them here
            console.log("Rate updated:", data.conversion_rate);
        }
    } catch (error) {
        console.error("Debug (error search):", error);
        resultDisplay.innerText = "Server unavailable";
    }
}

// 5. EVENT HANDLERS

// Block the letter 'e'
amountInput.addEventListener("keydown", (e) => {
    if (['e', 'E', '+', '-'].includes(e.key)) e.preventDefault();
});

// Change flags when currency is selected
fromSelect.addEventListener("change", (e) => {
    loadFlag(e.target); // Update flag
});

toSelect.addEventListener("change", (e) => {
    loadFlag(e.target); // Update flag
});

// Swap button magic (icon)
swapIcon.addEventListener("click", () => {
    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
    
    // Update flags after swap
    loadFlag(fromSelect);
    loadFlag(toSelect);
});

// Bottom button (just in case)
getButton.addEventListener("click", (e) => {
    e.preventDefault();
    calculate();
});

// On page load
window.addEventListener("load", () => {
    populateSelects(); // Populate
    loadFlag(fromSelect); // Set flags
    loadFlag(toSelect);
});

// --- END OF FILE (EVENT HANDLERS BLOCK) ---

// Allow ONLY numbers, dots, and system keys
amountInput.addEventListener("keydown", (e) => {
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', '.', 'v', 'c']; // v and c for Ctrl+V/C
    
    // Check for numbers
    const isNumber = e.key >= '0' && e.key <= '9';
    const isControl = allowedKeys.includes(e.key);

    if (!isNumber && !isControl) {
        e.preventDefault();
    }

    // Block second dot
    if (e.key === '.' && amountInput.value.includes('.')) {
        e.preventDefault();
    }
});

// Final cleanup on paste (in case someone managed to paste letters using the mouse)
amountInput.addEventListener("input", (e) => {
    // Regular expression: keep only numbers and one dot
    let value = e.target.value;
    e.target.value = value.replace(/[^0-9.]/g, '');
    
    // If there are more than one dots — keep only the first
    const parts = e.target.value.split('.');
    if (parts.length > 2) {
        e.target.value = parts[0] + '.' + parts.slice(1).join('');
    }
});