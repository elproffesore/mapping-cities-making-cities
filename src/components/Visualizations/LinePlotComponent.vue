<script setup>
import * as d3 from 'd3'
import { ref, onMounted,watch,defineEmits } from 'vue'
const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    componentIndex: {
        type: Number,
        required: true
    },
    selectedOption: {
        type: String,
        required: false,
        default: () => ""
    }
})
const padding = ref(50)
const paddingLegend = ref(50)
const width = ref(0)
const height = ref(0)
const svg = ref(null)
const scaleX = ref(null)
const scaleY = ref(null)
const emit = defineEmits(['groupUpdate'])
onMounted(() => {
    width.value = document.getElementById('linePlot'+props.componentIndex).getBoundingClientRect().width 
    height.value = document.getElementById('linePlot'+props.componentIndex).getBoundingClientRect().height
    scaleX.value = d3.scaleLinear().domain([new Date('2023-06-01'), new Date('2024-02-01')]).range([padding.value, width.value ])
    scaleY.value = d3.scaleLinear().domain([100, 0]).range([padding.value, height.value - padding.value])
    
    svg.value = d3.select('#linePlot'+props.componentIndex)
        .attr('width', width.value)
        .attr('height', height.value)
    
    let ticks = [0, 20, 40, 60, 80, 100]
    svg.value.append('g')
        .attr('class', 'y-axis')
        .attr('transform', `translate(${padding.value},0)`)
        .selectAll('.y-axis-ticks')
        .data(ticks)
        .enter()
        .append('path')
        .attr('class', 'y-axis-ticks')
        .attr('d', d => `M${0},${scaleY.value(d)} L${width.value-padding.value},${scaleY.value(d)}`)
        .attr('stroke', 'black')
        .attr('stroke-width', 0.5)
        .attr('fill', 'none')
        .attr('opacity', 0.2)
        .attr('stroke-dasharray', '5 3')

    svg.value.append('g')
        .attr('transform', `translate(0,0)`)
        .selectAll('class', 'y-axis-percentages')
        .data(ticks)
        .enter()
        .append('text')
        .attr('text-anchor', 'right')
        .attr('alignment-baseline', 'middle')
        .attr('class', 'y-axis-percentages text-xs')
        .attr('x', 0)
        .attr('y', d => scaleY.value(d))
        .text(d => d + '%')

    svg.value.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(${0},${height.value - padding.value})`)
        .call(d3.axisBottom(scaleX.value).ticks(4).tickFormat(d3.timeFormat('%b %Y')))
})
function updateLinePlot() {
    const legendColors = ['var(--primary)','white', 'black', 'gray']
    svg.value.selectAll('.legend').remove()
    svg.value.selectAll('.line').remove()
    svg.value.selectAll('polygon').remove()
    svg.value.selectAll('.legend-text').remove()
    svg.value.selectAll('.legend-rect').remove()
    Object.keys(props.data[props.selectedOption]).map((option,optioni) => {
            const legend = svg.value.append('g')
                .attr('class', 'legend')
                .attr('transform', `translate(${0},${height.value-15})`)
                .selectAll('.legend-item')
                .data(Object.keys(props.data[props.selectedOption]))
                .enter()
                .append('g')
                .attr('class', 'legend-item')
                .attr('transform', (d, i) => `translate(${i *(width.value/Object.keys(props.data[props.selectedOption]).length)},0)`)

            legend.append('rect')
                .attr('x', 0)
                .attr('y', 0)
                .attr('class', 'legend-rect')
                .attr('width', 10)
                .attr('height', 10)
                .attr('fill', 'var(--primary)')
                .attr('opacity',() => 0.2 + optioni * 0.2)

            legend.append('text')
                .attr('x', 15)
                .attr('y', 10)
                .attr('class', 'text-xs legend-text')
                .text(d => d);


            // const line = d3.line()
            // .x(d => scaleX.value(new Date(d)))
            // .y(d => scaleY.value(props.data[props.selectedOption][option][d]))
        
            // let ele = svg.value
            // .append('path')
            // .attr('transform', `translate(${padding.value},0)`)
            // .attr('d', line(Object.keys(props.data[props.selectedOption][option])))
            // .attr('class', 'line')
            // .attr('stroke',legendColors[optioni])
            // .attr('stroke-width', 1.5)
            // .attr('fill', 'none')
            // .attr('stroke-dasharray', '500,500')
            // .attr('stroke-dashoffset', 510)
            // .transition()
            // .duration(2000)
            // .attr('stroke-dashoffset', 0)
            
            svg.value.append('polygon')
            .attr('points', [
                [scaleX.value(new Date('2023-06-01')), scaleY.value(0)],
                Object.keys(props.data[props.selectedOption][option]).map(k => [scaleX.value(new Date(k)), scaleY.value(0)]),
                [scaleX.value(new Date('2024-02-01')), scaleY.value(0)]
            ])
            .attr('fill', 'var(--primary)')
            .attr('opacity',() => 0.2 + optioni * 0.2)
            .transition()
            .duration(2000)
            .attr('points', [
                [scaleX.value(new Date('2023-06-01')), scaleY.value(0)],
                Object.keys(props.data[props.selectedOption][option]).map(k => [scaleX.value(new Date(k)), scaleY.value(props.data[props.selectedOption][option][k])]),
                [scaleX.value(new Date('2024-02-01')), scaleY.value(0)]
            ])
        })
}
watch(() => props.data,function(nv) {
    emitGroupUpdate()
    updateLinePlot()
})
watch(() => props.selectedOption,function(nv) {
    emitGroupUpdate()
    updateLinePlot()
})
function emitGroupUpdate() {
    let highestGroup  = Object.keys(props.data[props.selectedOption]).sort((a,b) => props.data[props.selectedOption][b]['2024-02-01'] - props.data[props.selectedOption][a]['2024-02-01'])[0]
    emit('groupUpdate', highestGroup, props.data[props.selectedOption][highestGroup]['2024-02-01'] ) 
}
</script>
<template>
        <div>
            <svg :id="'linePlot'+componentIndex" class="h-[33vh]" width="100%" height="100%"></svg>
        </div>
</template>
<style></style>