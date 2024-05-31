<script setup>

function updateStep(resp){
        console.log(resp)
        value.value = resp.index
    }
    const value = ref(0)
</script>
<template>
    <div>
        <AppHeader />
            <div id="main">
                <div id="scroll">
                    <ScrollytellingComponent :offset="0.1" :progress="true" :threshold="4" :once="false" :debug="false" @step-enter="updateStep">
                        <div v-for="i in 10" :key="i" style="height: 200vh; background-color: #f0f0f0">
                            <h1>Hello</h1>
                        </div>
                    </ScrollytellingComponent>
                </div>
                <div id="fixed">
                    <h1>{{ value }}</h1>
                </div>
            </div>

        <AppFooter />
    </div>
</template>
<style>
    #main{
        width:100vw;
        display: flex;
        flex-direction: row;
    }
    #scroll{
        flex-grow: 2;
    }
    #fixed{
        text-align: center;
        align-self: flex-start;
        position: sticky;
        top: 50vh;
        transform: translate(0, -50%);
        flex-grow: 2;
    }
</style>