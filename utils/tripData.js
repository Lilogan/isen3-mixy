const axios = require('axios');
const Country = require('../models/Country');
const Activity = require('../models/Activity');
const City = require('../models/City');
const Flight = require('../models/Flight');
const Hotel = require('../models/Hotel');
const Restaurant = require('../models/Restaurant');

// City

async function getCity(cityName) {
  const city = await City.findOne({ name: cityName });
  if (city == null) {
    const data = await getCityOverApi(cityName);
    console.log(data);
    await City.insertMany([data]);
    return data;
  }
  return city;
}

async function getCityOverApi(cityName) {
  const city = await axios
    .get('https://tripadvisor1.p.rapidapi.com/locations/search', {
      headers: {
        'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        useQueryString: true,
      },
      params: {
        query: cityName,
        lang: 'fr_FR',
        currency: 'EUR',
        units: 'km',
        limit: 5,
      },
    })
    .then((res) => {
      const data = res.data.data;
      for (const result of data) {
        if (result.result_type == 'geos' && result.result_object.name == cityName) {
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

// Activities

async function getActivities(cityName) {
  const activities = await Activity.find({ 'address.city': cityName });
  if (activities.length == 0) {
    const city = await getCity(cityName);
    const data = await getActivitiesOverApi(city.id);
    await Activity.insertMany(data);
    return data;
  }
  return activities;
}

async function getActivitiesOverApi(locationId) {
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
      let activities = new Array();
      for (const element of res.data.data) {
        const activity = {
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
        activities.push(activity);
      }
      return activities;
    })
    .catch((error) => {
      console.error(error);
    });

  return data;
}

// Hotels

async function getHotels(cityName, nbPerson, start, duration) {
  const hotels = await Hotel.find({ 'address.city': cityName });
  if (hotels.length == 0) {
    const city = await getCity(cityName);
    const data = await getHotelsOverApi(city.id, nbPerson, start, duration);
    await Hotel.insertMany(data);
    return data;
  }
  return hotels;
}

async function getHotelsOverApi(locationId, nbPerson, start, duration) {
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
        currency: 'EUR',
      },
    })
    .then((res) => {
      let hotels = new Array();
      for (const element of res.data.data) {
        const hotel = {
          name: element.name,
          description: element.description,
          position: {
            latitude: element.latitude,
            longitude: element.longitude,
          },
          address: {
            country: element.address_obj.country,
            postcode: element.address_obj.postalcode,
            state: element.address_obj.state,
            city: element.address_obj.city,
            street: element.address_obj.street1,
          },
          rating: element.rating,
          price: element.price,
          hotelClass: element.hotel_class,
          phone: element.phone,
        };
        hotels.push(hotel);
      }
      return hotels;
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
}

// Restaurant

async function getRestaurants(cityName) {
  const restaurants = await Restaurant.find({ 'address.city': cityName });
  if (restaurants.length == 0) {
    const city = await getCity(cityName);
    const data = await getRestaurantsOverApi(city.id);
    await Restaurant.insertMany(data);
    return data;
  }
  return restaurants;
}

async function getRestaurantsOverApi(locationId) {
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
            street: element.address_obj.street1,
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

// Flights

async function getFlightsByCity(cityName, outboundDate, inboundDate) {
  const flights = await Flight.find({
    'outbound.destination.city': cityName,
    'outbound.data': outboundDate,
    'inbound.date': inboundDate,
  });
  if (flights.length == 0) {
    const city = await getCity(cityName);
    const data = await getFlightsByCountry(FR, city.country, outboundDate, inboundDate);
    await Flight.insertMany(data);
  }
  return flights;
}

async function getFlightsByCountry(country, outboundDate, inboundDate) {
  const flights = await Flight.find({
    destinationCountry: country,
    'outbound.data': outboundDate,
    'inbound.date': inboundDate,
  });
  if (flights.length == 0) {
    const country = await Country.findOne({ name: country });
    const data = await getFlightsOverApi(FR, country.id, outboundDate, inboundDate);
    await Flight.insertMany(data);
    return data;
  }
  return flights;
}

async function getFlightsOverApi(originId, destinationId, outboundDate, inboundDate) {
  const data = await axios
    .get(
      'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/FR/EUR/fr-FR/' +
        originId +
        '-sky/' +
        destinationId +
        '-sky/' +
        outboundDate +
        '/' +
        inboundDate,
      {
        headers: {
          'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
          'x-rapidapi-key': process.env.RAPIDAPI_KEY,
          useQueryString: true,
        },
      }
    )
    .then((res) => {
      let flights = new Array();
      for (const route of res.Routes) {
        const quote = res.Quotes.filter((quote) => quote.QuoteId == route.QuoteIds[0]);

        const outOriginPlace = res.Places.filter((place) => place.PlaceId == quote.OutboundLeg.OriginId);
        const inOriginPlace = res.Places.filter((place) => place.PlaceId == quote.InboundLeg.OriginId);
        const outDestinationPlace = res.Places.filter((place) => place.PlaceId == quote.OutboundLeg.DestinationId);
        const inDestinationPlace = res.Places.filter((place) => place.PlaceId == quote.OutboundLeg.DestinationId);

        const flight = {
          originCountry: outOriginPlace.CountryName,
          destinationCountry: outDestinationPlace.CountryName,
          price: route.Prices,
          direct: quote.Direct,
          outbound: {
            origin: {
              iata: outOriginPlace.IataCode,
              city: outOriginPlace.CityId,
              name: outOriginPlace.Name,
            },
            destination: {
              iata: outDestinationPlace.IataCode,
              city: outDestinationPlace.CityId,
              name: outDestinationPlace.Name,
            },
            date: new Date(quote.OutboundLeg.DepartureDate).getDate(),
            carrier: res.Carriers.filter((carrier) => carrier.CarriersId == quote.OutboundLeg.CarriersId),
          },
          inbound: {
            origin: {
              iata: inOriginPlace.IataCode,
              city: inOriginPlace.CityId,
              name: inOriginPlace.Name,
            },
            destination: {
              iata: inDestinationPlace.IataCode,
              city: inDestinationPlace.CityId,
              name: inDestinationPlace.Name,
            },
            date: new Date(quote.InboundLeg.DepartureDate).getDate(),
            carrier: res.Carriers.filter((carrier) => carrier.CarriersId == quote.InboundLeg.CarriersId),
          },
        };
        flights.push(flight);
      }
      return flights;
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = { getCity, getActivities, getHotels, getRestaurants, getFlightsByCountry, getFlightsByCity };
