<template>
  <div>
    <div class="title-carousel">
      <v-carousel
        :show-arrows="false"
        hide-delimiters
        cycle
        :height="$vuetify.breakpoint.mobile ? '200' : '700'">
        <v-carousel-item
          v-for="(item, i) in store.carouselPictures"
          :key="i"
          :src="item.url">
        </v-carousel-item>
      </v-carousel>
      <div class="over flex justify-center content-center align-center">
        <div
          :class="
            $vuetify.breakpoint.mobile
              ? 'center flex justify-center mt-12'
              : 'center flex justify-center '
          ">
          <img
            :class="$vuetify.breakpoint.mobile ? 'mr-4 h-24' : 'mr-4 h-64'"
            src="@/assets/Stranded_Away_Icon.png" />
          <div
            class="h-full justify-center align-text-bottom align-end flex-end stranded">
            <div
              :class="
                $vuetify.breakpoint.mobile
                  ? 'text-4xl	p-dark'
                  : 'text-8xl p-dark'
              ">
              Stranded
            </div>
            <div
              :class="
                $vuetify.breakpoint.mobile
                  ? 'text-4xl	p-dark'
                  : 'text-8xl p-dark'
              ">
              Away
            </div>
            <div :class="$vuetify.breakpoint.mobile ? 'text-xs	' : 'text-2xl'">
              Available now!
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-8">
      <h2
        id="games"
        :class="
          $vuetify.breakpoint.mobile
            ? 'text-4xl text-slate-200 font-bold my-12 v-container text-center'
            : 'text-5xl text-slate-200 font-bold my-12 v-container text-center'
        ">
        FEATURED GAMES
      </h2>
      <div class="flex flex-wrap justify-center">
        <gameCard
          v-for="gameCard in store.gameCards"
          :key="gameCard.id"
          :availability="gameCard.availability"
          :title="gameCard.title"
          :text="gameCard.text"
          :imageSrc="gameCard.imageSrc"
          :gName="gameCard.gameName"
          class="mb-8"></gameCard>
      </div>
    </div>

    <about-us></about-us>

    <div class="mb-32 mt-16">
      <h2
        class="text-slate-200 font-bold uppercase mb-6 text-center"
        :class="$vuetify.breakpoint.smAndDown ? 'text-2xl' : 'text-4xl'">
        What's been going on
      </h2>
      <v-row justify="center" v-if="!$vuetify.breakpoint.mobile">
        <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
          <v-timeline-item
            v-for="(item, i) in reversedNews"
            :key="i"
            color="red lighten-1"
            small>
            <timelineCard
              :title="item.title"
              :text="item.text"
              :icon="item.icon"
              :date="item.date"
              :author="item.author">
            </timelineCard>
          </v-timeline-item> </v-timeline
      ></v-row>
      <v-row justify="center" v-else>
        <timelineCard
          v-for="(item, i) in reversedNews"
          :key="i"
          :title="item.title"
          :text="item.text"
          :icon="item.icon"
          :date="item.date"
          :author="item.author"
          class="mb-8">
        </timelineCard>
      </v-row>
    </div>
  </div>
</template>

<script>
import gameCard from "@/components/Home/gameCard.vue";
import timelineCard from "@/components/Home/timelineCard.vue";
import store from "@/store";
import { Admin } from "@/services";
import AboutUs from "@/components/Home/aboutUs.vue";

export default {
  name: "Home",
  components: {
    gameCard,
    timelineCard,
    AboutUs,
  },
  data: () => ({
    store,
    news: Admin.data.getTimelinePosts,
  }),
  async mounted() {
    let result = await Admin.data.getCarouselPictures;
    store.carouselPictures = result.data;
  },

  asyncComputed: {
    async reversedNews() {
      let result = await this.news;
      return result.data.reverse();
    },
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 12;
        case "sm":
          return 12;
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
</style>
