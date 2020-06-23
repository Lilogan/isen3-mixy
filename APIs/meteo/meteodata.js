const axios = require('axios');

async function getHistoryMeteo(latitude, longitude, start, end){
    const data = await axios
        .get('https://wx/almanac/daily', {
            params: {
                key: 'dc40707f1fe94c2daf1f5ddf990a12e6',
                lat: latitude,
                lon: longitude,
                start_date: start,
                end_date: end,
                lang: 'fr',
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

console.log(getHistoryMeteo(38.12,-78.543,'2019-06-18','2019-06-19')) ;