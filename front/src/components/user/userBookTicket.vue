<template>
  <div>
    <MyNavbar />
<!-- {{ role.role }}
{{ role._id }} -->
    <!-- checkout? -->

    <div class="modlee" v-if="open">
      <!-- <font-awesome-icon :icon="['fas', 'backward']" />
   -->
      <i class="fa-solid fa-backward p-5 fa-xl" @click="open = false"> Back</i>
      <!-- <i @click="copyToClipboard" class="fa-solid fa-copy fa-xl" style="margin-left: 0.2rem;"></i> -->

      <div class="payment-form">
        <h3>total amount is :-{{ final }}</h3>
        <h2 style="margin-left: 100px">{{ event.price }} x {{ tickets }}</h2>
        <h1>Checkout</h1>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Card Holder Name</label>
            <input type="text" id="name" v-model="cardname" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="form-group">
            <label for="cardNumber">Card Number</label>
            <input type="text" id="cardNumber" v-model="cardNumber" required />
          </div>
          <div class="form-group">
            <label for="expiryDate">Expiry Date</label>
            <input
              type="date"
              class="form-control"
              v-model="expiryDate"
              required
            />
          </div>
          <div class="form-group">
            <label for="cvv">CVV</label>
            <input type="text" id="cvv" v-model="cvv" required />
          </div>
          <button @click="book">Pay Now</button>
        </form>
      </div>
    </div>

    <!-- checkout? -->

    <!-- mian body -->

    <div class="mainbody" v-else>
      <div
        class="d-flex fd-column maindiv"
        :style="{
          backgroundImage: ` linear-gradient(90deg, rgb(26, 26, 26) 24.97%, rgb(26, 26, 26) 38.3%, rgba(26, 26, 26, 0.04) 97.47%, rgb(26, 26, 26) 100%), url('${event.backgroundImage}')`,
        }"
      >
        <div class="d-flex fd-column col-8">
          <div class="col-6 d-flex flex-row">
            <div class="col-2"></div>
            <div
              class="col-10 d-flex justify-content-center align-items-center"
            >
              <img class="img h-75 w-75" :src="event.image" alt="" />
            </div>
          </div>
          <div class="col-6 d-flex justify-content-start align-items-center">
            <div class="h-75 d-flex flex-column justify-content-around">
              <div>
                <h2 class="title">{{ event.title }}</h2>
              </div>
              <div>
                <h5 class="title">{{ event.description }}</h5>
              </div>
              <div class="d-flex flex-row">
                <h5><label for="date" class="title">Date : </label></h5>

                <h5 class="title">- {{ event.fromDate }}</h5>
              </div>
              <div class="d-flex flex-row">
                <h5><label for="time" class="title">Time : </label></h5>
                <h5 class="title">- {{ event.starttime }} onwards</h5>
              </div>
              <div class="d-flex flex-row">
                <h5><label for="location" class="title">Location : </label></h5>
                <h5 class="title">- {{ event.locationlink }}</h5>
              </div>
              c
              <div class="d-flex flex-row">
                <a :href="url" target="_blank">
                  <button class="btn btn-outline-primary">
                    Go to Location
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="col-5"></div> -->

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

                    <!-- {{ open }} -->
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
                    style="margin-left: 450px; width: 90px"
                    @click="opentop"
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
  </div>
</template>
<script setup>
import { useUserInfoStore } from '../../store/userInfo';
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import MyNavbar from "./UserNavbar.vue";
import { ref, onMounted, watch } from "vue";
import { useRoute,useRouter } from "vue-router";
const userstore = useUserInfoStore()
const route = useRoute();
const router = useRouter();
const id = ref(route.params.id);
const name = ref("");
const email = ref("");
const phone = ref("");
const tickets = ref("");
const finalprice = ref("");
const event = ref([]);
const avaltick = ref(0);
const location = ref("");
let open = ref(false);
let final = ref("");
let late = ref("");
let long = ref("");
const title = ref("");

let url = ref("");


const cardname = ref("");
const cardNumber = ref("");
const expiryDate = ref("");
const cvv = ref("");

const opentop = () => {
  open.value = true;
  window.scrollTo(0, 0);
};

onMounted(() => {
  getevent();

});
watch(tickets, () => {
  final = finalprice.value * tickets.value;

  if (tickets.value > avaltick.value) {
    //msg nhi mikega
    tickets.value = avaltick.value;
    toast(`Tickets not available only ${avaltick.value} left `, {
      autoClose: 1500,
    });
  } else if (tickets.value <= avaltick.value) {
    //msg mikega

    if (tickets.value >= 5) {
      tickets.value = 4;
      toast("max value allowed is 4", {
        autoClose: 1500,
      });
    }
  }
});

// const getcod = async () => {
//   try {
//     const res = await axios.get(`http://localhost:5001/cod/${id.value}`);
//     cordinates.value = res.data;
//     console.log(cordinates.value[0]);
//     console.log(cordinates.value[1]);
//     late.value = res.data[1];
//     long.value = res.data[0];

   
//     console.log("1", url.value);
//   } catch (error) {
//     console.log(error);
//   }
// };


//changes
const getevent = async () => {
  try {
    console.log("hello");
    const res = await axios.get(`http://localhost:5001/eventuser/${id.value}`);
    console.log(res.data);
    avaltick.value = res.data.noOfAvailableSlots;
    finalprice.value = res.data.price;
    location.value = res.data.location;
    title.value = res.data.title;
    console.log(location.value);
    late.value = location.value.split(",")[0];
    long.value = location.value.split(",")[1];
    url.value = "https://maps.google.com/?q=" + late.value + "," + long.value;
    
    event.value = res.data;
  } catch (error) {
    console.log(error);
  }
};

const book = async () => {
  try {
    const userId = ref(userstore.getUser._id);
    console.log(userId.value);
    let aticket = await axios.get(`http://localhost:5001/eventuser/${id.value}`);
    console.log(aticket.data.noOfAvailableSlots);
    if (aticket.data.noOfAvailableSlots >= tickets.value) {
      let res = await axios.post("http://localhost:5001/bookticketuser", {
        name: name.value,
        email: email.value,
        phone: phone.value,
        noofticket: tickets.value,
        eventID: id.value,
        avaltick: avaltick.value,
        printerId: userId.value,
        title: title.value,
     
      });
      const myData = {
        id: id.value,
        tickets: tickets.value,
      };
      console.log(myData);
      router.push({ name: "thankyou", query: myData });

      console.log(res.data);
    }
  
     else {
     router.push({ name: "fail" });
    }
  } catch (error) {
    console.log(error);
  }
};
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

.payment-form {
  position: relative;
  margin-top: 300px;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 400px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
}

.payment-form h1 {
  text-align: center;
}

.form-group {
  margin-bottom: 5px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"],
input[type="email"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modlee button {
  display: block;
  width: 100%;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
