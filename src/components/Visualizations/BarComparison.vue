<script setup>
import * as d3 from 'd3'
import { ref, onMounted, watch } from 'vue'
import useProgressCalculator from '../../functions/useProgressCalculator.js'
const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    left: {
        type: Boolean,
        required: false
    },
    progress: {
        type: Number,
        required: true
    },
    currentIndex: {
        type: Number,
        required: true
    },
    componentIndex: {
        type: Number,
        required: true
    },
    scrollable: {
        type: Boolean,
        required: false,
        default: () => false
    },
    maxValue: {
        type: Number,
        required: false,
        default: () => 7
    },
    selectedOption: {
        type: String,
        required: false,
        default: () => ''
    }
})
const option = ref(props.selectedOption)
const padding = ref(125)
const svg = ref(null)
const height = ref(200);
const barHeight = 30;
onMounted(() => {
    svg.value = d3.select('#barComparison' + props.componentIndex).attr('height', height.value)
})
function updateBarComparison() {
    if (option.value == '') {
        setTimeout(() => {
            option.value = Object.keys(props.data)[0]
            updateBarComparison()
        }, 100);
        return
    }
    let width = document.getElementById('barComparison' + props.componentIndex).getBoundingClientRect().width
    const scaleX = d3.scaleLinear().domain([0, 50]).range([0, width - padding.value - 50])
    let update = svg.value.selectAll('.barComparison')
        .data(Object.keys(props.data[option.value]))

    update.exit().remove()

    let enter = update.enter()
        .append('rect')
        .attr('class', 'barComparison')
        .attr('x', 0 + padding.value)
        .attr('y', (d, i) => i * (barHeight + 15))
        .attr('rx', 5)
        .attr('ry', 5)
        .attr('width', d => {
            return scaleX(
                props.data[option.value][d][props.maxValue - 2] +
                props.data[option.value][d][props.maxValue - 1] +
                props.data[option.value][d][props.maxValue]
            )
        })
        .attr('height', barHeight)
        .attr('fill', (d, i) => {
            if (i == 0) return 'var(--primary)'
            return 'none'
        })
        .attr('stroke', 'var(--primary)')

    enter.merge(update)
        .transition()
        .duration(600)
        .attr('y', (d, i) => i * (barHeight + 15))
        .attr('width', d => {
            return scaleX(
                props.data[option.value][d][props.maxValue - 2] +
                props.data[option.value][d][props.maxValue - 1] +
                props.data[option.value][d][props.maxValue]
            )
        })
        .attr('height', barHeight)

    let text = svg.value.selectAll('.barComparisonText')
        .data(Object.keys(props.data[option.value]))

    text.exit().remove()

    let enterText = text.enter()
        .append('text')
        .attr('class', 'barComparisonText')
        .attr('x', 0)
        .attr('y', (d, i) => i * (barHeight + 15) + 15)
        .text(d => d)
        .attr('text-anchor', 'start')
        .attr('fill', 'var(--text)')
        .attr('font-size', '12px')

    enterText.merge(text)
        .attr('y', (d, i) => i * (barHeight + 15) + 20)
        .transition()
        .duration(600)
        .text(d => d)

    let text1 = svg.value.selectAll('.barComparisonText1')
        .data(Object.keys(props.data[option.value]))

    text1.exit().remove()

    let enterText1 = text.enter()
        .append('text')
        .attr('class', 'barComparisonText1')
        .attr('x', d => {
            return scaleX(
                props.data[option.value][d][props.maxValue - 2] +
                props.data[option.value][d][props.maxValue - 1] +
                props.data[option.value][d][props.maxValue]
            ) + padding.value + 10
        })
        .attr('y', (d, i) => i * (barHeight + 15) + 20)
        .text(d => {
            return (props.data[option.value][d][props.maxValue - 2] +
                props.data[option.value][d][props.maxValue - 1] +
                props.data[option.value][d][props.maxValue]) + "%"
        })
        .attr('text-anchor', 'start')
        .attr('fill', 'var(--text)')
        .attr('font-size', '12px')

    enterText1.merge(text1)
        .attr('y', (d, i) => i * (barHeight + 15) + 20)
        .transition()
        .duration(600)
        .attr('x', d => {
            return scaleX(
                props.data[option.value][d][props.maxValue - 2] +
                props.data[option.value][d][props.maxValue - 1] +
                props.data[option.value][d][props.maxValue]
            ) + padding.value + 10
        })
        .text(d => {
            return (props.data[option.value][d][props.maxValue - 2] +
                props.data[option.value][d][props.maxValue - 1] +
                props.data[option.value][d][props.maxValue]) + "%"
        })

}
watch(() => props.data, function (nv) {
    updateBarComparison()
})
watch(() => props.selectedOption, function (nv) {
    option.value = nv
    updateBarComparison()
})
watch(() => props.progress, function (nv) {
    //check if the current index  is the same as the component index
    if (props.currentIndex != props.componentIndex || !props.scrollable) return
    let indexNew = useProgressCalculator(props.progress, props.data.length - 1)
    if (indexNew == index.value) return
    index.value = indexNew
    console.log(index.value)
    // if yes update the visualization according to the current scroll state
    updateBarComparison()
})
</script>
<template>
    <div class="flex flex-col">
        <div :id="'barSelector' + componentIndex">
            <slot v-if="scrollable"></slot>
            <slot v-if="!scrollable"></slot>
        </div>
        <div>
            <svg :id="'barComparison' + componentIndex" width="100%"></svg>
        </div>
    </div>
</template>
<style></style>