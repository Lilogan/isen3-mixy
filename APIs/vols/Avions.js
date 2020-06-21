const url ="mongodb+srv://TeamMixy:NicoMixy@mixy-cu5lx.mongodb.net/test?retryWrites=true&w=majority"
const MongoClient = require ('mongodb'). MongoClient;
const dbName = 'dbTest';
const axios= require('axios');

MongoClient.connect(url, function(err, client) {
    const col = client.db(dbName).collection('Flights');
    axios({
    "method":"GET",
    "url":"https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/calendar",
    "headers":{
    "content-type":"application/octet-stream",
    "x-access-token":"af470d59bdf253fcdb8b0f02b215a5ed",
    "x-rapidapi-host":"travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com",
    "x-rapidapi-key":"f93cf393a4msh3ea644a3bec766ap1ca0fejsn0a48d1bfef89",
    "useQueryString":true
    },"params":{
    "return_date":"2020-08",
    "currency":"EUR",
    "length":"10",
    "calendar_type":"departure_date",
    "destination":"BCN",
    "origin":"MOW",
    "depart_date":"2020-08"
    }
    })
    .then((response)=>{
      console.log(response)
      col.insert(response.data);
    })
    .catch((error)=>{
      console.log(error)
    })
})
