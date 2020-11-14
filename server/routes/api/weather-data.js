const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// Get Saved Data
router.get("/", async (req, res) => {
  const weatherData = await getWeatherData();
  res.send(await weatherData.find({}).toArray());
});

// Post Weather Data
router.post("/", async (req, res) => {
  const weatherData = await getWeatherData();
  await weatherData.insertOne({
    location: req.body.location,
    temperature: req.body.temperature,
    feelsLike: req.body.feelsLike,
    weatherDescription: req.body.weatherDescription,
    createdAt: new Date(),
  });
  res.status(201).send();
});

// Delete Weather Data
router.delete("/:id", async (req, res) => {
  const weatherData = await getWeatherData();
  await weatherData.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

// Connect to db and restore collection
async function getWeatherData() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://alaa_othman98:4707@weathercluster.r9tfs.mongodb.net/weather-data?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  );
  return client.db("weather-data").collection("weather-data");
}

module.exports = router;
