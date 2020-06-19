const axios = require('axios');
const Restaurant = require('../../models/Restaurant');

async function getRestaurant(placeName) {
	const restaurants = await Restaurant.find();
	console.log(restaurants.length);
	if (restaurants.length == 0) {
		const locationId = await getPlaceIdByName(placeName);
		const data = await getRestaurantById(locationId);
		await Restaurant.insertMany(data);
		return data;
	}
	return restaurants;
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

async function getRestaurantById(locationId) {
	const data = await axios
		.get('https://tripadvisor1.p.rapidapi.com/restaurants/list', {
			headers: {
				'x-rapidapi-host':'tripadvisor1.p.rapidapi.com',
				'x-rapidapi-key':'307df49993mshb8f8238ecb37fcfp197e8cjsnb3c133854c92',
				useQueryString: true,
			},
			params: {
				lunit:"km",
				limit:"5",
				offset: 20,
				currency:"EUR",
				lang:'fr_FR',
				location_id: locationId,
				min_rating: 3,
			},
		})
		.then((res) => {
			console.log(res.data.data);
			let restaurants = new Array();
			for (const element of res.data.data) {
				const restaurant = {
					name: element.name,
					address: {
						country: element.address_obj.country,
						postcode: element.address_obj.postalcode,
						state: element.address.state,
						city: element.address_obj.city,
						street: element.address
					},
					position : {latitude: element.latitude, longitude: element.longitude},
					price: element.price,
					rating: element.rating,
					img: {
						width: element.photo.images.original.width,
						height: element.photo.images.original.height,
						url: element.photo.images.original.url,
					}
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