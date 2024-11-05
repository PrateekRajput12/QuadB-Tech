const express = require('express');
const axios = require('axios');
const mongoose = require('./database');
const Crypto = require('./models/crypto');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Route to fetch data from the API and store it in MongoDB
app.get('/fetch-cryptos', async (req, res) => {
    try {
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const data =  Object.values(response.data).slice(0, 10); // Top 10 results

        // Clear existing data in the collection
        await Crypto.deleteMany({});

        // Insert new data
        const cryptoData = data.map(item => ({
            name: item.name,
            last_price: parseFloat(item.last),
            buy_price: parseFloat(item.buy),
            sell_price: parseFloat(item.sell),
            volume: parseFloat(item.volume),
            base_unit: item.base_unit,
        }));

        await Crypto.insertMany(cryptoData);
        res.send('Data fetched and stored successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }
});

// Route to get stored data for the frontend
app.get('/cryptos', async (req, res) => {
    try {
        const cryptos = await Crypto.find();
        res.json(cryptos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
