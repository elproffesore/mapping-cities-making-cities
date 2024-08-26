<script setup>
import GridComponent from './components/GridComponent.vue';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import ScrollytellingComponent from './components/ScrollytellingComponent.vue';
import BarComparison from './components/Visualizations/BarComparison.vue';
import LinePlot from './components/Visualizations/LinePlot.vue';
import DotonlineComparison from './components/Visualizations/DotonlineComparison.vue';
import { ref, onMounted, reactive } from 'vue';
// Dataobject
const data = reactive({})
// Update for Menu progress
const updateMenuNumber = ref(0)
const updateMenuProgress = ref(0)
function updateMenu(resp) {
    updateMenuNumber.value = resp.index
    updateMenuProgress.value = resp.progress
}
// Selected Options for each interactive section
// Who is concerend?
const selectedOptionWhoIsConcerned = ref('')
const selectedOptionWhoIsConcernedPhrases = {
    'Generations': 'GenZ (born after 1995), Young (1965 to 1994), Boomer (1945 - 1964) and Old (born before 1945)',
    'Gender': 'Gender is divided into Men and Women due to small sample sizes for other Genders.',
    'City - Rural': 'City (population density of ZIP > 150/km2), Rural(population density of ZIP < 150/km2)',
    'Class': 'Poor (group with the lowest 25% of income), Rich (group with the highest 25% of income) ',
    'East - West': 'East are represented by former East Germany Counties, and West by former West Germany Counties'
}
// Perceived Truths
const selectedOptionPerceivedTruthPhrases = [
    `"I am feeling a sort of doomsday mood. <br> <br>`,
    `"I am suffering more than others in the current situation."`,
    `"To what extent are you concerned about no longer being able to pay your bills?"`,
    `"I am able to determine my own destiny."`
]
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
const showReferences = ref(false)
const showDataset = ref(false)
const mobile = ref(false)
function mobileAndTabletCheck() {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
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
    mobile.value = mobileAndTabletCheck();
})
</script>
<template>
    <div class="">
        <div
            class="grid grid-cols-12 items-center gap-[0px] pt-[45px] md:h-[100vh] md:p-[45px]  md:pt-[55px] text-primary text-left relative">
            <img class="headline text-right row-start-1 col-start-1 col-span-12 md:row-start-1 md:row-span-4 md:col-start-9 md:col-span-3 md:scale-[1.8]"
                src="./assets/images/Welt.png" alt="">
            <h1
                class="text-[55px] mb-8 col-start-2 col-span-10 text-center md:text-left md:row-start-1 md:col-start-1 md:col-span-8 md:headline self-start pb-0">
                F0REVER<br>L0ST<br>DEUTSCH<br>LAND?</h1>

            <div
                class="row-start-3 text-text text-justify md:text-left col-start-2 col-span-10 md:col-start-1 md:col-span-6 self-end">
                <h2 class="text-left">
                Concerned, Hopeless, Angry. <br> How feelings of crisis translate to political reality.</h2>
                <p>The phenomena of multiple crises are omnipresent and global – whether it's climate crisis, financial
                    crisis,
                    migration crisis or crisis of democracy, to name only few. We are constantly confronted with ever
                    new
                    crisis analyses, putting us into a permanent state of emergency. But what exactly does that mean for
                    us? And how do feelings of crisis, anger and concern affect the democracy we live in?<br> 
                </p>
                <br>
                <!-- <p >Our Data
                    story is based on the Survey <a href="https://www.socialsentiment.org/">'Social Sentiments in Times of Crises'</a> that investigates societal
                    polarization and political attitudes in Germany in the period from December 2021 - February 2024.</p> -->

            </div>
            <img v-if="!mobileAndTabletCheck()" src="./assets/images/arrow.svg"
                class="w-[35px] absolute bottom-1 left-[50%] translate-y-[-50%] animate-bounce" alt="">
            <!-- <img class="row-start-2 col-start-2 col-span-10 md:row-span-3 md:col-start-9 scale-[1.2]" src="./assets/images/Welt.png" alt=""> -->
        </div>
        <AppHeader :updateMenuNumber="updateMenuNumber"
            :updateMenuProgress="updateMenuProgress" />
        <ScrollytellingComponent :offset="0" :progress="true" :threshold="4" :once="false" :debug="false"
            @step-progress="updateMenu">
            <GridComponent id="multicrisis" class="md:mt-[20vh]">
                
                <div class="content-container">
                    <div>
                        <h1>Can you feel Polycrisis yet?</h1>
                        <p>
                            Reality check: we are living in instable times. Climate change, the former number one topic
                            of
                            concern, is falling behind more pressing and feasible ones, such as inflation or political
                            conflicts. All topics are intertwined and already changing the ways we are able to live and
                            move. What do you experience? <b>In the following, you can see how much each of the
                                contemporary crisis were pressing for people in Germany:</b>
                        </p>
                    </div>
                </div>
                <img class="col-start-4 col-span-6" v-if="!mobileAndTabletCheck()" src="./assets/images/polycrisis.png"
                    alt="">
                <img class="col-start-2 col-span-10 mt-16" v-if="mobileAndTabletCheck()"
                    src="./assets/images/polycrisis_mobile.png" alt="">
                <div class="content-container">
                    <div class="w-full">
                        <hr>
                        <p class="source">Source: <a
                                href="https://de.statista.com/statistik/daten/studie/28353/umfrage/wichtigste-von-der-politik-zu-loesende-probleme-in-deutschland/">statista.com</a>,
                            ARD., 2024</p>
                    </div>
                </div>
            </GridComponent>
            <GridComponent id="who-is-concerned">
                <div class="content-container">
                    <div>
                        <h1>Who is feeling the Crisis?</h1>
                        <p>Each crisis has a multitude of narratives to explain its origins and solutions.
                            Perceptions of crises and the extent to which people are affected by them depends
                            heavily on their own social position. They all result in different demands towards
                            politicians and our political system.
                        </p>
                        <br>
                        <p>
                            But before we delve into what crisis means for
                            democracy, we ask about the <i>feeling of crisis</i>: depressed, anxious, angry.
                            Who is concerned? Is it the elderly? The impoverished? People in the countryside?  
                        </p>
                    </div>
                    <div class="flex flex-col h-full">
                        <div>
                            <h2>The Young and the Poor have the highest 'Feeling of Crisis'</h2>
                            <p>Especially the <span class="underline ">young generations</span>, <span
                                    class="underline ">women</span> and the <span
                                    class="underline ">low-income classes</span> are prone to <i>feel
                                    crisis</i>, while differences between city and rural or east and west germany were
                                not so significant. <b>Explore yourself the perceived crisis amongst </b>
                                <select class="w-min select text-white bg-primary rounded"
                                    v-if="!mobileAndTabletCheck()" v-model="selectedOptionWhoIsConcerned">
                                    <option v-for="(option, index) in Object.keys(data.statisticsTime ?? {})"
                                        :key="index" :value="option">
                                        {{ option }}
                                    </option>
                                </select>:
                            </p>
                            <br v-if="mobileAndTabletCheck()">
                            <select class="w-full select p-2 text-xl text-white bg-primary rounded"
                                v-if="mobileAndTabletCheck()" v-model="selectedOptionWhoIsConcerned">
                                <option v-for="(option, index) in Object.keys(data.statisticsTime ?? {})" :key="index"
                                    :value="option">
                                    {{ option }}
                                </option>
                            </select>
                        </div>
                        <div>
                            <LinePlot :data="data.statisticsTime ?? {}" :componentIndex="0"
                                :selectedOption="selectedOptionWhoIsConcerned"
                                :mobile="mobile">
                            </LinePlot>

                            <hr>
                            <div class="grid grid-cols-2">
                                <p class="text-left vis-fontsize">
                                    {{ selectedOptionWhoIsConcernedPhrases[selectedOptionWhoIsConcerned] }}</p>
                                    <p class="source">Source: Social Sentiments in Times of Crises, 2024</p>

                            </div>

                        </div>
                    </div>
                </div>

            </GridComponent>
            <GridComponent id="felt-realities">
                <div class="content-container relative">
                    <div>
                        <h1>About felt Realities and <br> Perceived Truths</h1>
                        <p>
                            Now that we have a grasp on who is feeling the crisis overall, we look at more concrete
                            correlates of crisis:
                            People who <i>feel crisis</i> agree to feel a sort of Doomsday Mood the most, but also have
                            high levels of feeling like they suffer
                            more than others and like they will not be able to pay their bills in the next month.
                        </p>
                    </div>
                    <div class="my-[5vh] grid justify-items-center md:my-[10vh] ">
                        <img class="w-3/4" v-if="!mobileAndTabletCheck()" src="./assets/images/quote.png">
                        <img class="w-3/4" v-if="mobileAndTabletCheck()" src="./assets/images/quote_mobile.png">
                    </div>

                    <div>
                        <div>
                            <h2>Being in Crisis Mode Boosts Pessimistic Stance</h2>
                            <p>We observe that <span class="underline ">people who <i>feel crisis</i>
                                    are 5 to 8 times more likely to rate their own situation as bad</span>, than people
                                who don't feel crisis. <b>See for yourself how people perceive their situation
                                    differently in comparison:</b></p>
                        </div>
                        
                        <div class="my-[50px]">
                            <div class="grid grid-cols-2 gap-2 md:grid-cols-4">
                                <button class="button"
                                    v-for="(option, index) in Object.keys(data.statistics?.Crisis.FeltRealities ?? {})"
                                    :key="index" :value="index"
                                    :class="selectedOptionPerceivedTruthIndex == index ? 'bg-primary text-white' : ''"
                                    @click="updateSelectedOptionPerceivedTruth(option, index, this)">{{ option }}
                                </button>
                            </div>
                            <h3 class="text-center"
                                v-html='selectedOptionPerceivedTruthPhrases[selectedOptionPerceivedTruthIndex]'></h3>
                            <BarComparison :data="data.statistics?.Crisis?.FeltRealities ?? {}"
                                :selectedOption="selectedOptionPerceivedTruth">
                            </BarComparison>
                            <hr>
                            <p class="pt-2 source">Source: Social Sentiments in Times of Crises, 2024</p>
                        </div>

                        <div>
                            <p> The <span class="underline ">Thomas Theorem</span> explains why acknowledging <i>feeling crisis</i> is relevant, 
                                independent of factual discussions: One's subjective interpretation of a situation is just as important as the 'objective' reality. 
                                Both inform people's intentions and therefore their actions which lead to very real consequences. 
                                A heightened sense of crisis can hinder trust in our surroundings and lower openness to the unknown;
                                it can make us prone to extreme positions which tend to black-and-white interpretations of our multi faceted and ever changing reality. <br><br>
                                As we are living in a democratic system under pressure, <span class="underline ">understanding feelings in times of crises is as crucial as the concrete discussions on solutions</span>.</p>
                        </div>
                        
                    </div>
                </div>
            </GridComponent>
            <GridComponent id="effects-on-democracy" class="mt-[45vh] md:mt-[7.5vh]"> 
                <div class="content-container">
                    <img class="rotate-[-45deg]" :class="mobileAndTabletCheck() ? 'w-[250px]' : 'w-[400px]'"
                        src="./assets/images/burn.png" alt="">
                    <div>
                        <h1>Effects on Democracy</h1>
                        <p>Different political groups and people confronted with crises may feel similarly overloaded
                            and left alone by politics. Their Perceived urgent fields of actions and preferred solutions
                            are possibly not aligned with political decisions. Explore how the felt crisis connects to
                            trust in democratic institutions and the call for a strong leader.</p>
                    </div>
                    <div>
                        <div>
                            <h2>Feeling Crisis Damages Trust in Democratic Institutions</h2>
                            <p>How many participants agree to have trust in the government or the legal system?
                                Again, we differentiate between who <i>feel crisis</i> and those who do not.
                                Amongst those who do <i>feel crisis</i>, <span class="underline">less
                                    people agree to trust democratic institutions</span>.
                                This percentage is <span class="underline">even lower for those who
                                    <i>feel crisis</i> and
                                    <i>also</i> favor the right wing party "Alternative für Deutschland" (AFD).</span>
                                    <b> Explore for yourself the difference of trust in democratic institutions between people who <i>feel crisis</i> and those without: </b>
                            </p>
                        </div>
                        <div class="my-[50px]">
                            <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
                                <button class="button"
                                    v-for="(option, index) in Object.keys(data.statistics?.Crisis.Institutions ?? {})"
                                    :key="index" :value="index"
                                    :class="selectedOptionTrustInInstitutionsIndex == index ? 'bg-primary text-white' : ''"
                                    @click="updateSelectedOptionTrustInInstitutions(option, index, this)">Trust in {{
                option }}</button>
                            </div>
                            <h3 class="pb-0">Percentage of General Population</h3>
                            <DotonlineComparison class="w-full mt-4" :data="data.statistics?.Crisis.Institutions ?? {}"
                                :selectedOption="selectedOptionTrustInInstitutions" :componentIndex="0">
                            </DotonlineComparison>
                            <h3 class="pb-0">Percentage of People who Favor the AfD</h3>
                            <DotonlineComparison class="w-full mt-4"
                                :data="data.statistics?.Crisis.InstitutionsAFD ?? {}"
                                :selectedOption="selectedOptionTrustInInstitutions" :componentIndex="1">
                            </DotonlineComparison>
                            <hr>
                            <p class="source">Source: Social Sentiments in Times of Crises, 2024</p>
                        </div>

                    </div>
                    <div>
                        <h2>Longing for a Strong Leader in uncertain Times</h2>
                        <p>In Germany, not only is there a clear polarization between people favoring the AFD versus the
                            Green and Social party.
                            The call for a strong leader is a dangerous reflex in uncertain times.
                            This is what we observe: those who <span class="underline "><i>feel
                                    crisis</i> and <i>also</i> sympathize with the AFD</span> have especially high <span
                                class="underline ">agreement to dictatorship and desire a stronger
                                sense of national identity</span>.
                            <b>See how people who <i>feel crisis</i> and <i>also</i> favor the AfD are more extreme than
                            people who <i>feel crisis</i> but do not favor the AfD:</b>
                        </p>
                        <img class="my-[50px]" v-if="mobileAndTabletCheck()"
                            src="./assets/images/democracy_new_mobile.png" alt="">
                        <img class="my-[50px]" v-if="!mobileAndTabletCheck()" src="./assets/images/democracy_new.png"
                            alt="">
                        <svg height="30" width="100%" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g class="legend" transform="translate(0,10)"
                                style='font-size: 12px; font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'>
                                <g transform="translate(0,0)">
                                    <rect x="0" y="0" rx="2" class="legend-rect" width="10" height="10" fill="#f15060">
                                    </rect>
                                    <text x="15" y="10">Feels Crisis &amp; Favors AfD</text>
                                </g>
                                <g transform="translate(170,0)">
                                    <rect x="0" y="0" rx="2" class="legend-rect" width="10" height="10" fill="#FFB7B7">
                                    </rect>
                                    <text x="15" y="10">Feels Crisis &amp; Doesn't Favor AfD</text>
                                </g>
                            </g>
                        </svg>
                        <hr>
                        <p class="source">Source: Social Sentiments in Times of Crises, 2024</p>
                    </div>
                </div>
            </GridComponent>
            <GridComponent id="crisis-resilience" class="mt-[45vh]">
                <div class="content-container relative">
                    <img :class="mobileAndTabletCheck() ? 'absolute top-[-30%] left-[-10%]' : 'absolute top-[-50%] left-[-60%] z-[-1]'"
                        src="./assets/images/hand-left.png" alt="">
                    <img :class="mobileAndTabletCheck() ? 'absolute top-[-20%] right-[-10%]' : 'absolute top-[-20%] right-[-60%] z-[-1]'"
                        src="./assets/images/hand-right.png" alt="">
                    <h1>Crisis: A Chance for Transformation</h1>
                    <p> We see how feeling crisis - angry, uncertain, left behind - goes hand in hand with people's
                        financial status and generational outlook
                        more than their gender or living area. It connects to feeling in a Doomsday Mood, left behind
                        and financially unstable.
                        Feeling crisis also translates into politics. Into lower trust in the current government and
                        higher liking of right-wing parties.
                        If people both feel crisis and also sympathize with right-wing parties, trust is especially low
                        and anti-democratic tendencies are high. <br><br>
                        But those who agree with dictatorship are the minority. Trust in the government may be low, but
                        the general trust in the legal system is still prominent. People increasingly express their
                        opinion in demonstrations, no matter their political background.
                        Similarly, the demand for transforming the democratic system towards more <a
                            href="https://library.fes.de/pdf-files/pbud/20287-20230505.pdf" target="_blank">means of
                            direct democracy</a> is rising. <br><br>
                        Instead of blaming one or the other, we want to counter feeling crisis, paralysis and
                        polarization by asking: what do we need to change?
                    </p>
                </div>
                <div class="content-container">
                    <h2>Crisis Resilience</h2>
                    <p><i><b>»The traditional, hierarchical government model simply does not
                                meet the demands of this complex, rapidly changing age. [...] thriving in the net
                                worked age requires governments to change the way they think and operate. [...]
                                we need to update our thinking.«</b></i><br><br>
                    </p>
                    <p>Eggers: »The changing nature of government«, S. 28 <br><br></p>
                    
                    <p>The less people feel <a
                            href="https://www.gesis.org/fileadmin/admin/Dateikatalog/pdf/Deutschland-Monitor23_Web.pdf"
                            target="_blank">seen and represented in their direct living environment</a>,
                        the more they turn away from politics.
                        This means that local political institutions create the highest impact on a person's trust in
                        political decisions. <br>
                        Especially in context of the polycrisis, <a
                            href="https://www.rifs-potsdam.de/de/ergebnisse/dossiers/buergerraete"
                            target="_blank">involving citizens into processes of policy making</a> is the suggested
                        go-to strategy for future orientated models of democracy.
                        Allover Europe models are tested, for example establishing <a
                            href="https://deutschlands-rolle.buergerrat.de/fileadmin/downloads/handreichung-buergerrat-bundesweit.pdf"
                            target="_blank">citizen's assemblies</a> or implementing methods of <a
                            href="https://liqd.net/de/" target="_blank">liquid democracy</a>.
                        In the day to day life, strengthening workers democratic self-image can happen <a
                            href="https://www.boeckler.de/de/auf-einen-blick-17945-auf-einen-blick-rechtspopulismus-in-deutschland-37867.html"
                            target="_blank">at
                            workplaces and through workers unions</a>. For younger citizens this means enabling children
                        to experience their political impact in schools and foster their sense of belonging in
                        non-commercial activities. <br><br>

                        More informal activities that still strengthen community life are projects to connect with one's
                        neighborhood.
                        Places like <a href="https://offene-werkstaetten.org/de" target="_blank">open workshops</a> or
                        <a href="https://urbane-gaerten.de/urbane-gaerten/gaerten-im-ueberblick"
                            target="_blank">community gardening</a> are hubs for cultivating the seeds of community
                        resilience. <br><br>
                        Because only together we can strengthen us to go brave through the crises.
                    </p>
                </div>
            </GridComponent>
        </ScrollytellingComponent>
        <GridComponent>
            <div class="content-container gap-10 text-left" id="sources">
                <div class="w-full px-4">
                    <div class="grid grid-cols-2 items-center cursor-pointer" @click="showDataset = !showDataset">
                        <h2 class="text-left py-2">Dataset Description</h2>
                        <img  src="./assets/images/arrow.svg"
                            :class="showDataset ? 'rotate-[180deg]' : ''" class="w-6 justify-self-end" alt="">
                        <hr class="col-span-2">
                    </div>
                    <p :class="showDataset ? 'block' : 'hidden'" class="pb-4">
                        <br>
                        This data story is based on the dataset of the study <a href="https://www.socialsentiment.org">“Social Sentiments in Times of Crises”</a>. It is conducted by KIT (Karlsruher Institut für Technologie) and FZI (Forschungszentrum Informatik) in Germany and the USA since October 2022. It is a representative survey with questions on the participant's demographics as well as (bi)weekly check-ins regarding their psychological wellbeing, media consumption, as well as their economic and political stances. The survey is also regularly updated with concrete questions on participants opinions regarding current developments like the Ukraine war or COVID-19.
