var unirest = require("unirest");

var req = unirest("GET", "https://tripadvisor1.p.rapidapi.com/airports/search");

req.query({
	"locale": "en_US",
	"query": "Paris"
});

req.headers({
	"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
	"x-rapidapi-key": "307df49993mshb8f8238ecb37fcfp197e8cjsnb3c133854c92",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);
	for (let i=0; i<5; i++){
		console.log(res.body[i]['name']);
	}
});