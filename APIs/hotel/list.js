const axios = require('axios');
const Country = require('../../models/Country');

async function getHotelsListbyCountry(countryName) {
  const result = await Country.find({ name: countryName, locationId: { $exists: true } });
  if (result.length == 0) {
    const locationId = await getPlaceIdByName(countryName);
    console.log('ID :' + locationId);
    if (locationId) await Country.updateOne({ name: countryName }, { locationId: locationId });
  }
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

async function getHotelsListbyId(idPlace, nbPerson, start, duration) {
  const data = await axios
    .get('https://tripadvisor1.p.rapidapi.com/hotels/list', {
      headers: {
        'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
        'x-rapidapi-key': '307df49993mshb8f8238ecb37fcfp197e8cjsnb3c133854c92',
        useQueryString: true,
      },
      params: {
        location_id: place,
        adults: nbPerson,
        room: Math.round(nbPerson / 2),
        checkin: start,
        nights: duration,
        lang: 'fr-FR',
        sort: 'recommended',
        currency: 'EUR',
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.error(error);
    });

  console.log(data);

  return data;
}

module.exports = getHotelsListbyCountry;
