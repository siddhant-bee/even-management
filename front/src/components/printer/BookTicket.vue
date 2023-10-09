<template>
    <PrinterNavbar/>
    <div>
      <div
        class="d-flex fd-column maindiv"
        :style="{
          backgroundImage: ` linear-gradient(90deg, rgb(26, 26, 26) 24.97%, rgb(26, 26, 26) 38.3%, rgba(26, 26, 26, 0.04) 97.47%, rgb(26, 26, 26) 100%), url('${event.backgroundImage}')`,
        }"
      >
        <div class="d-flex fd-column col-7">
          <div class="col-7 d-flex flex-row">
            <div class="col-2"></div>
            <div class="col-10 d-flex justify-content-center align-items-center">
              <img class="img h-75 w-75" :src="event.image" alt="" />
            </div>
          </div>
          <div class="col-5 d-flex justify-content-start align-items-center">
            <div class="h-75 d-flex flex-column justify-content-around">
              <div>
                <h2 class="title">{{ event.title }}</h2>
              </div>
              <div>
                <h5 class="title">{{ event.description }}</h5>
              </div>
              <div class="d-flex flex-row">
                <h5><label for="date" class="title">Date : </label></h5>
                <h5 class="title">- {{ event.date }}</h5>
              </div>
              <div class="d-flex flex-row">
                <h5><label for="time" class="title">Time : </label></h5>
                <h5 class="title">- {{ event.time }} onwards</h5>
              </div>
              <div class="d-flex flex-row">
                <h5><label for="location" class="title">Location : </label></h5>
                <h5 class="title">- {{ event.location }}</h5>
              </div>
            </div>
          </div>
        </div>
        <div class="col-5"></div>
      </div>
      <div class="form">
        <div>
          <div class="container pt-5 pb-5">
            <div class="row">
              <div class="col-8 mx-auto">
                <form @submit.prevent="submit">
                  <div class="row mb-3">
                    <label for="name" class="col-sm-2 col-form-label"
                      >Full Name</label
                    >
                    <div class="col-sm-10">
                      <input
                        type="text"
                        class="form-control"
                        id="title"
                        v-model="name"
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="email" class="col-sm-2 col-form-label"
                      >Email</label
                    >
                    <div class="col-sm-10">
                      <input
                        type="text"
                        class="form-control"
                        id="email"
                        v-model="email"
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="phone" class="col-sm-2 col-form-label"
                      >Phone Number</label
                    >
                    <div class="col-sm-10">
                      <input
                        type="number"
                        class="form-control"
                        id="location"
                        v-model="phone"
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="tickets" class="col-sm-2 col-form-label"
                      >No Of Tickets</label
                    >
                    <div class="col-sm-10">
                      <input
                        type="number"
                        class="form-control"
                        id="noOfAvailableSlots"
                        v-model="tickets"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    style="margin-left: 450px"
                    @click="book()"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script setup>
  import PrinterNavbar from "./PrinterNavbar.vue";
  import axios from "axios"
  import {ref,onMounted} from "vue"
  import { useRoute,useRouter } from "vue-router";
  const route = useRoute();
const router = useRouter();
  const id = ref(route.params.id)
  const name = ref("")
  const email = ref("")
  const phone = ref("")
  const tickets = ref("")
  const event =   ref([])
  const avaltick = ref(0)
  onMounted(() => {
      getevent();
  })
  const getevent = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/event/${id.value}`);
      console.log(res.data);
      avaltick.value = res.data.noOfAvailableSlots
      event.value = res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const book = async ()=>{
      try {
          let res = await axios.post("http://localhost:5001/bookticket", {
              name: name.value,
              email: email.value,
              phone: phone.value,
              noofticket: tickets.value,
              eventID: id.value,
              avaltick: avaltick.value,
              id:id.value
          })
          console.log(res.data)
router.push({name:"printerhome"})
      } catch (error) {
          console.log(error)
      }
  }
  </script>
  <style scoped>
  .maindiv {
    height: 75vh;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  img {
    border-radius: 10px;
  }
  .title {
    color: rgb(255, 255, 255);
    font-family: Roboto;
    font-weight: bold;
  }
  </style>