<script setup>
import { defineProps, watch, onMounted } from 'vue';
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
onMounted(() => {
    if(window.location.hash != ""){
        let location = window.location.hash.substring(1)
        document.getElementById(location).scrollIntoView({behavior: 'smooth'});
        document.getElementById('menu').style.top = '20px';
        console.log([...document.getElementsByTagName('li')]);
        [...document.getElementsByTagName('li')].forEach((ele,i) => {
            if(ele.dataset.anchor == location){
                for(let j = 0; j < i; j++){
                    document.getElementById('menu'+j).style.backgroundImage = `linear-gradient(to right, #f15060 50%, #fff 50%)`;
                    document.getElementById('menu'+j).style.backgroundPosition = -200+'%';
                }
            }
        })
    }
})
watch(() => props.updateMenuProgress, (nv) => {
    let ele = document.getElementById('menu'+props.updateMenuNumber);
    if(ele != null){
       ele.style.backgroundImage = `linear-gradient(to right, #f15060 50%, #fff 50%)`;
       ele.style.backgroundPosition = -100-nv*100+'%';
    }
})
function scroll(location){
    document.getElementById(location).scrollIntoView({behavior: 'smooth'});
    history.replaceState(null, null, '#'+location)
}

</script>
<template>
    <nav id="menu" class="fixed top-[25px] w-[100vw] z-10">
        <ul class="flex flex-row justify-center text-center gap-8">
            <li @click="scroll('multicrisis')" id="menu0" data-anchor="multicrisis" ><b>Multicrisis</b></li>
            <li @click="scroll('who-is-concerned')" id="menu1" data-anchor="who-is-concerned" ><b>Who is concerned?</b></li>
            <li @click="scroll('felt-realities')" id="menu2" data-anchor="felt-realities" ><b>Felt Realities</b></li>
            <li @click="scroll('effects-on-democracy')" id="menu3" data-anchor="effects-on-democracy" ><b>Effects on Democracy</b></li>
            <li @click="scroll('crisis-resilience')" id="menu4" data-anchor="crisis-resilience" ><b>Crisis Resilience</b></li>
        </ul>
    </nav>
</template>
<style>
</style>