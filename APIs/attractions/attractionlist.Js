const axios = require('axios');
const Attraction = require('../../models/Attraction') ;

async function getAttractionByLatLng(latitude,longitude) {
    const data = await axios
        .get('https://tripadvisor1.p.rapidapi.com/attractions/list-by-latlng', {
            headers : {
                "x-rapidapi-host":"tripadvisor1.p.rapidapi.com",
                "x-rapidapi-key":"307df49993mshb8f8238ecb37fcfp197e8cjsnb3c133854c92",
                useQueryString:true,
            },
            params : {
                lunit:"km",
                currency:"EUR",
                limit:"10",
                distance:"5",
                lang:"fr_FR",
                longitude:"3.0667",
                latitude:"50.6333",
            }
        })
        .then((res) => {            
            return res.data.data;
        })
        .catch((error) => {
            console.error(error) ;
        });

    console.log(data);

    return data;
}

module.exports = getAttractionByLatLng;



