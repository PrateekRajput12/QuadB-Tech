const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: String,
    last_price: Number,
    buy_price: Number,
    sell_price: Number,
    volume: Number,
    base_unit: String,
});

module.exports = mongoose.model('Crypto', cryptoSchema);
