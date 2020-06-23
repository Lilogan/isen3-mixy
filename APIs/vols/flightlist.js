const axios = require('axios');
const Flight = require('../../models/Flight');

async function getAirportsByName(name, country) {
    const data = await axios
    .get('https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0', {
        headers: {
        "x-rapidapi-host":"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key":"307df49993mshb8f8238ecb37fcfp197e8cjsnb3c133854c92",
        "useQueryString": true,
        },
        params: {
            query: name,
            country: country,
            currency: 'EUR',
            locale: 'fr_FR',
        },
    })
    .then((res) => {

    })
    .catch((error) => {
        console.error(error);
    })
}