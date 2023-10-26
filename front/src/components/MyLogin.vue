<template>
  <div class="allcover">
    <h1>login</h1>
    <div class="login ">
      <input type="email" v-model="email" placeholder=" Enter Email" required />
      <a @click="forgott" class="hov" v-if="forgot" style="margin-left: 169px; margin-top: 10px"
        >forgot password</a
      >
      <input type="password" v-model="password" placeholder=" Enter password" />

      <button class="bb" v-on:click="login" style="width: 100px">log in</button>
      <a v-on:click="google" style="width: 200px; margin-left: 20px">
        <i class="fa-brands fa-google fa-xl"></i>
      </a>
      <i class="fa-brands fa-facebook fa-xl" style="margin-left: 20px"></i>
      <i class="fa-brands fa-twitter fa-xl" style="margin-left: 20px"></i>
      <p>
        <router-link to="/signup">sign up</router-link>
        <br />
        <!-- <router-link to="/forgot">forgot password</router-link> -->
      </p>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useUserInfoStore } from "../store/userInfo";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";

const router = useRouter();
const userstore = useUserInfoStore();

const email = ref("");
const password = ref("");
const forgot = ref(false);
const google = () => {
  window.location.href = "http://localhost:5001/auth/google";
};

onMounted(() => {
  const cookieValue = Cookies.get("token");
  console.log(cookieValue); // Outputs the value stored in the cookie
  if (cookieValue) {
    const data = JSON.parse(atob(cookieValue.split(".")[1]));
    if (data) {
      if (data.role === "Admin") {
        router.push({ name: "home" });
      } else if (data.role === "User") {
        router.push({ name: "uhome" });
      } else if (data.role === "Printer") {
        router.push({ name: "printerhome" });
      } else {
        router.push({ name: "login" });
      }
    }
  } else {
    router.push({ name: "login" });
  }
});


const forgott = async () => {
  try {console.log(email.value)
    const res = await axios.post("http://localhost:5001/forgot",{
      email: email.value
    });
    console.log(res.data);
  }
  catch (error) {
    console.log(error);
  }
}

const login = async () => {
  try {
    // console.log(email.value)
    // console.log(password.value)
    const res = await axios.post("http://localhost:5001/login", {
      email: email.value,
      password: password.value,
    });
    //check cokki

    console.log(res.status);
    if (res.status === 200) {
      // Set a value in a cookie
      Cookies.set("token", res.data, { expires: 1 }); // 'expires' sets the cookie's expiration in days

      const payload = JSON.parse(atob(res.data.split(".")[1]));
      console.log(payload);
      console.log(res.data);
      if (payload.role === "Admin") {
        userstore.setUser(payload);
        router.push({ name: "home" });
      } else if (payload.role === "User") {
        userstore.setUser(payload);
        router.push({ name: "uhome" });
      } else if (payload.role === "Printer") {
        userstore.setUser(payload);
        router.push({ name: "printerhome" });
      } else {
        router.push({ name: "login" });
      }
    } else if (res.status === 203) {
      forgot.value = true;
      toast("Wrong password", {
        autoClose: 1500,
      });
    } else if (res.status === 404) {
      toast(" email dosnt exist", {
        autoClose: 1500,
      });
    }
  } catch (error) {
    console.log(error);
  }
  //   console.log(email.value)
  //   console.log(password.value)
};
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

  margin-bottom: 10px;
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

.login a :hover {
  cursor: pointer;
}
/* .login hov :hover {
  cursor: pointer;
} */
</style>
