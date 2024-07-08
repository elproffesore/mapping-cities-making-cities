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
        default: () => ""
    }
})
const padding = ref(50)
const svg = ref(null)
const height = ref(0);
const width = ref(0);
onMounted(() => {
    width.value = 10 * 40
    height.value = 10 * 40 +50
    svg.value = d3.select('#relativePlot')
        .attr('height', height.value)
        .attr('width', width.value)

    const legend = svg.value.append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(${0},${height.value - 15})`)
        .selectAll('.legend-item')
        .data(['With no Crisis Feeling', 'With Crisis Feeling'])
        .enter()
        .append('g')
        .attr('class', 'legend-item')
        .attr('transform', (d, i) => `translate(${i * 155},0)`)

    legend.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('rx', 2)
        .attr('class', 'legend-rect')
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', (d, i) => d == 'With Crisis Feeling' ? 'var(--primary)' : 'var(--secondary)')

    legend.append('text')
        .attr('x', 15)
        .attr('y', 10)
        .attr('class', 'text-xs legend-text')
        .text(d => d);
})
const switchCrisis = ref(false);
function changeDataset(event) {
    if (event.target.checked) {
       switchCrisis.value = true
    } else {
       switchCrisis.value = false
    }
}
function updateRelativeComparison() {
    if (Object.keys(props.data).length == 0 || props.selectedOption == "") return
    let array = Array(100).fill('Empty')
    if(switchCrisis.value){
        array.fill('Crisis Feeling', 0, Object.values(props.data[props.selectedOption])[0])
    }else{
        array.fill('No Crisis Feeling', 0, Object.values(props.data[props.selectedOption])[1])
    }
    let update = svg.value.selectAll('circle')
        .data(array)

    update.exit().remove()

    let enter = update.enter()
        .append('circle')
        .attr('r', 20)
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('transform', (d, i) => `translate(${(i % 10) * 40 + 20},${(Math.floor(i / 10)) * 40 + 20})`)
        .attr('fill', (d, i) => {
            if (d == "Crisis Feeling") {
                return '#f15060'
            } else if (d == "No Crisis Feeling") {
                return '#BEB6F2'
            } else {
                return '#ccc'
            }
        })

    enter.merge(update)
        .transition()
        .duration(500)
        .attr('fill', (d, i) => {
            if (d == "Crisis Feeling") {
                return '#f15060'
            } else if (d == "No Crisis Feeling") {
                return '#BEB6F2'
            } else {
                return '#ccc'
            }
        })

}
watch(() => switchCrisis.value, function (nv) {
    updateRelativeComparison()
})
watch(() => props.data, function (nv) {
    updateRelativeComparison()
})
watch(() => props.selectedOption, function (nv) {
    updateRelativeComparison()
})
</script>
<template>
    <div class="flex flex-col items-center gap-8">
        <label class="flex align-center cursor-pointer">
            <span class="mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">No Crisis</span>
            <input type="checkbox" value="" class="sr-only peer" @change="changeDataset">
            <div
                class="relative w-11 h-6 bg-secondary  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary">
            </div>
            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Crisis</span>
        </label>
        <div class="relative grid grid-cols-4 gap-8">
            <svg :id="'relativePlot'" class="col-span-4"></svg>
            <div class="mt-4 col-span-4">
                <hr>
                <p class="text-right text-xs">Quelle</p>
            </div>
            <h2 class="absolute right-[-75px]" v-if="!(Object.keys(props.data).length == 0 || props.selectedOption == '')" >{{ switchCrisis?Object.values(props.data[props.selectedOption])[0]:Object.values(props.data[props.selectedOption])[1] }}% <br> out of <br> 100%</h2>
        </div>

    </div>



</template>
<style></style>