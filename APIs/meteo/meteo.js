const axios = require('axios');
const Meteo = require('../../models/Meteo');

async function getMeteo(placeName) {
    const meteos = await Meteo.find({"city": placeName});
    console.log(meteos.length);
    if (meteos.length == 0) {
        const lat = await getLatitudeByName(placeName);
        const lon = await getLongitudeByName(placeName);
        const data = await getMeteoByLatLng(lat,lon);
        await Meteo.insertMany(data);
        return data;
    }
    return meteos;
}

async function getLatitudeByName(placeName) {
	const latitude = await axios
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
			return result.result_object.latitude;
		  }
		}
	  })
	  .catch((error) => {
		console.error(error);
	  });
	console.log(latitude);
	return latitude;
  }

  async function getLongitudeByName(placeName) {
	const longitude = await axios
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
			return result.result_object.longitude;
		  }
		}
	  })
	  .catch((error) => {
		console.error(error);
	  });
	console.log(longitude);
	return longitude;
  }


async function getMeteoByLatLng(latitude,longitude) {
    const data = await axios
        .get('https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily', {
            headers: {
                "x-rapidapi-host":"weatherbit-v1-mashape.p.rapidapi.com",
                "x-rapidapi-key":"307df49993mshb8f8238ecb37fcfp197e8cjsnb3c133854c92",
                useQueryString: true,
            },
            params: {
                lang: "fr",
                lat: latitude,
                lon: longitude,
            },
        })
        .then((res) => {
            console.log(res);
            let meteos = new Array();
            for (const element of res.data.data) {
                const data = res.data;
                const meteo = {
                    country: data.country_code,
                    city: data.city_name,
                    position: {
                        latitude: data.lat,
                        longitude: data.lon,
                    },
                    datetime: element.datetime,
                    weather: element.weather.description,
                    temperature: {
                        min_temperature: element.min_temp,
                        max_temperature: element.max_temp,
                    }
                };
                meteos.push(meteo);
            }
            return meteos;
        })
        .catch((error) => {
            console.error(error);
        });
    return data;
}

module.exports = getMeteo;