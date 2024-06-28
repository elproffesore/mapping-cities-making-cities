<script setup>
</script>
<template>
    <div class="flex flex-col">
        <span class="text-[24em] text-primary"><slot name="number"></slot><span class="text-8xl">%</span></span>
        <span class="text-text mt-[-30%]"><slot name="text"></slot></span>
    </div>
</template>
<style>
</style>