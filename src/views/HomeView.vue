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
          v-for="(item, i) in store.carouselPictures"
          :key="i"
          :src="require('@/assets/game_images/' + item.src)"
        >
        </v-carousel-item>
      </v-carousel>
      <div class="over flex justify-center content-center align-center">
        <div class="center flex justify-center">
          <img
            :class="$vuetify.breakpoint.mobile ? 'mr-4 h-24' : 'mr-4 h-64'"
            src="@/assets/Stranded_Away_Icon.png"
          />
          <div
            class="h-full justify-center align-text-bottom align-end flex-end stranded"
          >
            <div
              :class="
                $vuetify.breakpoint.mobile
                  ? 'text-4xl	p-dark'
                  : 'text-8xl p-dark'
              "
            >
              Stranded
            </div>
            <div
              :class="
                $vuetify.breakpoint.mobile
                  ? 'text-4xl	p-dark'
                  : 'text-8xl p-dark'
              "
            >
              Away
            </div>
            <div :class="$vuetify.breakpoint.mobile ? 'text-xs	' : 'text-2xl'">
              Available July 2022.
            </div>
          </div>
        </div>
      </div>
    </div>

    <v-container class="mb-8">
      <h2
        id="games"
        class="text-4xl text-white font-bold mb-6 mt-4 v-container text-center"
      >
        FEATURED GAMES
      </h2>
      <v-row justify="center">
        <v-col
          v-for="gameCard in store.gameCards"
          :key="gameCard.id"
          :cols="$vuetify.breakpoint.mobile ? '12' : '3'"
        >
          <card-1
            :availability="gameCard.availability"
            :title="gameCard.title"
            :text="gameCard.text"
            :imageSrc="gameCard.imageSrc"
          ></card-1>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="mb-32 text-center">
      <v-row justify="center">
        <v-col :cols="$vuetify.breakpoint.mobile ? '12' : '3'">
          <h2
            id="about-us"
            class="text-4xl text-white font-bold mb-4 mt-4 v-container"
          >
            ABOUT US
          </h2>

          <h1>We are a two person Indie Game Developer Studio from Croatia.</h1>
          <h2>
            It all started in the summer of 2021. when two friends and
            colleagues decided they wanted to create video games and fulfill
            their lifelong dreams.
          </h2>
          <h2>
            Meet <span class="text-red-like-logo">@blaskec</span> and
            <span class="text-red-like-logo">@zuza</span> now!
          </h2>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import card1 from "@/components/card1.vue";
import store from "@/store";

export default {
  name: "Home",
  components: {
    card1,
  },
  data: () => ({
    store,
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
    z-index: 10000;
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.75));
  }
  .stranded {
    margin-top: 3vw;
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
