<template>
  <v-container class="pa-4 text-center">
    <v-row
      class="fill-height"
      align="center"
      justify="center"
    >
      <template v-for="(item, i) in items">
        <v-col
          :key="i"
          cols="12"
          md="4"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
            >
              <iframe width="100%" height="400px" allowfullscreen :src="item">

              </iframe>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "MusicCard" ,
    data: () => ({
      items: [
          'https://www.youtube.com/embed/kkkRJm4rJuI',
          'https://www.youtube.com/embed/G5wPHVsgpjk',
          'https://www.youtube.com/embed/u3PrdOA_4Tw',
      ],
      transparent: 'rgba(255, 255, 255, 0)',
    }),
  }
</script>

<style lang="scss" scoped>
.v-card {
  transition: opacity .4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
 }

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>