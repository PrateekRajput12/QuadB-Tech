async function fetchCryptos() {
    const response = await fetch('http://localhost:5000/cryptos');
    const data = await response.json();
    const table = document.getElementById('crypto-table');
    let bestPrice = 0;

    data.forEach((crypto, index) => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${crypto.name}</td>
            <td>₹${crypto.last_price}</td>
            <td>₹${crypto.buy_price} / ₹${crypto.sell_price}</td>
            <td>${((crypto.buy_price - crypto.last_price) / crypto.last_price * 100).toFixed(2)}%</td>
            <td>₹${(crypto.buy_price - crypto.last_price).toFixed(2)}</td>
        `;
        if (crypto.last_price > bestPrice) {
            bestPrice = crypto.last_price;
        }
    });

    document.getElementById('best-price').textContent = bestPrice;
}

fetchCryptos();
