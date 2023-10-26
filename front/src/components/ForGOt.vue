<template>
    <div class="password-change-container" style="margin-top: 50px;">
      <h1 class="password-change-title"> Change     Password </h1>
      <form @submit.prevent class="password-change-form">
        <input v-model="email" type="email"  disabled />
        <input id="newpassword" v-model="newPassword" type="password" placeholder="New Password" required />
        <i class="fa-solid fa-eye eye" @click="togglePasswordVisibility"></i>
        <input id="newpass" v-model="confirmPassword" type="password" placeholder="Confirm New Password" required />
        <i class="fa-solid fa-eye nose" @click="togglePassword"></i>
        <button type="submit" class="password-change-button" @click="changePassword">Change Password</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import axios from "axios"
  import { ref } from "vue";
  import { useRoute } from "vue-router";
  import { useRouter } from "vue-router";
  const route = useRoute();
  const router = useRouter();
  let email =  ref(route.params.email);
  let newPassword = ref("");

//   let currentPassword = ref("");
  let confirmPassword = ref("");

  
  const changePassword = async () => {
    if (newPassword.value === confirmPassword.value) {
           try {
            const res = await axios.post("http://localhost:5001/changepassword",{
              email: email.value,
              password: newPassword.value
            })
            if(res.status === 200){
                router.push({ name: "login" });
            }
           } catch (error) {
             console.log(error)
            
           }
    } else {
      alert('Passwords do not match');
    }
  };


  const togglePasswordVisibility = () => {
const passwordInput = document.getElementById("newpassword")
if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
};


const togglePassword = () => {
const passwordInput = document.getElementById("newpass")
if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
};
  </script>
  
  <style scoped>
  .password-change-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    text-align: center;
    animation: fadeIn 0.5s;
  }
  
  .password-change-title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .password-change-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  input[type="password"] {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
  input[type="email"] {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
  input[type="text"] {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
  
  
  .password-change-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    margin-top: 10px;
    cursor: pointer;
  }
  
  .password-change-button:hover {
    background-color: #0056b3;
  }

#newpassword{
    position: relative;
}
.eye{
    position: absolute;
    right: 0px;
    left:950px;
    top: 195px;
    cursor: pointer;
    width: 10px;
}
.nose{
    position: absolute;
    right: 0px;
    left:950px;
    top: 255px;
    cursor: pointer;
    width: 10px;
}
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  </style>
  