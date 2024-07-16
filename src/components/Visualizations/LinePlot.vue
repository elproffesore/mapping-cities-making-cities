<script setup>
import * as d3 from 'd3'
import { ref, onMounted,watch,defineEmits } from 'vue'
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
const width = ref(0)
const height = ref(0)
const svg = ref(null)
const scaleX = ref(null)
const scaleY = ref(null)
const highestGroup = ref('')
const emit = defineEmits(['groupUpdate'])
onMounted(() => {
    width.value = document.getElementById('linePlot').getBoundingClientRect().width 
    height.value = document.getElementById('linePlot').getBoundingClientRect().height

    scaleX.value = d3.scaleLinear().domain([new Date('2023-06-01'), new Date('2024-02-01')]).range([padding.value, width.value ])
    scaleY.value = d3.scaleLinear().domain([70, 0]).range([0, height.value - padding.value])
    
    svg.value = d3.select('#linePlot')
    
    let ticks = [0, 20, 40, 60]
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
    svg.value.selectAll('.legend').remove()
    svg.value.selectAll('.line').remove()
    svg.value.selectAll('polygon').remove()
    svg.value.selectAll('.legend-text').remove()
    svg.value.selectAll('.legend-rect').remove()
    const legend = svg.value.append('g')
                .attr('class', 'legend')
                .attr('transform', `translate(${0},${height.value-15})`)
                .selectAll('.legend-item')
                .data(Object.keys(props.data[props.selectedOption]))
                .enter()
                .append('g')
                .attr('class', 'legend-item vis-fontsize')
                .attr('transform', (d, i) => `translate(${i * 60 + i*20},0)`)

                legend.append('path')
                .attr('d', 'M0,7 L15,7')
                .attr('stroke', 'black')
                .attr('stroke-width', 1.5)
                .attr('fill', 'none')
                .attr('stroke-dasharray',(d,i) => {
                    switch(i){
                        case 0:
                            return '0'
                        case 1:
                            return '2 2'
                        case 2:
                            return '5 5'
                        case 3:
                            return '10 10'
                    }
                })

                legend.append('text')
                    .attr('x', 20)
                    .attr('y', 10)
                    .attr('text-anchor', 'start')
                    .attr('class', 'legend-text')
                    .text(d => d);

    Object.keys(props.data[props.selectedOption]).map((option,optioni) => {
            const line = d3.line()
            .x(d => scaleX.value(new Date(d)))
            .y(d => scaleY.value(props.data[props.selectedOption][option][d]))

            svg.value.append('path')
            .attr('d', `M${scaleX.value(new Date("2023-06-01"))},${scaleY.value(0)} L${scaleX.value(new Date("2023-08-01"))},${scaleY.value(0)} L${scaleX.value(new Date("2023-11-01"))},${scaleY.value(0)} L${scaleX.value(new Date("2024-02-01"))},${scaleY.value(0)}` )
            .attr('class', 'line')
            .attr('stroke', ()=> {
                return 'var(--primary)'
            })
            .attr('stroke-width', 1.5)
            .attr('fill', 'none')
            .attr('stroke-dasharray',(d,i) => {
                switch(optioni){
                        case 0:
                            return '0'
                        case 1:
                            return '2 2'
                        case 2:
                            return '5 5'
                        case 3:
                            return '10 10'
                    }
                })
            .transition()
            .duration(1000)
            .attr('d', line(Object.keys(props.data[props.selectedOption][option])))
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
    highestGroup.value = Object.keys(props.data[props.selectedOption]).sort((a,b) => props.data[props.selectedOption][b]['2024-02-01'] - props.data[props.selectedOption][a]['2024-02-01'])[0]
    emit('groupUpdate', highestGroup.value, props.data[props.selectedOption][highestGroup.value]['2024-02-01'] ) 
}
</script>
<template>
        <div class="w-full h-1/2  min-h-[300px] max-h-[350px] md:h-full md:min-h-[400px] md:max-h-[450px]">
            <svg :id="'linePlot'" class="h-full" width="100%" height="100%"></svg>
        </div>
</template>
<style></style>