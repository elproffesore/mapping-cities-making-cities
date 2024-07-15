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
        <div class="grid grid-cols-12 items-center gap-[25px] md:h-[90vh] pt-[45px] md:p-[45px] text-white text-left">
            <div class="row-start-1 text-center md:text-left col-start-2 col-span-10 md:col-span-8">
                <h1 class="headline">
                    Are Crisis even <span class="underline decoration-white decoration-8" style="padding: initial;">real</span>?
                </h1>
            </div>
            <div class="row-start-3 col-start-2 col-span-10 md:col-span-6 self-end">
                <p>The phenomena of crisis is omnipresent and global – whether it's climate crisis, financial crisis,
                    migration crisis or crisis of democracy, to name few. We are constantly confronted with ever new
                    crisis analyses, putting us into a permanent state of emergency. But what exactly does that mean for
                    us? And how do feelings of crisis, anger and concern affect the democracy we live in?<br><br> Our Datastory is based on the Survey 'Social Sentiments in Times of Crises' that investigates societal polarisation and political attitudes in Germany in the period from December 2021 - February 2024.</p>

            </div>
            <img class="row-start-2 col-start-2 col-span-10 md:row-span-3 md:col-start-9" src="./assets/images/Welt.png" alt="">
        </div>
        <AppHeader class="invisible md:visible" :updateMenuNumber="updateMenuNumber"
            :updateMenuProgress="updateMenuProgress" />
        <ScrollytellingComponent :offset="0" :progress="true" :threshold="4" :once="false" :debug="false"
            @step-progress="updateMenu">
            <GridComponent id="multicrisis">
                <div class="content-container">
                    <div>
                        <h1>Can you feel Polycrisis yet?</h1>
                        <p>
                            Reality check: we are living in instable times. Climate change, the former number one topic of
                            concern, is falling behind more pressing and feasible topics, such as inflation or political
                            conflicts. All topics are intertwined and already changing the ways we are able to live and
                            move. What do you experience?
                        </p>
                    </div>
                </div>
                <img class="col-start-2 col-span-10" v-if="!mobileAndTabletCheck()" src="./assets/images/polycrisis_new.png" alt="">
                <img class="col-start-2 col-span-10" v-if="mobileAndTabletCheck()" src="./assets/images/polycrisis_new_mobile.png" alt="">

            </GridComponent>
            <GridComponent id="who-is-concerned">
                <div class="content-container">
                    <div>
                        <h1>Who is feeling the Crisis?</h1>
                        <p>Each crisis has a multitude of narratives to explain its origin and solutions. 
                                Perceptions of crises and the extent to which people are affected by them depends
                                heavily on their own social position. They all result in different demands towards
                                politicians and our political system.
                        </p>
                        <br>
                        <p>
                                But before we delve into what crisis means for
                                democracy, we ask about the feeling of crisis: depressed, anxious, angry, left behind.
                                Who is concerned? Is it the old? The poor? The people on the countryside? 
                        </p>
                    </div>
                    <div class="flex flex-col h-full">
                        <div>
                            <h2>The Young and the Poor have the Heighest 'Feeling of Crisis'</h2>
                            <p>Especially the <span class="underline decoration-primary">generations</span>, <span class="underline decoration-primary">different genders</span> and <span class="underline decoration-primary">classes</span> showed high differences of their crisis feeling while differences between city and rural or east and west germany were not so significant. <b>Explore yourself the perceived crisis amongst </b>
                                 <select
                                    class="w-min select text-white bg-primary rounded"
                                    v-if="!mobileAndTabletCheck()"
                                    v-model="selectedOptionWhoIsConcerned">
                                    <option v-for="(option, index) in Object.keys(data.statisticsTime ?? {})"
                                        :key="index" :value="option">
                                        {{ option }}
                                    </option>
                                </select>:
                                </p>
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
                            <p class="text-left vis-fontsize">{{ {
                            'Generations': 'GenZ (born after 1995), Young (1965 to 1994), Boomer (1945 - 1964) and Old (born before 1945)',
                            'Gender': 'Gender is only divided into Men and Women due to small sample sizes for other Genders.',
                            'City - Rural': 'City (population density of ZIP > 150/km2), Rural(population density of ZIP < 150/km2)',
                            'Class': 'Poor (group with the lowest 25% of income), Rich (group with the highest 25% of income) ',
                            'East - West': 'Former East Germany, Former West Germany'
                            }[selectedOptionWhoIsConcerned] }}</p>
                        </div>
                    </div>
                </div>

            </GridComponent>
            <GridComponent id="felt-realities">
                <!-- <div class="content-container">
                    <img class="w-3/4" v-if="!mobileAndTabletCheck()" src="./assets/images/quote.png">
                    <img class="w-full" v-if="mobileAndTabletCheck()" src="./assets/images/quote_mobile.png">
                </div> -->
                <div class="content-container relative">
                    <!-- <img class="w-1/3 absolute left-[-45%] top-[-0%]" src="./assets/images/quote_mobile.png"> -->
                    <div>
                        <h1>About felt Realities and Perceived Truths</h1>
                        <p>
                            Now that we have a grasp on who is feeling the crisis overall, we look at more concrete feelings of the crisis: 
                            People in Crisis Mode are prone to feel a sort of Doomsday Mood the most, compared to feeling like they suffer 
                            more than others or like they will not be able to pay their bills in the next month. 
                            Especially depression and anxiety are defining factors for crisis mode in our analysis. 
                        </p>
                    </div>
                    <div class="my-[5vh] grid justify-items-center md:my-[10vh] ">
                        <img class="w-3/4" v-if="!mobileAndTabletCheck()" src="./assets/images/quote.png">
                        <img class="w-3/4" v-if="mobileAndTabletCheck()" src="./assets/images/quote_mobile.png">
                    </div>

                    <div>
                        <div>
                            <h2>Being in Crisis Mode Boosts Pessimistic Stance</h2>
                            <p>We can observe that <span class="underline decoration-primary">people who feel the crisis on an everyday basis are 5 to 8 times more likely to rate their own situation as bad</span>, than people who don't feel the crisis. <b>See for yourself how people perceived their situation differently in comparison:</b></p>
                        </div>
                        <div class="grid grid-cols-2 gap-2 md:grid-cols-4 mt-16">
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
            <GridComponent id="effects-on-democracy" class="md:mt-[20vh]">
                <div class="content-container">
                    <img class="rotate-[-45deg]" :class="mobileAndTabletCheck()?'w-[250px]':'w-[400px]'" src="./assets/images/burn.png" alt="">
                    <div>
                        <h1>Effects on Democracy</h1>
                        <p> Different political groups and people confronted with crises 
                            may feel similarly overloaded and left alone by politics. 
                            Their Perceived urgent fields of actions and preferred solutions 
                            are possibly not aligned with political decisions. Explore how 
                            the felt crisis connects to trust in state system. </p>
                    </div>
                    <div>
                        <div>
                            <h2>Crisis Feeling Damages Trust in Democratic Institutions</h2>
                            <p>People that showed a <span class="underline decoration-primary">high level of crisis perception</span> also showed a <span class="underline decoration-primary">high level of distrust in democratic institutions.</span> </p>
                        </div>
                        <div class="grid grid-cols-2 gap-2 mt-16">
                                    <button class="button"
                                        v-for="(option, index) in Object.keys(data.statistics?.Crisis.Institutions ?? {})"
                                        :key="index" :value="index"
                                        :class="selectedOptionTrustInInstitutionsIndex == index ? 'bg-primary text-white' : ''"
                                        @click="updateSelectedOptionTrustInInstitutions(option, index, this)">Trust in {{ option }}</button>
                        </div>
                        <DotonlineComparison @group-update="sethighestGroupDotonline" class="w-full my-8" :data="data.statistics?.Crisis.Institutions ?? {}"
                            :selectedOption="selectedOptionTrustInInstitutions" :componentIndex="0">
                        </DotonlineComparison>
                    </div>
                    <div>
                        <div>
                            <p>The situation was <span class="underline decoration-primary">even worse</span> for people who had the <span class="underline decoration-primary">crisis feeling</span> and also <span class="underline decoration-primary">favored the "Alternative für Deutschland" (AfD) party.</span></p>
                        </div>
                        <DotonlineComparison class="w-full my-8" :data="data.statistics?.Crisis.InstitutionsAFD ?? {}"
                            :selectedOption="selectedOptionTrustInInstitutions" :componentIndex="1">
                        </DotonlineComparison>
                    </div>
                    <div>
                        <h2>Populist Narratives Longing for a Strong Leader</h2>
                        <p>In Germany, not only is there a clear polarization between
                            people favoring the Green party and the AFD. The datasets show, that as a dangerous reflex
                            to crisis people who sympathise with the AfD, do also have a significant higher desire for a strong leader as well as a higher opinion towards
                            nationalism.
                        </p>
                        <img class="mt-[50px]" v-if="mobileAndTabletCheck()" src="./assets/images/democracy_new_mobile.png" alt="">
                        <img v-if="!mobileAndTabletCheck()" src="./assets/images/democracy_new.png" alt="">
                    </div>
                </div>
            </GridComponent>
            <GridComponent id="crisis-resilience" class="mt-[35vh]">
                <div class="content-container relative">
                    <img :class="mobileAndTabletCheck()?'absolute top-[-12.5%] left-[-10%]':'absolute top-[-20%] left-[-60%]'" src="./assets/images/hand-left.png" alt="">
                    <img :class="mobileAndTabletCheck()?'absolute top-[-12.5%] right-[-10%]':'absolute top-[-20%] right-[-60%]'" src="./assets/images/hand-right.png" alt="">
                    <h1>Crisis: A Chance for Transformation</h1>
                    <p> Although feeling crises can have on the one hand paralysing and atomising effects, we can also observe a rise of protest activity, no matter thein different political spectrums. <br>
                        What also connects different political spectrums is the demand for a <b>transformation of the democratic system</b> through more means of direct democracy. <br><br>
                    </p>
                    <p><i><b>»The traditional, hierarchical government model simply does not
                                meet the demands of this complex, rapidly changing age. [...] thriving in the net
                                worked age requires governments to change the way they think and operate. [...]
                                we need to update our thinking.«</b></i> <br>(Eggers: »The changing nature of government«,
                        S. 28)</p>
                    <br>
                    <p>Especially in context of the polycrisis, is the approach to involve citizens into processes policy making, the go-to strategy that policy-makers as well as citizens favor the most. Models of Citizen participation through citizen's assemblies are already tested allover Europe.</p>
                    <p>We see how feeling crisis - angry, uncertain, left behind - goes hand in hand with people's financial status and generational outlook 
                        more than their gender or living area. It is connected to the feeling that one suffers more than others, that one is financially not secured. 
                        Feeling crisis also translates into politics. It is connected to low trust in the current government and higher liking of right-wing parties.
                        Especially if people both feel crisis and sympathize with right-wing parties, trust is low and anti-democratic tendencies are high. 
                        They even agree with dictatorship under certain circumstances.<br><br>

