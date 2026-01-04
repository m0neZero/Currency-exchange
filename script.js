if (typeof API_CONFIG === 'undefined') {
    throw new Error("API_CONFIG is not defined. Please ensure secr/config.js is loaded.");
}

const API_KEY = API_CONFIG.KEY;
const BASE_URL = API_CONFIG.URL;

