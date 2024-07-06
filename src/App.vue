<script setup>
import GridComponent from './components/GridComponent.vue';
import ScrollytellingComponent from './components/ScrollytellingComponent.vue';
import BarComparison from './components/Visualizations/BarComparison.vue';
import PointOnLineComparison from './components/Visualizations/PointOnLineComparison.vue';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import SelectionComponent from './components/SelectionComponent.vue';
import CitationComponent from './components/CitationComponent.vue';
import LinePlotComponent from './components/Visualizations/LinePlotComponent.vue';
import { ref, onMounted, reactive } from 'vue';
const updateMenuNumber = ref(0)
const updateMenuProgress = ref(0)
const data = reactive({})


const selectedOptionWhoIsConcerned = ref('')
function updateSelectedOptionWhoIsConcerned(target) {
    selectedOptionWhoIsConcerned.value = target.explicitOriginalTarget[target.explicitOriginalTarget.value].innerText
}
function updateMenu(resp) {
    updateMenuNumber.value = resp.index
    updateMenuProgress.value = resp.progress
}
onMounted(async () => {
    const response = await fetch('/crisis.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    data.statistics = await response.json()
    const responseTime = await fetch('/crisis_overtime.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    data.statisticsTime = await responseTime.json()
    selectedOptionWhoIsConcerned.value = Object.keys(data.statisticsTime)[0]
})
const heighestGroup = ref('')
const heighestGroupPercent = ref(0)
function setHeighestGroup(group,percent) {
    heighestGroup.value = group
    heighestGroupPercent.value = percent
}
</script>
<template>
    <div class="">
        <GridComponent class="items-center h-[90vh] md:mt-[45px] md:m-[45px]">
            <div class="row-start-1 text-left md:col-span-6">
                <h1 class="text-3xl md:heading">
                    It's the 
                    <span class=" underline decoration-primary decoration-8" style="padding: initial;">Crisis</span>,<br>
                    stupid!
                </h1>
                <h2>How a feeling keeps us captivated. </h2>
            </div>
            <div class="row-start-3 md:col-span-6 self-end">
                <p> The phenomena of crises are omnipresent in our times - whether climate crisis, financial crisis,
                    migration crisis or crisis of democracy among others. We are currently confronted with ever new
                    crisis
                    analyses that puts us into a permanent state of emergency. But what exactly does that mean for us?
                    And
                    which groups are experiencing which crises?</p>
            </div>
            <img class="row-span-3 col-span-10 col-start-8" src="./assets/images/Welt.png" alt="">
        </GridComponent>
        <AppHeader class="invisible md:visible" :updateMenuNumber="updateMenuNumber"
            :updateMenuProgress="updateMenuProgress" />
        <ScrollytellingComponent :offset="0" :progress="true" :threshold="4" :once="false" :debug="false"
            @step-progress="updateMenu">
            <GridComponent id="multicrisis" class="md:mt-[25vh]">
                <hr class="col-span-11 col-start-2 text-primary">
                <h1 class="section-heading leftAligned">Multicrisis</h1>
                <div class="col-start-5 col-span-7">
                    <p>
                        While some focus on the melting of the polar caps, others fear the decline of their culture
                        due to foreign overrun. Groups even contradict each other in their crises perception and deny
                        the
                        existence of the other's crises. The perception of crises and the extent to which people are
                        affected by
                        them depends heavily on their own social position; a consensus on crises seems to be difficult
                        to
                        achieve in society. If everyone perceives the many crises differently, is there a chance to find
                        a
                        common ground of perception, share mitigation strategy and build collective resilience?
                    </p>
                </div>
                <img class="col-start-2 col-span-10" src="./assets/images/multicrisis.png" alt="">
            </GridComponent>
            <GridComponent class="md:mt-[25vh]">
                <div class="col-start-7 col-span-5">
                    <h1 class="section-heading  text-left" id="who-is-concerned">Who is feeling the crisis?</h1>
                    <p>While some focus on the melting of the polar caps, others fear the decline of their culture due to foreign overrun. Groups even contradict on each other's crises perception and deny the existence of the other's crises. Stereotypes are mixed with factual realities. Still, perception of crises and the extent to which people are affected by them depends heavily on their own <span class="underline decoration-primary">social position</span>. The following section will introduce some of these groups and their feeling for crisis.</p>
                </div>
                <GridComponent class="col-start-2 col-span-10 mt-16">
                    <div class="col-start-1 col-span-6">
                        <h1>Social status and crisis perception</h1>
                    <p>
                        The topic of generational justice became very prominent with a rising awareness on climate justice. How (much) crisis do different generations, genders feel? How crisis preceived in different classes? Are people more concered if their income is less or of they live on the countryside?
                    </p>
                    <br>
                    <p>
                        If we look at the differences of perceived crisis throughout <select ref="selection" class="w-min p-[2px] text-white bg-primary rounded"
                        v-on:change="updateSelectedOptionWhoIsConcerned">
                        <option v-for="(option, index) in Object.keys(data.statisticsTime ?? {})" :key="index"
                            :value="index">
                            {{ option }}
                            
                        </option>
                    </select>. We can see that <span class="underline decoration-primary">{{heighestGroup}}</span> shows the highest level of crisis perception with <span class="underline decoration-primary">{{heighestGroupPercent}}%</span> at the moment.
                    </p>
                    </div>

                    <LinePlotComponent class="col-start-7 col-span-6" @group-update="setHeighestGroup" :data="data.statisticsTime ?? {}" :componentIndex="0" :selectedOption="selectedOptionWhoIsConcerned" >
                    </LinePlotComponent>
                </GridComponent>

            </GridComponent>
            <GridComponent class="md:mt-[25vh]">
                    <hr class="col-span-8 col-start-5 text-primary">
                    <h1 class="section-heading col-span-6 col-start-6 text-left" id="felt-realities">Stepping into the fields of
                        felt realities</h1>
                <CitationComponent class="col-start-2 col-span-3">
                    <template #image><img src="./assets/images/thomastheorem.png"></template>
                    <template #quote>
                        <b class=" pt-4 text-2xl"><span class="text-primary">"</span>If people define
                            situations as real, then their consequences are also real.<span
                                class="text-primary">"</span></b>
                        <p class="text-xs pt-4">– Thomas-Theorem (1928)"</p>
                    </template>
                </CitationComponent>

                <!-- <PointOnLineComparison 
                :data="crisis" 
                :left="false" 
                :progress="updateMenuProgress"
                :current-index="updateMenuNumber" 
                :component-index="2" 
                :scrollable="true">
                    <p>
                        "If people define situations as real, then their consequences are also real."
                        Thomas-Theorem (1928)
                        According to famous Thomas Theorem, formulated by by William and Dorothy Thomas in 1928, we can
                        point
                        out, that
                        the interpretation of a situation (however "objectively" false it may appear) has real
                        consequences
                        because the
                        actions of actors are based on their definition of the situation. In other words, the
                        interpretation
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
                        the interpretation of a situation (however "objectively" false it may appear) has real
                        consequences
                        because the
                        actions of actors are based on their definition of the situation. In other words, the
                        interpretation
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
                </PointOnLineComparison> -->
            </GridComponent>
            <GridComponent class="md:mt-[25vh]">
                <div class="col-span-6 text-primary">
                    <hr>
                    <h1 class="section-heading text-text text-right" id="effects-on-democracy">Effects on Democracy</h1>
                </div>
                <p class="col-start-2 col-span-4"> Different Interpretation of Realities has strong effects on
                    cooperation in a
                    democratic
                    system. The perception of urgent fields of actions varies strongly- and the higher your crises
                    perception is,
                    the you feel prevalent stress, the more you are moving towards the spiral of unrational decision
                    making
                    and
                    sense making of the world.

                    Recent studies also found out that factors as loneliness and individualisation have strong impact on
                    how
                    to
                    handle a crises. Strong</p>
                <img class="col-start-8 col-span-4 self-start row-span-2 " src="./assets/images/Bundestag.png" alt="">
            </GridComponent>
            <GridComponent>
                <h1 class="section-heading col-span-12" id="crisis-resilience">Crisis Resilience</h1>
                <p class="col-span-12">
                    How to strengthen crises resilience? How can we build a community resilience? How can we rebuild
                    trust
                    in our
                    institution and share a common sense of mitigation strategies?
                    Places of Reconciliation
                    Places of collective Self-Efficacy
                    Neighborhood Community Places
                    Pop your Bubble - Talk to a stranger: Get in contact with people outside of your bubble -
                    Association's,
                    Hobbies, Discussion Panels
                </p>
            </GridComponent>

        </ScrollytellingComponent>
        <GridComponent class="md:mt-[25vh]">
            <h1 class="section-heading col-span-12" id="sources">Sources</h1>
        </GridComponent>
    </div>
    <AppFooter />
</template>
<style></style>