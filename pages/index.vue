<script setup>
import { reactive } from 'vue';
import * as d3 from 'd3'
import GridComponent from '~/components/GridComponent.vue';
import ScrollytellingComponent from '~/components/ScrollytellingComponent.vue';
//params
const range = 10
const scroll = ref(0)
//const data = await useFetch('/api/data', { query: { padding: scroll, range } })
//const reactiveData = reactive(data)
const scaleX = d3.scaleLinear().domain([0, range]).range([0, width - padding])
const scaleY = d3.scaleLinear().domain([0, 7]).range([height - padding, 0])
const height = 300;
const width = 400;
const padding = 50;
const updateMenuNumber = ref(0)
const updateMenuProgress = ref(0)

// watch(reactiveData, () => {
//     updateVisualization()
// })
function updateMenu(resp) {
    updateMenuNumber.value = resp.index
    updateMenuProgress.value = resp.progress
}
function updatePeopleComparison(){
    let total = []
    dummyData.map(d => {
        for(let n = 0; n < d.amount; n++){
            if(d.index == index.value){
                total.push(d.status)
            }
        }
    })
    let update = d3.select('#relativePeopleComparison')
        .selectAll('path')
        .data(total)

    update.exit().remove()

    let enter = update.enter()
        .append('path')
        .attr('d', 'm62.096 8.5859c-5.208 0-9.424 4.2191-9.424 9.4261 0.001 5.203 4.217 9.424 9.424 9.424 5.202 0 9.422-4.221 9.422-9.424 0-5.208-4.22-9.4261-9.422-9.4261zm-10.41 21.268c-6.672 0-12.131 5.407-12.131 12.07v29.23c0 2.275 1.791 4.123 4.07 4.123 2.28 0 4.127-1.846 4.127-4.123v-26.355h2.102s0.048 68.811 0.048 73.331c0 3.05 2.478 5.53 5.532 5.53 3.052 0 5.525-2.48 5.525-5.53v-42.581h2.27v42.581c0 3.05 2.473 5.53 5.531 5.53 3.054 0 5.549-2.48 5.549-5.53v-73.331h2.127v26.355c0 2.275 1.85 4.123 4.126 4.123 2.28 0 4.073-1.846 4.073-4.123v-29.23c0-6.663-5.463-12.07-12.129-12.07h-20.82z')
        .attr('transform', (d,i) => `translate(${(i%10)*45},${(Math.floor(i/10))*50}),scale(0.3)`)
        .attr('fill', (d,i) => {
            switch(d){
                case 'depressed':
                    return 'red' 
                case 'not depressed':
                    return 'blue' 
                default:
                    return 'black'
            }
        })

    enter.merge(update)
        .transition()
        .duration(1000)
        .attr('fill', (d,i) => {
            switch(d){
                case 'depressed':
                    return 'red'
                case 'not depressed':
                    return 'blue'
                default:
                    return 'black'
            }
        })
}
onMounted(() => {
    updatePeopleComparison();
})
const index = ref(0)
function newStage(e){
    index.value = e.index
    updatePeopleComparison()
}
const dummyData = [{ status: "depressed", amount: 10, index: 0 }, { status: "not depressed", amount: 90, index: 0 }, { status: "not depressed", amount: 10, index: 1 }, { status: "depressed", amount: 90, index: 1 }]
</script>
<template>
    <div>
        <div class="text-center mt-16" id="intro">
            <h1 class="text-8xl"><b>Gefühlte Krise</b></h1>
            <h3 class="text-2xl">- zwischen Doomsday & Wut</h3>
        </div>
        <GridComponent class="items-center">
            <div class="col-span-7">
                <p class="text-justify">
                    Das 19. und 20.Jahrhundert waren die Epoche der expansiven Moderne.
                    Immer weitere Teile der Welt folgten dem industriegesellschaftlichen und wachstumswirtschaftlichen
                    Pfad, ihre Bewohnerinnen und Bewohner erlebten materiellen und vor allem auch immateriellen
                    Fortschritt: Die Gesellschaften demokratisierten sich, wurden freiheitliche Rechtsstaaten,
                    Arbeitsschutzrechte, Bildungs-, Gesundheits- und Sozialversorgung wurden erkämpft. Im 21.
                    Jahrhundert, da die Globalisierung fast den ganzen Planeten in den wachstumswirtschaftlichen Sog
                    gezogen, aber dabei keineswegs überall Freiheit, Demokratie und Recht etabliert hat, stehen wir vor
                    der Herausforderung, den erreichten zivilisatorischen Standard zu sichern, denn dieser gerät immer
                    mehr unter den Druck von Umweltzerstörung, Ressourcenkonkurrenz, Klimaerwärmung - um nur einige der
                    gravierendsten Probleme zu nennen. Wie sieht eine moderne Gesellschaft aus, die nicht mehr dem
                    Prinzip der immerwährenden Expansion folgt, sondern gutes Leben mit nur einem fünftel des heutigen
                    Verbrauchs an Material und Energie sichert? Das weiß im Augenblick niemand; einen Masterplan für
                    eine solche Modeme gibt es nicht.
                </p>
            </div>
            <img class="col-span-5 p-8"
                src="/images/lightning-strike-thunderstorm-weather-icon-meteorological-sign-3d-render-png.png"><img>
        </GridComponent>

        <ScrollytellingComponent :offset="0.5" :progress="true" :threshold="4" :once="false" :debug="false"
            @step-progress="updateMenu">
           <RelativePeopleComparison :data="dummyData" id="section1">
            <p>Test1</p>
            <p>Test2</p>
           </RelativePeopleComparison>
        </ScrollytellingComponent>
        <AppFooter />
        <StickyMenu :updateMenuNumber="updateMenuNumber" :updateMenuProgress="updateMenuProgress" />
    </div>
</template>
<style></style>