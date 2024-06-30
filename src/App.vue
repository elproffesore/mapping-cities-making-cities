<script setup>
import GridComponent from './components/GridComponent.vue';
import ScrollytellingComponent from './components/ScrollytellingComponent.vue';
import BarComparison from './components/Visualizations/BarComparison.vue';
import PointOnLineComparison from './components/Visualizations/PointOnLineComparison.vue';
import RelativePeopleComparison from './components/Visualizations/RelativePeopleComparison.vue';
import CountingNumbers from './components/CountingNumbers.vue';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import {ref } from 'vue';

const updateMenuNumber = ref(0)
const updateMenuProgress = ref(0)
function updateMenu(resp) {
    updateMenuNumber.value = resp.index
    updateMenuProgress.value = resp.progress
}

const crisis = [
    { "who": "Out of 100 people ...", "crisis": 0.0, "noCrisis": 100.0 },
    { "who": "of the <span class='highlight'>young</span> are crisis", "crisis": 13, "noCrisis": 87 },
    { "who": "of the <span class='highlight'>old</span>  are crisis", "crisis": 21.0, "noCrisis": 79.0 },
    { "who": "of the <span class='highlight'>low-income group</span> (< 2000€/m)  are crisis", "crisis": 65.0, "noCrisis": 35.0 },
    { "who": "of the <span class='highlight'>high-income group</span> (> 7000€/m)  are crisis", "crisis": 35.0, "noCrisis": 65.0 }
]

</script>
<template>
    <GridComponent class="items-center h-[90vh] my-[5vh] text-wrap">
        <div class="row-start-1 col-span-12 leading-none text-left md:col-span-8 md:row-start-1">
            <h1 class="text-3xl md:heading">Felt Crisis – Effects on Democracy</h1>
            <h1 class="text-2xl md:text-3xl">
                Democracy put to the test: dealing with crisis moods
            </h1>
        </div>

        <p class="row-start-3 col-span-12 md:col-span-6 self-end">
            The phenomena of crises are omnipresent in our times - whether climate crisis, financial crisis,
            migration crisis or crisis of democracy among others. We are currently confronted with ever new crisis
            analyses that puts us into a permanent state of emergency. But what exactly does that mean for us? And
            which groups are experiencing which crises?
        </p>
        <CountingNumbers class="row-start-2 row-span-2 col-span-4 col-start-9 self-end">
            <template v-slot:number>75</template>
            <template v-slot:text>
                Percentage of people that feeled worried or very concerned about the top 5 problems in Germany in 2022.<sup>[1]</sup> 
            </template>
        </CountingNumbers>

    </GridComponent>
    <AppHeader class="invisible md:visible" :updateMenuNumber="updateMenuNumber"
        :updateMenuProgress="updateMenuProgress" />
    <ScrollytellingComponent :offset="0" :progress="true" :threshold="4" :once="false" :debug="false"
        @step-progress="updateMenu">
        <GridComponent>
            <h1 class="section-heading col-span-12" id="introduction">Introduction</h1>
            <p class="col-span-6">
                One term that particularly coins our understanding of the complexity of crisis in recent years is the
                analysis of the POLYCRISIS: It describes the occurrence and intertwining of different crises at the same
                time, which call for a wide variety of reactions to adapt. When analysing different political streams,
                it becomes clear that different groups focus on different crises and demand different adaptation
                strategies.
            </p>
            <p class="col-span-6">
                While some focus on the melting of the polar caps, others fear the decline of their culture
                due to foreign overrun. Groups even contradict each other in their crises perception and deny the
                existence of the other's crises. The perception of crises and the extent to which people are affected by
                them depends heavily on their own social position; a consensus on crises seems to be difficult to
                achieve in society. If everyone perceives the many crises differently, is there a chance to find a
                common ground of perception, share mitigation strategy and build collective resilience?
            </p>
        </GridComponent>
        <!-- <GridComponent>
            <h1 class="section-heading col-span-12">Bar Chart</h1>
            <BarComparison :data="crisis" :left="false" :progress="updateMenuProgress" class="col-span-12">
            </BarComparison>
        </GridComponent> -->

        <!-- <GridComponent>
            <h1 class="section-heading col-span-12">Point on Line Comparison</h1>
            <PointOnLineComparison :data="crisis" :left="false" :progress="updateMenuProgress"
                :current-index="updateMenuNumber" :component-index="1" class="col-span-12"></PointOnLineComparison>
        </GridComponent>
        <GridComponent>
            <h1 class="section-heading col-span-12">RelativePeopleComparison</h1>
            <RelativePeopleComparison :data="crisis" :left="false" :progress="updateMenuProgress"
                :current-index="updateMenuNumber" :component-index="2" class="col-span-12"></RelativePeopleComparison>
        </GridComponent>
        <GridComponent>
            <h1 class="section-heading col-span-12">Bar Comparison</h1>
            <BarComparison :data="crisis" :left="false" :progress="updateMenuProgress" :current-index="updateMenuNumber"
                :component-index="3" class="col-span-12"></BarComparison>
        </GridComponent> -->
        <GridComponent>
            <h1 class="section-heading col-span-12" id="who-is-concerned">Who is concerned?</h1>
            <p class="col-span-12">
                The topic of generational justice became very prominent with a rising awareness on climate justice. If we take a look to the perception of crisis of different generation, we can observe that the feeling of crisis is shared by all generations.
            </p>
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
        <GridComponent>
            <h1 class="section-heading col-span-12" id="sources">Sources</h1>
        </GridComponent>
    </ScrollytellingComponent>

    <AppFooter />
</template>
<style></style>