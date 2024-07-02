<script setup>
import * as d3 from 'd3'
import { ref, onMounted,watch } from 'vue'
import useProgressCalculator from '../../functions/useProgressCalculator.js'
import SourceComponent from '../SourceComponent.vue'
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
const padding = ref(50)
const width = ref(0)
const svg = ref(null)
const index = ref(0)
const scaleX = ref(null)
onMounted(() => {
    width.value = document.getElementById('pointOnLineComparison'+props.componentIndex).getBoundingClientRect().width 
    scaleX.value = d3.scaleLinear().domain([0, 100]).range([0+15, width.value - 15])

    svg.value = d3.select('#pointOnLineComparison'+props.componentIndex)
        .attr('width', width.value)

    let percent = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    svg.value.selectAll('.axisTextPointComparison')
        .data(percent)
        .enter()
        .append('text')
        .attr('class', 'axisTextPointComparison')
        .attr('x', d => scaleX.value(d))
        .attr('y', 20)
        .text(d => d + '%')
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')

    svg.value.selectAll('.axisTicksPointComparison')
        .data(percent)
        .enter()
        .append('line')
        .attr('stroke', '#0002')
        .attr('class', 'axisTicksPointComparison')
        .attr('x1', (d, i) => scaleX.value(d))
        .attr('x2', (d, i) => scaleX.value(d))
        .attr('y1', (d, i) => 45)
        .attr('y2', (d, i) => 55)

    svg.value.append('line')
        .attr('stroke', '#0002')
        .attr('class', 'axisLinePointComparison')
        .attr('x1', scaleX.value(0))
        .attr('x2', scaleX.value(100))
        .attr('y1', (_, i) => (i + 1) * 50)
        .attr('y2', (_, i) => (i + 1) * 50)

    updatePointOnLineComparison()
})
function updatePointOnLineComparison() {
    let updatePointComparison = svg.value
        .selectAll('.pointComparison')
        .data([props.data[index.value].crisis, props.data[index.value].noCrisis])

    updatePointComparison.exit().remove()

    let enterPointComparison = updatePointComparison
        .enter()
        .append('circle')
        .attr('class', 'pointComparison')
        .attr('cx', (d) => scaleX.value(d))
        .attr('cy', 50)
        .attr('r', 4)
        .attr('fill', (d, i) => {
            if (i == 0) {
                return 'var(--primary)'
            } else {
                return '#f003'
            }
        })

    enterPointComparison.merge(updatePointComparison)
        .transition()
        .duration(600)
        .attr('cx', (d) => scaleX.value(d))
        .attr('cy', 50)
}
watch(() => props.progress, function (nv) {
    if((props.currentIndex != props.componentIndex) || !props.scrollable) return
    let indexNew = useProgressCalculator(props.progress,props.data.length-1)
    if(indexNew == index.value) return
    index.value = indexNew
    // if yes update the visualization according to the current scroll state
    updatePointOnLineComparison()
})
function updateSelection(target) {
    index.value = target.explicitOriginalTarget.value
    updatePointOnLineComparison()
}
</script>
<template>
        <div class="row-start-2 col-span-4"
            :class="left ? 'col-start-8' : 'col-start-2', scrollable? 'sticky top-[42.5vh]':''">
            <svg :id="'pointOnLineComparison'+componentIndex" width="100%"></svg>
            <SourceComponent></SourceComponent>
        </div>
        <div class="row-start-2 col-span-4" 
        :class="left ? 'col-start-2' : 'col-start-8'">
            <slot v-if="scrollable"></slot>
            <slot v-if="!scrollable" :updateSelection="updateSelection"></slot>
        </div>
</template>
<style></style>