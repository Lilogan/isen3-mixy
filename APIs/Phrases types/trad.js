
const url ="mongodb+srv://TeamMixy:NicoMixy@mixy-cu5lx.mongodb.net/test?retryWrites=true&w=majority"
const MongoClient = require ('mongodb'). MongoClient;
const client = new MongoClient(url);
const dbName = 'dbTest';
const axios= require('axios');
const Langue= "es"
const Text=["hey, what time is it?", "What time is it?", "Where is the metro?"]
    MongoClient.connect(url, function(err, client) {
      let Phrases = new Array();
      const col = client.db(dbName).collection('Phrases');
      for (let i=0; i<3; i++){
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
        if (i==2){
          console.log(Phrases);
          col.insert(Phrases);
        }


      })
      .catch((error)=>{
        console.log(error);
    })


    }

    })

