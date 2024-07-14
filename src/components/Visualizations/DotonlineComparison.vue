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
    },
    componentIndex: {
        type: Number,
        required: true
    }
})
const emit = defineEmits(['groupUpdate'])
const padding = ref(20)
const svg = ref(null)
const height = ref(0);
const width = ref(0);
const scaleX = ref(null)
const gap = ref(50)
onMounted(() => {
    gap.value = window.innerHeight * 0.05
    width.value = document.getElementById('dotonlinecomparison'+props.componentIndex).getBoundingClientRect().width 
    height.value = document.getElementById('dotonlinecomparison'+props.componentIndex).getBoundingClientRect().height

    svg.value = d3.select('#dotonlinecomparison'+props.componentIndex)
    .attr('height', height.value)
    .attr('width', width.value)

    scaleX.value = d3.scaleLinear().domain([0, 100]).range([0+padding.value, width.value-padding.value])

    if(props.componentIndex != 0 ){
        const legend = svg.value.append('g')
                .attr('class', 'legend')
                .attr('transform', `translate(${0},${height.value-30})`)
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
    }



    svg.value.append('path')
        .attr('d', `M${scaleX.value(0)},${(padding.value/2)+ (gap.value * 0)} L${scaleX.value(100)},${(padding.value/2)+ (gap.value * 0)}`)
        .attr('stroke', 'black')
        .attr('stroke-width', 0.5)
        .attr('fill', 'none')

        let ticks = [0,10,20,30,40,50,60,70,80,90,100]
        
        svg.value.selectAll('.ticks')
        .data(ticks)
        .enter()
        .append('path')
        .attr('class', 'ticks')
        .attr('d', d => `M${scaleX.value(d)},${(padding.value/2)-(padding.value/3)} L${scaleX.value(d)},${((padding.value/2)+ (gap.value * 0))+(padding.value/3)}`)
        .attr('stroke', 'black')
        .attr('stroke-width', 0.5)
        .attr('fill', 'none')

        ticks = [0,20,40,60,80,100]

        svg.value.selectAll('.tick-labels')
        .data(ticks)
        .enter()
        .append('text')
        .attr('class', 'tick-labels text-xs')
        .attr('x', d => scaleX.value(d))
        .attr('y', (padding.value) + 30)
        .attr('text-anchor', 'middle')
        .text(d => d + '%')
})
function updateDots(array,group,index){
    let line = svg.value.selectAll('.line'+group)
        .data(array)

    line.exit().remove()

    let enterLine = line.enter()
        .append('line')
        .attr('class', 'line'+group)
        .attr('x1', d => scaleX.value(array[0]))
        .attr('y1', (padding.value/2) + (gap.value * index))
        .attr('x2', d => scaleX.value(array[1]))
        .attr('y2', (padding.value/2)+ (gap.value * index))
        .attr('stroke', 'black')
        .attr('stroke-width', 2.5)

    enterLine.merge(line)
        .transition()
        .duration(600)
        .attr('x1', d => scaleX.value(array[0]))
        .attr('x2', d => scaleX.value(array[1]))

    let update = svg.value.selectAll('.dots'+group)
        .data(array)

    update.exit().remove()

    let enter = update.enter()
        .append('circle')
        .attr('class', 'dots'+group)
        .attr('cx', d => scaleX.value(d))
        .attr('cy', (padding.value/2)+ (gap.value * index))
        .attr('r', 8)
        .attr('fill', (d, i) => {
            if (i == 0) return 'var(--primary)'
            return 'var(--secondary)'
        })

    enter.merge(update)
        .transition()
        .duration(600)
        .attr('cx', d => scaleX.value(d))

}
function updateDotonlineComparison() {
    if (Object.keys(props.data).length == 0 || props.selectedOption == "") return
    updateDots([props.data[props.selectedOption]["Crisis"], props.data[props.selectedOption]["NoCrisis"]],0,0)
    //updateDots([props.data[props.selectedOption]["DoesntLikeAFDCrisis"], props.data[props.selectedOption]["DoesntLikeAFDNoCrisis"]],1,1)

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
        <div :class="componentIndex == 0? 'h-[50px]':'h-[100px]', 'w-full'">
            <svg :id="'dotonlinecomparison'+componentIndex" height="100%" width="100%"></svg>
        </div>
</template>
<style></style>