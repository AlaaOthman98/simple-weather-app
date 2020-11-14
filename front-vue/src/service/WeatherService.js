import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getCurrentWeather(lat, lon) {
    return apiClient.get(
      `/weather?lat=${lat}&lon=${lon}&lang=en&units=metric&appid=f033c003f57edcc8972a00b596c865a8`
    );
  }
};
