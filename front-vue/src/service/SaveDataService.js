import axios from "axios";

const url = "http://localhost:5000/api/data/";

export default {
  saveWeatherData(weatherObj) {
    return axios.post(url, {
      location: weatherObj.location,
      temperature: weatherObj.temperature,
      feelsLike: weatherObj.feelsLike,
      weatherDescription: weatherObj.weatherDescription
    });
  }
};
