require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const veggiesModel = require("./veggies/veggies-model.js");

const server = express();
const port = process.env.PORT || 4000;

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get("/", (req, res, next) => {
  res.json({
    message: "Weclome to Veggies API!"
  });
});

server.get("/veggies", async (req, res, next) => {
  try {
    const veggies = await veggiesModel.get();
    res.status(200).json(veggies);
  } catch (err) {
    next(err);
  }
});

server.get("/veggies/:id", async (req, res, next) => {
  try {
    const veggie = await veggiesModel.getById(req.params.id);
    res.status(200).json(veggie);
  } catch (err) {
    next(err);
  }
});

server.post("/veggies", async (req, res, next) => {
  try {
    const veggie = await veggiesModel.create(req.body);
    res.status(201).json(veggie);
  } catch (err) {
    next(err);
  }
});

server.put("/veggies/:id", async (req, res, next) => {
  try {
    const veggie = await veggiesModel.update(req.params.id, req.body);
    res.status(200).json(veggie);
  } catch (err) {
    next(err);
  }
});

server.delete("/veggies/:id", async (req, res, next) => {
  try {
    await veggiesModel.del(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

server.use((req, res) => {
  res.status(404).json({
    message: "Route was not found"
  });
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "An internal error occurred, please try again later"
  });
});

if (!module.parent) {
  server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
}

module.exports = server;
