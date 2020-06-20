const axios = require('axios');
const Attraction = require('../../models/Attraction');

async function getAttraction(placeName) {
  const attractions = await Attraction.find({"address.city": placeName});
  console.log(attractions.length);
  if (attractions.length == 0) {
    const locationId = await getPlaceIdByName(placeName);
    const data = await getAttractionById(locationId);
    await Attraction.insertMany(data);
    return data;
  }
  return attractions;
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
