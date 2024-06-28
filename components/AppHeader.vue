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
    document.getElementById('menu'+props.updateMenuNumber).style.backgroundImage = `linear-gradient(to right, var(--secondaryOpaque) 50%, #fff 50%)`;
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
        <ul class="flex flex-row justify-center text-center gap-8 m-4">
            <NuxtLink to="#" @click="scrollTop"><li id="menu0" ><b>Introduction</b></li></NuxtLink>
            <NuxtLink to="#who-is-concerned"><li id="menu1" ><b>Who is concerned?</b></li></NuxtLink>
            <NuxtLink to="#just-feelings"><li id="menu2" ><b>Just Feelings?</b></li></NuxtLink>
            <NuxtLink to="#effects-on-democracy"><li id="menu3" ><b>Effects on Democracy</b></li></NuxtLink>
            <NuxtLink to="#strengthen-resilience"><li id="menu4" ><b>Crisis Resilience</b></li></NuxtLink>
            <NuxtLink to="#sources"><li id="menu5" ><b>Sources</b></li></NuxtLink>
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