<br>
<br>
For our data story, we looked only at the German part of the dataset and nine selected time points between December 2022 and February 2024. Demographic information, psychological factors, political trust, extreme positions as well the liking of the political parties “Die Grünen” and “Alternative für Deutschland” were of our main interest. We only analyzed the according items. We also excluded rows in the dataset with missing values for the respective party likings. Additionally, we excluded all participants with non-binary genders because there were too few participants in this category.
<br>
<br>
To make the correlations between items (questions) more comprehensible, we inverted the scales, if necessary, so that a low answer value always indicates low agreement with the item and a high answer value indicates high agreement. This concerns the psychological, system trust and extreme positions items.
<br>
<br>
We divided the generations according to the youth researcher Simon Schnetzer: old generation (before 1946), the boomer generation (1946–1964), generation X (1965–1979), generation Y (1980–1994) and generation Z (after 1995). Generation Alpha was not included, as there was only one participant born after 2010.
<br>
<br>
The 25% of participants with the lowest income were included in the “poor” group (less than €2000 monthly household net income). The 25% of participants with the highest income were included in the “rich” group (more than €3850 monthly household net income).
<br>
<br>
First, we looked at a correlation table for all factors. This revealed a strong correlation between items regarding depressive, anxious and angry feelings. One item per category (depressive, anxious, or angry) was included in the feeling crisis factor, which was used for further analysis. Additionally, we included items regarding the feeling of control over one’s life.
<br>
<br>
The feeling crisis factor consists of the items: “I feel angry about the current situation”, “I don’t feel like I can stop worrying or control this”, “I feel nervous, anxious or tense” and “I feel dejected, melancholy or hopeless”. The possible answers go from 1 (completely disagree) to 7 (completely agree), while 4 (half/half) marks the middle point.
<br>
<br>
We defined crisis mode as having feeling crisis values of 5 or above.
<br>
<br>
To obtain information about whether participants live in an urban or rural area, we merged the SOSEC dataset with a second dataset kindly provided by KIT. The second dataset contained information on population density for each zip code. Areas with a population density greater than 150 inhabitants per square kilometer were counted as urban areas.
<br>
<br>
For the first graphic (“Who is feeling the Crisis?“), we asked: “How many percent of people feel crisis amongst a given group?”. The selected groups were the generations, genders, classes or living areas.
<br>
<br>
For the second graphic (“About felt Realities and Perceived Truths“), we asked: “Amongst those who feel crisis (versus those who do not feel crisis), how many percent of people agree to the following items?” This item would be “I am feeling a sort of doomsday mood,“ “I am suffering more than others in the current situation,“ “To what extent are you concerned about no longer being able to pay your bills?” and “I am able to determine my own destiny.” The answers to those four items were measured on the 7-point scale described earlier. An answer value of X („mostly agree“?) or above would mark agreement with the respective items.
<br>
<br>
Regarding the third graphic (“Effects on Democracy“), we asked: “Amongst those who feel crisis (versus those who do not feel crisis), how many percent of people have trust in the government or in the legal system?”. Whereby the trust items were measured on a five-point scale. We defined “trusting” the government or the legal system as an answer value of X (“agree”) or above. Additionally, we looked at those participants who favored the AFD and asked the same question.
<br>
<br>
Party liking was measured on a 10-point scale. We defined “liking the AFD” as having an answer value of 8 or greater, as it marked the top 25% of answers. (könnte noch schöner formuliert werden)
<br>
<br>
For the last graphic ("Longing for a Strong Leader in Uncertain Times“), we only looked at participants who feel crisis. We divided the dataset into those who favor the AFD and those who do not. We then asked: “Amongst those who feel crisis, how many percent also agree to the item “under certain circumstances, a dictatorship is the better form of government in the national interest”, or the item “we should finally regain the courage to have a strong sense of national identity”.
<br>
<br>
Furthermore, we want to thank the KIT, especially David Borukhson for providing the dataset and being a sparring partner regarding its analysis, as well as Emily Gossmann and Katrin Erlewein from Uniklinik Ulm for their help and insight into the data work!
                    </p>
                </div>
                <div class="w-full px-4">
                    <div class="grid grid-cols-2 items-center cursor-pointer" @click="showReferences = !showReferences">
                        <h2 class="text-left py-2">References</h2>
                        <img  src="./assets/images/arrow.svg"
                            :class="showReferences ? 'rotate-[180deg]' : ''" class="w-6 justify-self-end" alt="">
                        <hr class="col-span-2">
                    </div>
                    <p :class="showReferences ?'block':'hidden'" class="pb-4">
                    <h3 class="text-left">Dataset:</h3>
                    FZI Research Center for Information Technology. (2023). Social Sentiment in Times of Crises
                    (SOSEC). Available online: <a href="https://www.socialsentiment.org/sosec-projekt/"
                        target="_blank">https://www.socialsentiment.org/sosec-projekt/</a>
                    <h3 class="text-left">Further References:</h3>
                    Arendt, H. (2017). Elemente und Ursprünge totaler Herrschaft (10th ed.). Munich: Piper Verlag.
                    <br>
                    <br>
                    August, V. (2021). Technologisches Regieren. Der Aufstieg des Netzwerk-Denkens in der Krise der
                    Moderne. Foucault, Luhmann und die Kybernetik. Bielefeld: Transcript. <a
                        href="https://www.transcript-verlag.de/media/pdf/22/60/a6/oa9783839455975.pdf"
                        target="_blank">Available Online</a>
                    <br>
                    <br>
                    Bandura, A (1977). Self-efficacy: Toward a Unifying Theory of Behavioral Change. In:
                    Psychological Review. Vol.84 (2): 191–215. <a href="https://doi.org/10.1037/0033-295x.84.2.191."
                        target="_blank">doi:10.1037/0033-295x.84.2.191.</a>
                    <br>
                    Eggers, W. (2008). The changing Nature of Government: Network Governance. London:Deloitte.
                    <br>
                    <br>
                    Friedrich-Ebert-Stiftung. (2023). Vertrauen in Demokratie in Krisenzeiten. <a
                        href="https://library.fes.de/pdf-files/pbud/20287-20230505.pdf" target="_blank">Available
                        Online</a> [01.07.2024]
                    <br>
                    <br>
                    Hans-Böckler-Stiftung. (2024). Aufstieg des Rechtspopulismus: Erklärungsansätze und Analysen. <a
                        href=" https://www.boeckler.de/de/auf-einen-blick-17945-auf-einen-blick-rechtspopulismus-in-deutschland-37867.htm"
                        target="_blank">Available Online</a> [01.07.2024]
                    <br>
                    <br>
                    Langenkamp, A/ Bienstman, S. (2022). Populism and Layers of Social Belonging: Support of
                    Populist Parties in Europe. In: Political Psychology. Vol.43(5): 931-949. <a
                        href="https://doi.org/10.1111/pops.12827" target="_blank">doi:10.1111/pops.12827</a>
                    <br>
                    <br>
                    Lietzmann, H. J./ Renn, O./ Freier, N./ Kirby, N. E. & Oppold, D. (2021). Bürgerräte als eine
                    zeitgemässe Ergänzung der repräsentativen Demokratie: Handreichung für eine Implementation
                    deliberativer Bürgerräte. Potsdam/Wuppertal: Institute for Advanced Sustainability Studies e.V.
                    (IASS), Institut für Demokratie- und Partizipationsforschung (IDPF). <a
                        href="https://deutschlands-rolle.buergerrat.de/fileadmin/downloads/handreichung-buergerrat-bundesweit.pdf"
                        target="_blank">Available Online</a> [01.07.2024]
                    <br>
                    <br>
                    Neu, C., Küpper, B., & Luhmann, M. (2023). Extrem einsam? Die demokratische Relevanz von
                    Einsamkeitserfahrungen und Jugendlichen in Deutschland. Das Progressive Zentrum. <a
                        href="https://www.demokratie-leben.de/magazin/magazin-details/studie-extrem-einsam-166"
                        target="_blank">Available Online</a> [01.07.2024]
                    <br>
                    <br>
                    Thomas, W.I. & Thomas, D.S. (1928). The Child in America: Behavior problems and programs. New
                    York: Knopf.
                    </p>
                </div>
            </div>
        </GridComponent>
    </div>
    <AppFooter class="mt-[5vh]" />
</template>
<style></style>
