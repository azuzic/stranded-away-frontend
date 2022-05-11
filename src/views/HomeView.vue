<template>
  <div>
    <div class="title-carousel">
      <v-carousel
        :show-arrows="false"
        hide-delimiters
        cycle
        :height="$vuetify.breakpoint.mobile ? '200' : '700'"
      >
        <v-carousel-item
          v-for="(item, i) in carouselPictures"
          :key="i"
          :src="require('@/assets/game_images/' + item)"
        >
        </v-carousel-item>
      </v-carousel>
      <div class="over flex justify-center content-center align-center">
        <div class="center flex justify-center">
          <img class="img mr-4" src="@/assets/Stranded_Away_Icon.png" />
          <div
            class="h-full justify-center align-text-bottom align-end flex-end stranded"
          >
            <div class="p-dark">Stranded</div>
            <div class="away p-dark">Away</div>
            <div :class="$vuetify.breakpoint.mobile ? 'text-xs	' : 'text-2xl'">
              Available July 2022.
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-container class="mb-16">
      <h2
        class="text-4xl text-white font-bold mb-6 mt-4 text-center v-container"
      >
        Featured Games
      </h2>
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
            :availability="'AVAILABLE IN JULY'"
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
import card1 from "@/components/card1.vue";
import carouselImagesSrc from "@/carouselPictures";

export default {
  name: "Home",
  components: {
    card1,
  },
  data: () => ({
    carouselPictures: carouselImagesSrc,
  }),
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: pdark;
  src: url("@/assets/fonts/pdark.ttf");
}
.title-carousel {
  position: relative;
  filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 1));
  .center {
    position: absolute;
    color: white;
    width: 100%;
    font-size: 5.2vw;

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
.p-dark {
  font-family: pdark;
}
</style>
