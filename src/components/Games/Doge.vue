<template>
  <div class="flex justify-center">
    <ParallaxEffect>
      <div class="pt-64">
        <p class="text-9xl text-center EHSMB font-bold mb-16"><i>Doge</i></p>
        <div>
          <expand-text
            :title="'About'"
            :hide="false"
          >
          Doge game is a small free-to-play 2.5D platform jumper about a lost doge who tries to find his way home. He is roaming across the streets, crossing roads, jumping cars and running away from nasty dog catchers! Play now and help doge find his way home!
          </expand-text>
          <expand-text
            :title="'Background'"
            :hide="false"
          >
          Doge game is our first game ever, made in just 2 weeks in the summer of 2021. Initially 3 of us, we challenged ourselves to learn Unity game engine and create a simple game, Doge game being the reuslt of our efforts. Many thanks to <a href='https://github.com/maurosterpin' target='_blank'>@maurosterpin</a> for his contribution!
          </expand-text>
          <expand-text
            :title="'Gameplay'"
            :hide="false"
          >The game has 3 levels. You control a little dog. He is lost and trying to find his way home. Jump on the cars and buildings to collect bones - they are required to complete the level. You can also pick up the dog food to heal. Dog catchers will start chasing you when you approach them. Dodge their attacks by jumping. Doge game contains 3 achievements which will displayed on your <a href='https://macroquiet.com/user'>profile</a> when you activate them!</expand-text>

          <v-divider class="divider my-8"></v-divider>

          <p class="text-6xl text-center EHSMB font-bold"><i>OST</i></p>
          <music-card class="p-32"></music-card>

          <v-divider class="divider my-8"></v-divider>

          <p class="text-6xl text-center EHSMB font-bold"><i>GALLERY</i></p>
          <gallery-doge></gallery-doge>

          <v-divider class="divider my-8"></v-divider>
          <a
            style="all: unset"
            href="https://macroquiet.itch.io/"
            target="_blank"
          >
            <expand-text
              class="mb-64"
              :title="'DOWNLOAD'"
              :hide="true"
            ></expand-text>
          </a>
        </div>
      </div>
    </ParallaxEffect>
  </div>
</template>

<script>
import ExpandText from "./Doge/ExpandText.vue";
import GalleryDoge from "./Doge/GalleryDoge.vue";
import MusicCard from "./Doge/MusicCard.vue";
import ParallaxEffect from "./Doge/ParallaxEffect.vue";

export default {
  name: "Doge",
  components: {
    ParallaxEffect,
    ExpandText,
    MusicCard,
    GalleryDoge,
  },
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: EHSMB;
  src: url("@/assets/fonts/EHSMB.TTF");
}
ul {
  margin-left: 40px;
  list-style: none;
}
li {
  padding: 0.3em 0 1em 40px;
  background-image: url("https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-info-icon.png")
    no-repeat;
}
.EHSMB {
  font-family: EHSMB;
}
.v-divider {
  background-color: rgba(207, 137, 71, 0.2);
  border-width: 2px;
  border-radius: 16px;
}
</style>
