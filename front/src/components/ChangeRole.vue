<template>
    <div>
   <table class="table">
  <thead>
    <tr>
      
      <th scope="col">Name</th>
      <th scope="col">Role</th>
      
    </tr>
  </thead>
  <tbody>
    <tr v-for="user in user " :key="user.id"> 
   
      <td>{{user.name}}</td>
      <td>{{user.role}}</td>
      <button>make admin</button>
      <button>make printer</button>
    
    </tr>
  

  </tbody>
</table>

    </div>
</template>

<script setup>
import axios from 'axios';
import {ref} from 'vue';
import { onMounted } from 'vue'

onMounted(() => {
//   console.log(`the component is now mounted.`)
  getUser();
})
const user = ref([]);

const getUser = async () => {
    try {
        const res = await axios.get('http://localhost:5001/users');
        console.log(res.data);
        user.value = res.data;
    } catch (error) {
        console.log(error);
    }
};

</script>

<style  scoped>

</style>