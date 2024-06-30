<script setup>
import * as d3 from 'd3'
import { ref, onMounted } from 'vue'
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
    }
})
const index = ref(0)
//update the view according to the index
function updatePeopleComparison() {
    let array = [...Array(props.data[index.value].crisis).fill('crisis'), ...Array(props.data[index.value].noCrisis).fill('noCrisis')]
    let update = d3.select('#relativePeopleComparison')
        .selectAll('.peopleComparison')
        .data(array)

    update.exit().remove()

    let enter = update.enter()
        .append('path')
        .attr('class', 'peopleComparison')
        .attr('d', 'm62.096 8.5859c-5.208 0-9.424 4.2191-9.424 9.4261 0.001 5.203 4.217 9.424 9.424 9.424 5.202 0 9.422-4.221 9.422-9.424 0-5.208-4.22-9.4261-9.422-9.4261zm-10.41 21.268c-6.672 0-12.131 5.407-12.131 12.07v29.23c0 2.275 1.791 4.123 4.07 4.123 2.28 0 4.127-1.846 4.127-4.123v-26.355h2.102s0.048 68.811 0.048 73.331c0 3.05 2.478 5.53 5.532 5.53 3.052 0 5.525-2.48 5.525-5.53v-42.581h2.27v42.581c0 3.05 2.473 5.53 5.531 5.53 3.054 0 5.549-2.48 5.549-5.53v-73.331h2.127v26.355c0 2.275 1.85 4.123 4.126 4.123 2.28 0 4.073-1.846 4.073-4.123v-29.23c0-6.663-5.463-12.07-12.129-12.07h-20.82z')
        .attr('transform', (d, i) => `translate(${(i % 10) * 40},${(Math.floor(i / 10)) * 40}),scale(0.3)`)
        .attr('stroke', "white")
        .attr('fill', (d, i) => {
            if (d == "crisis") {
                return '#f00'
            } else {
                return 'white'
            }
        })
        .attr('stroke-width', '1px')

    enter.merge(update)
        .transition()
        .duration(600)
        .attr('fill', (d, i) => {
            if (d == "crisis") {
                return '#f00'
            } else {
                return 'white'
            }
        })
}
onMounted(() => {
    updatePeopleComparison();
})
watch(() => props.progress, function (nv) {
    if(props.currentIndex != props.componentIndex) return
    let indexNew = useProgressCalculator(props.progress,props.data.length-1)
    if(indexNew == index.value) return
    index.value = indexNew
    // if yes update the visualization according to the current scroll state
    updatePeopleComparison()
})
</script>
<template>
    <GridComponent>
        <div class="w-100 self-start sticky top-[20vh] h-[60vh] md:col-span-5 mb-[20vh]"
            :class="left ? 'col-start-8' : 'col-start-1'">
            <svg id="relativePeopleComparison" height="100%" width="100%"></svg>
        </div>
        <div class="col-span-6" :class="left ? '' : 'col-start-7'">
            <p v-for="(fact,index) in data" :key="index" class="m-12">
                <span class="highlight">{{ fact.crisis }}%</span> <span v-html="fact.who"></span>
            </p>
        </div>
    </GridComponent>
</template>
<style></style>