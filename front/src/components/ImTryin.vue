<template>
  

  <div class="gif" style="margin-top: 50px">
    <img
      src="../assets/ticket.gif"
      alt=""
      style="margin-left: 500px; width: 500px; height: 400px"
    />
  </div>

  <div class="thank-you-container">
    <div class="container">
      <button
      class="btn btn-warning"
      style="margin-left: 10px"
      @click="changeView()"
      >
        show ticket
      </button>
      <button
        v-if="open"
        style="margin-right: 50px"
        className="btn primary__btn   dbutton"
        @click="downloadPDF()"
      >
        <i class="fa-solid fa-download fa-2xl"></i>
      </button>
    </div>
    <h1>Thank You for Your Booking!</h1>
    <p>Your tickets for {{ event.title }} hab been booked.</p>
    <h5>your booking id is :-{{ event._id }}</h5>
    {{ ticket }} 
    <h3>your ticket is ready grab from here</h3>
    <div
      class="ticketbox download"
      style="margin-top: -150px; padding-top: 200px; position: relative;"
      v-if="open"
    >
      <div class="container d-flex justify-content-center align-items-center">
        <div class="ticket position-relative d-flex flex-column justify-content-around">
          <div class="col-6 d-flex">
            <div class="col-3"></div>
            <div>
              <h1 class="title" style="margin-left: 30px">{{ event.title }}</h1>
            </div>
          </div>
          <div class="col-2"></div>
          <div class="col-4 d-flex">
            <div class="col-4"></div>

            <div class="col-10">
              <h4 class="title" style="margin-right: 40px">
                {{ event.location }}
              </h4>
            </div>
            <div class="col-6">
              <h4 class="title">{{ event.fromDate }}</h4>
            </div>
            <div class="col-4 ps-5 ms-1">
              <h4 class="title">{{ event.starttime }}</h4>
            </div>
          </div>
          
          <div class="ticketNo">1,2</div>
          
        </div>
      </div>
      <div class="qr" style="margin-left: 725px;margin-bottom: 200px;"><qr/></div>
    
  </div>
  
      <!-- <router-link to="/" class="home-button">Home</router-link>
        <button  class="logout-button">Logout</button> -->
    </div>

    
</template>

<script setup>
import qr from "../components/printer/MyQr.vue";
// import navbar from "./PrinterNavbar.vue";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const id = ref(route.query.id);
const ticket = ref(route.query.tickets);
let open = ref(false);
let str = ref([]);

      
// console.log("str", str);
const calculate = (aval, total) => {
  const finalnew = parseInt(ticket.value);
  const newf = aval + finalnew;
  for (let i = 0; i < ticket.value; i++) {
    console.log(total - newf + i + 1);
    // str.value[i] += total - newf + i + 1;
    str.value.push(total - newf + i + 1);
    console.log(str.value[i]);
  }
  console.log(str.value.join(","));
};

const event = ref([]);
const downloadPDF = () => {
  const capture = document.querySelector(".download");
  //setLoader(true);
  html2canvas(capture).then((canvas) => {
    const imgData = canvas.toDataURL("img/png");
    const doc = new jsPDF("l", "mm", "a5");

    const componentWidth = doc.internal.pageSize.getWidth();
    const componentHeight = doc.internal.pageSize.getHeight();
    doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight / 2);
    //setLoader(false);
    doc.save(`ticket.pdf`);
  });
};

function changeView()
{
  open.value = !open.value;
  console.log(open.value);
}

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
    const aval = res.data.noOfAvailableSlots;
    const total = res.data.totalNoOfSlots;

    console.log(aval, total);

    calculate(aval, total);
    event.value = res.data;
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
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
  /* height: 50vh;
  width: 70vw; */
  height: 300px;
  width: 920px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("../assets/Data.jpg");
}

.title {
  color: rgb(255, 255, 255);
  font-family: Roboto;
  font-weight: bold;
}

.ticketNo{
  /* transform: rotate(-90deg); */
  position: absolute;
  right: 20px;
  font-size: 22px;
  color: red;
  bottom: 55px;
  rotate: -90deg;
  font-weight: bold;
  color: white;
  /* background: white; */
}

</style>
