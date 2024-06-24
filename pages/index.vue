<script setup>
import * as d3 from 'd3'
import GridComponent from '~/components/GridComponent.vue';
import ScrollytellingComponent from '~/components/ScrollytellingComponent.vue';
import { Application } from '@splinetool/runtime';
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
const crisis = [
    {"who":"Out of 100 people ...","depressed":0.0,"notDepressed": 100.0},
    {"who":"of the <span class='highlight'>young</span> feel in a crisis situation ","depressed":13,"notDepressed": 87},
    {"who":"of the <span class='highlight'>old</span> feel in a crisis situation.","depressed":21.0,"notDepressed": 79.0},
    {"who":"of the <span class='highlight'>low-income group</span> (< 2000€/m) feel in a crisis situation.","depressed":65.0,"notDepressed": 35.0},
    {"who":"of the <span class='highlight'>high-income group</span> (> 7000€/m) feel in a crisis situation.","depressed":35.0,"notDepressed": 65.0}
]
onMounted(() => {
    const canvas = document.getElementById('canvas3d');
    const spline = new Application(canvas);
    spline.load("https://prod.spline.design/mUBhU03LIxr8n6bZ/scene.splinecode")
})
</script>
<template>
    <ScrollytellingComponent :offset="0" :progress="true" :threshold="4" :once="false" :debug="false"
        @step-progress="updateMenu">
        <GridComponent class="items-center min-h-[90vh] my-10" id="introduction">

            <div class="col-span-7 text-left">
                <h1 class="heading">Felt Crisis – Effects on Democracy</h1>
                <h1 class="text-3xl">
                    Feelings and the Democracy in Times of Crisis
                </h1>
            </div>
            <canvas id="canvas3d" class="col-span-4 col-start-9 row-span-2"></canvas>

            <p class="row-start-2 col-span-4 self-end">
                Das 19. und 20.Jahrhundert waren die Epoche der expansiven Moderne.
                    Immer weitere Teile der Welt folgten dem industriegesellschaftlichen und wachstumswirtschaftlichen
                    Pfad, ihre Bewohnerinnen und Bewohner erlebten materiellen und vor allem auch immateriellen
                    Fortschritt: Die Gesellschaften demokratisierten sich, wurden freiheitliche Rechtsstaaten,
                    Arbeitsschutzrechte, Bildungs-, Gesundheits- und Sozialversorgung wurden erkämpft.
            </p>
            <!-- <CountingNumbers class="row-start-2 col-span-4 col-start-9">
               <template v-slot:number>75</template>
               <template v-slot:text>
                Percentage of people that feeled worried or very concerned about the top 5 problems in Germany in 2022.
                </template>
            </CountingNumbers> -->
    </GridComponent>
    <StickyMenu :updateMenuNumber="updateMenuNumber" :updateMenuProgress="updateMenuProgress" />
            <GridComponent>
                <h1 class="section-heading col-span-12" id="who-is-concerned">Who is concerned?</h1>
                <p class="col-span-12">
                    The topic of generational justice became very prominent with a rising awareness on climate justice. If we take a look to the perception of crisis of different generation, we can observe that the feeling of crisis is shared by all generations.
                </p>
                <RelativePeopleComparison :data="crisis" class="row-start-3 col-span-12">

            <p class="h-[75vh]">
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
                <p class="h-[75vh]">
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
                <p class="h-[75vh]">
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
                <p class="h-[75vh]">
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
                <p class="h-[75vh]">
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
           </RelativePeopleComparison>
            </GridComponent>
           
           <GridComponent>
            <h1 class="section-heading col-span-12" id="just-feelings">Just Feelings?</h1>
           </GridComponent>
           <GridComponent>
            <h1 class="section-heading col-span-12" id="effects-on-democracy">Effects on Democracy</h1>
           </GridComponent>
           <GridComponent>
            <h1 class="section-heading col-span-12" id="crisis-resilience">Crisis Resilience</h1>
           </GridComponent>
        </ScrollytellingComponent>
        <AppFooter />
</template>
<style>
</style>