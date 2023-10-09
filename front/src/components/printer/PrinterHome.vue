<template>
  <navbar />
  <div>
    <div class="carrd">
      <div
        class="container"
        style="width: 33%"
        v-for="event in events"
        :key="event._id"
      >
        <div class="card" style="width: 18rem">
          <img :src="event.image" class="card-img-top" alt="Loding Image" />
          <div class="card-body">
            <h5 class="card-title">{{ event.title }}</h5>
            <p class="card-text">{{ event.description }}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Price : {{ event.price }}rs</li>
            <li class="list-group-item">
              Date : {{ event.date }} Time : {{ event.time }}
            </li>
            <li class="list-group-item">
              Total Seat: {{ event.totalNoOfSlots }} Available Seat :{{
                event.noOfAvailableSlots
              }}
            </li>
          </ul>
          <div class="card-body d-flex justify-content-center">
            <!-- <a @click="editEvent(event)" class="card-link">Edit Event</a> -->
            <a href="#" class="btn btn-outline-primary" @click="bookticket(event)">Book Ticket</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
// import { useRoute } from "vue-router"
const router = useRouter();
import { ref, onMounted } from "vue";
import navbar from "../printer/PrinterNavbar.vue";

const events = ref([]);

onMounted(() => {
  getevent();
});

const bookticket = async (event) => {
  console.log(event._id);
  router.push({name:"bookticket", params: {id:event._id}});
  // router.push({ name: "payment", params: { id: event._id } });
};


const getevent = async () => {
  try {
    const res = await axios.get("http://localhost:5001/events");
    console.log(res.data);
    events.value = res.data;
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
.carrd {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-left: 50px;
  padding-right: 50px;
  cursor: pointer;
  margin-left: 200px;
}
.card-img-top {
  width: 286px;
  height: 250px;
}

.card {
  transition: box-shadow 0.3s ease; /* Add a smooth transition effect */
  margin-top: 50px;

}

.card:hover {
  box-shadow: 0 0 10px rgba(10, 10, 0, 0.5); /* Add a shadow on hover */
}
</style>
