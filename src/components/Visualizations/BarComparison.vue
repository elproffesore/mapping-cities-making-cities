<script setup>
import * as d3 from 'd3'
import { ref, onMounted,watch } from 'vue'
import useProgressCalculator from '../../functions/useProgressCalculator.js'
const props = defineProps({
    data: {
        type: Array,
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
    }
})
const selectedGroup = ref('')
const padding = ref(125)
const svg = ref(null)
const height = ref(100);
const barHeight = 30;
const index = ref(0)
onMounted(() => {
    svg.value = d3.select('#barComparison')
        .attr('height', height.value)
        selectedGroup.value = document.querySelector('#barSelector > select')[0].innerText
    
    updateBarComparison()
})
function updateBarComparison() {
    let width = document.getElementById('barComparison').getBoundingClientRect().width 
    const scaleX = d3.scaleLinear().domain([0, 100]).range([0, width - padding.value-50])
    let update = svg.value.selectAll('.barComparison')
    .data([props.data[index.value].crisis, props.data[index.value].noCrisis])

    update.exit().remove()

    let enter = update.enter()
        .append('rect')
        .attr('class', 'barComparison')
        .attr('x', 0+padding.value)
        .attr('y', (d, i) => (i*height.value/2)+((height.value/4)-barHeight/2))
        .attr('rx',5)
        .attr('ry',5)
        .attr('width', d => scaleX(d))
        .attr('height', barHeight)
        .attr('fill', (d,i) => {
            if(i == 0) return 'var(--primary)'
            return 'none'
        })
        .attr('stroke', 'var(--primary)')
    
    enter.merge(update)
    .transition()
    .duration(600)
    .attr('width', d => scaleX(d))
    .attr('height', barHeight)

    let text = svg.value.selectAll('.barComparisonText')
    .data([props.data[index.value].crisis, props.data[index.value].noCrisis])

    text.exit().remove()

    let enterText = text.enter()
        .append('text')
        .attr('class', 'barComparisonText')
        .attr('x', 0)
        .attr('y', (d, i) => (i*height.value/2)+((height.value/4)+5))
        .text(d => d)
        .attr('text-anchor', 'start')
        .attr('fill', 'var(--text)')
        .attr('font-size', '12px')
        
    enterText.merge(text)
    .transition()
    .duration(600)
    .text((d,i) => {
        if(i == 0) return selectedGroup.value
        return "Other"
    })

    let text1 = svg.value.selectAll('.barComparisonText1')
    .data([props.data[index.value].crisis, props.data[index.value].noCrisis])

    text.exit().remove()

    let enterText1 = text.enter()
        .append('text')
        .attr('class', 'barComparisonText1')
        .attr('x', d => scaleX(d)+padding.value+10)
        .attr('y', (d, i) => (i*height.value/2)+((height.value/4)+5))
        .text(d => d)
        .attr('text-anchor', 'start')
        .attr('fill', 'var(--text)')
        .attr('font-size', '12px')
        
    enterText1.merge(text1)
    .transition()
    .duration(600)
    .attr('x', d => scaleX(d)+padding.value+5)
    .text(d => d+ "%")

}
watch(() => props.progress, function (nv) {
    //check if the current index  is the same as the component index
    if(props.currentIndex != props.componentIndex || !props.scrollable) return
    let indexNew = useProgressCalculator(props.progress,props.data.length-1)
    if(indexNew == index.value) return
    index.value = indexNew
    console.log(index.value)
    // if yes update the visualization according to the current scroll state
    updateBarComparison()
})
function updateSelection(target){
    index.value = target.explicitOriginalTarget.value
    selectedGroup.value = target.explicitOriginalTarget[target.explicitOriginalTarget.value].innerText
    updateBarComparison()
}
</script>
<template>
        <div class="row-start-2 self-start h-[30vh] col-span-5"
            :class="left ? 'col-start-7' : 'col-start-2', scrollable? 'sticky top-[35vh]':''">
            <svg id="barComparison" width="100%"></svg>
            <hr class="h-1 border-t-[0.5px] mt-12">
            <p class="text-xs">Source</p>
        </div>

        <div class="row-start-2 col-span-4 col-start-2" 
        :class="left ? '' : 'col-start-8'" id="barSelector">
            <slot v-if="scrollable"></slot>
            <slot v-if="!scrollable" :updateSelection="updateSelection"></slot>
        </div>
</template>
<style>
</style>