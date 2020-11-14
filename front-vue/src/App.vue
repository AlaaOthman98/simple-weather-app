<template>
  <div
    class="flex flex-col items-center h-full page-wrapper"
    :style="{
      background: 'linear-gradient(to bottom, #632ea0, #8a42ac, #bc5ebe)'
    }"
  >
    <h1 class="text-white text-4xl text-center mt-8 mb-2">
      Get The Weather Information With One Click!
    </h1>

    <div class="bg-white my-8 horizontal-line"></div>

    <button
      v-if="!weatherDataLoaded"
      @click="getCurrentWeather()"
      class=" py-4 px-8 m-4 rounded-md text-xl cursor-pointer text-pink-900 font-bold bg-white border-pink-800 custom-outline-none shadow-none hover:shadow-lg"
    >
      Get Weather Info
    </button>

    <div v-else class="text-center my-4">
      <div class=" border-4 border-white text-white p-4 rounded-lg">
        <div class="p-2">
          <span class="text-xl">Location: </span>
          <span
            class="inline-block p-1 font-bold bg-white rounded text-pink-900"
          >
            {{ location }}
          </span>
        </div>

        <div class="p-2">
          <span class="text-xl">Temperature: </span>
          <span
            class="inline-block p-1 font-bold bg-white rounded text-pink-900"
          >
            {{ temperature }}
          </span>
        </div>

        <div class="p-2">
          <span class="text-xl">Feels Like: </span>
          <span
            class="inline-block p-1 font-bold bg-white rounded text-pink-900"
          >
            {{ feelsLike }}
          </span>
        </div>

        <div class="p-2">
          <span
            class="inline-block p-1 font-bold bg-white rounded text-pink-900 capitalize"
          >
            {{ weatherDescription }}
          </span>
        </div>
      </div>

      <button
        class=" py-4 px-8 m-4 rounded-md text-xl cursor-pointer text-pink-900 font-bold bg-white border-pink-800 custom-outline-none shadow-none hover:shadow-lg"
        @click="saveWeatherData"
      >
        Save Info!
      </button>
    </div>
  </div>
</template>

<script>
import WeatherService from "@/service/WeatherService.js";
import SaveDataService from "@/service/SaveDataService.js";

export default {
  data() {
    return {
      weatherDataLoaded: false,
      weatherData: {}
    };
  },
  methods: {
    getCurrentWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          WeatherService.getCurrentWeather(
            position.coords.latitude,
            position.coords.longitude
          )
            .then(res => {
              this.weatherData = res.data;
              this.weatherDataLoaded = true;
            })
            .catch(err => {
              console.log(err);
            });
        });
      } else {
        console.log("navigator not supported");
      }
    },
    async saveWeatherData() {
      const res = await SaveDataService.saveWeatherData({
        location: this.location,
        temperature: this.temperature,
        feelsLike: this.feelsLike,
        weatherDescription: this.weatherDescription
      });

      if (res.status === 201) {
        alert("Wow! Data Saved Successfullty");
      }
    }
  },
  computed: {
    location() {
      return this.weatherData.name + ", " + this.weatherData.sys.country;
    },
    temperature() {
      return this.weatherData.main.temp + "°";
    },
    feelsLike() {
      return this.weatherData.main.feels_like + "°";
    },
    weatherDescription() {
      return this.weatherData.weather[0].description;
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.page-wrapper {
  font-family: "Lato", sans-serif;

  .horizontal-line {
    min-width: 50px;
    min-height: 3px;
  }
  .custom-outline-none {
    outline: none;
  }
}
</style>
