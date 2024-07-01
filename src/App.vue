<script setup>
import GridComponent from './components/GridComponent.vue';
import ScrollytellingComponent from './components/ScrollytellingComponent.vue';
import BarComparison from './components/Visualizations/BarComparison.vue';
import PointOnLineComparison from './components/Visualizations/PointOnLineComparison.vue';
import RelativePeopleComparison from './components/Visualizations/RelativePeopleComparison.vue';
import CountingNumbers from './components/CountingNumbers.vue';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import SelectionComponent from './components/SelectionComponent.vue';
import { ref, onMounted } from 'vue';
import * as d3 from 'd3'

const updateMenuNumber = ref(0)
const updateMenuProgress = ref(0)
function updateMenu(resp) {
    updateMenuNumber.value = resp.index
    updateMenuProgress.value = resp.progress
}
const options = ["Old", "Young", "Low-Income Group", "High-Income Group"]
const crisis = [
    { "who": "Out of 100 people ...", "crisis": 0.0, "noCrisis": 100.0 },
    { "who": "of the <span class='highlight'>young</span> are crisis", "crisis": 13, "noCrisis": 87 },
    { "who": "of the <span class='highlight'>old</span>  are crisis", "crisis": 21.0, "noCrisis": 79.0 },
    { "who": "of the <span class='highlight'>low-income group</span> (< 2000€/m)  are crisis", "crisis": 65.0, "noCrisis": 35.0 },
    { "who": "of the <span class='highlight'>high-income group</span> (> 7000€/m)  are crisis", "crisis": 35.0, "noCrisis": 65.0 }
]
</script>
<template>
    <AppHeader class="invisible md:visible" :updateMenuNumber="updateMenuNumber"
        :updateMenuProgress="updateMenuProgress" />
    <GridComponent class="items-center mt-[8vh] h-[90vh]">
        <div class="row-start-1 col-span-12 text-left md:col-span-8">
            <h1 class="text-3xl md:heading"><span class="underline decoration-primary decoration-8"
                    style="padding: initial;">Apocalypse</span> now</h1>
                    <h2> - Democracy put to a Test</h2>
        </div>
        <div class="row-start-3 col-span-12 md:col-span-6 self-end">
            <p> The phenomena of crises are omnipresent in our times - whether climate crisis, financial crisis,
                migration crisis or crisis of democracy among others. We are currently confronted with ever new crisis
                analyses that puts us into a permanent state of emergency. But what exactly does that mean for us? And
                which groups are experiencing which crises?</p>
        </div>
        <img class=" row-span-3 col-span-10 col-start-9 w-[100vw]" src="./assets/images/Welt.png" alt="">

    </GridComponent>
    <GridComponent style="margin-right:0 !important; padding: 0 !important;">
        <hr class="col-span-12 col-start-2 text-primary ">
    </GridComponent>
    <ScrollytellingComponent :offset="0" :progress="true" :threshold="4" :once="false" :debug="false"
        @step-progress="updateMenu">
        <GridComponent id="multicrisis">
            <div class="col-start-2 col-span-10 grid grid-cols-5 grid-rows-2 items-center justify-center">
                <div class="flex flex-col gap-2 row-start-1 col-span-1">
                    <img src="./assets/images/money.png" class="max-w-[80%] h-[100%]">
                    <CountingNumbers class="" >
                    <template v-slot:number>65</template>
                    <template v-slot:text>Inflation</template>
                </CountingNumbers>
                </div>
                <div class="flex flex-col gap-2 row-start-2 col-start-2 col-span-1">
                    <img src="./assets/images/Soldiers.png" class="max-w-[80%] h-[100%]">
                <CountingNumbers>
                    <template v-slot:number>60</template>
                    <template v-slot:text>War</template>
                </CountingNumbers>
                </div>
                <div class="flex flex-col gap-2 row-start-1 col-start-3 col-span-1">
                    <img src="./assets/images/House.png" class="max-w-[80%] h-[100%]">
                <CountingNumbers >
                    <template v-slot:number>54</template>
                    <template v-slot:text>Housing</template>
                </CountingNumbers>
                </div>
                <div class="flex flex-col gap-2 row-start-2 col-start-4 col-span-1">
                    <img src="./assets/images/seperated.png" class="max-w-[80%] h-[100%]">
                <CountingNumbers >
                    <template v-slot:number>49</template>
                    <template v-slot:text>Social Polarisation</template>
                </CountingNumbers>
                </div>
                <div class="flex flex-col gap-2 row-start-1 col-start-5 col-span-1">
                    <img src="./assets/images/Eisbaer.png" class="max-w-[80%] h-[100%]">
                <CountingNumbers >
                    <template v-slot:number>49</template>
                    <template v-slot:text>Climate Change</template>
                </CountingNumbers>
                </div>
            </div>
            <div class="col-start-8 col-span-4">
                <h1 class="section-heading">Multicrisis</h1>
                <p>
                    While some focus on the melting of the polar caps, others fear the decline of their culture
                    due to foreign overrun. Groups even contradict each other in their crises perception and deny the
                    existence of the other's crises. The perception of crises and the extent to which people are
                    affected by
                    them depends heavily on their own social position; a consensus on crises seems to be difficult to
                    achieve in society. If everyone perceives the many crises differently, is there a chance to find a
                    common ground of perception, share mitigation strategy and build collective resilience?
                </p>
            </div>
        </GridComponent>
        <GridComponent>
            <h1 class="section-heading col-start-2 col-span-10" id="who-is-concerned">Who is concerned?</h1>
            <BarComparison :data="crisis" :left="true" :progress="updateMenuProgress"
            :current-index="updateMenuNumber" :component-index="1" v-slot="scope">
                The topic of generational <SelectionComponent :options="options" v-on:change="scope.updateSelection">
                </SelectionComponent> became very prominent with a rising awareness on climate justice. If we take a
                look to
                the perception of crisis of different generation, we can observe that the feeling of crisis is shared by
                all
                generations.
            </BarComparison>
            <!-- <PointOnLineComparison :data="crisis" :left="true" :progress="updateMenuProgress"
                :current-index="updateMenuNumber" :component-index="1" class="col-span-12" v-slot="scope">
                The topic of generational <SelectionComponent :options="options" v-on:change="scope.updateSelection">
                </SelectionComponent> became very prominent with a rising awareness on climate justice. If we take a
                look to
                the perception of crisis of different generation, we can observe that the feeling of crisis is shared by
                all
                generations.
            </PointOnLineComparison> -->
        </GridComponent>
        <GridComponent>
            <h1 class="section-heading col-start-7 col-span-5" id="who-is-concerned">Stepping into the fields of felt realities</h1>
            <PointOnLineComparison :data="crisis" :left="false" :progress="updateMenuProgress"
                :current-index="updateMenuNumber" :component-index="2" class="col-span-12" :scrollable="true">
                <p>
                    "If people define situations as real, then their consequences are also real."
                    Thomas-Theorem (1928)
                    According to famous Thomas Theorem, formulated by by William and Dorothy Thomas in 1928, we can
                    point
                    out, that
                    the interpretation of a situation (however "objectively" false it may appear) has real consequences
                    because the
                    actions of actors are based on their definition of the situation. In other words, the interpretation
                    of
                    a
                    situation causes the action. This interpretation is not objective. Actions are affected by
                    subjective
                    perceptions of situations. Whether there even is an objectively correct interpretation is not
                    important
                    for the
                    purposes of helping guide individuals' behavior.

                    [ hier Daten zu Angst vor Rechnungen zahlen obwohl real keine finanzielle Schieflage besteht]
                </p>
                <p>
                    "If people define situations as real, then their consequences are also real."
                    Thomas-Theorem (1928)
                    According to famous Thomas Theorem, formulated by by William and Dorothy Thomas in 1928, we can
                    point
                    out, that
                    the interpretation of a situation (however "objectively" false it may appear) has real consequences
                    because the
                    actions of actors are based on their definition of the situation. In other words, the interpretation
                    of
                    a
                    situation causes the action. This interpretation is not objective. Actions are affected by
                    subjective
                    perceptions of situations. Whether there even is an objectively correct interpretation is not
                    important
                    for the
                    purposes of helping guide individuals' behavior.

                    [ hier Daten zu Angst vor Rechnungen zahlen obwohl real keine finanzielle Schieflage besteht]
                </p>
            </PointOnLineComparison>
        </GridComponent>
        <GridComponent>
            <h1 class="section-heading col-span-12" id="just-feelings">Just Feelings?</h1>
            <p class="col-span-12">
                "If people define situations as real, then their consequences are also real."
                Thomas-Theorem (1928)
                According to famous Thomas Theorem, formulated by by William and Dorothy Thomas in 1928, we can point
                out, that
                the interpretation of a situation (however "objectively" false it may appear) has real consequences
                because the
                actions of actors are based on their definition of the situation. In other words, the interpretation of
                a
                situation causes the action. This interpretation is not objective. Actions are affected by subjective
                perceptions of situations. Whether there even is an objectively correct interpretation is not important
                for the
                purposes of helping guide individuals' behavior.

                [ hier Daten zu Angst vor Rechnungen zahlen obwohl real keine finanzielle Schieflage besteht]
            </p>
        </GridComponent>
        <GridComponent>
            <h1 class="section-heading col-span-12" id="effects-on-democracy">Effects on Democracy</h1>
            <p class="col-span-12"> Different Interpretation of Realities has strong effects on cooperation in a
                democratic
                system. The perception of urgent fields of actions varies strongly- and the higher your crises
                perception is,
                the you feel prevalent stress, the more you are moving towards the spiral of unrational decision making
                and
                sense making of the world.

                Recent studies also found out that factors as loneliness and individualisation have strong impact on how
                to
                handle a crises. Strong</p>
        </GridComponent>
        <GridComponent>
            <h1 class="section-heading col-span-12" id="crisis-resilience">Crisis Resilience</h1>
            <p class="col-span-12">
                How to strengthen crises resilience? How can we build a community resilience? How can we rebuild trust
                in our
                institution and share a common sense of mitigation strategies?
                Places of Reconciliation
                Places of collective Self-Efficacy
                Neighborhood Community Places
                Pop your Bubble - Talk to a stranger: Get in contact with people outside of your bubble - Association's,
                Hobbies, Discussion Panels
            </p>
        </GridComponent>

    </ScrollytellingComponent>
    <GridComponent>
        <h1 class="section-heading col-span-12" id="sources">Sources</h1>
    </GridComponent>
    <AppFooter />
</template>
<style></style>