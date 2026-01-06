require('dotenv').config(); 
const express = require('express');
const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Main route for currency conversion
app.get('/api/convert/:from/:to', async (req, res) => {
    try {
        const { from, to } = req.params;
        const key = process.env.API_KEY;
        const baseUrl = process.env.BASE_URL;

        // Check if environment variables are loaded
        if (!key || !baseUrl) {
            console.error("❌ Error: API_KEY or BASE_URL not found in .env");
            return res.status(500).json({ error: "Server configuration not found" });
        }

        // Build final URL (ensure no double slashes)
        const finalUrl = `${baseUrl.replace(/\/$/, '')}/${key}/pair/${from}/${to}`;

        // Use built-in fetch (Node.js 22+)
        const response = await globalThis.fetch(finalUrl);
        
        if (!response.ok) {
            throw new Error(`External API error: ${response.status}`);
        }

        const data = await response.json();

        // Send data to client
        res.json(data);

    } catch (error) {
        console.error("🔴 Server error:", error.message);
        res.status(500).json({ error: "Server failed to fetch exchange rate" });
    }
});

app.listen(PORT, () => {
    console.log(`\n✅ Server started successfully!`);
    console.log(`🌍 Link: http://localhost:${PORT}`);
    console.log(`🔑 API key loaded: ${process.env.API_KEY ? 'Yes' : 'No'}`);
    console.log(`🚀 Press Ctrl + C to stop\n`);
});