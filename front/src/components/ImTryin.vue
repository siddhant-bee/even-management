<template>
  <div class="d-flex justify-content-center">
      <h1>your cordinates are  :</h1>
      <h1>{{cordinates.lat}} LAtitude and {{cordinates.lng}} Longitude</h1>
      <GmapMap
        :center="{lat: cordinates.lat, lng: cordinates.lng}"
        :zoom="10"
        map-type-id="terrain"
        style="width: 500px; height: 300px"
      >
      </GmapMap>


  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
// import { VueGeolocation } from 'vue-browser-geolocation';
const cordinates = ref ({
    lat: 0,
    lng: 0
})

onMounted(() => {
  navigator.geolocation.getCurrentPosition((position) => {
   try {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);

    cordinates.value.lat = position.coords.latitude;
    cordinates.value.lng = position.coords.longitude;
   } catch (error) {
    console
   }
  });
});

</script>

<style  scoped>

</style>