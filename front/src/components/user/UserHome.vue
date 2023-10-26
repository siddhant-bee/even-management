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
        <li><a class="dropdown-item" @click="comingsoon()">UPCOMING</a></li>
      </ul>
    </div>

    <div class="carrd">
      <div
        
        
        v-for="event in events"
        :key="event._id"
      >
        <div
          class="card position-relative mx-4"
          style="width: 18rem"
          
          v-show="
            event.noOfAvailableSlots > 0 &&
            new Date(event.tillDate) > new Date()
          "
        >
          <img :src="event.image" class="card-img-top" alt="Loding Image" />
          <div class="card-body">
            <img
              v-if="fill(event.startfromticket) === 'live'"
              src="../../assets/instagram-live.png"
              class="set-image"
            />
            <img
              v-if="fill(event.startfromticket) === 'upcoming'"
              src="../../assets/upcoming.png"
              class="set-image-up"
            />

            <h5 class="card-title">{{ event.title }}</h5>

            <p class="card-text">{{ event.description }}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Price : {{ event.price }}rs</li>
            <li class="list-group-item">
              Date : {{ event.fromDate }} Time : {{ event.starttime }}
            </li>
            <li class="list-group-item">
              Total Seat: {{ event.totalNoOfSlots }}
              
            </li>
            <li class="list-group-item">
               Available Seat :{{
                event.noOfAvailableSlots
              }}
            </li>
          </ul>
          <div class="card-body">
            <a
              href="#"
              class="btn btn-outline-primary"
              @click="bookticket(event)"
              style="margin-left: 60px"
              v-if="fill(event.startfromticket) === 'live'"
              >Book Ticket</a
            >

            <a
              href="#"
              class="btn btn-outline-primary"
              @click="toaster()"
              style="margin-left: 60px"
              v-if="fill(event.startfromticket) === 'upcoming'"
              >cooming soon</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import MyNavbar from "./UserNavbar.vue";
import { onMounted, ref } from "vue";
import axios from "axios";
import router from "@/router";

const events = ref([]);
const mainevent = ref([]);
onMounted(() => {
  getEvents();
});

const toaster = () => {
  toast("cooming sooon !", {
    autoClose: 1500,
  });
};

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

const fill = (event) => {
  const now = new Date();
  const eventDate = new Date(event);
  if (now < eventDate) {
    return "upcoming";
  } else {
    return "live";
  }
};

const getEvents = async () => {
  try {
    const res = await axios.get("http://localhost:5001/eventsuser");
    console.log(res.data);
    for (let event of res.data) {
      console.log(event);

      const remark = fill(event.startfromticket);
      event.remark = remark;
      mainevent.value.push(event);
      events.value.push(event);
    }
  } catch (error) {
    console.log(error);
  }
};
const bookticket = async (event) => {
  const now = new Date();
  const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    // Format the time as a string (e.g., "14:30:45")
    const timeString = `${hours}:${minutes}:${seconds}.${milliseconds}`;
  console.log(timeString);
  console.log(event._id);
  router.push({ name: "ubook", params: { id: event._id } });
  // router.push({ name: "payment", params: { id: event._id } });
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
