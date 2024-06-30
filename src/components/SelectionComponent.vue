<script setup>
import { defineProps, ref } from 'vue';
const props = defineProps({
    options: {
        type: Array,
        required: true
    },
})
const selected = ref(0);
const changeSelection = (index) => {
    selected.value = index;
}
</script>
<template>
    <div class="relative flex gap-3 border cursor-pointer px-4 py-px">
        <div class="absolute h-[100%] bg-primary" :style="{left:((100/options.length)*selected)+'px', width: (100/options.length) + 'px'  }"></div>
        <p v-for="(option, index) in options" :key="index" @click="changeSelection(index)" class="transition-all duration-300 px-4 py-px rounded" :class="index==selected? '':''">
            {{ option }}
        </p>
    </div>
</template>
<style >

</style>