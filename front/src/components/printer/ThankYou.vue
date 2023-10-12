<template>

<navbar />

    <div class="gif" style="margin-top: 50px;">
        <img src="../../assets/ticket.gif" alt="" style="margin-left:500px;width: 500px; height: 400px;">
    </div>
    <div class="thank-you-container">
      <h1>Thank You for Your Booking!</h1>
      <p>Your  tickets  for {{ event.title }} hab been booked.</p>
      <h5>your booking id is :-{{ event._id }}</h5>

<h3>your ticket is ready grab from here</h3>
<button @click="open = !open" class="btn btn-warning" style="margin-bottom: 30px;">ticket</button>

      <div class="buttons-container" v-if="open">

        <div class="container d-flex justify-content-center align-items-center">
    <div class="ticket d-flex flex-column justify-content-around">
      <div class="col-6 d-flex ">
        <div class="col-3 "></div>
        <div>
          <h1 class="title" style="margin-left: 30px;"> {{ event.title }}</h1>
        </div>
      </div>
      <div class="col-2">
      </div>
      <div class="col-4 d-flex">
        <div class="col-4"></div>
     
        <div class="col-10 "><h4 class="title" style="margin-right: 40px;">{{event.location}}</h4></div>
        <div class="col-6 "><h4 class="title">{{event.fromDate}}</h4></div>
        <div class="col-4 ps-5 ms-1" ><h4 class="title">{{event.starttime}}</h4></div>
      </div>
    </div>
  </div>
        <!-- <router-link to="/" class="home-button">Home</router-link>
        <button  class="logout-button">Logout</button> -->
      </div>
    </div>
  </template>
  

<script setup>

import navbar from "./PrinterNavbar.vue"




import { ref,onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
const route = useRoute();
const id = ref(route.query.id);
const open = ref(false)

const event = ref([]);
// const title = ref("");
// const location =ref("");
// const date = ref("")
// const time= ref("")


onMounted(() => {
  getevent();
});
const getevent = async () => {
  try {
    const res = await axios.get(`http://localhost:5001/event/${id.value}`);
    
    console.log(res.data);
  
    event.value = res.data;
  } catch (error) {
    console.log(error);
  }
};
</script>
 
 
 <style>



  .thank-you-container {
    text-align: center;
    padding: 40px;
  }
  
  .home-button,
  .logout-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 10px;
    font-size: 16px;
  }
  
  .home-button:hover,
  .logout-button:hover {
    background-color: #0056b3;
  }
  
  .buttons-container {
    display: flex;
    justify-content: center;
  }


.ticket {
  height: 50vh;
  width: 70vw;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("../../assets/Data.jpg");
}

.title{
  color: rgb(255, 255, 255);
  font-family: Roboto;
  font-weight: bold;
}
  </style>