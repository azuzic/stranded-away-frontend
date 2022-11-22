<template>
  <div class="mt-12 min-h-screen">
    <v-img class="pixelart" height="300vh" src="@/assets/StrandedAway/bg.jpg">
      <ParticleEffectWind></ParticleEffectWind>

      <v-img
        class="pixelart p-4"
        height="300vh"
        src="@/assets/StrandedAway/bg.png">
        <div class="h-full overflow-y-scroll overflow-x-hidden pb-32">
            <div class="w-full flex justify-center content-center">
                <v-img class="pixelart" :max-width="$vuetify.breakpoint.mobile ? '100%' : '65%'"
                    src="@/assets/StrandedAway/title.png"></v-img>
            </div>
            
            <div class="w-full flex justify-center mb-8">
                <div class="text-slate-100 text-center Squarewave" :class="
                    $vuetify.breakpoint.mobile
                        ? 'downloadGame2 text-6xl'
                        : 'downloadGame text-8xl'
                " @click="scoreboard = !scoreboard">
                    <b v-if="scoreboard" class="font-normal">Scoreboard</b>
                    <b v-else class="font-normal">Page</b>
                </div>
            </div>
            
            <div v-if="scoreboard">
                <StrandedAwayCard :class="$vuetify.breakpoint.mobile ? 'mt-8' : 'mt-64'" :title="'About'" :right="false">
                    Stranded Away is a 2D pixel art singleplayer: platform-jumper,
                    puzzle and action game. You are playing as a mysterious space
                    traveller who's looking for long gone inhabitants of planet Athion.
                </StrandedAwayCard>
            
                <StrandedAwayCard :title="'Gameplay'" :right="true">
                    You are playing as a space traveler, explore beautiful Athion land,
                    cave and swamp. Search for materials in chests and craft yourself
                    various items in order to survive. Collect coins, wandering trader
                    has some pretty neat items you will most definitely like! Kill
                    lizzards and destroy turrents deep down in bunkers where they hide
                    all the information about planet's past inhabitants. You will have
                    to solve complex puzzles in order to progress through the land of
                    Athion! Play now and unlock many different achievements which will
                    be displayed on your profile!
                </StrandedAwayCard>
            
                <StrandedAwayCard :title="'Story'" :right="false">
                    It’s year 2352., on the cloudy planet of Athion, our hero lands in
                    search of human species. Dark, thick clouds surround his space ship,
                    no sounds to be heard, but the branches of few trees gently
                    fluttering in the breeze. The land is unsafe! There are demon like
                    creatures, lizzards and all kinds of monsters surrounding him, he
                    just isn’t yet aware of it. In search of answers, he finds some old
                    data written on disk by those who survived. They had left the planet
                    many years ago running away from apocalypse that Dr. Hone created.
                    He is a mad scientist responsible for bringing chaos to the galaxy.
                    His madness eventually lead him to transforming human species into
                    all kinds of disgusting monsters.
                </StrandedAwayCard>
            
                <StrandedAwayCard :title="'Background'" :right="true">
                    Standed Away is our second ever game. First version being released
                    on 31th of August 2022., the development started in late July of
                    2021. Game currently consists of 3 campaign levels + 1 challenge
                    level - 'Floor is lava'. Developing this game, we learned the
                    fundamentals of game design, pixel art, we learned how to make
                    various tools and game concepts. We sure will utilize all gained
                    knowledge on our next game!
                </StrandedAwayCard>
            </div>
            <div class="flex justify-center" v-else>
                <scoreboard></scoreboard>
            </div>
            <a style="all: unset" href="https://macroquiet.itch.io/stranded-away" target="_blank">
                <div class="w-full flex justify-center">
                    <div class="text-slate-100 text-center Squarewave" :class="
                        $vuetify.breakpoint.mobile
                            ? 'downloadGame2 text-6xl '
                            : 'downloadGame text-8xl '
                    ">
                        Download Game
                    </div>
                </div>
            </a>
        </div>
      </v-img>
    </v-img>
  </div>
</template>

<script>
import StrandedAwayCard from "@/components/Games/StrandedAway/StrandedAwayCard.vue";
import ParticleEffectWind from "@/components/Games/StrandedAway/ParticleEffectWind.vue";
import Scoreboard from "./StrandedAway/Scoreboard.vue";

export default {
  name: "StrandedAway",
  components: {
    StrandedAwayCard,
    ParticleEffectWind,
    Scoreboard,
  },
  data() {
    return {
      scoreboard: true,
    };
  },
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
  cursor: url(@/assets/StrandedAway/mouse_aim.png), auto;
  animation: cursor 400ms infinite;
  @keyframes cursor {
    0% {
      cursor: url(@/assets/StrandedAway/mouse_aim2.png), auto;
    }
    20% {
      cursor: url(@/assets/StrandedAway/mouse_aim2.png), auto;
    }
    40% {
      cursor: url(@/assets/StrandedAway/mouse_aim2.png), auto;
    }
    60% {
      cursor: url(@/assets/StrandedAway/mouse_aim.png), auto;
    }
    80% {
      cursor: url(@/assets/StrandedAway/mouse_aim.png), auto;
    }
    100% {
      cursor: url(@/assets/StrandedAway/mouse_aim.png), auto;
    }
  }
}
.downloadGame {
  border-color: white;
  border-radius: 4px;
  border-bottom-width: 4px;
  margin-bottom: 16px;
  transition: ease-in-out 0.25s all;
  animation: border-width 1000ms infinite;
  @keyframes border-width {
    0% {
      width: 500px;
    }
    50% {
      width: 520px;
    }
    100% {
      width: 500px;
    }
  }
  &:hover {
    border-width: 0px;
    border-radius: 16px;
    margin-bottom: 20px;
    animation: border-width2 2000ms infinite;
    @keyframes border-width2 {
      0% {
        width: 500px;
        background-color: rgba(16, 74, 91, 0.39);
      }
      50% {
        width: 520px;
        background-color: rgba(48, 74, 91, 0.39);
      }
      100% {
        width: 500px;
        background-color: rgba(16, 74, 91, 0.39);
      }
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
    0% {
      width: 90%;
    }
    50% {
      width: 88%;
    }
    100% {
      width: 90%;
    }
  }
  &:hover {
    border-width: 0px;
    border-radius: 16px;
    animation: border-width4 2000ms infinite;
    @keyframes border-width4 {
      0% {
        width: 90%;
        background-color: rgba(16, 74, 91, 0.39);
      }
      50% {
        width: 88%;
        background-color: rgba(48, 74, 91, 0.39);
      }
      100% {
        width: 90%;
        background-color: rgba(16, 74, 91, 0.39);
      }
    }
  }
}
</style>
