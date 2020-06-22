const axios = require('axios');

async function getHistoryMeteo(){
    const data = await axios
        .get('http://api.worldweatheronline.com/premium/v1/past-weather.ashx', {
            params: {
                q: 'Lille',
                date: "2019-06-15",
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

console.log(getHistoryMeteo()) ;