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
    height.value = barHeight + 100

    svg.value = d3.select('#barComparison')
    .attr('height', height.value)
    .attr('width', width.value)

    scaleX.value = d3.scaleLinear().domain([0, 100]).range([0, width.value])

    svg.value.append('rect')        
        .attr('x', 0)
        .attr('rx', 10)
        .attr('ry', 10)
        .attr('width', d => scaleX.value(100))
        .attr('height', barHeight)
        .attr('fill', '#ccc')

    const legend = svg.value.append('g')
                .attr('class', 'legend')
                .attr('transform', `translate(${0},${height.value-15})`)
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
function updateBarComparison() {
    if (Object.keys(props.data).length == 0 || props.selectedOption == "") return
    let update = svg.value.selectAll('.barComparison')
        .data(Object.keys(props.data[props.selectedOption]).sort((a, b) => {
            return props.data[props.selectedOption][b] - props.data[props.selectedOption][a]
        }))

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
            if(d == 'Crisis') return 'var(--primary)'
            return 'var(--secondary)'
        })

    enter.merge(update)
        .transition()
        .duration(600)
        .attr('width', d => scaleX.value(props.data[props.selectedOption][d]))
        .attr('fill', (d, i) => {
            if(d == 'Crisis') return 'var(--primary)'
            return 'var(--secondary)'
        })

    let text = svg.value.selectAll('.barComparisonText')
        .data(Object.keys(props.data[props.selectedOption]))

    text.exit().remove()

    let enterText = text.enter()
        .append('text')
        .attr('class', 'barComparisonText')
        .attr('x', d => scaleX.value(props.data[props.selectedOption][d])-5)
        .attr('y', (d, i) => barHeight + 35)
        .text(d => props.data[props.selectedOption][d] + "%")
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .attr('font-family', 'Degular')
        .attr('fill', 'var(--text)')

    enterText.merge(text)
        .transition()
        .duration(600)
        .attr('x', d => scaleX.value(props.data[props.selectedOption][d])-5)
        .text(d => props.data[props.selectedOption][d] + "%")

    let line= svg.value.selectAll('.barComparisonLine')
        .data(Object.keys(props.data[props.selectedOption]))

    line.exit().remove()

    let enterLine = line.enter()
    .append('path')
    .attr('class', 'barComparisonLine')
    .attr('d', d => {
        return `M ${scaleX.value(props.data[props.selectedOption][d])-5},${barHeight+5} L ${scaleX.value(props.data[props.selectedOption][d])-5},${barHeight+20}`
    })
    .attr('stroke', 'black')
    .attr('stroke-width', 1)


    enterLine.merge(line)
    .transition()
    .duration(600)
    .attr('d', d => {
        return `M ${scaleX.value(props.data[props.selectedOption][d])-5},${barHeight+5} L ${scaleX.value(props.data[props.selectedOption][d])-5},${barHeight+20}`
    })

}
watch(() => props.data, function (nv) {
    updateBarComparison()
})
watch(() => props.selectedOption, function (nv) {
    updateBarComparison()
})
</script>
<template>
        <div class="w-full">
            <svg :id="'barComparison'" class="w-full" width="100%"></svg>
        </div>
</template>
<style></style>