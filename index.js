import express from "express";
import cors from "cors";

import destinationsRouter from "./Routes/destinations.js";
const server = express(); // This server is deaf

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); // Told the server to listen on port 3000

//Middleware Setup
server.use(cors());
server.use(express.json());

server.use("/destinations", destinationsRouter);
