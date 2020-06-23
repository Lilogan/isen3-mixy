const earthRadius = 6367445;

function degreesToRadians(degrees) {
  const pi = Math.PI;
  return degrees * (pi / 180);
}

function getDistanceByCoords(coords1, coords2) {
  const latA = degreesToRadians(coords1.latitude);
  const latB = degreesToRadians(coords2.latitude);
  const lonA = degreesToRadians(coords1.longitude);
  const lonB = degreesToRadians(coords2.longitude);
  return (
    earthRadius * Math.acos(Math.sin(latA) * Math.sin(latB) + Math.cos(latA) * Math.cos(latB) * Math.cos(lonA - lonB))
  );
}

function arrayAverage(array) {
  const a = array.length;
  let b = 0;
  for (let i = 0; i < a; i++) {
    b += Number(array[i]);
  }
  return b / a;
}

function priceAverage(array) {
  const a = array.length;
  let b = 0;
  for (let i = 0; i < a; i++) {
    b += Number(array[i].price);
  }
  return b / a;
}

module.exports = { getDistanceByCoords, arrayAverage, priceAverage };
