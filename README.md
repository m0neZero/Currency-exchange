# 💱 Fullstack Currency Converter

A reliable web application for real-time currency conversion, built with a focus on security and clean user experience.

Note on Currency Support: 
> While the application supports a wide range of global currencies, some (particularly certain African currencies) may be unavailable or outdated. This is a limitation of the free tier of the ExchangeRate-API used in this project

Maintenance: 
> I am actively monitoring the project and will provide bug fixes as they are identified

## 🌟 Key Features
* **Secure Backend**: Uses a Node.js/Express proxy to hide sensitive API keys from the client-side.
* **Live Input Validation**: Prevents invalid characters (letters, multiple dots, etc.) in the amount field.
* **Dynamic UI**: Instantly updates country flags based on the selected currency.
* **Smart Calculation**: Only performs conversion when the user explicitly clicks the "Get Exchange Rate" button to save API resources.

## 🛠 Tech Stack
* **Frontend**: HTML5, CSS3, JavaScript (ES6+)
* **Backend**: Node.js, Express.js
* **External API**: [ExchangeRate-API](https://www.exchangerate-api.com/)

________________________________________________

# ⚙️ Local Installation & Setup

Follow these steps to get the Currency Converter running on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/m0neZero/Currency-exchange.git
cd Currency-exchange

```
________________________________________________

### 2. Install Dependencies

```bash
npm install

```

________________________________________________

### 3. Configure Environment Variables

To protect your credentials, the application uses environment variables

* **Create** an `.env` file in the root directory
* **Copy** the template from `.env.example` into your new `.env` file
* **Insert** your personal API key into the `API_KEY` field

________________________________________________

### 4. Run the Application

Start the production server:

```bash
node server.js

```

Or start in **development mode** with auto-reload:

```bash
nodemon server.js

```

________________________________________________

### 5. Access the App

Open your browser and navigate to: [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)

________________________________________________

## 📂 Project Structure
* `server.js` - Backend Express server handling API requests
* `script.js` - Frontend logic and DOM manipulation
* `country.js` - Currency-to-Country code mapping (Some unavailable)
* `.env.example` - Template for environment variables