<template>
  <MyNavbar />
  {{ datafrombackend.id }}
  <div class="container">
    <div class="row">
      <div class="col-8 mx-auto">
        <form @submit.prevent>
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
            <label for="time" class="col-sm-2 col-form-label">Starting Time</label>
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
            <label for="time" class="col-sm-2 col-form-label">Ending Time</label>
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
            <label for="date" class="col-sm-2 col-form-label">Tickets start from</label>
            <div class="col-sm-10">
              <input
                type="date"
                class="form-control"
                id="date"
                v-model="startfromticket"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="date" class="col-sm-2 col-form-label">Tickets Available Till</label>
            <div class="col-sm-10">
              <input
                type="date"
                class="form-control"
                id="date"
                v-model="tillDate"
              />
            </div>
          </div>
         
          <div class="row mb-3">
            <label for="location" class="col-sm-2 col-form-label"
              >Location</label
            >
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="location"
                v-model="location"
              />
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
                v-model="locationLink"
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
            <label for="backgroundImage" class="col-sm-2 col-form-label">Background Image</label>
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
            @click="submit"
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

<script setup>
import MyNavbar from "./MyNavbar.vue";
// import MyNavbar from "./MyNavbar.vue";
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter()
// const id = route.params.id;
const title = ref("");
const description = ref("");
const fromDate = ref("");
const startfromticket = ref("");
const toDate = ref("");
const tillDate = ref("");
const starttime = ref("");
const endtime = ref("");
const location = ref("");
const locationLink = ref("");
const image = ref("");
const backgroundImage = ref("");
const price = ref("");
const totalNoOfSlots = ref("");
const noOfAvailableSlots = ref("");
const datafrombackend = ref("");
const pta = ref("");

onMounted(() => {
  callkr();
});

const callkr = async () => {
  const id = route.params.id;
  console.log(id);
  console.log("hello");
  const newres = await axios.get(`http://localhost:5001/editevent/${id}`);
  datafrombackend.value = newres.data;
  console.log(datafrombackend.value);
  pta.value = datafrombackend.value._id;
  title.value = datafrombackend.value.title;
  description.value = datafrombackend.value.description;
  fromDate.value = datafrombackend.value.date;
  toDate.value = datafrombackend.value.tillDate;
  startfromticket.value = datafrombackend.value.startfromticket;
  tillDate.value = datafrombackend.value.tillDate;
  starttime.value = datafrombackend.value.starttime;
  endtime.value = datafrombackend.value.endtime;
  location.value = datafrombackend.value.location;
  locationLink.value = datafrombackend.value.locationLink;
  image.value = datafrombackend.value.image;
  backgroundImage.value = datafrombackend.value.backgroundImage;
  price.value = datafrombackend.value.price;
  totalNoOfSlots.value = datafrombackend.value.totalNoOfSlots;
  noOfAvailableSlots.value = datafrombackend.value.noOfAvailableSlots;
};

const submit = async () => {
  try {
    // console.log(data)
    const res = await axios.put("http://localhost:5001/editEvent", {
      title: title.value,
      description: description.value,
      fromDate: fromDate.value,
      toDate: toDate.value,
      tillDate: tillDate.value,
      endtime: endtime.value,
      starttime: starttime.value,
      location: location.value,
      locationLink: locationLink.value,
      startfromticket  : startfromticket.value,
      image: image.value,
      backgroundImage: backgroundImage.value,
      price: price.value,
      totalNoOfSlots: totalNoOfSlots.value,
      noOfAvailableSlots: noOfAvailableSlots.value,
      _id: pta.value,
    });
    console.log(res.data);
    console.log(res.status);
    // const route = useRoute()
    router.push({ name: "home" });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
.container {
  margin-top: 50px;
}
</style>
