const forList = {
  dates: {
    start: '2020-06-18',
    end: '2020-06-25',
  },
  passenger: 2,
  destinations: [
    {
      name: 'Australie',
      weather: { note: 4, description: 'Favorable', min: 20, max: 25 },
      image: {
        width: 2560,
        url: 'https://media-cdn.tripadvisor.com/media/photo-o/17/15/69/16/australia.jpg',
        height: 500,
      },
      averagePrice: 2000,
      averageTime: '22h',
    },
    {
      name: 'Bahamas',
      weather: { note: 5, description: 'Trés Favorable', min: 25, max: 30 },
      image: {
        width: 2975,
        url: 'https://media-cdn.tripadvisor.com/media/photo-o/17/15/69/16/australia.jpg',
        height: 580,
      },
      averagePrice: 2100,
      averageTime: '20h',
    },
  ],
};

const forTrip = {
  name: 'Bahamas',
  weather: { note: 5, description: 'Trés Favorable', min: 25, max: 30 },
  dates: {
    start: '2020-06-18',
    end: '2020-06-25',
  },
  passenger: 2,
  flight: {
    quantity: 4,
    averagePrice: 1300,
    averageDuration: '20h',
  },
  hotel: {
    quantity: 4,
    averagePrice: 1300,
  },
  restaurants: {
    quantity: 10,
  },
  currency: {
    id: 'BSD',
    name: 'Dollar des Bahamas',
    symbol: 'B$',
    euroRate: 1.126778,
  },
};

module.exports = { forList, forTrip };
