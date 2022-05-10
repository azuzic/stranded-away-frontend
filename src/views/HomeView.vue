<template>
  <div> 
      <div class="title-carousel">
        <SimpleCarousel :itemsPerView=1 :autoplay=true :autoplayTimeout=10000>
            <div><img src="@/assets/game_images/GameScreenshot_1.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_29.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_16.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_14.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_19.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_28.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_7.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_21.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_4.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_26.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_25.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_6.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_24.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_15.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_23.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_8.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_22.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_9.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_10.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_21.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_11.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_12.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_13.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_18.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_17.png"></div>
        </SimpleCarousel>
        <div class="over flex justify-center content-center align-center">
            <div class="center flex justify-center">
                <img class="img mr-4" src="@/assets/Stranded_Away_Icon.png">
                <div class="h-full justify-center align-text-bottom align-end flex-end stranded">
                        <div>Stranded</div> 
                        <div class="away">Away</div>  
                </div>
            </div>
        </div>
        
      </div>
      <v-container class="mb-16">
            <h2 class="text-4xl text-white font-bold mb-4 mt-8 text-center v-container">Featured Games</h2>
            <v-row>
                <v-col>
                    <card-1
                        :availability="'AVAILABLE NOW!'"
                        :title="'DOGE'"
                        :text="'The great and epic Doge game! Our first game ever. Made in just 2 weeks!'"
                        :imageSrc="'cards/doge1.png'"
                    ></card-1>
                </v-col>
                <v-col>
                    <card-1
                        :availability="'AVAILABLE IN JUNE'"
                        :title="'Stranded Away'"
                        :text="'2D shooter/puzzle game about exploring abandoned planets. Game is currently still in work in progress!'"
                        :imageSrc="'cards/stranded1.png'"
                    ></card-1>
                </v-col>
            </v-row>
        </v-container>
  </div>
</template>

<script>
import SimpleCarousel from "vue2-simple-carousel";
import card1 from "@/components/card1.vue";

export default {
  name: "Home",
  components: {
      SimpleCarousel,
      card1,
  },
  data: () => ({}),
};
</script>

<style lang="scss" scoped>
@font-face { font-family: pdark; src: url('@/assets/fonts/pdark.ttf');}
.title-carousel {
    position: relative;
    filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 1));
    .center {
        position: absolute;
        color: white;
        width: 100%;
        font-size: 5.2vw;
        font-family: pdark;
        z-index: 10000;
        filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.75));
    }
    .img {
        height: 14vw;
    }
    .stranded {
        margin-top: 3vw;
    }
    .away {
        margin-top: -2.45vw;
    }
}

.over {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(172, 255, 47, 0);
}

.v-container {
    h2 {
        z-index: 9999999;
    }
}

</style>
