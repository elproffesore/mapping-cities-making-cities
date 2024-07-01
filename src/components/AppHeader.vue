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
    console.log(props.updateMenuNumber, nv);
    document.getElementById('menu'+props.updateMenuNumber).style.backgroundImage = `linear-gradient(to right, #f15060 50%, #fff 50%)`;
    document.getElementById('menu'+props.updateMenuNumber).style.backgroundPosition = -100-nv*100+'%';
})
</script>
<template>
    <nav class="fixed top-[2vh] w-[100vw] z-10">
        <ul class="flex flex-row justify-center text-center gap-8 m-4">
            <a to="#multicrisis"><li id="menu0" ><b>Multicrisis</b></li></a>
            <a to="#who-is-concerned"><li id="menu1" ><b>Who is concerned?</b></li></a>
            <a to="#just-feelings"><li id="menu2" ><b>Just Feelings?</b></li></a>
            <a to="#effects-on-democracy"><li id="menu3" ><b>Effects on Democracy</b></li></a>
            <a to="#strengthen-resilience"><li id="menu4" ><b>Crisis Resilience</b></li></a>
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
} 
</style>