<script setup>
import * as d3 from 'd3'
import { ref, onMounted,watch } from 'vue'
import useProgressCalculator from '../../functions/useProgressCalculator.js'
import GridComponent from '../GridComponent.vue'
import SelectionComponent from '../SelectionComponent.vue'
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
onMounted(() => {
    width.value = window.innerWidth * 0.3;
    const scaleX = d3.scaleLinear().domain([0, 100]).range([0 + padding.value, width.value - padding.value])

    svg.value = d3.select('#pointOnLineComparison'+props.componentIndex)
        .attr('width', width.value)
        .attr('height', 100)

    let percent = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    svg.value.selectAll('.axisTextPointComparison')
        .data(percent)
        .enter()
        .append('text')
        .attr('class', 'axisTextPointComparison')
        .attr('x', d => scaleX(d))
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
        .attr('x1', (d, i) => scaleX(d))
        .attr('x2', (d, i) => scaleX(d))
        .attr('y1', (d, i) => 40)
        .attr('y2', (d, i) => 60)

    svg.value.append('line')
        .attr('stroke', '#0002')
        .attr('class', 'axisLinePointComparison')
        .attr('x1', scaleX(0))
        .attr('x2', scaleX(100))
        .attr('y1', (d, i) => (i + 1) * 50)
        .attr('y2', (d, i) => (i + 1) * 50)

    updatePointOnLineComparison()
})
function updatePointOnLineComparison() {
    const scaleX = d3.scaleLinear().domain([0, 100]).range([0 + padding.value, width.value - padding.value])
    let updatePointComparison = svg.value
        .selectAll('.pointComparison')
        .data([props.data[index.value].crisis, props.data[index.value].noCrisis])

    updatePointComparison.exit().remove()

    let enterPointComparison = updatePointComparison
        .enter()
        .append('circle')
        .attr('class', 'pointComparison')
        .attr('cx', (d) => scaleX(d))
        .attr('cy', 50)
        .attr('r', 4)
        .attr('fill', (d, i) => {
            if (i == 0) {
                return '#f00'
            } else {
                return '#f003'
            }
        })

    enterPointComparison.merge(updatePointComparison)
        .transition()
        .duration(600)
        .attr('cx', (d) => scaleX(d))
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
    <GridComponent>
        <div class="w-[100vw] self-start top-[42.5vh] h-[15vh] md:col-span-5 mb-[42.5vh]"
            :class="left ? 'col-start-8' : 'col-start-1', scrollable?'sticky':''">
            <svg :id="'pointOnLineComparison'+componentIndex"></svg>
        </div>
        <div class="col-span-6" :class="left ? '' : 'col-start-7'" >
            <slot v-if="scrollable"></slot>
            <slot v-if="!scrollable" :updateSelection="updateSelection"></slot>
        </div>
    </GridComponent>
</template>
<style></style>