const form = document.querySelector('#searchForm');
const res = document.querySelector('#resTable');
const cont = document.getElementById("allContaint");

// API Key from CoinStats (replace 'YOUR_API_KEY' with your actual API key)
const API_KEY = 'qcocIzzpdK65V6ikKfj3WEDTpWqJJ/wFaqtOWbywHrs=';

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ctype = form.elements.coinType.value;
    cont.classList.add('mainClick');
    cont.classList.remove('main');
    fetchPrice(ctype);
});

const fetchPrice = async (ctype) => {
    try {
        // API call with API key included in headers
        const response = await axios.get(`https://openapiv1.coinstats.app/coins/${ctype}`, {
            headers: {
                'X-API-KEY': `${API_KEY}`  // Include the API key in the Authorization header
            }
        });

        // Call the function to display the data
        showPrice(response.data);
    } catch (error) {
        console.error('Error fetching coin data:', error);
    }
};

const showPrice = (coinData) => {
    const price = coinData.price;
    const vol = coinData.volume;
    const priceChange1h = coinData.priceChange1h;
    const priceChange1d = coinData.priceChange1d;
    const priceChange1w = coinData.priceChange1w;
    const coin = coinData.name;
    const icon = coinData.icon; 
    const marketCap = coinData.marketCap;
    const websiteUrl = coinData.websiteUrl;
    const curr = 'USD';
    let col = "green";
    if (priceChange1d < 0) {
        col = "red";
    }

    // Display coin data in the result table
    res.innerHTML = `
        <tr class="bg-primary" style="color: white;">
            <td>Property</td>
            <td>Value</td>
        </tr>
        <tr>
            <td>
                <img src="${icon}" alt="${coin} icon" style="width: 30px; height: 30px; margin-right: 10px;">
                ${coin}
            </td>
            <td style="color:${col};"><span style="font-size: 1.3em;">${price}</span> ${curr}</td>
        </tr>
        <tr>
            <td>Volume (24hrs)</td>
            <td>${vol}</td>
        </tr>
        <tr>
            <td>PriceChange (1 hr)</td>
            <td style="color:${col};">${priceChange1h} ${curr}</td>
        </tr>
        <tr>
            <td>PriceChange (24hrs)</td>
            <td style="color:${col};">${priceChange1d} ${curr}</td>
        </tr>
        <tr>
            <td>PriceChange (1 week)</td>
            <td style="color:${col};">${priceChange1w} ${curr}</td>
        </tr>
        <tr>
            <td>marketCap</td>
            <td style="color:${col};">${marketCap} ${curr}</td>
        </tr>
        <tr>
            <td>Website</td>
            <td><a href="${websiteUrl}" target="_blank" style="color: blue;">Visit Website</a></td>
        </tr>
    `;
};
