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
    document.getElementById('menu'+props.updateMenuNumber).style.backgroundImage = `linear-gradient(to right, rgb(${(props.updateMenuNumber+1)*40},${(props.updateMenuNumber+1)*40},${(props.updateMenuNumber+1)*40}) 50%, #cccccc 50%)`;
    document.getElementById('menu'+props.updateMenuNumber).style.backgroundPosition = -100-nv*100+'%';
})
</script>
<template>
    <nav class="fixed bottom-0 w-[100vw]">
        <ul class="grid grid-cols-4 text-center">
            <li id="menu0" class="text-2xl p-2"><NuxtLink to="#intro"><b>Intro</b></NuxtLink></li>
            <li id="menu1" class="text-2xl p-2"><NuxtLink to="#section1"><b>Section 1</b></NuxtLink></li>
            <li id="menu2" class="text-2xl p-2"><NuxtLink to="#section2"><b>Section 2</b></NuxtLink></li>
            <li id="menu3" class="text-2xl p-2"><NuxtLink to="#section3"><b>Section 3</b></NuxtLink></li>
        </ul>
    </nav>
</template>
<style>
li {
    background-color: #cccccc;
    background-position: -100%;
    background-size: 200%;
}
</style>