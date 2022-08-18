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
          :src="require('@/assets/game_images/' + item)"
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
              Available August 2022.
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
          :cols="width"
        >
          <gameCard
            :availability="gameCard.availability"
            :title="gameCard.title"
            :text="gameCard.text"
            :imageSrc="gameCard.imageSrc"
            :gName="gameCard.gameName"
          ></gameCard>
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
            Meet
            <router-link :to="{ name: 'User', params: { userName: 'blaskec' } }"
              ><span class="text-red-like-logo">@blaskec</span></router-link
            >
            and
            <router-link :to="{ name: 'User', params: { userName: 'zuza' } }"
              ><span class="text-red-like-logo">@zuza</span></router-link
            >
            now!
          </h2>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col :cols="$vuetify.breakpoint.mobile ? '6' : '2'">
          <router-link :to="{ name: 'User', params: { userName: 'blaskec' } }">
            <figure class="hover11">
              <v-tooltip bottom color="#EF5350">
                <template v-slot:activator="{ on, attrs }">
                  <v-img
                    class="align-end"
                    height="300px"
                    src="@/assets/portraits/Portret_Luka_Big-noBG.png"
                    v-bind="attrs"
                    v-on="on"
                  >
                  </v-img>
                </template>
                <span>Blaskec</span>
              </v-tooltip>
            </figure>
          </router-link>
        </v-col>
        <v-col :cols="$vuetify.breakpoint.mobile ? '6' : '2'">
          <router-link :to="{ name: 'User', params: { userName: 'zuza' } }">
            <figure class="hover11">
              <v-tooltip bottom color="#EF5350">
                <template v-slot:activator="{ on, attrs }">
                  <v-img
                    class="align-end"
                    height="300px"
                    src="@/assets/portraits/Portret_Alesandro_Big-noBG.png"
                    v-bind="attrs"
                    v-on="on"
                  >
                  </v-img>
                </template>
                <span>Zuza</span>
              </v-tooltip>
            </figure>
          </router-link>
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
            color="red lighten-1"
            fill-dot
            small
          >
            <timelinePost
              :title="item.title"
              :text="item.text"
              :icon="item.icon"
              :date="item.date"
              :author="item.author"
            >
            </timelinePost>
          </v-timeline-item> </v-timeline
      ></v-row>
    </v-container>
  </div>
</template>

<script>
import gameCard from "@/components/gameCard.vue";
import timelinePost from "@/components/timelinePost.vue";
import store from "@/store";
import { Admin } from "@/services";

export default {
  name: "Home",
  components: {
    gameCard,
    timelinePost,
  },
  data: () => ({
    store,
    news: Admin.data.getTimelinePosts,
  }),

  asyncComputed: {
    async reversedNews() {
      let result = await this.news;
      return result.data.reverse();
    },
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 11;
        case "sm":
          return 6;
        case "md":
          return 6;
        case "lg":
          return 4;
        case "xl":
          return 3;
      }
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
.theme--light.v-timeline:before {
  background: rgba(250, 251, 251, 255);
}
.hover11 {
  opacity: 1;
  -webkit-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
}
.hover11 :hover {
  opacity: 0.5;
}
</style>
