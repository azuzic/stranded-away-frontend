<template>
  <div :class="right ? 'w-full flex justify-end' : 'w-full'">
        <div>
            <v-img class="pixelart" width="50vh" src="@/assets/StrandedAway/menu.png">
            <div class="w-full h-full px-8 py-4">
                <p class="text-6xl text-center text-slate-300 Squarewave"> <u>{{title}}</u> </p>
                <p class="text-2xl text-justify text-slate-400 Squarewave">
                    {{text}}
                </p>
            </div>
        </v-img>
        </div>
    </div>
</template>
<script>
export default {
  name: "StrandedAwayCard",
  props: ["title", "text", "right"],
};
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
    image-rendering: pixelated;
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
</style>
