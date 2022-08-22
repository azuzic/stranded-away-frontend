<template>
    <div class="mt-12 min-h-screen">
        <v-img class="pixelart" height="350vh" src="@/assets/StrandedAway/bg.jpg">
            <ParticleEffectWind></ParticleEffectWind>

            <v-img class="pixelart p-4" height="350vh" src="@/assets/StrandedAway/bg.png">
                <div class="w-full flex justify-center content-center">
                    <v-img class="pixelart" :max-width="$vuetify.breakpoint.mobile ? '100%' : '65%'" src="@/assets/StrandedAway/title.png"></v-img>
                </div>

                <StrandedAwayCard :class="$vuetify.breakpoint.mobile ? 'mt-8' : 'mt-64'" :title="'Title'" :text="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas semper diam facilisis nisl scelerisque aliquam.  Donec rhoncus, augue in facilisis tincidunt, arcu arcu eleifend velit,  et interdum nibh mauris et purus. Nunc condimentum velit a lorem condimentum,  non imperdiet libero blandit. Mauris at dolor neque. Pellentesque porta varius porta. Suspendisse potenti.'" 
                :right="false"></StrandedAwayCard>   

                <StrandedAwayCard :title="'Title'" :text="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas semper diam facilisis nisl scelerisque aliquam.  Donec rhoncus, augue in facilisis tincidunt, arcu arcu eleifend velit,  et interdum nibh mauris et purus. Nunc condimentum velit a lorem condimentum,  non imperdiet libero blandit. Mauris at dolor neque. Pellentesque porta varius porta. Suspendisse potenti.'" 
                :right="$vuetify.breakpoint.mobile ? false : true"></StrandedAwayCard>    

                <StrandedAwayCard :title="'Title'" :text="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas semper diam facilisis nisl scelerisque aliquam.  Donec rhoncus, augue in facilisis tincidunt, arcu arcu eleifend velit,  et interdum nibh mauris et purus. Nunc condimentum velit a lorem condimentum,  non imperdiet libero blandit. Mauris at dolor neque. Pellentesque porta varius porta. Suspendisse potenti.'" 
                :right="false"></StrandedAwayCard>     

                <StrandedAwayCard :title="'Title'" :text="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas semper diam facilisis nisl scelerisque aliquam.  Donec rhoncus, augue in facilisis tincidunt, arcu arcu eleifend velit,  et interdum nibh mauris et purus. Nunc condimentum velit a lorem condimentum,  non imperdiet libero blandit. Mauris at dolor neque. Pellentesque porta varius porta. Suspendisse potenti.'" 
                :right="$vuetify.breakpoint.mobile ? false : true"></StrandedAwayCard>    
                
                <div class="w-full flex justify-center absolute bottom bottom-64">
                    <div class="text-8xl text-slate-100 text-center mr-8 Squarewave" :class="$vuetify.breakpoint.mobile ? 'downloadGame2' : 'downloadGame'">
                        Download Game
                    </div>
                </div>

            </v-img>
        </v-img>
    </div>
</template>

<script>
import StrandedAwayCard from "@/components/Games/StrandedAway/StrandedAwayCard.vue";
import ParticleEffectWind from "@/components/Games/StrandedAway/ParticleEffectWind.vue";

export default {
name: "StrandedAway",
  components: {
    StrandedAwayCard,
    ParticleEffectWind,
  },
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: Squarewave;
  src: url("@/assets/fonts/Squarewave.ttf");
}
.Squarewave {
  font-family: Squarewave;
}
.pixelart {
    cursor:url(@/assets/StrandedAway/mouse_aim.png), auto;
    animation: cursor 400ms infinite;
    @keyframes cursor {
    0% {cursor: url(@/assets/StrandedAway/mouse_aim2.png), auto;}
    20% {cursor: url(@/assets/StrandedAway/mouse_aim2.png), auto;}
    40% {cursor: url(@/assets/StrandedAway/mouse_aim2.png), auto;}
    60% {cursor: url(@/assets/StrandedAway/mouse_aim.png), auto;}
    80% {cursor: url(@/assets/StrandedAway/mouse_aim.png), auto;}
    100% {cursor: url(@/assets/StrandedAway/mouse_aim.png), auto;}
    } 
}
.downloadGame {
    border-color: white;
    border-radius: 4px;
    border-bottom-width: 4px;
    transition: ease-in-out 0.25s all;
    animation: border-width 1000ms infinite;
    @keyframes border-width {
    0% {width: 26% }
    50% {width: 25% }
    100% {width: 26% }
    } 
    &:hover {
        border-width: 0px;
        border-radius: 16px;
        animation: border-width2 2000ms infinite;
        @keyframes border-width2 {
        0% {width: 30%; background-color: rgba(16, 74, 91, 0.39) }
        50% {width: 29%; background-color: rgba(48, 74, 91, 0.39) }
        100% {width: 30%; background-color: rgba(16, 74, 91, 0.39) }
        } 
    }
}
.downloadGame2 {
    border-color: white;
    border-radius: 4px;
    border-bottom-width: 4px;
    transition: ease-in-out 0.25s all;
    animation: border-width3 1000ms infinite;
    @keyframes border-width3 {
    0% {width: 90% }
    50% {width: 88% }
    100% {width: 90% }
    } 
    &:hover {
        border-width: 0px;
        border-radius: 16px;
        animation: border-width4 2000ms infinite;
        @keyframes border-width4 {
        0% {width: 90%; background-color: rgba(16, 74, 91, 0.39) }
        50% {width: 88%; background-color: rgba(48, 74, 91, 0.39) }
        100% {width: 90%; background-color: rgba(16, 74, 91, 0.39) }
        } 
    }
}
</style>