<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent>
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Enter your email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Enter your password"
          />
        </div>
        <button  @click="login">Login</button>
      </form>
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
  console.log(res.status)
  if(res.status === 200){
    router.push({ name: 'home' });
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
/* Center the login container vertically and horizontally */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

/* Style the form */
.login-form {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  width: 300px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  background-color: #007bff;
  color: #fff;
  margin-left: 575px;
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>



