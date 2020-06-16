var unirest = require("unirest");

var req = unirest("GET", "https://tripadvisor1.p.rapidapi.com/restaurants/list-by-latlng");

req.query({
	"limit": "3",
	"currency": "EUR",
    "distance": "2",
	"lunit": "km",
	"lang": "en_US",
	"latitude": "50.6333",
	"longitude": "3.0667"
});

req.headers({
	"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
	"x-rapidapi-key": "307df49993mshb8f8238ecb37fcfp197e8cjsnb3c133854c92",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});