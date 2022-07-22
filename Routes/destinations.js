import express from "express";
import uniqid from "uniqid";

import destinationsDB from "../db.js"
import { body, validationResult } from "express-validator";
import { filterDestinations, getUnsplashPhoto } from "../helpers.js";

const router = express.Router();

router.post(
    "/",
    //Middlware
    body("location").exists({ checkFalsy: true }),
    body("destination")
      .exists({ checkFalsy: true })
      .withMessage("Invalid Destination"),
    body("description").optional(),
    //Callback function
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send(errors);
      }
      res.sendStatus(202);
  
      const { location, destination, description } = req.body;
      const imageURL = await getUnsplashPhoto({ location, destination });
      //const randNum = Math.floor(Math.random() * 1000000);
      const id = uniqid();
  
      const newDestination = {
        location,
        destination,
        photo: imageURL,
        description,
      };
      destinationsDB[id] = newDestination;
    }
  );
  
  // GET /destinations => send back the whole db
  router.get("/", (req, res) => {
    const city = req.query.city;
    filterDestinations({ city, destinationsDB, res });
  });
  
  //GET /destinations/city/:myCity
  router.get("/city/:myCity", (req, res) => {
    const city = req.params.myCity;
    filterDestinations({ city, destinationsDB, res });
  });
  
  // UPDATE (OPTIONAL)
  router.put(
    "/:id",
    /* Add Milddleware */ (req, res) => {
      const id = req.params.id;
      const { location, destination, description } = req.body;
  
      let hasLocorDestChanged = false;
  
      if (location) {
        hasLocorDestChanged = true;
        destinationsDB[id].location = location;
      }
      if (destination) {
        hasLocorDestChanged = true;
        destinationsDB[id].destination = destination;
      }
      if(hasLocorDestChanged){
        const {location, destination} = destinationsDB[id];
        const imageURL = await getUnsplashPhoto({ location, destination });
        destinationDB[id].photo = imageURL;
      }
      if (description) {
        destinationsDB[id].description = description;
      }
      res.sendStatus(202);
    }
  );
  // DELETE (OPTIONAL)
  router.delete("/:id", (req, res) => {
      const id = req.params.id;
      delete destinationsDB[id];
  
      res.send({message: success});
  })

  export default router;