But - <span class="underline decoration-primary">those who agree with dictatorship are the minority.</span> Although, trust in the government may be low, the general trust in the legal system is still prominent.<br><br>

Politics will have to adress the need for local participation. [Bezug zu Deutschland Monitor herstellen - Stadt/Land oder Ost/West ist nicht so wichtig wie das Gefühl, abgehängt zu sein. Und die lokale Pollitik. Vertrauen in Politik ist größer, je näher sie am Menschen, statt "die da Oben" ist.]
                    </p>
                </div>
            </GridComponent>
        </ScrollytellingComponent>
        <GridComponent>
            <div class="content-container gap-4" id="sources">
                <div class="border rounded border-1 w-full px-4">
                    <div class="grid grid-cols-2 items-center ">
                        <h2 class="text-left">References</h2>
                        <img @click="showReferences = !showReferences" src="./assets/images/right-arrow.svg" :class="!showReferences?'rotate-90':'rotate-[-90deg]'" class=" w-8 justify-self-end" alt="">
                    </div>
                    <p class="pb-4" v-if="showReferences">Our Datastory is based on the Survey 'Social Sentiments in Times of Crises' that investigates
                        feelings and political attitudes in Germany in the period from 2022 - 2024.
                    </p>                </div>
                <div class="border rounded border-1 w-full px-4">
                    <div class="grid grid-cols-2 items-center ">
                        <h2 class="text-left">Dataset</h2>
                        <img @click="showDatasetDescription = !showDatasetDescription" src="./assets/images/right-arrow.svg" :class="!showDatasetDescription?'rotate-90':'rotate-[-90deg]'" class=" w-8 justify-self-end" alt="">
                    </div>
                    <p class="pb-4" v-if="showDatasetDescription">Our Datastory is based on the Survey 'Social Sentiments in Times of Crises' that investigates
                        feelings and political attitudes in Germany in the period from 2022 - 2024.
                    </p>
                </div>
            </div>
        </GridComponent>
    </div>
    <AppFooter class="mt-[5vh]" />
</template>
<style></style>
