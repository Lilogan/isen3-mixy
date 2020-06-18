const axios = require('axios');
const Attraction = require('../../models/Attraction');

async function getAttraction(latitude, longitude) {
  const attractions = await Attraction.find();
  console.log(attractions.length);
  if (attractions.length == 0) {
    const data = await getAttractionByLatLng(latitude, longitude);
    await Attraction.insertMany(data);
    return data;
  }
  return attractions;
}

async function getAttractionByLatLng(latitude, longitude, distance = 20, limit = 15) {
  const data = await axios
    .get('https://tripadvisor1.p.rapidapi.com/attractions/list-by-latlng', {
      headers: {
        'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
        'x-rapidapi-key': '307df49993mshb8f8238ecb37fcfp197e8cjsnb3c133854c92',
        useQueryString: true,
      },
      params: {
        lunit: 'km',
        currency: 'EUR',
        distance: distance,
        limit: limit,
        lang: 'fr_FR',
        longitude: longitude,
        latitude: latitude,
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
            street: element.address_obj.street,
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
