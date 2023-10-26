<template>
    <div v-if="loading">
        <img
      src="../assets/login2.gif"
      alt=""
      style="margin-top: 50px;margin-left: 500px; width: 500px; height: 400px"
    />
    </div>
</template>

<script setup>
import { ref,onMounted } from "vue";
import { useRoute } from "vue-router";
// import { ref } from "vue";
// import axios from "axios";
// import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useUserInfoStore } from "../store/userInfo";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";

const route = useRoute();
const token = route.params.data;
const loading = ref(false);
const router = useRouter();
const userstore = useUserInfoStore();

onMounted(() => {
  // const router = useRouter();
  console.log(token);
  
loading.value = true;
setTimeout(() => {
loading.value = false;
  const payload = JSON.parse(atob(token.split(".")[1]));
  if (payload.role === "Admin") {
    Cookies.set("token", token, { expires: 1 })
    userstore.setUser(payload);
    router.push({ name: "home" });
  } else if (payload.role === "User") {
    Cookies.set("token", token, { expires: 1 })
    userstore.setUser(payload);
    router.push({ name: "uhome" });
  } else if (payload.role === "Printer") {
    Cookies.set("token", token, { expires: 1 })
    userstore.setUser(payload);
    router.push({ name: "printerhome" });
  } else {
    router.push({ name: "login" });
  }
}, 5000);


 
});
</script>

<style scoped></style>
