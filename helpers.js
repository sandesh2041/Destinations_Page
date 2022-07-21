export function filterDestinations({ city, destinationsDB, res }) {
  if (city !== undefined) {
    const filteredDests = filterObj({ destinationsDB, city });
    return res.send(filteredDests);
  }
  return res.send(destinationsDB);
}

function filterObj({ destinationsDB, city }) {
  const newDestinationsDB = {};

  for (const key in destinationsDB) {
    if (destinationsDB[key].location.toLowerCase() === city.toLowerCase()) {
      newDestinationsDB[key] = destinationsDB[key];
    }
  }
  return newDestinationsDB;
}
