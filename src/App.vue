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
function mobileAndTabletCheck() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
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
                    us? And how do feelings of crisis, anger and concern affect the democracy we live in?<br><br> Our Datastory is based on the Survey 'Social Sentiments in Times of Crises' that investigates societal polarisation and political attitudes in Germany in the period from December 2021 - February 2024.</p>

            </div>
            <img class="row-start-2 col-start-2 col-span-10 md:row-span-3 md:col-span-10 md:col-start-8" src="./assets/images/Welt.png" alt="">
        </div>
        <AppHeader class="invisible md:visible" :updateMenuNumber="updateMenuNumber"
            :updateMenuProgress="updateMenuProgress" />
        <ScrollytellingComponent :offset="0" :progress="true" :threshold="4" :once="false" :debug="false"
            @step-progress="updateMenu">
            <GridComponent id="multicrisis" class="md:mt-[15vh]">
                <hr class="col-span-10 col-start-2 text-primary">
                <div class="col-start-2 col-span-10 md:col-start-2 md:col-span-7">
                    <h1 class="section-heading">Can you feel Polycrisis yet?</h1>
                    <p>
                        Reality check: we are living in instable times. Climate change, the former number one topic of
                        concern, is falling behind more pressing and feasible topics, such as inflation or political
                        conflicts. All topics are intertwined and already changing the ways we are able to live and
                        move. What do you experience?
                    </p>
                </div>
                <img class="col-start-2 col-span-10" v-if="!mobileAndTabletCheck()" src="./assets/images/polycrisis_new.png" alt="">
                <img class="col-start-2 col-span-10" v-if="mobileAndTabletCheck()" src="./assets/images/polycrisis_new_mobile.png" alt="">
            </GridComponent>
            <GridComponent id="who-is-concerned">
                <div class="col-start-2 col-span-10 grid grid-cols-12 gap-4">
                    <div class="col-start-1 col-span-12 md:col-span-5">
                        <div>
                            <h1 class="section-heading  text-left">Who is feeling the crisis?</h1>
                            <p>Each crisis has a multitude of narratives to explain its origin and solutions. 
                                Perceptions of crises and the extent to which people are affected by them depends
                                heavily on their own social position. They all result in different demands towards
                                politicians and our political system. <br>
                                But before we delve into what crisis means for
                                democracy, we ask about the feeling of crisis: depressed, anxious, angry, left behind.
                                Who is concerned? Is it the old? The poor? The people on the countryside? </p>
                                <br>
                        </div>
                    </div>
                    <div class="col-start-1 col-span-12 self-end md:h-full md:col-start-7 md:col-span-6">
                        <div class="flex flex-col h-full">
                            <div>
                                <h2>The Young and the Poor have increased 'Feeling of Crisis'</h2>
                                <br>
                                <p class="pb-1">Especially the <span class="underline decoration-primary">young generations</span> and the <span class="underline decoration-primary">low-income classes</span> are prone to the crisis feeling while differences between city and rural or east and west germany were not significant. Explore yourself the perceived crisis amongst:</p>
                                <select
                                    class="w-min select text-white bg-primary rounded"
                                    v-if="!mobileAndTabletCheck()"
                                    v-model="selectedOptionWhoIsConcerned">
                                    <option v-for="(option, index) in Object.keys(data.statisticsTime ?? {})"
                                        :key="index" :value="option">
                                        {{ option }}
                                    </option>
                                </select>
                                <br v-if="mobileAndTabletCheck()">
                                <select
                                    class="w-full select p-2 text-xl text-white bg-primary rounded"
                                    v-if="mobileAndTabletCheck()"
                                    v-model="selectedOptionWhoIsConcerned">
                                    <option v-for="(option, index) in Object.keys(data.statisticsTime ?? {})"
                                        :key="index" :value="option">
                                        {{ option }}
                                    </option>
                                </select>
                            </div>
                        <div>

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
                    </div>
                </div>

            </GridComponent>
            <GridComponent id="felt-realities" class="gap-4">
                <div class="col-start-2 col-span-10 justify-center flex mb-[10vh] md:row-start-1">
                    <img class="w-[50%]" v-if="!mobileAndTabletCheck()" src="./assets/images/quote.png">
                    <img class="w-[100%]" v-if="mobileAndTabletCheck()" src="./assets/images/quote_mobile.png">

                </div>
                <div class="col-start-2 col-span-10 md:col-span-5 md:col-start-7 md:row-start-2">
                    <h1 class="section-heading text-left">About felt Realities and Perceived Truths
                    </h1>
                    <p>
                        Now that we have a grasp on who is feeling the crisis overall, we look at more concrete feelings of the crisis: 
                        People in Crisis Mode are prone to feel a sort of Doomsday Mood the most, compared to feeling like they suffer 
                        more than others or like they will not be able to pay their bills in the next month. 
                        Especially depression and anxiety are defining factors for crisis mode in our analysis. 
                    </p>

                </div>
                <div class="col-start-2 col-span-10 flex flex-col gap-16 justify-center md:col-start-2 md:col-span-5 md:row-start-2">
                        <div>
                            <h2>Being in Crisis Mode boosts pessimistic stance</h2>
                            <br>
                            <p>We can observe that <span class="underline decoration-primary">people who feel the crisis on an everyday basis are 5 to 8 times more likely to rate their own situation as bad</span>, than people who don't feel the crisis.<b>See for yourself how people perceived their situation differently in comparison:</b>
                        </p>
                        </div>
                        <div class="flex flex-col gap-8">
                            <div class="grid grid-cols-2 gap-2 md:grid-cols-4">
                                <button class="button"
                                    v-for="(option, index) in Object.keys(data.statistics?.Crisis.FeltRealities ?? {})"
                                    :key="index" :value="index"
                                    :class="selectedOptionPerceivedTruthIndex == index ? 'bg-primary text-white' : ''"
                                    @click="updateSelectedOptionPerceivedTruth(option, index, this)">{{ option }}
                                </button>
                            </div>
                        <div>
                            <h3 class="text-center" v-html='[
            `"I am feeling a sort of doomsday mood. <br> <br>`,
            `"I am suffering more than others in the current situation."`,
            `"To what extent are you concerned about no longer being able to pay your bills?"`,
            `"I am able to determine my own destiny."`
        ][selectedOptionPerceivedTruthIndex]'></h3>
                            <BarComparison :data="data.statistics?.Crisis?.FeltRealities ?? {}"
                        :selectedOption="selectedOptionPerceivedTruth">
                    </BarComparison>
                        </div>
                    </div>
                </div>
            </GridComponent>
            <GridComponent id="effects-on-democracy" class="gap-4">
                <div class="col-start-2 col-span-10 md:col-start-2 md:col-span-5">
                        <h1 class="section-heading">Effects on Democracy</h1>
                        <p> Different political groups and people confronted with crises 
                            may feel similarly overloaded and left alone by politics. 
                            Their Perceived urgent fields of actions and preferred solutions 
                            are possibly not aligned with political decisions. Explore how 
                            the felt crisis connects to trust in state system. </p>
                            <br>
                </div>
                <div class="col-start-2 col-span-10 flex flex-col justify-center gap-16 md:col-start-7 md:col-span-5">
                    <div>
                        <h2 class="text-left">Crisis Feeling damages Trust in Democratic Institutions</h2>
                        <br>
                        <p>People that showed a <span class="underline decoration-primary">high level of crisis perception</span> also showed a <span class="underline decoration-primary">high level of distrust in democratic institutions.</span> </p>
                    </div>
                    <div>
                        <h3 class="text-center">Trust in ...</h3>
                        <br>
                        <div class="grid grid-cols-2 gap-5 justify-between">
                                <button class="button"
                                    v-for="(option, index) in Object.keys(data.statistics?.Crisis.Institutions ?? {})"
                                    :key="index" :value="index"
                                    :class="selectedOptionTrustInInstitutionsIndex == index ? 'bg-primary text-white' : ''"
                                    @click="updateSelectedOptionTrustInInstitutions(option, index, this)">{{ option }}</button>
                        </div>
                    </div>
                    <DotonlineComparison @group-update="sethighestGroupDotonline" class="w-full my-8" :data="data.statistics?.Crisis.Institutions ?? {}"
                        :selectedOption="selectedOptionTrustInInstitutions" :componentIndex="0">
                    </DotonlineComparison>


                </div>
                <div class="col-start-2 col-span-10 md:col-start-2 md:col-span-5">
                    <h1 class="section-heading">Populist Narratives longing for a strong Leader</h1>
                    <p>In Germany, not only is there a clear polarization between
                        people favoring the Green party and the AFD. The datasets show, that as a dangerous reflex
                        to crisis people who sympathise with the AfD, do also have a significant higher desire for a strong leader as well as a higher opinion towards
                        nationalism.
                    </p>
                </div>
                <img class="col-start-2 col-span-10 mt-[50px]" v-if="mobileAndTabletCheck()" src="./assets/images/democracy_new_mobile.png" alt="">
                <img class="col-start-3 col-span-8 mt-[-150px]" v-if="!mobileAndTabletCheck()" src="./assets/images/democracy_new.png" alt="">

            
            </GridComponent>
            <GridComponent id="Crisis as a Chance for Transformation">
                <img class="col-start-2 col-span-10 md:col-start-2 md:col-span-5" src="./assets/images/resilience.png" alt="">
                <div class="col-start-2 col-span-10 md:col-start-7 md:col-span-5">
                    <h1 class="section-heading">Crisis as a chance for Transformation</h1>
                    <p> Although feeling crises can have on the one hand paralysing and atomising effects, we can also observe a rise of protest activity, no matter thein different political spectrums. <br><br>
                        What also connects different political spectrums is the demand for a <b>transformation of the democratic system</b> through more means of direct democracy. <br><br>



                    </p>
                    <br>
                    <p class="pl-4"><i><b>»The traditional, hierarchical government model simply does not
                                meet the demands of this complex, rapidly changing age. [...] thriving in the net
                                worked age requires governments to change the way they think and operate. [...]
                                we need to update our thinking.«</b></i> <br>(Eggers: »The changing nature of government«,
                        S. 28)</p>
                    <br>
                    <p>Especially in context of the polycrisis, is the approach to involve citizens into processes policy making, the go-to strategy that policy-makers as well as citizens favor the most. Models of Citizen participation through citizen's assemblies are already tested allover Europe.

