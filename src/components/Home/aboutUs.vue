<template>
  <div class="mb-8 pb-8 text-center bg-background-cards about-us">
    <div class="flex justify-center mb-4">
      <v-col :cols="$vuetify.breakpoint.mobile ? '12' : '4'">
        <h2
          id="about-us"
          class="text-4xl text-slate-200 font-bold mb-6 v-container"
        >
          ABOUT US
        </h2>
        <h1>We are a two person Indie Game Developer Studio from Croatia.</h1>
        <h2>
          It all started in the summer of 2021. when two friends and colleagues
          decided they wanted to create video games and fulfil their lifelong
          dreams.
        </h2>
        <h2>
          Meet
          <router-link :to="{ name: 'User', params: { userName: 'blaskec' } }">
            <span class="text-red-like-logo">@blaskec</span>
          </router-link>
          and
          <router-link :to="{ name: 'User', params: { userName: 'zuza' } }">
            <span class="text-red-like-logo">@zuza</span>
          </router-link>
          now!
        </h2>
      </v-col>
    </div>
    <div class="flex flex-wrap justify-center">
      <Portrait
        class="mb-4"
        :imageSrc="'portraits/Portret_Luka_Big-noBG.png'"
        :name="'Blaskec'"
        :userName="'blaskec'"
      ></Portrait>
      <Portrait
        :imageSrc="'portraits/Portret_Alesandro_Big-noBG.png'"
        :name="'Zuza'"
        :userName="'zuza'"
      ></Portrait>
    </div>
  </div>
</template>

<script>
import Portrait from "@/components/Home/portrait.vue";

export default {
  name: "aboutUs",
  components: {
    Portrait,
  },
};
</script>

<style lang="scss" scoped>
.about-us {
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
        0px 2px 2px 0px rgb(0 0 0 / 14%),
        0px 1px 5px 0px rgb(0 0 0 / 12%);
}
</style>
