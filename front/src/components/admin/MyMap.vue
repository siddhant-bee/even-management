<template>
    <div>
        <h1>your cordinates are  :</h1>
        <p>{{coordinates.lat}} LAtitude and {{coordinates.lng}} Longitude</p>
    </div>
</template>

<script setup>
const coordinates = {
    lat: 0,
    lng: 0
}
</script>

<style  scoped>

</style>