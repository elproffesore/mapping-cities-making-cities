<script setup>
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
    document.getElementById('menu'+props.updateMenuNumber).style.backgroundImage = `linear-gradient(to right, var(--primary) 50%, #fff 50%)`;
    document.getElementById('menu'+props.updateMenuNumber).style.backgroundPosition = -100-nv*100+'%';
})
function scrollTop() {
    window.scrollTo({
        top:0,
        behavior: 'smooth'
    });
}
</script>
<template>
    <nav class="sticky top-[2.5vh] w-[100vw] z-10">
        <ul  class="flex flex-row justify-center text-center gap-8 m-4">
            <li id="menu0" ><NuxtLink to="#" @click="scrollTop"><b>Introduction</b></NuxtLink></li>
            <li id="menu2" ><NuxtLink to="#who-is-concerned"><b>Who is concerned?</b></NuxtLink></li>
            <li id="menu3" ><NuxtLink to="#just-feelings"><b>Just Feelings?</b></NuxtLink></li>
            <li id="menu4" ><NuxtLink to="#effects-on-democracy"><b>Effects on Democracy</b></NuxtLink></li>
            <li id="menu5" ><NuxtLink to="#strengthen-resilience"><b>Crisis Resilience</b></NuxtLink></li>
            <li id="menu6" ><NuxtLink to="#credits"><b>Credits</b></NuxtLink></li>
        </ul>
    </nav>
</template>
<style>
 li {
    font-weight: 200;
    font-size: 14px;
    padding: 2px 35px;
    border: 1px solid #000;
    border-radius: 30px;
    box-shadow: 0px 4px 4px rgba(0,0,0,0.25);
    background-color: #fff;
    background-position: -100%;
    background-size: 200%;
} 

</style>