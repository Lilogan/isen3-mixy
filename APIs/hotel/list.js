const axios = require('axios');
const Hotel = require('../../models/Hotel');

async function getHotelsListbyName(placeName, nbPerson, start, duration) {
  const hotels = await Hotel.find({ "address.city": placeName});
  console.log(hotels.lenght);
  if (hotels.length == 0) {
    const locationId = await getPlaceIdByName(placeName);
    const data = await getHotelsListbyId(locationId, nbPerson, start, duration);
    await Hotel.insertMany(data);
    return data;
  }
  return hotels;
}

async function getPlaceIdByName(placeName) {
  const placeId = await axios
    .get('https://tripadvisor1.p.rapidapi.com/locations/search', {
      headers: {
        'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
        'x-rapidapi-key': '307df49993mshb8f8238ecb37fcfp197e8cjsnb3c133854c92',
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
          return result.result_object.location_id;
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
  console.log(placeId);
  return placeId;
}


async function getHotelsListbyId(locationId, nbPerson, start, duration) {
  const data = await axios
    .get('https://tripadvisor1.p.rapidapi.com/hotels/get-details', {
      headers: {
        'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
        'x-rapidapi-key': '307df49993mshb8f8238ecb37fcfp197e8cjsnb3c133854c92',
        useQueryString: true,
      },
      params: {
        location_id: locationId,
        adults: nbPerson,
        rooms: Math.round(nbPerson / 2),
        checkin: start,
        nights: duration,
        lang: 'fr_FR',
        sort: 'recommended',
        currency: 'EUR',
      },
    })
    .then((res) => {
      let hotels = new Array();
      for(const element of res.data.data) {
        const hotel = {
          name: element.name,
         // description: element.description,
          position: {
            latitude: element.latitude,
            longitude: element.longitude,
          },
          address: {
            country: element.address_obj.country,
            postcode: element.address_obj.postalcode,
            state: element.address_obj.state,
            city: element.address_obj.city,
            street: element.address_obj.street1
          },
          rating: element.rating,
          price: element.price,
          hotelclass: element.hotel_class,
          phone: element.phone,
        }
        hotels.push(hotel);
      }
      return hotels;
    })
    .catch((error) => {
      console.error(error);
    });
  console.log(data);
  return data;
}

module.exports = getHotelsListbyName;
