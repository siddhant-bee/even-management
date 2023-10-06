<template>
    <div>
<!-- <h1>mai hu ek add event page</h1> -->
<div class="carrd">
    <div class="fill_form" @click="fill_form">

<div class="card" style="width: 18rem;">
<img src="../assets/fillform.png" class="card-img-top" alt="">
<div class="card-body">
    <h3>FILL YOUR FORM </h3>
    <br>
<p class="card-text">click here to fill a form to add any event</p>
</div>
</div>

</div>

<div class="make_link" @click="$router.push({ name: 'formlink' })">


<div class="card" style="width: 18rem;">
<img src="../assets/link.png" class="card-img-top" alt="">
<div class="card-body">
    <h3>GET LINK </h3>
    <br>
<p class="card-text">click here to get a link that u can send to anyone to fill.</p>
</div>
</div>

</div>

</div>
    </div>
</template>

<script setup>
const fill_form = () => {
    console.log("event add kro")
    // router.push({ name: 'fillform' });
}
</script>


<style scoped>
.carrd{
    display: flex;
    justify-content: space-between;
    padding-left: 350px;
    padding-right: 350px;
    cursor: pointer;
}
.card-img-top{
    width: 286px;
    height: 250px;
}
</style>