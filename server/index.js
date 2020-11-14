const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware Dependencies
app.use(bodyParser.json());
app.use(cors());

const weatherData = require("./routes/api/weather-data");

app.use("/api/data", weatherData);

const port = process.env.PORT || 5000; // for heroku deployment

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
