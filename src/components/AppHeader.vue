<script setup>
import { defineProps, watch } from 'vue';
const props = defineProps({
    updateMenuNumber: {
        type: Number,
        required: false
    },
    updateMenuProgress: {
        type: Number,
        required: false
    }
})
watch(() => props.updateMenuProgress, (nv) => {
    document.getElementById('menu'+props.updateMenuNumber).style.backgroundImage = `linear-gradient(to right, #f15060 50%, #fff 50%)`;
    document.getElementById('menu'+props.updateMenuNumber).style.backgroundPosition = -100-nv*100+'%';
})
function scroll(location){
    document.getElementById(location).scrollIntoView({behavior: 'smooth'});}
</script>
<template>
    <nav class="sticky top-[50px] w-[100vw] z-10">
        <ul class="flex flex-row justify-center text-center gap-8">
            <li @click="scroll('multicrisis')" id="menu0" ><b>Multicrisis</b></li>
            <li @click="scroll('who-is-concerned')" id="menu1" ><b>Who is concerned?</b></li>
            <li @click="scroll('felt-realities')" id="menu2" ><b>Felt Realities</b></li>
            <li @click="scroll('effects-on-democracy')" id="menu3" ><b>Effects on Democracy</b></li>
            <li @click="scroll('crisis-resilience')" id="menu4" ><b>Crisis Resilience</b></li>
        </ul>
    </nav>
</template>
<style>
 li {
    font-weight: 200;
    font-size: 14px;
    color: #000;
    padding: 6px 35px;
    border: 0.2px solid #000;
    border-radius: 30px;
    box-shadow: 0px 4px 4px rgba(0,0,0,0.25);
    background-color: #fff;
    background-position: -100%;
    background-size: 200%;
    cursor: pointer;
} 
</style>