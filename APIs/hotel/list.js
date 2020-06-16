const axios = require('axios');

async function getHotelsList(idPlace, nbPerson, start, duration) {
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

module.exports = getHotelsList;
