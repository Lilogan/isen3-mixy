const axios = require('axios');
const Restaurant = require('../models/Restaurant');
const getCity = require('./city');

async function getRestaurant(cityName) {
  const restaurants = await Restaurant.find({ 'address.city': cityName });
  console.log(restaurants.length);
  if (restaurants.length == 0) {
    const city = await getCity(cityName);
    const data = await getRestaurantById(city.id);
    await Restaurant.insertMany(data);
    return data;
  }
  return restaurants;
}

async function getRestaurantById(locationId) {
  const data = await axios
    .get('https://tripadvisor1.p.rapidapi.com/restaurants/list', {
      headers: {
        'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        useQueryString: true,
      },
      params: {
        lunit: 'km',
        limit: '5',
        offset: 20,
        currency: 'EUR',
        lang: 'fr_FR',
        location_id: locationId,
      },
    })
    .then((res) => {
      let restaurants = new Array();
      for (const element of res.data.data) {
        const restaurant = {
          name: element.name,
          address: {
            country: element.address_obj.country,
            postcode: element.address_obj.postalcode,
            state: element.address.state,
            city: element.address_obj.city,
            street: element.address,
          },
          position: { latitude: element.latitude, longitude: element.longitude },
          price: element.price,
          rating: element.rating,
          img: {
            width: element.photo.images.original.width,
            height: element.photo.images.original.height,
            url: element.photo.images.original.url,
          },
        };
        restaurants.push(restaurant);
      }
      return restaurants;
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
}

module.exports = getRestaurant;
