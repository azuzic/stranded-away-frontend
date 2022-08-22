<template>
<div>
<v-row :class="$vuetify.breakpoint.mobile ? 'p-2' : 'p-16' ">
    <v-col
      v-for="n in 9"
      :key="n"
      class="d-flex child-flex"
      :cols="width"
    >
      <v-img
        :src="require('@/assets/Doge/gallery_'+n+'.png')"
        :lazy-src="require('@/assets/Doge/gallery_'+n+'.png')"
        aspect-ratio="2"
        class="grey lighten-2 img"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-col>
  </v-row>
</div>
  
</template>

<script>
export default {
  name: "GalleryDoge",
  computed: {
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 12;
        case "sm":
          return 6;
        case "md":
          return 6;
        case "lg":
          return 4;
        case "xl":
          return 4;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.img {
  transition: all .4s ease-in-out;
  border-radius: 8px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
  border: 1.5px white solid;
    opacity: 0.5;
  &:hover {
    opacity: 1;
  }
}
</style>