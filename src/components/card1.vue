<template>
  <v-card class="mx-auto" color="#15171e" max-width="420">
    <router-link to="/user">
      <figure class="hover11">
        <v-img :src="require('@/assets/' + imageSrc)" height="200px"></v-img>
      </figure>
    </router-link>
    <v-card-title class="uppercase white--text text-xs mb-2">
      {{ availability }}
    </v-card-title>

    <v-card-subtitle class="uppercase white--text text-3xl font-bold">
      {{ title }}
    </v-card-subtitle>
    <v-card-text class="white--text font-medium">
      {{ text }}
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon color="white">{{ "mdi-arrow-right" }}</v-icon>
      </v-btn>
    </v-card-actions>
    <i class="mdi mdi-diving-flippers:"></i>
    <v-divider></v-divider>
  </v-card>
</template>
<script>
export default {
  name: "card1",
  props: ["availability", "title", "text", "imageSrc"],
  data: () => ({}),
  methods: {},
};
</script>
<style>
.cardColor {
  background-color: #18141c;
}
/* Opacity #1 */
.hover11 {
  opacity: 1;
  -webkit-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
}
.hover11 :hover {
  opacity: 0.5;
}
</style>
