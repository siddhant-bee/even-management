<template>
  <div>
    <div>
    <MyNavbar />
    <div class="container mt-5">
      <div class="carrd">
        <div class="card" style="width: 18rem" @click="addEvent">
          <img src="../assets/event.png" class="card-img-top" alt="" />
          <div class="card-body">
            <h3>Add Event Details</h3>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>

        <div class="card" style="width: 18rem">
          <img src="../assets/live.jpg" class="card-img-top" alt="" />
          <div class="card-body">
            <h3>All Live Events</h3>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>

        <div class="card" style="width: 18rem">
          <img src="../assets/payment.jpg" class="card-img-top" alt="..." />
          <div class="card-body">
            <h3>Payment Details</h3>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="card" style="width: 18rem">
    <img src="../assets/role.png" class="card-img-top" alt="..." />
    <div class="card-body">
      <h3>Change role</h3>
      <p class="card-text">From here Admin can change role.</p>
    </div>
  </div>
  </div>
</template>

<script setup>
import MyNavbar from "./MyNavbar.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const addEvent = () => {
  console.log("event add kro");
  router.push({ name: "addeventpage" });
};
</script>

<style scoped>
.carrd {
  display: flex;
  justify-content: space-between;
  padding-left: 50px;
  padding-right: 50px;
  cursor: pointer;
}
.card-img-top {
  width: 286px;
  height: 250px;
}
</style>
