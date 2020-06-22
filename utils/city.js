const axios = require('axios');
const City = require('../models/City');

async function getCity(cityName) {
  const city = await City.findOne({ name: cityName });
  if (city != undefined) {
    const data = await getCityByName(cityName);
    await City.insert(data);
    return data;
  }
  return city;
}

async function getCityByName(cityName) {
  const city = await axios
    .get('https://tripadvisor1.p.rapidapi.com/locations/search', {
      headers: {
        'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        useQueryString: true,
      },
      params: {
        query: placeName,
        lang: 'fr_FR',
        currency: 'EUR',
        units: 'km',
        limit: 5,
      },
    })
    .then((res) => {
      const data = res.data.data;
      for (const result of data) {
        if (result.result_type == 'geos' && result.result_object.name == placeName) {
          const city = {
            name: result.result_object.name,
            id: result.result_object.location_id,
            description: result.result_object.geo_description,
            country: [...result.result_object.ancestors].pop().name,
            coords: {
              latitude: result.result_object.latitude,
              longitude: result.result_object.longitude,
            },
            img: result.result_object.photo.images.original,
          };
          return city;
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return city;
}

module.exports = getCity;
