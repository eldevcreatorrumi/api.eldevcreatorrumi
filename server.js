const express = require('express');
const cors = require('cors');
const { status } = require('minecraft-server-util');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Serve static files
app.use(express.static(path.join(__dirname)));

// API endpoint
app.get('/api/status', async (req, res) => {
    try {
        const serverStatus = await status('212.21.15.122', 10000, { timeout: 1000 });
        res.json(serverStatus);
    } catch (error) {
        res.json({
            online: false,
            error: error.message
        });
    }
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API: http://localhost:${PORT}/api/status`);
    console.log(`Web: http://localhost:${PORT}`);
}); 