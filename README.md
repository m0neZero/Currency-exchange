# 💱 Fullstack Currency Converter

A reliable web application for real-time currency conversion, built with a focus on security and clean user experience.

Note on Currency Support: > While the application supports a wide range of global currencies, some (particularly certain African currencies) may be unavailable or outdated. This is a limitation of the free tier of the ExchangeRate-API used in this project.

Maintenance: > I am actively monitoring the project and will provide bug fixes as they are identified.

## 🌟 Key Features
* **Secure Backend**: Uses a Node.js/Express proxy to hide sensitive API keys from the client-side.
* **Live Input Validation**: Prevents invalid characters (letters, multiple dots, etc.) in the amount field.
* **Dynamic UI**: Instantly updates country flags based on the selected currency.
* **Smart Calculation**: Only performs conversion when the user explicitly clicks the "Get Exchange Rate" button to save API resources.

## 🛠 Tech Stack
* **Frontend**: HTML5, CSS3, JavaScript (ES6+)
* **Backend**: Node.js, Express.js
* **External API**: [ExchangeRate-API](https://www.exchangerate-api.com/)


# ⚙️ Local Installation & Setup (trying to be helpful)

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/m0neZero/Currency-exchange.git](https://github.com/m0neZero/Currency-exchange.git)
    cd Currency-exchange
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    * Create a `.env` file in the root directory.
    * Copy the content from `.env.example`.
    * Paste your personal API key into the `API_KEY` field.

4.  **Run the application:**
    ```bash
    node server.js
    ```
    *Or use nodemon for development:*
    ```bash
    nodemon server.js
    ```

5.  **Access the app:**
    Open [http://localhost:3000](http://localhost:3000) in your browser. CTRL + Mouse Click

## 📂 Project Structure
* `server.js` - Backend Express server handling API requests.
* `script.js` - Frontend logic and DOM manipulation.
* `country.js` - Currency-to-Country code mapping (Some unavailable)
* `.env.example` - Template for environment variables.

---
*Created for portfolio purposes. Feel free to use and improve!*

*Star it - if you like it ^^*