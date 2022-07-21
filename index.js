import express from "express";
import cors from "cors";
import { filterDestinations } from "./helpers.js";

const server = express(); // This server is deaf

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); // Told the server to listen on port 3000

server.use(cors());

const destinationsDB = {
  123456: {
    destination: "Eiffel Tower",
    location: "Paris",
    photo:
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  345678: {
    destination: "Champs ",
    location: "Paris",
    photo:
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  234567: {
    destination: "Big Ben",
    location: "London",
    photo:
      "https://i.guim.co.uk/img/media/9891b6b94fb8b8e06971bb4d307224e6a97f2a7b/333_0_5667_3401/master/5667.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=90c306279bc4f0a6aedb9f0b78763f2d",
  },
};

// CREATE (OPTIONAL)

// READ => DO THIS
// GET /destinations => send back the whole db
server.get("/destinations", (req, res) => {
  const city = req.query.city;
  filterDestinations({ city, destinationsDB, res });
});

//GET /destinations/city/:myCity
server.get("/destinations/city/:myCity", (req, res) => {
  const city = req.params.myCity;
  filterDestinations({ city, destinationsDB, res });
});
// UPDATE (OPTIONAL)

// DELETE (OPTIONAL)
