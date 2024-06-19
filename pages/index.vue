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
const dummyData = {
    0: [
        { status: "depressed", amount: 10 },
        { status: "not depressed", amount: 90 }
    ],
    1: [
        { status: "not depressed", amount: 10 },
        { status: "depressed", amount: 90 }
    ],
    2: [
        { status: "depressed", amount: 50 },
        { status: "not depressed", amount: 50 }
    ]
}

</script>
<template>
    <div>
        <ScrollytellingComponent :offset="0" :progress="true" :threshold="4" :once="false" :debug="false"
        @step-progress="updateMenu">

        <GridComponent class="items-center">
            <div class="text-center mt-16 col-span-12" id="intro">
                <h1 class="heading"><b>Gefühlte Krise</b></h1>
                <h3>- zwischen Doomsday & Wut</h3>
            </div>
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


           <RelativePeopleComparison :data="dummyData" id="section1">
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
        </ScrollytellingComponent>
        <AppFooter />
        <StickyMenu :updateMenuNumber="updateMenuNumber" :updateMenuProgress="updateMenuProgress" />
    </div>
</template>
<style></style>