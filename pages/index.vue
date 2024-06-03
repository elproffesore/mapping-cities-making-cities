<script setup>
import { reactive } from 'vue';
import * as d3 from 'd3'
//params
const range = 10
const scroll = ref(0)
const data = await useFetch('/api/data', { query: { padding: scroll, range } })
const reactiveData = reactive(data)
const scaleX = d3.scaleLinear().domain([0,range]).range([0, width-padding])
const scaleY = d3.scaleLinear().domain([0,7]).range([height-padding,0])
const height = 300;
const width = 400;
const padding = 50;
onMounted(()=> {
    let container = d3.select('#visualization')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('id', 'container')
    .attr('transform', 'translate(0,30)')
    .attr('opacity', 0)

    container.append("g")
    .attr("transform", `translate(30,${height-padding})`)
    .call(d3.axisBottom(scaleX));

    container.append("g")
    .attr("transform", `translate(30,0)`)
    .call(d3.axisLeft(scaleY));

    container.append('g')
    .attr('id',"points")
        .attr("transform", `translate(30,0)`)

    // container.append('path')
    // .attr('stroke-width', 1.5)
    // .attr('stroke', 'black')
    // .attr('d',"m62.096 8.5859c-5.208 0-9.424 4.2191-9.424 9.4261 0.001 5.203 4.217 9.424 9.424 9.424 5.202 0 9.422-4.221 9.422-9.424 0-5.208-4.22-9.4261-9.422-9.4261zm-10.41 21.268c-6.672 0-12.131 5.407-12.131 12.07v29.23c0 2.275 1.791 4.123 4.07 4.123 2.28 0 4.127-1.846 4.127-4.123v-26.355h2.102s0.048 68.811 0.048 73.331c0 3.05 2.478 5.53 5.532 5.53 3.052 0 5.525-2.48 5.525-5.53v-42.581h2.27v42.581c0 3.05 2.473 5.53 5.531 5.53 3.054 0 5.549-2.48 5.549-5.53v-73.331h2.127v26.355c0 2.275 1.85 4.123 4.126 4.123 2.28 0 4.073-1.846 4.073-4.123v-29.23c0-6.663-5.463-12.07-12.129-12.07h-20.82z")
    // .attr('transform','scale(0.5)')
    
    updateVisualization()
})
//functions
function updateVisualization() {
    let update = d3.select('#points')
        .selectAll('circle')
        .data(reactiveData.data.data)

    update.exit().remove()

    let enter = update.enter()
        .append('circle')
        .attr("fill", "red")
        .attr('r', 2)

    enter.merge(update)
        .transition()
        .duration(1000)
        .attr("cx", (_, i) => scaleX(i+1))
        .attr("cy", (d, _) => scaleY(d.depressed))
    // console.log('update')
}
watch(reactiveData, () => {
    updateVisualization()
})
function enterStep(resp) {
    if(resp.index == 0 && resp.direction === "down") {
        d3.select('#container').transition().duration(300).attr('opacity', 1)
    }
    scroll.value = resp.index
}
function exitStep(resp) {
    if(resp.index == 0 && resp.direction === "up") {
        d3.select('#container').transition().duration(300).attr('opacity', 0)
    }
}
</script>
<template>
    <div>
        <AppHeader />
        <div class="h-[110vh]">
        </div>
        <div class="grid w-100 grid-cols-2 justify-items-center items-start">
            <div>
                <ScrollytellingComponent :offset="0.6" :progress="true" :threshold="4" :once="false" :debug="false"
                    @step-enter="enterStep"
                    @step-exit="exitStep">
                    <div v-for="i in 10" :key="i" class="bg-white h-[100vh] text-center">
                        <p v-for="(d,di) in reactiveData.data.data" :key="di">
                            {{ d.postal_code }}
                        </p>
                    </div>
                </ScrollytellingComponent>
            </div>
            <div class="sticky top-[50vh] translate-y-[-50%]">
                <h1>Depression</h1>
                <svg id="visualization"></svg>
            </div>
        </div>
        <AppFooter />
    </div>
</template>
<style></style>