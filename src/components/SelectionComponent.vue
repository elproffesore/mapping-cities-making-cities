<script setup>
import { defineProps} from 'vue';
const props = defineProps({
    options: {
        type: Array,
        required: true
    },
})
</script>
<template>
    <select ref="selection" class="w-min p-1 ">
        <option v-for="(option, index) in options" :key="index" :value="index">
            {{ option }}
        </option>
    </select>
</template>
<style >

</style>