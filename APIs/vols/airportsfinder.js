const axios = require('axios');

async function getIATA(placeName) {
    const iata = await axios
    .get('https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/by-text', {
        headers: {
            "x-rapidapi-host":"cometari-airportsfinder-v1.p.rapidapi.com",
            "x-rapidapi-key":"307df49993mshb8f8238ecb37fcfp197e8cjsnb3c133854c92",
            useQueryString:true,
        },
        params: {
            text: placeName,
        },
    })
    .then((res) => {
        const data = res.data.data
    })
}