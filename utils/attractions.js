const axios = require('axios');
const Attraction = require('../models/Attraction');
const getCity = require('./city');

async function getAttraction(cityName) {
  const attractions = await Attraction.find({"address.city": cityName});
  if (attractions.length == 0) {
    const city = await getCity(cityName);
    const data = await getAttractionById(city.id);
    await Attraction.insertMany(data);
    return data;
  }
  return attractions;
}

async function getAttractionById(locationId) {
  const data = await axios
    .get('https://tripadvisor1.p.rapidapi.com/attractions/list', {
      headers: {
        'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
        'x-rapidapi-key': '307df49993mshb8f8238ecb37fcfp197e8cjsnb3c133854c92',
        useQueryString: true,
      },
      params: {
        lunit: 'km',
        currency: 'EUR',
        offset: 30,
        limit: 15,
        lang: 'fr_FR',
        location_id: locationId,
      },
    })
    .then((res) => {
      let attractions = new Array();
      for (const element of res.data.data) {
        const attraction = {
          name: element.name,
          position: {
            latitude: element.latitude,
            longitude: element.longitude,
          },
          category: element.subcategory[0].name,
          address: {
            country: element.address_obj.country,
            postcode: element.address_obj.postalcode,
            state: element.address_obj.state,
            city: element.address_obj.city,
            street: element.address_obj.street1,
          },
          img: element.photo.images.original,
        };
        attractions.push(attraction);
      }
      return attractions;
    })
    .catch((error) => {
      console.error(error);
    });

  return data;
}

module.exports = getAttraction;
