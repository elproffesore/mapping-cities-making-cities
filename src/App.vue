<script setup>
import GridComponent from './components/GridComponent.vue';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import ScrollytellingComponent from './components/ScrollytellingComponent.vue';
import BarComparison from './components/Visualizations/BarComparison.vue';
import LinePlot from './components/Visualizations/LinePlot.vue';
import DotonlineComparison from './components/Visualizations/DotonlineComparison.vue';
import { ref, onMounted, reactive } from 'vue';
const updateMenuNumber = ref(0)
const updateMenuProgress = ref(0)
const data = reactive({})
const showDatasetDescription = ref(false)
const showReferences = ref(false)


const selectedOptionWhoIsConcerned = ref('')

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
const highestGroup = ref('')
const highestGroupPercent = ref(0)
function sethighestGroup(group, percent) {
    highestGroup.value = group
    highestGroupPercent.value = percent
}
const highestGroupDotonline = ref('')
const lowestGroupDotonline = ref('')
const highestGroupDotonlinePercent = ref(0)
const lowestGroupDotonlinePercent = ref(0)
function sethighestGroupDotonline(highestGroup, highestPercent,lowestGroup, lowestPercent) {
    highestGroupDotonline.value = highestGroup
    highestGroupDotonlinePercent.value = highestPercent
    lowestGroupDotonline.value = lowestGroup
    lowestGroupDotonlinePercent.value = lowestPercent
}
</script>
<template>
    <div class="">
        <div class="grid grid-cols-12 items-center gap-[25px] md:h-[90vh] mt-[45px] md:m-[45px]">
            <div class="row-start-1 text-center md:text-left col-start-2 col-span-10 md:col-span-6">
                <h1 class="text-6xl md:heading">
                    It's the
                    <span class="underline decoration-primary decoration-8"
                        style="padding: initial;">Crisis</span>,<br>
                    stupid!
                </h1>
                <h2>How a feeling keeps us captivated. </h2>
            </div>
            <div class="row-start-3 col-start-2 col-span-10 md:col-span-6 self-end">
                <p>The phenomena of crisis is omnipresent and global – whether it's climate crisis, financial crisis,
                    migration crisis or crisis of democracy, to name few. We are constantly confronted with ever new
                    crisis analyses, putting us into a permanent state of emergency. But what exactly does that mean for
                    us? And how do feelings of crisis, anger and concern affect the democracy we live in?</p>

            </div>
            <img class="row-start-2  col-start-2 col-span-10 md:row-span-3 md:col-span-10 md:col-start-8" src="./assets/images/Welt.png" alt="">
        </div>
        <AppHeader class="invisible md:visible" :updateMenuNumber="updateMenuNumber"
            :updateMenuProgress="updateMenuProgress" />
        <ScrollytellingComponent :offset="0" :progress="true" :threshold="4" :once="false" :debug="false"
            @step-progress="updateMenu">
            <GridComponent id="multicrisis" class="md:mt-[15vh]">
                <hr class="col-span-10 col-start-2 text-primary">
                <div class="col-start-2 col-span-10 md:col-start-2 md:col-span-7">
                    <h1 class="section-heading">Can you feel the (poly-)crisis yet?</h1>
                    <p>
                        Reality check: we are living in instable times. Climate change, the former number one topic of
                        concern, is falling behind more pressing and feasible ones, such as inflation or political
                        conflicts. All topics are intertwined and already changing the ways we are able to live and
                        move. What do you experience?
                    </p>
                </div>
                <img class="col-start-2 col-span-10" src="./assets/images/polycrisis_new.png" alt="">
            </GridComponent>
            <GridComponent id="who-is-concerned">
                <div class="col-start-2 col-span-10 grid grid-cols-12 items-center gap-4">
                    <div class="col-start-1 col-span-12 md:col-span-5">
                        <div>
                            <h1 class="section-heading  text-left">Who is feeling the crisis?</h1>
                            <p>Each crisis has a multitude of narratives to explain its origin and solutions.
                                Perceptions of crises and the extent to which people are affected by them depends
                                heavily on their own social position. They all result in different demands towards
                                politicians and our political system. But before we delve into what crisis means for
                                democracy, we ask about the feeling of crisis: depressed, anxious, angry, left behind.
                                Who is concerned? Is it the old? The poor? The people on the countryside? </p>

                        </div>
                        <br>
                        <div>
                            <h1>Social status and crisis perception</h1>
                            <p>We observed that especially the <span class="underline decoration-primary">young generations</span> are prone to the crisis feeling as well as the <span class="underline decoration-primary">low-income classes</span>. Meanwhile the differences between city and rural or east and west were not that significant.</p>
                        </div>
                    </div>
                    <div class="col-start-1 col-span-12 self-end flex flex-col gap-2 md:h-full md:col-start-7 md:col-span-6">
                        <div class="flex flex-col gap-2">
                            <h1 class="pb-1">Feeling of Crisis in % among 
                                <select
                                    class="w-min select text-white bg-primary rounded"
                                    v-model="selectedOptionWhoIsConcerned">
                                    <option v-for="(option, index) in Object.keys(data.statisticsTime ?? {})"
                                        :key="index" :value="option">
                                        {{ option }}

                                    </option>
                                </select>
                            </h1>
                                <p>we can see that <span class="highlight">{{ highestGroup
                                    }}</span> shows the highest level of
                                crisis perception with <span class="highlight">{{
            highestGroupPercent
        }}%</span> at the moment.</p>
                        </div>

                        <LinePlot @group-update="sethighestGroup" :data="data.statisticsTime ?? {}" :componentIndex="0"
                            :selectedOption="selectedOptionWhoIsConcerned">
                        </LinePlot>
                        <hr class="mt-4">
                        <p class="text-left text-xs">{{ {
                            'Generations': 'GenZ (born after 1995), Young (1965 to 1994), Boomer (1945 - 1964) and Old (born before 1945)',
                            'Gender': 'Gender is only divided into Men and Women due to small sample sizes for other Genders.',
                            'City - Rural': 'City (population density of ZIP > 150/km2), Rural(population density of ZIP < 150/km2)',
                            'Class': 'Poor (group with the lowest 25% of income), Rich (group with the highest 25% of income) ',
                            'East - West': 'Former East Germany, Former West Germany'
                            }[selectedOptionWhoIsConcerned] }}</p>
                    </div>
                </div>

            </GridComponent>
            <GridComponent id="felt-realities" class="gap-4">
                <div class="col-start-2 col-span-10 justify-center flex mb-[10vh] md:row-start-1">
                    <img class="w-[100%] md:w-[50%]" src="./assets/images/quote.png">
                </div>
                <div class="col-start-2 col-span-10 md:col-span-5 md:col-start-7 md:row-start-2">
                    <h1 class="section-heading text-left">About felt realities and perceived truths
                    </h1>
                    <p>
                        A heightened sense of anxiety can hinder trust in the surrounding and strengthen the tendency to
                        stick to our own beliefs; it can make us prone to extreme positions of our multi faceted and
                        ever changing reality. Humans rarely base their decisions on mere rational input-output
                        calculations, and we observe a clear drift towards populist opinions. This is why understanding
                        the feelings in the crises is just as important as the concrete discussions on how to solve
                        them.
                    </p>
                    <br>
                    <p>
                        Now that we have a feeling for who is, well, feeling the crisis overall, we look at more
                        concrete psychological effects: social comparison, financial fears directed towards the future
                        and the feeling of self-efficacy.
                    </p>
                    <br>

                    <p><b>See for yourself how people the people that had the feeling of crisis perceived their situation differently than those who didn't feel the crisis</b></p>
                </div>
                <div class="col-start-2 col-span-10 flex flex-col gap-4 justify-center md:col-start-2 md:col-span-4 md:row-start-2">
                    <div class="flex flex-col gap-5">
                        <h1>Perceived Crisis Boosts Strong Pessimistic Stance</h1>
                        <div class="flex gap-5 justify-between">
                            <button class="button"
                                v-for="(option, index) in Object.keys(data.statistics?.Crisis.FeltRealities ?? {})"
                                :key="index" :value="index"
                                :class="selectedOptionPerceivedTruthIndex == index ? 'bg-primary text-white' : ''"
                                @click="updateSelectedOptionPerceivedTruth(option, index, this)">{{ option }}</button>
                        </div>
                        <h1 class="text-center" v-html='[
            `"I am feeling a sort of doomsday mood. <br> <br>`,
            `"I am suffering more than others in the current situation."`,
            `"To what extent are you concerned about no longer being able to pay your bills?"`
        ][selectedOptionPerceivedTruthIndex]'></h1>
                    </div>
                    <BarComparison :data="data.statistics?.Crisis?.FeltRealities ?? {}"
                        :selectedOption="selectedOptionPerceivedTruth">
                    </BarComparison>
                    <p>
                        In this analysis we observed that <span class="underline decoration-primary">people who felt the crisis perceived their situation often 5-8x times worse</span> than people who didn't feel the crisis.
                    </p>
                </div>


            </GridComponent>
            <GridComponent id="effects-on-democracy" class="gap-4">
                <div class="col-start-2 col-span-10 md:col-start-2 md:col-span-5">
                        <h1 class="section-heading">Effects on Democracy</h1>
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
                            handle a crises. </p>
                            <br>
                </div>
                <div class="col-start-2 col-span-10 flex flex-col justify-center gap-8 md:col-start-7 md:col-span-5">
                    <h1 class="text-left">Feeling of Crisis damages Trust in Democratic Institutions                                
                        <!-- <select
                                    class="w-min select text-white bg-primary rounded"
                                    v-model="selectedOptionTrustInInstitutions">
                                    <option v-for="(option, index) in Object.keys(data.statistics?.Crisis.Institutions ?? {})"
                                        :key="index" :value="option">
                                        {{ option }}
                                    </option>
                        </select> -->
                    </h1>
                    <div class="grid grid-cols-2 gap-5 justify-between">
                            <button class="button"
                                v-for="(option, index) in Object.keys(data.statistics?.Crisis.Institutions ?? {})"
                                :key="index" :value="index"
                                :class="selectedOptionTrustInInstitutionsIndex == index ? 'bg-primary text-white' : ''"
                                @click="updateSelectedOptionTrustInInstitutions(option, index, this)">{{ option }}</button>
                        </div>
                    <DotonlineComparison @group-update="sethighestGroupDotonline" class="w-full my-16" :data="data.statistics?.Crisis.Institutions ?? {}"
                        :selectedOption="selectedOptionTrustInInstitutions" :componentIndex="0">
                    </DotonlineComparison>
                    <p>
                                People that showed a <span class="underline decoration-primary">high level of crisis perception</span> also showed a <span class="underline decoration-primary">high level of distrust in democratic institutions.</span> 
                            </p>

                </div>
                <div class="col-start-2 col-span-10 md:col-start-2 md:col-span-5">
                    <h1>Populist Narratives and the Idea(l) of a strong Leader</h1>
                    <p>In Germany, not only is there a clear polarization between
                        people favoring the Green party and the AFD. The datasets show, that as a dangerous reflex
                        to crisis people who sympathise with the AfD, do also have a significant higher desire for a strong leader as well as a higher opinion towards
                        nationalism.
                    </p>
                </div>
                <img class="col-start-2 col-span-10 md:col-start-3 md:col-span-8 md:mt-[-150px]" src="./assets/images/democracy_new.png" alt="">
            </GridComponent>
            <GridComponent id="crisis-resilience">
                <img class="col-start-2 col-span-10 md:col-start-2 md:col-span-5" src="./assets/images/resilience.png" alt="">
                <div class="col-start-2 col-span-10 md:col-start-7 md:col-span-5">
                    <h1 class="section-heading">Crisis Resilience</h1>
                    <p> We see how feeling crisis - angry, uncertain, left behind - goes hand in hand with peoples
                        financial status and generational outlook more than their gender or living area. Feeling crisis
                        then relates to political polarization, governmental distrust and favoring populist narratives.
                        Those felt and factual realities need to be addressed in other ways than either overtaking right
                        wing ideals or simply defending the political and societal status quo. Because it is not only
                        the angry and sad who loose trust, we also observe a general tendency of eroding trust and
                        rising anger as well as polarization and favoring right wing parties amongst all examined
                        groups. In other words:
                    </p>
                    <br>
                    <p class="pl-4"><i><b>»The traditional, hierarchical government model simply does not
                                meet the demands of this complex, rapidly changing age. [...] thriving in the net
                                worked age requires governments to change the way they think and operate. [...]
                                we need to update our thinking.«</b></i> <br>(Eggers: »The changing nature of government«,
                        S. 28)</p>

                    <br>
                    <p>What now?</p>

                </div>
            </GridComponent>
        </ScrollytellingComponent>
        <GridComponent>
            <div class="col-start-2 col-span-10 grid grid-cols-1 gap-4">
                <div class="col-start-1 border rounded border-1 p-1">
                    <div class="grid grid-cols-2 items-center">
                        <h1 class="section-heading pb-0" id="sources">References</h1>
                        <img @click="showReferences = !showReferences" src="./assets/images/right-arrow.svg" :class="!showReferences?'rotate-90':'rotate-[-90deg]'" class=" w-8 justify-self-end" alt="">
                    </div>
                    <p v-if="showReferences">Our Datastory is based on the Survey 'Social Sentiments in Times of Crises' that investigates
                        feelings and political attitudes in Germany in the period from 2022 - 2024.
                    </p>                </div>
                <div class="col-start-1 border rounded border-1 p-1">
                    <div class="grid grid-cols-2 items-center">
                        <h1 class="section-heading pb-0" id="sources">Dataset</h1>
                        <img @click="showDatasetDescription = !showDatasetDescription" src="./assets/images/right-arrow.svg" :class="!showDatasetDescription?'rotate-90':'rotate-[-90deg]'" class=" w-8 justify-self-end" alt="">
                    </div>
                    <p v-if="showDatasetDescription">Our Datastory is based on the Survey 'Social Sentiments in Times of Crises' that investigates
                        feelings and political attitudes in Germany in the period from 2022 - 2024.
                    </p>
                </div>
            </div>
        </GridComponent>
    </div>
    <AppFooter class="mt-[5vh]" />
</template>
<style></style>