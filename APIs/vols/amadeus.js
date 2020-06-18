var Amadeus = require('amadeus');

var amadeus = new Amadeus({
  clientId: 'Tyx2gyeUd2z297MXPqoAz7hHs6Af2VNL',
  clientSecret: 'HxecSO6euuG78OHn'
});

amadeus.shopping.flightDestinations.get({
    origin : 'FRA',
    maxPrice : 200,
}).then(function(response){
  console.log(response.data);
}).catch(function(responseError){
  console.log(responseError.code);
});