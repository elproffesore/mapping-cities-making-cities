<script setup>
import * as d3 from 'd3'
import { ref, onMounted, watch, defineEmits } from 'vue'
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
const emit = defineEmits(['groupUpdate'])
const padding = ref(25)
const svg = ref(null)
const height = ref(0);
const width = ref(0);
const scaleX = ref(null)
onMounted(() => {
    width.value = document.getElementById('dotonlinecomparison').getBoundingClientRect().width 
    height.value = document.getElementById('dotonlinecomparison').getBoundingClientRect().height

    svg.value = d3.select('#dotonlinecomparison')
    .attr('height', height.value)
    .attr('width', width.value)

    scaleX.value = d3.scaleLinear().domain([0, 100]).range([0+padding.value, width.value-padding.value])
    svg.value.append('path')
    .attr('d', `M${scaleX.value(0)},${padding.value/2} L${scaleX.value(100)},${padding.value/2}`)
    .attr('stroke', 'black')
    .attr('stroke-width', 0.5)
    .attr('fill', 'none')
    let ticks = [0,10,20,30,40,50,60,70,80,90,100]
    svg.value.selectAll('.ticks')
    .data(ticks)
    .enter()
    .append('path')
    .attr('class', 'ticks')
    .attr('d', d => `M${scaleX.value(d)},${padding.value/4} L${scaleX.value(d)},${3*(padding.value/4)}`)
    .attr('stroke', 'black')
    .attr('stroke-width', 0.5)
    .attr('fill', 'none')

    svg.value.selectAll('.tick-labels')
    .data(ticks)
    .enter()
    .append('text')
    .attr('class', 'tick-labels text-[7pt] md:text-[10pt]')
    .attr('x', d => scaleX.value(d))
    .attr('y', padding.value/2 + 20)
    .attr('text-anchor', 'middle')
    .text(d => d + '%')


    const legend = svg.value.append('g')
                .attr('class', 'legend')
                .attr('transform', `translate(${padding.value},${padding.value+30})`)
                .selectAll('.legend-item')
                .data(['No Crisis Feeling','Crisis Feeling'])
                .enter()
                .append('g')
                .attr('class', 'legend-item')
                .attr('transform', (d, i) => `translate(${i * 125},0)`)
            
            legend.append('rect')
                .attr('x', 0)
                .attr('y', 0)
                .attr('rx',2)
                .attr('class', 'legend-rect')
                .attr('width', 10)
                .attr('height', 10)
                .attr('fill', (d,i) => d == 'Crisis Feeling' ? 'var(--primary)' : 'var(--secondary)')

            legend.append('text')
                .attr('x', 15)
                .attr('y', 10)
                .attr('class', 'text-xs legend-text')
                .text(d => d);
})
function updateDotonlineComparison() {
    if (Object.keys(props.data).length == 0 || props.selectedOption == "") return
    let update = svg.value.selectAll('.dots')
        .data(Object.keys(props.data[props.selectedOption]))

    update.exit().remove()

    let enter = update.enter()
        .append('circle')
        .attr('class', 'dots')
        .attr('cx', d => scaleX.value(props.data[props.selectedOption][d]))
        .attr('cy', padding.value/2)
        .attr('r', 5)
        .attr('fill', (d, i) => {
            if (i == 0) return 'var(--primary)'
            return 'var(--secondary)'
        })

    enter.merge(update)
        .transition()
        .duration(600)
        .attr('cx', d => scaleX.value(props.data[props.selectedOption][d]))
}
watch(() => props.data, function (nv) {
    updateDotonlineComparison()
    emitGroupUpdate()
})
watch(() => props.selectedOption, function (nv) {
    updateDotonlineComparison()
    emitGroupUpdate()
})
function emitGroupUpdate() {
    if (Object.keys(props.data).length == 0 || props.selectedOption == "") return
    let groups  = Object.keys(props.data[props.selectedOption]).sort((a,b) => props.data[props.selectedOption][b] - props.data[props.selectedOption][a])
    emit('groupUpdate', groups[0], props.data[props.selectedOption][groups[0]], groups[1], props.data[props.selectedOption][groups[1]]) 
}
</script>
<template>
        <div class="h-[100px] w-full">
            <svg :id="'dotonlinecomparison'" width="100%"></svg>
        </div>
</template>
<style></style>