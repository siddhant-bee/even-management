<template>
  <MyNavbar />
  <div class="container">
    <div class="row">
      <div class="col-8 mx-auto">
        <form @submit.prevent="submit">
          <div class="row mb-3">
            <label for="title" class="col-sm-2 col-form-label">Title</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="title"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="description" class="col-sm-2 col-form-label"
              >Description</label
            >
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="description"
                v-model="description"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="date" class="col-sm-2 col-form-label">From Date</label>
            <div class="col-sm-10">
              <input
                type="date"
                class="form-control"
                id="date"
                v-model="fromDate"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="time" class="col-sm-2 col-form-label">
              Starting Time</label
            >
            <div class="col-sm-10">
              <input
                type="time"
                class="form-control"
                id="time"
                v-model="starttime"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="date" class="col-sm-2 col-form-label">TO Date</label>
            <div class="col-sm-10">
              <input
                type="date"
                class="form-control"
                id="date"
                v-model="toDate"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="time" class="col-sm-2 col-form-label"
              >Ending Time</label
            >
            <div class="col-sm-10">
              <input
                type="time"
                class="form-control"
                id="time"
                v-model="endtime"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="date" class="col-sm-2 col-form-label"
              >ticket available Date</label
            >
            <div class="col-sm-10">
              <input
                type="date"
                class="form-control"
                id="date"
                v-model="availablefromDate"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="date" class="col-sm-2 col-form-label"
              >Tickets Available Till</label
            >
            <div class="col-sm-10">
              <input
                type="date"
                class="form-control"
                id="date"
                v-model="tillDate"
              />
            </div>
          </div>

          <div class="row mb-3" @click="dofocus" >
            <label for="location" class="col-sm-2 col-form-label"
              >Location</label
            >
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="location"
                autocomplete="off"
                
                v-model="location"
              />
            </div>
          </div>

          <div  v-show="open">
            <div ref="map" class="map"></div>
            <div>
              <button type="button" @click="collect">Submit</button>
              <!-- <p v-if="markerCoordinates">
                Latitude: {{ markerCoordinates.lat }}, Longitude:
                {{ markerCoordinates.lng }}
              </p> -->
            </div>
          </div>

          <div class="row mb-3">
            <label for="location" class="col-sm-2 col-form-label"
              >Location-Name</label
            >
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="location"
                v-model="locationlink"
              />
            </div>
          </div> 
          <div class="row mb-3">
            <label for="image" class="col-sm-2 col-form-label">Image</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="image"
                v-model="image"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="backgroundImage" class="col-sm-2 col-form-label"
              >Background Image</label
            >
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="image"
                v-model="backgroundImage"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="price" class="col-sm-2 col-form-label">Price</label>
            <div class="col-sm-10">
              <input
                type="number"
                class="form-control"
                id="price"
                v-model="price"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="totalNoOfSlots" class="col-sm-2 col-form-label"
              >Total no of Slots</label
            >
            <div class="col-sm-10">
              <input
                type="number"
                class="form-control"
                id="totalNoOfSlots"
                v-model="totalNoOfSlots"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="noOfAvailableSlots" class="col-sm-2 col-form-label"
              >Available slots</label
            >
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="noOfAvailableSlots"
                v-model="noOfAvailableSlots"
              />
            </div>
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            style="margin-left: 450px"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import MyNavbar from "./MyNavbar.vue";
// import MyNavbar from "./MyNavbar.vue";
import axios from "axios";
export default {
  data() {
    return {
      title: "",
      description: "",
      fromDate: "",
      toDate: "",
      tillDate: "",
      availablefromDate: "",
      endtime: "",
      starttime: "",
      location: "",
      locationlink:'',
      image: "",
      backgroundImage: "",
      price: "",
      totalNoOfSlots: "",
      noOfAvailableSlots: "",
      lat: "",
      lng: "",
     open:false,
      map: null,
      marker: null,
      markerCoordinates: null,
    };
  },
  methods: {
    initMap() {
      mapboxgl.accessToken =
        "pk.eyJ1Ijoic2lkZGhhbnRqaGEiLCJhIjoiY2xsb3R6MXAxMDEyczNmcWtxc213aDl1OCJ9.BvWsXmNOeaT_nC4Qzi3Mvg";

      this.map = new mapboxgl.Map({
        container: this.$refs.map,
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        center: [72, 23], // Initial center coordinates
        zoom: 1, // Initial zoom level
      });

      this.marker = new mapboxgl.Marker({ draggable: true })
        .setLngLat([72, 23]) // Initial marker coordinates
        .addTo(this.map);

      // Listen for the "dragend" event on the marker
      this.marker.on("dragend", (e) => {
        this.markerCoordinates = e.target.getLngLat();
      });
    },

    collect() {
      this.location =
        this.markerCoordinates.lat + "," + this.markerCoordinates.lng;
      console.log(typeof this.location);
      this.open = false;
    },

    dofocus() {
      this.open = true;
      console.log(this.open);
    },
    submit() {
      console.log("Hello jiii")
      console.log(
        this.title,
        this.description,
        this.fromDate,
        this.toDate,
        this.tillDate,
        this.availablefromDate,
        this.endtime,
        this.starttime,
        this.location,
        this.locationlink,
        this.image,
        this.backgroundImage,
        this.price,
        this.totalNoOfSlots,
        this.noOfAvailableSlots
      );
      axios
        .post("http://localhost:5001/addEvent", {
          title: this.title,
          description: this.description,
          fromDate: this.fromDate,
          toDate: this.toDate,
          tillDate: this.tillDate,
          availablefromDate: this.availablefromDate,
          endtime: this.endtime,
          starttime: this.starttime,
          location: this.location,
          locationlink: this.locationlink,
          image: this.image,
          backgroundImage: this.backgroundImage,
          price: this.price,
          totalNoOfSlots: this.totalNoOfSlots,
          noOfAvailableSlots: this.noOfAvailableSlots,
        })
        .then((res) => {
          console.log(res);
          this.$router.push("/home");
        });
    },
  },
  mounted() {
    this.initMap();
  },
  components: { MyNavbar },
};
</script>

<style scoped>
.container {
  margin-top: 50px;
}
.map {
  height: 300px;
  width: 100%;
}
</style>
