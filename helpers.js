export async function getUnsplashPhoto({ location, destination }) {
  const URL = `https://api.unsplash.com/search/photos?client_id=zPyO6m0ezgkOS-Tc0Co64-y6MqTXCULFL-TcXfxBrLc&query=${destination} ${location}`;

  const response = await fetch(URL);
  const data = await response.json();

  const allPhotos = data.results;
  const randIdx = Math.floor(Math.random() * allPhotos.length);
  const randPhoto = allPhotos[randIdx];

  if (randPhoto === undefined) {
    return "https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?cs=srgb&dl=pexels-asad-photo-maldives-3155666.jpg&fm=jpg";
  }

  return randPhoto.urls.thumb;
}

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
