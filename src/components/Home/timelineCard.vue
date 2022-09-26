<template>
  <v-card color="#111011" dark :width="$vuetify.breakpoint.mobile ? 320 : 900">
    <v-card-title :align="$vuetify.breakpoint.mobile ? 'center' : 'start'">
      <v-icon :class="$vuetify.breakpoint.mobile ? 'mx-auto' : ''">
        {{ icon }}
      </v-icon>
      <span
        :class="
          $vuetify.breakpoint.mobile
            ? 'text-lg text-slate-200 uppercase ml-2 break-normal'
            : 'text-xl text-slate-200 uppercase ml-2 break-normal'
        "
        >{{ title }}</span
      >
    </v-card-title>

    <v-container class="bg-background-cards">
      <v-row class="text-xs text-red-500 pt-4 pl-4">{{ date }}</v-row>
      <v-row>
        <v-col cols="12" md="10">
          <div class="text-slate-300">
            <p v-html="text"></p>
            <!--
            <v-btn color="red lighten-1" class="mx-0 absolute bottom left" outlined>
              read more
            </v-btn>
            -->
          </div>
        </v-col>
      </v-row>
      <v-row
        v-if="author == 'MacroQuiet'"
        justify="end"
        class="text-red-500 pr-3 pb-1">
        <img
          class="float-right -mt-1"
          height="35px"
          width="35px"
          src="@/assets/macroquiet_logo_notext.png" />{{ author }}
      </v-row>
      <v-row
        v-else-if="author == 'blaskec'"
        justify="end"
        class="text-red-500 pr-3 pb-2">
        <img
          class="float-right -mt-1"
          height="35px"
          width="35px"
          src="@/assets/portraits/Portret_Luka_Big-noBG.png" />{{ author }}
      </v-row>
      <v-row
        v-else-if="author == 'zuza'"
        justify="end"
        class="text-red-500 pr-3 pb-2">
        <img
          class="float-right -mt-1"
          height="35px"
          width="35px"
          src="@/assets/portraits/Portret_Alesandro_Big-noBG.png" />{{ author }}
      </v-row>
      <v-row v-else justify="end" class="text-red-500 pr-3 pb-2">
        {{ author }}
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "timelinePost",
  props: ["icon", "date", "title", "text", "author"],
};
</script>

<style></style>
