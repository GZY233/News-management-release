
<template>
    <div>
        <video id="videoMorning" src="@/assets/video/morning.webm" autoplay muted loop></video>
    <video id="videoDay" src="@/assets/video/day.webm" autoplay muted loop></video>
    <video id="videoEvening" src="@/assets/video/evening.webm" autoplay muted loop></video>
    <video id="videoNight" src="@/assets/video/night.webm" autoplay muted loop></video>
    </div>
</template>
<style scoped>


html{
    background-color: black;
}

body{
    margin: 0;
    padding: 0;
}

video{
    margin: 0;
    width: 100%;
    height: 100%;
    position: static;
}

</style>