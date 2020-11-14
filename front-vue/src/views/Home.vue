<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button @click="getWeather()">click me</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import WeatherService from "@/service/WeatherService.js";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  methods: {
    getWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          WeatherService.getCurrentWeather(
            position.coords.latitude,
            position.coords.longitude
          )
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        });
      } else {
        console.log("navigator not supported");
      }
    }
  }
};
</script>
