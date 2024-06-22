<script setup>
import * as d3 from 'd3'
import { ref, onMounted } from 'vue'
const props = defineProps({
    data: {
        type: Object,
        required: false
    },
    left: {
        type: Boolean,
        required: false
    }
})
//set index of shown data
const index = ref(0)
//update the view according to the index
function updatePeopleComparison() {
    let array = []
    props.data[index.value].forEach((d) => {
        for (let i = 0; i < d.amount; i++) {
            array.push(d.status)
        }
    })
    let update = d3.select('#relativePeopleComparison')
        .selectAll('path')
        .data(array)

    update.exit().remove()

    let enter = update.enter()
        .append('path')
        .attr('d', 'm62.096 8.5859c-5.208 0-9.424 4.2191-9.424 9.4261 0.001 5.203 4.217 9.424 9.424 9.424 5.202 0 9.422-4.221 9.422-9.424 0-5.208-4.22-9.4261-9.422-9.4261zm-10.41 21.268c-6.672 0-12.131 5.407-12.131 12.07v29.23c0 2.275 1.791 4.123 4.07 4.123 2.28 0 4.127-1.846 4.127-4.123v-26.355h2.102s0.048 68.811 0.048 73.331c0 3.05 2.478 5.53 5.532 5.53 3.052 0 5.525-2.48 5.525-5.53v-42.581h2.27v42.581c0 3.05 2.473 5.53 5.531 5.53 3.054 0 5.549-2.48 5.549-5.53v-73.331h2.127v26.355c0 2.275 1.85 4.123 4.126 4.123 2.28 0 4.073-1.846 4.073-4.123v-29.23c0-6.663-5.463-12.07-12.129-12.07h-20.82z')
        .attr('transform', (d, i) => `translate(${(i % 10) * 45},${(Math.floor(i / 10)) * 50}),scale(0.3)`)
        .attr('fill', (d, i) => {
            switch (d) {
                case 'depressed':
                    return '#242021'
                case 'not depressed':
                    return '#BEB6F2'
            }
        })

    enter.merge(update)
        .transition()
        .duration(500)
        .attr('fill', (d, i) => {
            switch (d) {
                case 'depressed':
                    return '#242021'
                case 'not depressed':
                    return '#BEB6F2'
            }
        })
}
onMounted(() => {
    updatePeopleComparison();
})
function newStage(e) {
    index.value = e.index
    updatePeopleComparison()
}
</script>
<template>
    <GridComponent>
        <h1 class="text-center col-span-12 row-start-1">Out of 100 people ...</h1>
        <ScrollytellingComponent :offset="0.5" :progress="false" :threshold="4" :once="false" :debug="false"
            @step-enter="newStage" class="col-span-6 row-start-2" :class="left ? '' : 'col-start-7'">
            <slot></slot>
        </ScrollytellingComponent>
        <svg id="relativePeopleComparison" width="100%" height="25%"
        class="self-start sticky top-[25vh] col-span-5 mb-[25vh]"
        :class="left ? 'col-start-8' : 'row-start-2 col-start-1'"></svg>
    </GridComponent>
</template>
<style></style>