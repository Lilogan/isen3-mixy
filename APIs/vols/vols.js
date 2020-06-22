const axios= require('axios');

async function getFlights(datedepart,datearrivee,duree,paysOrigin,paysDestination) {
  const data = await axios
    .get('https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/calendar', {
      headers : {
        "x-access-token":"af470d59bdf253fcdb8b0f02b215a5ed",
        "x-rapidapi-host":"travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com",
        "x-rapidapi-key":"f93cf393a4msh3ea644a3bec766ap1ca0fejsn0a48d1bfef89",
        useQueryString: true,
      },
      params: {
        return_date:datearrivee,
        currency:"EUR",
        length:duree,
        calendar_type:"departure_date",
        destination:paysDestination,
        origin:paysOrigin,
        depart_date:datedepart
      },
    })
    .then((response)=>{
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

console.log(getFlights("2020-08","2020-08","10","MOW","BCN"));