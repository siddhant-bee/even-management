<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="ticket d-flex flex-column justify-content-around">
      <div class="col-6 d-flex ">
        <div class="col-3 "></div>
        <div>
          <h1 class="title">EVENT NAME jhbsdhfbdshfbhfbsdjf</h1>
        </div>
      </div>
      <div class="col-2">
      </div>
      <div class="col-4 d-flex">
        <div class="col-4"></div>
        <div class="col-10 "><h4 class="title">{{}}Location</h4></div>
        <div class="col-6 "><h4 class="title">Location</h4></div>
        <div class="col-4 ps-5 ms-1" ><h4 class="title">Location</h4></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.ticket {
  height: 50vh;
  width: 70vw;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("../assets/Data.jpg");
}
.container {
  height: 100vh;
}
.title{
  color: rgb(255, 255, 255);
  font-family: Roboto;
  font-weight: bold;
}
</style>