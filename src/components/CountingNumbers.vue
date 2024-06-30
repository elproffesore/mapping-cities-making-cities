<script setup>
</script>
<template>
    <div class="flex flex-col">
        <span class="text-number text-primary mb-[-130px] tracking-[-0.05em]"><slot name="number" ></slot><span class="text-8xl">%</span></span>
        <span class="text-text"><slot name="text"></slot></span>
    </div>
</template>
<style>
</style>