<script setup>
import * as d3 from 'd3'
import { ref, onMounted, watch } from 'vue'
const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    selectedOption: {
        type: String,
        required: false,
        default: () => ''
    }
})
const padding = ref(50)
const svg = ref(null)
const height = ref(0);
const width = ref(0);
const barHeight = 100;
const scaleX = ref(null)
onMounted(() => {
    width.value = document.getElementById('barComparison').getBoundingClientRect().width 
    height.value = document.getElementById('barComparison').getBoundingClientRect().height
    svg.value = d3.select('#barComparison')
    .attr('height', height.value)
    .attr('width', width.value)
    scaleX.value = d3.scaleLinear().domain([0, 100]).range([padding.value, width.value - padding.value])
    svg.value.append('rect')        
        .attr('x', 0 + padding.value)
        .attr('rx', 10)
        .attr('ry', 10)
        .attr('width', d => scaleX.value(100))
        .attr('height', barHeight)
        .attr('fill', '#ccc')
})
function updateBarComparison() {
    if (Object.keys(props.data).length == 0) return
    console.log(Object.keys(props.data[props.selectedOption]))
    let update = svg.value.selectAll('.barComparison')
        .data(Object.keys(props.data[props.selectedOption]))

    update.exit().remove()

    let enter = update.enter()
        .append('rect')
        .attr('class', 'barComparison')
        .attr('x', 0)
        .attr('rx', 10)
        .attr('ry', 10)
        .attr('width', d => scaleX.value(props.data[props.selectedOption][d]))
        .attr('height', barHeight)
        .attr('fill', (d, i) => {
            if (i == 0) return 'var(--primary)'
            return 'var(--secondary)'
        })

    enter.merge(update)
        .transition()
        .duration(600)
        .attr('width', d => scaleX.value(props.data[props.selectedOption][d]))

    let text = svg.value.selectAll('.barComparisonText')
        .data(Object.keys(props.data[props.selectedOption]))

    text.exit().remove()

    let enterText = text.enter()
        .append('text')
        .attr('class', 'barComparisonText text-text')
        .attr('x', d => scaleX.value(props.data[props.selectedOption][d])-15)
        .attr('y', (d, i) => barHeight + 50)
        .text(d => props.data[props.selectedOption][d] + "%")
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .attr('font-family', 'Degular')
        .attr('fill', 'var(--text)')

    enterText.merge(text)
        .transition()
        .duration(600)
        .attr('x', d => scaleX.value(props.data[props.selectedOption][d])-15)
        .text(d => props.data[props.selectedOption][d] + "%")

    let line= svg.value.selectAll('.barComparisonLine')
        .data(Object.keys(props.data[props.selectedOption]))

    line.exit().remove()

    let enterLine = line.enter()
    .append('path')
    .attr('class', 'barComparisonLine')
    .attr('d', d => {
        return `M ${scaleX.value(props.data[props.selectedOption][d])-15},0 L ${scaleX.value(props.data[props.selectedOption][d])-15},15`
    })
    .attr('stroke', 'black')
    .attr('stroke-width', 1)


    enterLine.merge(line)
    .transition()
    .duration(600)
    .attr('d', d => {
        return `M ${scaleX.value(props.data[props.selectedOption][d])-15},${barHeight+10} L ${scaleX.value(props.data[props.selectedOption][d])-15},${barHeight+30}`
    })

}
watch(() => props.data, function (nv) {
    console.log('data changed')
    updateBarComparison()
})
watch(() => props.selectedOption, function (nv) {
    console.log('selectedOption changed')
    updateBarComparison()
})
</script>
<template>
        <div>
            <svg :id="'barComparison'" class="h-[33vh]" width="100%" height="100%"></svg>
        </div>
</template>
<style></style>