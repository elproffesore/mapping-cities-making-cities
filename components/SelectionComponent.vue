<script setup>
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
    <div class="flex gap-3 border cursor-pointer px-4 py-px">
        <p v-for="(option, index) in options" :key="index" @click="changeSelection(index)" class="transition-all duration-300 px-4 py-px rounded" :class="index==selected? 'bg-primary':''">
            {{ option }}
        </p>
    </div>
</template>
<style >

</style>