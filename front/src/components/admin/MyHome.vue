<template>
  <div>

    <MyNavbar />

    {{ hour }}: {{ min }}
<div class="carrd">
  <div class="container"  style="width: 33%" v-for="event in events" :key="event._id">
  <div class="card" style="width: 18rem;">
  <img :src="event.image" class="card-img-top" alt="Loding Image">
  <div class="card-body">
    <h5 class="card-title">{{ event.title }}</h5>
    <p class="card-text">{{ event.description }}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Price : {{ event.price }}rs</li>
    <li class="list-group-item">Date : {{ event.startDate }} Time : {{ event.starttime }}</li>
    <li class="list-group-item">Total Seat: {{ event.totalNoOfSlots }} Available Seat :{{ event.noOfAvailableSlots }}</li>
  </ul>
  <div class="card-body">
    <a @click="editEvent(event)" class="card-link">Edit Event</a>
    <a href="#" class="card-link">Book Ticket</a>
  </div>
</div>
</div>
</div>
  </div>


  

</template>

<script setup>
import MyNavbar from "./MyNavbar.vue";
import { onMounted,ref } from "vue";
import axios  from "axios";
import router from "@/router";
// import { useRouter } from "vue-router";
// const router = useRouter();
let now = new Date();
let hour = now.getHours();
let min = now.getMinutes();
const events = ref([])
onMounted(() => {
  getEvents()
})


const getEvents = async () => {
  try {
    const res = await axios.get("http://localhost:5001/events");
    console.log(res.data);
    events.value = res.data;
  } catch (error) {
    console.log(error);
  }
};


const editEvent = async (event) => {
  // console.log(event);
  console.log(event._id);
// const res = await axios.get(`http://localhost:5001/editevent/${event._id}`);
// console.log(res.data);
router.push({name:"editevent", params: {id:event._id}});
}
</script>

<style scoped>
.carrd {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-left: 50px;
  padding-right: 50px;
  cursor: pointer;
  margin-left: 200PX;

margin-bottom: 50px;
  /* margin-top: 50px; */

}
.card-img-top {
  width: 286px;
  height: 250px;
}




.card{
margin-top: 50px;
  transition: box-shadow 0.3s ease; /* Add a smooth transition effect */
}




.card:hover {
  box-shadow: 0 0 10px rgba(10, 10, 0, 0.5); /* Add a shadow on hover */
}

</style>
