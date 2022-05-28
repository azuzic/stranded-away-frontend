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
    <v-container class="mb-8 text-center">
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
      <v-row justify="center">
        <v-col :cols="$vuetify.breakpoint.mobile ? '6' : '2'">
          <v-img
            class="align-end"
            height="300px"
            src="@/assets/portraits/Portret_Luka_Big-noBG.png"
          >
          </v-img>
        </v-col>
        <v-col :cols="$vuetify.breakpoint.mobile ? '6' : '2'">
          <v-img
            class="align-end"
            height="300"
            src="@/assets/portraits/Portret_Alesandro_Big-noBG.png"
          >
          </v-img>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="mb-32">
      <h2 class="text-4xl text-white font-bold uppercase mb-6 text-center">
        What's been going on
      </h2>
      <v-row justify="center">
        <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
          <v-timeline-item
            v-for="(item, i) in reversedNews"
            :key="i"
            :color="item.color"
            fill-dot
            small
          >
            <v-card :color="item.color" dark max-width="900">
              <v-card-title>
                <v-icon size="32">
                  {{ item.icon }}
                </v-icon>
                <span class="text-xl uppercase ml-2">{{ item.title }}</span>
              </v-card-title>

              <v-container class="grey lighten-5">
                <v-row class="text-xs text--primary p-2">{{ item.date }}</v-row>
                <v-row>
                  <v-col cols="12" md="10">
                    <div class="text--primary">
                      <p>{{ item.text }}</p>
                      <v-btn :color="item.color" class="mx-0" outlined>
                        read more
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-timeline-item>
        </v-timeline></v-row
      >
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
    news: [
      {
        color: "red lighten-1",
        icon: "mdi-newspaper-variant",
        date: "3 July, 2021",
        title: "MacroQuiet is born!",
        text: "Bring the Champagne!",
      },
      {
        color: "red lighten-1",
        icon: "mdi-newspaper-variant",
        date: "21 July, 2021",
        title: "Doge game available now!",
        text: "The great and epic Doge game! Our first game ever. Made in just 2 weeks! Take control of lost doge trying to find his way out of town. Be careful! You will encounter many dogcatchers along the way. Also, those bones look really delicious.",
      },
      {
        color: "red lighten-1",
        icon: "mdi-newspaper-variant",
        date: "28 May, 2022",
        title: "Stranded Away coming soon!",
        text: "2D shooter/puzzle game about exploring abandoned planets. You are playing a hero whose job is to save the galaxy from evil scientist Dr. Hone. Game is currently still work in progress!",
      },
    ],
  }),
  computed: {
    reversedNews() {
      return this.news.reverse();
    },
  },
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
