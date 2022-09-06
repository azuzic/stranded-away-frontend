<template>
  <v-card class="mx-4 card-size" :width="$vuetify.breakpoint.mobile ? 300 : 420" color="#15171e">

    <router-link :to="{ name: 'GamePage', params: { gameName: gName } }">
      <figure class="img">
        <v-img :src="require('@/assets/' + imageSrc)" height="200px"></v-img>
      </figure>
    </router-link>

    <v-card-title class="uppercase text-red-500 text-xs mb-2">
      {{ availability }}
    </v-card-title>

    <v-card-subtitle class="uppercase text-3xl font-bold card-title">
        <p class="text-slate-200">{{ title }}</p>
    </v-card-subtitle>

    <v-card-text class="font-medium card-text-size">
        <div class="w-full text-size text-slate-300" v-html="text">    
        </div>
    </v-card-text>

    <v-btn class="absolute bottom-0 right-0 m-1"
        icon @click="$router.push({ name: 'GamePage', params: { gameName: gName } })">
        <v-icon color="red">{{ "mdi-arrow-right" }}</v-icon>
    </v-btn>

    <v-card-actions>
      <v-spacer></v-spacer>
    </v-card-actions>

    <i class="mdi mdi-diving-flippers:"></i>

  </v-card>
</template>
<script>
export default {
  name: "GameCard",
  props: ["availability", "title", "text", "imageSrc", "gName"],
  data: () => ({}),
  methods: {},
};
</script>
<style lang="scss" scoped>
.card-title {
    height: 50px;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
}
.card-size {
    height: 450px;
}
.card-text-size {
    height: 150px;
}
.text-size {
    overflow: scroll;
    max-height: 150px;
}
.v-icon:hover {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 100%;
}
.img {
    opacity: 1;
    transition: 0.25s ease-in-out;
    &:hover {
        opacity: 0.5;
    }
}
</style>
