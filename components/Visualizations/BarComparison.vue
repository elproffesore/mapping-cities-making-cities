<script setup>
import * as d3 from 'd3'
import { ref, onMounted } from 'vue'
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
    }
})
const padding = ref(0)
const width = ref(0)
const svg = ref(null)
const height = ref(150);
const barHeight = 30;
const index = ref(0)
onMounted(() => {
    width.value = window.innerWidth * 0.4;
    svg.value = d3.select('#barComparison')
        .attr('width', width.value)
        .attr('height', height.value)

    svg.value.append('line')
        .attr('class', 'axisLineBarComparison')
        .attr('stroke', 'black')
        .attr('x1', 0 + padding.value)
        .attr('x2', 0 + padding.value)
        .attr('y1', 0)
        .attr('y2', 200)

    updateBarComparison()
})
function updateBarComparison() {
    console.log([props.data[index.value].crisis, props.data[index.value].noCrisis])
    const scaleX = d3.scaleLinear().domain([0, 100]).range([0, width.value - padding.value])
    let update = svg.value.selectAll('.barComparison')
    .data([props.data[index.value].crisis, props.data[index.value].noCrisis])

    update.exit().remove()

    let enter = update.enter()
        .append('rect')
        .attr('class', 'barComparison')
        .attr('x', 0+padding.value)
        .attr('y', (d, i) => (i*height.value/2)+((height.value/4)-barHeight/2))
        .attr('width', d => scaleX(d))
        .attr('height', barHeight)
        .attr('fill', (d,i) => {
            if(i == 0) return '#f00'
            return '#f004'
        })
    
    enter.merge(update)
    .transition()
    .duration(600)
    .attr('width', d => scaleX(d))
    .attr('height', barHeight)
}
watch(() => props.progress, function (nv) {
    //check if the current index  is the same as the component index
    if(props.currentIndex != props.componentIndex) return
    let indexNew = useProgressCalculator(props.progress,props.data.length-1)
    if(indexNew == index.value) return
    index.value = indexNew
    console.log(index.value)
    // if yes update the visualization according to the current scroll state
    updateBarComparison()
})
function manuelInspection(i){
    index.value = i
    updateBarComparison()
}
</script>
<template>
    <GridComponent>
        <div class="self-start sticky top-[35vh] h-[30vh] col-span-5"
            :class="left ? 'col-start-8' : 'col-start-1'">
            <svg id="barComparison"></svg>
            <SelectionComponent :options="data.map(d => d.crisis)"></SelectionComponent>
        </div>
        <div class="col-span-6" :class="left ? '' : 'col-start-7'">
            <div v-for="(fact,i) in data" :key="i" class="h-[50vh] flex items-center">
                <p><span class="highlight">{{ fact.crisis }}%</span> <span v-html="fact.who"></span></p>
            </div>
        </div>
    </GridComponent>
</template>
<style>
</style>