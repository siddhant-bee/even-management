<template>
  <div>
    <MyNavbar />

    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle btn-sm rounded-3"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        filter
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><a class="dropdown-item" @click="getall()">ALL</a></li>
        <li><a class="dropdown-item" @click="getlive()">LIVE</a></li>
        <li><a class="dropdown-item" @click="comingsoon">UPCOMING</a></li>
      </ul>
    </div>

    <div class="carrd">
      <div
        class="container"
        style="width: 33%"
        v-for="event in events"
        :key="event._id"
      >
        <div class="card position-relative" style="width: 18rem">
          <img :src="event.image" class="card-img-top" alt="Loding Image" />
          <div class="card-body">
            <img v-if="fill(event.startfromticket) === 'live'" src="../../assets/instagram-live.png" class="set-image">
            <img v-if="fill(event.startfromticket) === 'upcoming'" src="../../assets/upcoming.png" class="set-image-up">

            <!-- <p v-if="fill(event.startfromticket) === 'upcoming'">Upcoming</p> -->
            <h5 class="card-title">{{ event.title }}</h5>
            <p class="card-text">{{ event.description }}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Price : {{ event.price }}rs</li>
            <li class="list-group-item">
              Date : {{ event.fromDate }} Time : {{ event.starttime }}
            </li>
            <li class="list-group-item">
              Total Seat: {{ event.totalNoOfSlots }} Available Seat :{{
                event.noOfAvailableSlots
              }}
            </li>
          </ul>
          <div class="card-body">
            <a @click="editEvent(event)" class="card-link">Edit Event</a>
            <a href="#" class="card-link" @click="fill(event.startfromticket)"
              >Book Ticket</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MyNavbar from "./MyNavbar.vue";
import {  onMounted, ref } from "vue";
import axios from "axios";
import { useUserInfoStore } from "../../store/userInfo";
import router from "@/router";
const userstore = useUserInfoStore();

const events = ref([]);
const mainevent = ref([]);
onMounted(() => {
  getEvents();
});
// onBeforeMount(() => {
//   compare();
// });

const getall = () => {
  events.value = mainevent.value.filter((event) =>
    event.remark.toLowerCase().includes("")
  );
};
const getlive = () => {
  events.value = mainevent.value.filter((event) =>
    event.remark.toLowerCase().includes("live")
  );
};

const comingsoon = () => {
  events.value = mainevent.value.filter((event) =>
    event.remark.toLowerCase().includes("upcoming")
  );
};
// const now = computed(() => Date.now())
const fill = (event) => {
  const now = new Date();
  const eventDate = new Date(event);
  if (now < eventDate) {
    return "upcoming";
  } else {
    return "live";
  }
  // router.push({ name: "bookticket", params: { id: event } });
};

// const compare = () => {
//   console.log("im called")
//   axios.get("http://localhost:5001/compare");

// };

// const compareDates = (current, start) => {
//   if(current >= start){
//     return 'live'
//   }
//   else{
//     return 'upcoming'
//   }
// if(parseInt(current.getFullYear) >= parseInt(start.getFullYear)) {

// }
// else{
//   return 'live'
// }
// if (parseInt(current.getFullYear) === parseInt(start.getFullYear)) {
//   if (parseInt(current.getMonth) === parseInt(start.getMonth)) {
//     if (parseInt(current.getDate) === parseInt(start.getDate)) {
//       return "live";
//     } else if (parseInt(current.getDate) > parseInt(start.getDate)) {
//       return "past";
//     } else {
//       return "upcoming";
//     }
//   } else if (parseInt(current.getMonth) > parseInt(start.getMonth)) {
//     return "past";
//   } else {
//     return "upcoming";
//   }
// } else if (parseInt(current.getFullYear) > parseInt(start.getFullYear)) {
//   return "past";
// } else {
//   return "upcoming";
// }
// };

const getEvents = async () => {
  try {
    const token = userstore.token
    axios.defaults.headers.common['Authorization'] = token;
    const res = await axios.get("http://localhost:5001/events");
    console.log(res.data);
    for (let event of res.data) {
      console.log(event);

      const remark = fill(event.startfromticket);
      event.remark = remark;
      mainevent.value.push(event);
      events.value.push(event)
      // const currentDate = new Date();
      // const eventDate = new Date(event.startfromticket);

      // event.remark = compareDates(currentDate, eventDate);
      // console.log(event);
      // // if(currentDate == eventDate){

      // }
    }
    // mainevent.value = res.data;
    // events.value = res.data;
  } catch (error) {
    console.log(error);
  }
};

const editEvent = async (event) => {
  // console.log(event);
  console.log(event._id);
  // const res = await axios.get(`http://localhost:5001/editevent/${event._id}`);
  // console.log(res.data);
  router.push({ name: "editevent", params: { id: event._id } });
};
</script>

<style scoped>
.carrd {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-left: 50px;
  padding-right: 50px;
  cursor: pointer;
  margin-left: 200px;

  margin-bottom: 50px;
  /* margin-top: 50px; */
}
.card-img-top {
  width: 286px;
  height: 250px;
}

.card {
  margin-top: 50px;
  transition: box-shadow 0.3s ease; /* Add a smooth transition effect */
}

.card:hover {
  box-shadow: 0 0 10px rgba(10, 10, 0, 0.5); /* Add a shadow on hover */
}
.dropdown {
  margin-top: 50px;
  margin-left: 1200px;
}

.set-image {
  position: absolute;
  top: 0;
  width: 20%;
}

.set-image-up {
  position: absolute;
  top: 0.25rem;
  left: 2px;
  width: 35%;
}
</style>
