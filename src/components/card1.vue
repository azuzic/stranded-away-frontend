<template>
  <v-card class="mx-auto" color="grey darken-3" max-width="420">
    <v-img :src="require('@/assets/' + imageSrc)" height="200px"></v-img>

    <v-card-title class="uppercase white--text text-xs mb-2">
      {{ availability }}
    </v-card-title>

    <v-card-subtitle class="uppercase white--text text-3xl">
      {{ title }}
    </v-card-subtitle>
    <v-card-text class="white--text">
      {{ text }}
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon color="white">{{
          show ? "mdi-chevron-up" : "mdi-arrow-right"
        }}</v-icon>
      </v-btn>
    </v-card-actions>

    <i class="mdi mdi-diving-flippers:"></i>
    <v-divider></v-divider>
  </v-card>
</template>
<script>
export default {
  props: ["availability", "title", "text", "imageSrc"],
  data: () => ({}),
};
</script>
