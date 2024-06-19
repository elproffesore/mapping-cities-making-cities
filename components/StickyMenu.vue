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
    document.getElementById('menu'+props.updateMenuNumber).style.backgroundImage = `linear-gradient(to right, rgb(${(props.updateMenuNumber+1)*120},${(props.updateMenuNumber+1)*120},${(props.updateMenuNumber+1)*120}) 50%, #fff 50%)`;
    document.getElementById('menu'+props.updateMenuNumber).style.backgroundPosition = -100-nv*100+'%';
})
</script>
<template>
    <nav class="fixed bottom-0 w-[100vw]">
        <ul class="grid grid-cols-6 text-center">
            <li id="menu0" ><NuxtLink to="#intro"><b>Intro</b></NuxtLink></li>
            <li id="menu1" ><NuxtLink to="#section1"><b>Section 1</b></NuxtLink></li>
            <li id="menu2" ><NuxtLink to="#section2"><b>Section 2</b></NuxtLink></li>
            <li id="menu3" ><NuxtLink to="#section3"><b>Section 3</b></NuxtLink></li>
            <li id="menu4" ><NuxtLink to="#section4"><b>Section 4</b></NuxtLink></li>
            <li id="menu5" ><NuxtLink to="#credits"><b>Credits</b></NuxtLink></li>

        </ul>
    </nav>
</template>
<style>
li {
    box-shadow: 1px 1px 5px rgba(0,0,0,0.2);
    background-color: #fff;
    background-position: -100%;
    background-size: 200%;
}
</style>