</p>

                </div>

  </GridComponent>
            <GridComponent id="crisis-resilience">
                <img class="col-start-2 col-span-10 md:col-start-2 md:col-span-5" src="./assets/images/resilience.png" alt="">
                <div class="col-start-2 col-span-10 md:col-start-7 md:col-span-5">
                    <h1 class="section-heading">Crisis Resilience</h1>
                    <p>We see how feeling crisis - angry, uncertain, left behind -  goes hand in hand with people's financial status and generational outlook more than their gender or living area. <br><br>
                        
                        What now?<br>
How to strengthen our crises resilience?<br>
How can we build a community resilience?<br>
Can we rebuild trust in our institution and share a common sense of mitigation strategies?<br><br>

Je regionaler die Politik ist, desto mehr Vertrauen haben Menschen in lokale Politik und Gefühl von Self-Efficacy<br><br>


Places and Strategies of Reconciliation<br>
Places of collective Self-Efficacy - Werkstattnetzwerk<br>
Neighborhood Community Places<br>
Get in contact with people outside of your bubble - Join a sport's Association's, start a new Hobbies, learn a new skill (choir, gardens, workshops) or go to Discussion Panels?<br>
Join Citizen Assemblies and Citizen Science!<br>
Self efficacy, Places of Democracy,
                    </p>
                  

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
