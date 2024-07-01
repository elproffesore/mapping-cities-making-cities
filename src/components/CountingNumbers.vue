<script setup>
</script>
<template>
    <div class="flex flex-col number ">

        <span class="text-8xl text-primary p-0"><slot name="number" ></slot><span class="text-8xl">%</span></span>
        <span class="text-2xl p-0 mt-[-5%]"><slot name="text"></slot></span>

    </div>
</template>
<style>
</style>