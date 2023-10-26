<template>
         <MyNavbar />

         <h1>welcome {{ userstore.user.name }}</h1>
        
         <div>
    <div class="mainbox" >
      <div class="ch" v-if="events.length > 0 ">
        <div class="box" v-for="event in events" :key="event._id">
          <h3 style="text-align: center;
          margin-top: 20px;">Bought by :  {{ event.name }}</h3>
          <h3 style="text-align: center;
          margin-top: 20px;">Number of ticket: {{ event.noofticket }}</h3>
                  <h3 style="text-align: center;
          margin-top: 20px;">Ticket is for: {{ event.title }}</h3>
            <button class=" btn btn-outline-primary" style="margin-left: 80px;" @click="$router.push(`/ubook/${event.eventID}`)" >Details</button>
            <button class=" btn btn-outline-primary ms-5" @click="setinfo(event)" >Show ticket </button>

        </div>
      </div>
      <div class="che" v-else>
        <h1>No Data Found</h1>
      </div>
        
    </div>
<div class="dd" v-if="show">
  <myticket/>
</div>
    </div>


  </template>
  
  <script setup>
  
import MyNavbar from "./UserNavbar.vue";
import myticket from "./MYticket.vue";
  import { useUserInfoStore } from '../../store/userInfo';
  const userstore = useUserInfoStore()
  const ticketstore = useUserInfoStore()
 
  
  import {ref,onMounted} from "vue";
  import axios  from "axios";
  const events = ref([])
  const data = ref([])
  const show = ref(true)
  onMounted(()=>{
    getdetail()
  })



  const setinfo = async (info) => {
  //  console.log(info);
  show.value = !show.value
    data.value = info
    ticketstore.setticket(data.value)
 
  }

  const getdetail =async ()=>{
  const id = userstore.getUser._id;
  console.log(id);
  try {
    const res = await axios.get(`http://localhost:5001/user/${id}`)
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
  </style>