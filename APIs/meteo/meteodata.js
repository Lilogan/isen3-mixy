const axios = require('axios');

async function getHistoryMeteo(placeName,dateString){
    const data = await axios
        .get('http://api.worldweatheronline.com/premium/v1/weather.ashx', {
            params: {
                q: placeName,
                date: dateString,
                Key: '487c5cdd91084364a7a105714202206',
                format: "json",
            }
        })
        .then((res) => {
            const data = res.data.data;
            return data;
        })
        .catch((error) => {
            console.error(error);
        });
    console.log(data);
    return data;
}

console.log(getHistoryMeteo('Lille','2021-08-16')) ;