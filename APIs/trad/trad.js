const axios= require('axios');


async function Tradu(Langue,Text) {
      let Phrases = new Array();
      for (let i=0; i<2; i++){
        axios({
        "method":"POST",
        "url":"https://microsoft-translator-text.p.rapidapi.com/translate",
        "headers":{
        "content-type":"application/json",
        "x-rapidapi-host":"microsoft-translator-text.p.rapidapi.com",
        "x-rapidapi-key":"f93cf393a4msh3ea644a3bec766ap1ca0fejsn0a48d1bfef89",
        "accept":"application/json",
        "useQueryString":true
        },"params":{
        "profanityAction":"NoAction",
        "textType":"plain",
        "to":Langue,
        "api-version":"3.0"
        },"data":[{
        "Text":Text[i],
        }]
        })
      .then((response)=>{
        console.log(response.data[0].translations[0]);
        Phrases.push(response.data[0].translations[0]);
      })
      .catch((error)=>{
        console.log(error);
    })

    }
    return Phrases;
  }
console.log(Tradu("fr",["Hello, how are you my boy?","What time is it bro?"]));