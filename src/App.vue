<script setup>
import GridComponent from './components/GridComponent.vue';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import ScrollytellingComponent from './components/ScrollytellingComponent.vue';
import BarComparison from './components/Visualizations/BarComparison.vue';
import LinePlot from './components/Visualizations/LinePlot.vue';
import RelativeComparison from './components/Visualizations/RelativeComparison.vue';
import { ref, onMounted, reactive } from 'vue';
const updateMenuNumber = ref(0)
const updateMenuProgress = ref(0)
const data = reactive({})


const selectedOptionWhoIsConcerned = ref('')
function updateSelectedOptionWhoIsConcerned(target) {
    selectedOptionWhoIsConcerned.value = target.explicitOriginalTarget[target.explicitOriginalTarget.value].innerText
}
const selectedOptionPerceivedTruth = ref('')
const selectedOptionPerceivedTruthIndex = ref(0)
function updateSelectedOptionPerceivedTruth(option, index) {
    selectedOptionPerceivedTruth.value = option;
    selectedOptionPerceivedTruthIndex.value = index
}
const selectedOptionTrustInInstitutions = ref('')
const selectedOptionTrustInInstitutionsIndex = ref(0)
function updateSelectedOptionTrustInInstitutions(option, index) {
    selectedOptionTrustInInstitutions.value = option
    selectedOptionTrustInInstitutionsIndex.value = index
}
function updateMenu(resp) {
    updateMenuNumber.value = resp.index
    updateMenuProgress.value = resp.progress
}
onMounted(async () => {
    const response = await fetch('./crisis.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    data.statistics = await response.json()
    selectedOptionPerceivedTruth.value = Object.keys(data.statistics.Crisis.FeltRealities)[0]
    const responseTime = await fetch('./crisis_overtime.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    data.statisticsTime = await responseTime.json()
    selectedOptionWhoIsConcerned.value = Object.keys(data.statisticsTime)[0]
    selectedOptionTrustInInstitutions.value = Object.keys(data.statistics.Crisis.Institutions)[0]
})
const heighestGroup = ref('')
const heighestGroupPercent = ref(0)
function setHeighestGroup(group, percent) {
    heighestGroup.value = group
    heighestGroupPercent.value = percent
}
</script>
<template>
    <div class="">
        <div class="md:grid md:grid-cols-12 md:gap-[25px] items-center h-[90vh] md:mt-[45px] md:m-[45px]">
            <div class="row-start-1 text-left md:col-span-6">
                <h1 class="text-3xl md:heading">
                    It's the
                    <span class=" underline decoration-primary decoration-8"
                        style="padding: initial;">Crisis</span>,<br>
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
        </div>
        <AppHeader class="invisible md:visible" :updateMenuNumber="updateMenuNumber"
            :updateMenuProgress="updateMenuProgress" />
        <ScrollytellingComponent :offset="0" :progress="true" :threshold="4" :once="false" :debug="false"
            @step-progress="updateMenu">
            <GridComponent id="multicrisis" class="md:mt-[15vh]">
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
                <img class="col-start-2 col-span-10" src="./assets/images/polycrisis.png" alt="">
            </GridComponent>
            <GridComponent id="who-is-concerned" class="md:mt-[25vh]">
                <div class="col-start-7 col-span-5">
                    <h1 class="section-heading  text-left" >Who is feeling the crisis?</h1>
                    <p>While some focus on the melting of the polar caps, others fear the decline of their culture due
                        to foreign overrun. Groups even contradict on each other's crises perception and deny the
                        existence of the other's crises. Stereotypes are mixed with factual realities. Still, perception
                        of crises and the extent to which people are affected by them depends heavily on their own <span
                            class="underline decoration-primary">social position</span>. The following section will
                        introduce some of these groups and their feeling for crisis.</p>
                </div>
                <div class="col-start-2 col-span-10 grid grid-cols-12">
                    <div class="col-start-1 col-span-5">
                        <h1>Social status and crisis perception</h1>
                        <p>
                            The topic of generational justice became very prominent with a rising awareness on climate
                            justice. How (much) crisis do different generations, genders or income groups feel?
                        </p>
                        <br>
                        <p>
                            If we look at the differences of perceived crisis throughout <select ref="selection"
                                class="w-min p-[2px] text-white bg-primary rounded"
                                v-on:change="updateSelectedOptionWhoIsConcerned">
                                <option v-for="(option, index) in Object.keys(data.statisticsTime ?? {})" :key="index"
                                    :value="index">
                                    {{ option }}

                                </option>
                            </select>. We can see that <span class="underline decoration-primary">{{ heighestGroup
                                }}</span> shows the highest level of
                            crisis perception with <span class="underline decoration-primary">{{ heighestGroupPercent
                                }}%</span> at the moment.
                        </p>
                    </div>

                    <LinePlot class="col-start-7 col-span-6" @group-update="setHeighestGroup"
                        :data="data.statisticsTime ?? {}" :componentIndex="0"
                        :selectedOption="selectedOptionWhoIsConcerned">
                    </LinePlot>
                </div>

            </GridComponent>
            <GridComponent class="md:mt-[25vh]" id="felt-realities">
                <div class="col-start-2 col-span-10 justify-center flex md:mb-[25vh]">
                    <img class="w-[50%]" src="./assets/images/quote.png">
                </div>
                <div class="col-start-2 col-span-4 flex flex-col gap-16 justify-center">
                    <div class="flex flex-col gap-5">
                        <div class="flex gap-5 justify-center">
                            <button class="button"
                                v-for="(option, index) in Object.keys(data.statistics?.Crisis.FeltRealities ?? {})"
                                :key="index" :value="index"
                                :class="selectedOptionPerceivedTruthIndex == index ? 'bg-primary text-white' : ''"
                                @click="updateSelectedOptionPerceivedTruth(option, index, this)">{{ option }}</button>
                        </div>
                        <h1 class="text-center">"{{ [
            'I am feeling a sort of doomsday mood.',
            'I am suffering more than others in the current situation.',
            'To what extent are you concerned about no longer being able to pay your bills?'
        ][selectedOptionPerceivedTruthIndex] }}"</h1>
                    </div>
                    <BarComparison :data="data.statistics?.Crisis?.FeltRealities ?? {}"
                        :selectedOption="selectedOptionPerceivedTruth">
                    </BarComparison>
                </div>
                <div class="col-span-5 col-start-7">
                    <h1 class="section-heading text-left">Between real feelings and perceived truth
                    </h1>
                    <p>
                        According to famous Thomas Theorem, formulated by by William and Dorothy Thomas in 1928, we can
                        point out, that the interpretation of a situation (however "objectively" false it may appear)
                        has real consequences because the actions of actors are based on their definition of the
                        situation. In other words, the interpretation of a situation causes the action. This
                        interpretation is not objective. Actions are affected by subjective perceptions of situations.
                        Whether there even is an objectively correct interpretation is not important for the purposes of
                        helping guide individuals' behavior.
                    </p>
                    <br>
                    <p>
                        People that show the feeling of crisis are especially more extreme in the estimation of their
                        current situation. A hightened sense of anxiety can hinder curiosity and strengthen the tendency
                        to stick to our own beliefs; it can make us prone to extreme positions which provide a clear
                        interpretation of our multi faceted and ever changing reality.
                    </p>
                </div>

            </GridComponent>
            <GridComponent id="effects-on-democracy" class="md:mt-[50vh]">
                <div class="relative col-start-2 col-span-10 grid grid-cols-2 justify-center items-center">
                    <div class="col-span-1">
                        <h1 class="section-heading" >Effects on Democracy</h1>
                        <p> Different Interpretation of Realities has strong effects on
                            cooperation in a
                            democratic
                            system. The perception of urgent fields of actions varies strongly- and the higher your
                            crises
                            perception is,
                            the you feel prevalent stress, the more you are moving towards the spiral of unrational
                            decision
                            making
                            and
                            sense making of the world.

                            Recent studies also found out that factors as loneliness and individualisation have strong
                            impact on
                            how
                            to
                            handle a crises. Strong</p>
                    </div>

                    <img class="absolute bottom-0 right-0 h-[150%]" src="./assets/images/Bundestag.png" alt="">
                </div>
                <div class="col-start-2 col-span-10 flex flex-col items-center justify-center gap-14">
                    <div class="flex gap-5">
                        <button class="button"
                            v-for="(option, index) in Object.keys(data.statistics?.Crisis.Institutions ?? {})"
                            :key="index" :value="index"
                            :class="selectedOptionTrustInInstitutionsIndex == index ? 'bg-primary text-white' : ''"
                            @click="updateSelectedOptionTrustInInstitutions(option, index, this)">{{ option }}</button>
                    </div>
                    <RelativeComparison :data="data.statistics?.Crisis.Institutions ?? {}"
                        :selectedOption="selectedOptionTrustInInstitutions">
                    </RelativeComparison>
                </div>
                <div class="col-start-2 col-span-10 grid grid-cols-5">
                    <h1 class="col-span-2">Liking AFD and having tendencies to antidemocratic opinions</h1>

                    <p class=" col-start-3 col-span-3">In Germany, not only is there a clear polarization between
                        people favoring the Green party and the AFD. The datasets show, that as a dangerous reflex
                        to crisis people who sympathise with the AfD, do also have a hire desire for a strong leader
                        [Statement: is the agreement that under certain circumstances, a dictatorship is the better
                        form of government in the national interest] as well as a higher opinion towards
                        nationalism.
                    </p>


                </div>
                <img class="col-start-4 col-span-6" src="./assets/images/democracy.png" alt="">

            </GridComponent>
            <GridComponent id="crisis-resilience" class="md:mt-[50vh]">
                <img class="col-start-2 col-span-5" src="./assets/images/resilience.png" alt="">
                <div class="col-start-7 col-span-5">
                    <h1 class="section-heading" >Crisis Resilience</h1>
                    <p>
                        Although crises lead on different spectrums of society to distrust on governmental institutions
                        and political parties, people still express their political position in demonstrations, no
                        matter the level of crisis, socioeconomic or demographic background. On the other hand, levels
                        of trust have been eroding no matter the political position or the feeling of crisis. On the
                        contrasting side to the referred feelings of crisis, anger and concern lays the feeling of
                        Self-Efficacy. »The traditional, hierarchical government model simply does not meet the demands
                        of this complex, rapidly changing age. [...] thriving in the net worked age requires governments
                        to change the way they think and operate. [...] we need to update our thinking.« (Eggers: »The
                        changing nature of government«, S. 28)

                    </p>
                    <br>
                    <p>
                        In the future, more diffused approaches to governance in all parts of society will only work if
                        there are frameworks in place that assure very high levels of transpar-
                        ency, accountability and integrity. At the same time, for public authorities and
                        society more broadly, the ability to put new forms of governance into the service
                        of realising people’s collective good will depend on a common commitment to
                        democratic values, human rights and equality of opportunity. Even with these
                        frameworks and values in place, the emergence of new forms of governance will
                        still depend fundamentally on the capacity of individuals and groups to partici-
                        pate actively in making and implementing decisions.
                    </p>
                </div>
            </GridComponent>

        </ScrollytellingComponent>
        <GridComponent>
            <div class="col-start-2 col-span-10 grid grid-cols-2">
                <div class="col-start-1">
                    <h1 class="section-heading" id="sources">References</h1>
                </div>
                <div class="col-start-2">
                    <h1 class="section-heading" id="sources">Dataset</h1>
                </div>
            </div>
        </GridComponent>
    </div>
    <AppFooter />
</template>
<style></style>