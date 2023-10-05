<template>
  <div class="cover">
    <!-- <img class="logo" src="../assets/download.jpeg" alt="" /> -->
    <div>
      <!-- <div class="background-gif"></div> -->
      <!-- <img src="@/assets/ghipy.gif" class="height" alt="My GIF"> -->
    </div>

    <h1>Sign up</h1>
    <div class="register">
      <div class="register_form">
     

        <input type="text " v-model="name" placeholder=" Enter Name" />

        <input type="text " v-model="email" placeholder=" Enter Email" />

        <input
          type="password"
          v-model="password"
          placeholder=" Enter password"
        />
        <button v-on:click="Signup">Sign Up </button>
        <br />
        <router-link class="log" to="/">log in</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter();



const name = ref('')
const email = ref('')
const password = ref('')

const Signup = async ()=> {
try{
 const res = await axios.post('http://localhost:5001/signup', {
  name: name.value,
  email: email.value,
  password: password.value
 })
 console.log(res.data)
 if(res.status === 200){
   router.push({ name: 'login' });
 }
}
catch(error){
console.log(error)
}
}
</script>

<style scoped>
.height {
  height: 220px;
  width: 220px;
}
.logo {
  width: 200px;
}
.cover {
  text-align: center;
}

.register input:hover {
  box-shadow: #686767 2px 2px 5px 5px;
  background-color: rgb(202, 197, 197);
}

.register input {
  border-radius: 15px;
  width: 300px;
  background-color: transparent;
  height: 40px;
  padding-left: 20px;
  display: BLOCK;
  margin-bottom: 15px;
  margin-left: auto;
  margin-right: auto;
  border: 1px SOLID #ff7e01;
}

.register button:hover {
  box-shadow: #686767 2px 2px 5px 5px;
  background-color: rgb(202, 197, 197);
}
.register button {
  width: 320px;
  background-color: transparent;
  height: 40px;
  border: 1px solid#ff7e01;

  border-radius: 15px;
  cursor: pointer;
}
.rolee {
  width: 324px;
  margin-bottom: 15px;
  height: 30px;
}


.text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 24px;
}

.register .register_form {
  max-width: 500px;
  background-color: rgb(255, 255, 255, 0.75);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 1rem;
  box-shadow: 0px 0px 12px 4px rgba(230, 228, 228, 0.75);
}
.register_form select,
.register_form input {
  width: 80%;
}
</style>