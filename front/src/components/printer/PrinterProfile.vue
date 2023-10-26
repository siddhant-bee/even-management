<template>
         <MyNavbar />
<div class="upperbar "> 
  <button class="btn btn-outline-primary" @click="check = true">Dashboard</button>
  <button class="btn btn-outline-primary ms-2" @click="check = false">Chart</button>
</div>

<div class="chart container" v-if="!check">
  <table class="table">
      <thead>
        <tr>
          <th scope="col">Event</th>
          <th scope="col">Total tickets</th>
          <th scope="col">Available tickets</th>
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="inf in info" :key="inf._id"> 
          <td  >{{ inf.title }}</td>
          <td  >{{ inf.totalNoOfSlots }}</td>
          <td  >{{inf.noOfAvailableSlots}}</td>

          
        </tr>
      </tbody>
    </table>
</div>

    <div class="mainbox" v-if="check">
        <div class="box" v-for="event in events" :key="event._id">
          <h3 style="text-align: center;
          margin-top: 20px;">sold to :  {{ event.name }}</h3>
          <h3 style="text-align: center;
          margin-top: 20px;">Number of ticket: {{ event.noofticket }}</h3>
                  <h3 style="text-align: center;
          margin-top: 20px;">Ticket is for: {{ event.title }}</h3>
        </div>
        
    </div>
  </template>
  
  <script setup>
  
import MyNavbar from "./PrinterNavbar.vue";
  import { useUserInfoStore } from '../../store/userInfo';
  const userstore = useUserInfoStore()
 
  
  import {ref,onMounted} from "vue";
  import axios  from "axios";
  const events = ref([])
  const info = ref([])
  const check = ref(true)
  onMounted(()=>{
    getdetail()
    getEvents()
  })


  const getEvents = async () => {
  try {
    const res = await axios.get("http://localhost:5001/eventsprinter");
    console.log(res.data);
   info.value = res.data
    }
   catch (error) {
    console.log(error);
  }
};

  const getdetail =async ()=>{
  const id = userstore.getUser._id;
  console.log(id);
  try {
    const res = await axios.get(`http://localhost:5001/printer/${id}`)
    console.log(res.data);
    events.value = res.data
  } catch (error) {
    console.log(error);
  }
  }
  
  
  </script>
  
  <style  scoped>
  .mainbox{
    display: flex;
  justify-content: center;
  flex-wrap: wrap;

  
  }
  .box{
  margin-left: 20px;
    width: 400px;
    height: 200px;
    background-color: rgb(223, 179, 179);
    border-radius: 50px;
    margin-top: 50px;
  }

  .upperbar {
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }
  </style>