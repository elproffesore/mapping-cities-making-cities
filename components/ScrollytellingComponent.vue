<script setup>
import { ref } from 'vue'

import scrollama from 'scrollama'

const props = defineProps({
    offset: {
        type: [Number, String],
        required: false,
        default: () => 0.5
    },
    progress: {
        type: Boolean,
        required: false,
        default: () => false
    },
    threshold: {
        type: Number,
        required: false,
        default: () => 4
    },
    once: {
        type: Boolean,
        required: false,
        default: () => false
    },
    debug: {
        type: Boolean,
        required: false,
        default: () => false
    }
})

const parent = ref(null)

const scroller = scrollama()

const emit = defineEmits(['step-progress', 'step-enter', 'step-exit'])
onMounted(() => {
    scroller.destroy()

    const { offset, progress, threshold, once, debug } = props

    const step = [...parent.value.children]

    scroller
        .setup({ step, offset, progress, threshold, once, debug})
        .onStepEnter(resp => {
            emit('step-enter', resp);
        })
        .onStepProgress(resp => {
            emit('step-progress', resp)
        })
        .onStepExit(resp => {
            emit('step-exit', resp);
        })
})
</script>
<template>
    <div>
        <div ref="parent">
            <slot></slot>
        </div>
    </div>
</template>