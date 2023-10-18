<template>
  <div>
    <div ref="map" class="map"></div>
    <div>
      <button @click="getMarkerCoordinates">Get Marker Coordinates</button>
      <p v-if="markerCoordinates">Latitude: {{ markerCoordinates.lat }}, Longitude: {{ markerCoordinates.lng }}</p>
    </div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
export default {
  data() {
    return {
      map: null,
      marker: null,
      markerCoordinates: null,
    };
  },
  methods: {
    initMap() {
      mapboxgl.accessToken = 'pk.eyJ1Ijoic2lkZGhhbnRqaGEiLCJhIjoiY2xsb3R6MXAxMDEyczNmcWtxc213aDl1OCJ9.BvWsXmNOeaT_nC4Qzi3Mvg';

      this.map = new mapboxgl.Map({
        container: this.$refs.map,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [72,23], // Initial center coordinates
        zoom: 1, // Initial zoom level
      });

      this.marker = new mapboxgl.Marker({ draggable: true })
        .setLngLat([72, 23]) // Initial marker coordinates
        .addTo(this.map);

      // Listen for the "dragend" event on the marker
      this.marker.on('dragend', (e) => {
        this.markerCoordinates = e.target.getLngLat();
      });
    },
    //not imported yet
    getMarkerCoordinates() {
      if (this.markerCoordinates) {
        console.log('Marker Coordinates:', this.markerCoordinates);
      } else {
        console.log('Marker has not been moved yet.');
      }
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style scoped>
.map {
  height: 700px;
  width: 100%;
}
</style>
