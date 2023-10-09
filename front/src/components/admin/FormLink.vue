


<template>
  <div>
  <MyNavbarVue/>
    <div class="show">
      <div class="centerbox">
        <button type="button" class="btn btn-secondary" @click="show = !show">
          Get Link
        </button>

        <div class="inputt" v-if="show === true">
          <input  type="text" placeholder="" v-model="val" />
          <i @click="copyToClipboard" class="fa-solid fa-copy fa-xl" style="margin-left: 0.2rem;"></i>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MyNavbarVue from "./MyNavbar.vue";

const val = ref("https://forms.gle/hAXtuTDjsEFCnTU37");
const show = ref(false);

const copyToClipboard = () => {
  const tempInput = document.createElement('input');
      tempInput.value = val.value;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      alert('Copied to clipboard: ' + val.value);
}
</script>

<style scoped>
.show {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
.centerbox {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 500px;
  height: 500px;
  background-color: #ccc;
}

.btn {
  margin-left: 180px;
  height: 50px;
  width: 100px;
}

.inputt {
  margin-top: 20px;
  margin-left: 100px;
  width: 100%;
}
.inputt input {
  width: 300px;
}
</style>
