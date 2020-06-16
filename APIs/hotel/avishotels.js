var unirest = require("unirest");

var req = unirest("GET", "https://tripadvisor1.p.rapidapi.com/keywords/list");

req.query({
	"limit": "10",
	"location_id": "8014024"
});

req.headers({
	"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
	"x-rapidapi-key": "307df49993mshb8f8238ecb37fcfp197e8cjsnb3c133854c92",
	"useQueryString": true
});

const body = 
req.end(function (res) {
	if (res.error) throw new Error(res.error);

	for (let i=0; i<10; i++){
	console.log(res.body['data'][i]["text"]);
	}
});