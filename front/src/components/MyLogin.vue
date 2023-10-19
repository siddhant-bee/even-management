<template>
  <div class="allcover">

    <h1>login</h1>
    <div class="login">
      <input type="text " v-model="email" placeholder=" Enter Email" />
      <input type="password" v-model="password" placeholder=" Enter password" />
      <button v-on:click="login">log in</button>
      <p>
        <router-link to="/signup">sign up</router-link>
      </p>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter();


const email = ref('')
const password = ref('')

const  login = async ()=> {
try{
 const res = await axios.post('http://localhost:5001/login', {
    email: email.value,
    password: password.value
  })

  console.log(res.data)
  console.log(res.status)
  if(res.status === 200){
    if(res.data.role==="Admin"){
      router.push({ name: 'home' });
    }
    else if(res.data.role==="User"){
      router.push({ name: 'userhome' });
    }
    else if(res.data.role==="Printer"){
      router.push({ name: 'printerhome' });
    }
   
  }
}
catch(error){
console.log(error)
}
//   console.log(email.value)
//   console.log(password.value)
}

</script>
<style scoped>
.logo {
  width: 200px;
}
.allcover {
  text-align: center;
}

.login input:hover {
  box-shadow: #686767 2px 2px 5px 5px;
}

.login input {
  width: 300px;
  height: 40px;
  border-radius: 15px;
  padding-left: 20px;
  display: BLOCK;

  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
  border: 1px SOLID #ff7e01;
}

.login button:hover {
  box-shadow: #686767 5px 5px 5px 5px;
}

.login button {
  width: 320px;
  height: 40px;
  border-radius: 15px;
  border: 1px #ff7e01;
  background-color: #ff7e01;
  cursor: pointer;
}
</style>