const axios = require('axios');
const CronJob = require('cron').CronJob;
const Country = require('../models/Country');

async function updateRate() {
  try {
    axios
      .get('http://data.fixer.io/api/latest', {
        params: {
          access_key: process.env.FIXER_KEY,
        },
      })
      .then(async (response) => {
        const rates = response.data.rates;
        for (currency in rates) {
          await Country.updateMany({ 'currency.id': currency }, { 'currency.euroRate': rates[currency] }).catch(
            (error) => {
              console.error(error);
            }
          );
        }
        console.log('Cron : Actual change rates updated');
      })
      .then(console.log('Cron : Updating change rates...'));
  } catch (e) {
    console.error(e);
  }
}

async function updateCost() {
  const countries = await Country.find();
  const delayIncrement = 200;
  let request = new Array();
  let delay = 0;
  countries.forEach((country) => {
    const p = new Promise((resolve) => setTimeout(resolve, delay)).then(() =>
      axios.get('https://www.budgetyourtrip.com/api/v3/costs/countryinfo/' + country.id)
    );
    request.push(p);
    delay += delayIncrement;
  });
  Promise.all(request)
    .then((results) => {
      results.forEach(async (res) => {
        if (res.data.data) {
          const result = [...res.data.data.costs].pop();
          if (result) {
            const country = countries.find((element) => element.id == result.country_code);
            if (country.currency.id !== res.data.data.info.currency_code) {
              console.log(country.name + ' -> ' + res.data.data.info.currency_code);
            }
            let cost = new Object();
            if (country.currency.euroRate) {
              if (result.value_budget) cost.low = result.value_budget / country.currency.euroRate;
              if (result.value_midrange) cost.med = result.value_midrange / country.currency.euroRate;
              if (result.value_luxury) cost.high = result.value_luxury / country.currency.euroRate;
            }
            await Country.updateOne({ id: country.id }, { cost: cost }).catch((error) => {
              console.error(error);
            });
          }
        }
      });
      console.log('Cron : Daily cost updated !');
    })
    .catch((error) => {
      console.error(error);
    })
    .then(console.log('Cron : Updating daily cost...'));
}

const jobs = () => {
  const job1 = new CronJob('00 00 00 * * *', updateRate());
  const job2 = new CronJob('00 01 00 * * *', updateCost());

  job1.start();
  job2.start();
};

module.exports = jobs;
