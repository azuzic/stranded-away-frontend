<template>
  <v-card color="red lighten-1" dark min-width="350" max-width="900">
    <v-card-title>
      <v-icon size="32">
        {{ icon }}
      </v-icon>
      <span class="text-xl uppercase ml-2">{{ title }}</span>
    </v-card-title>

    <v-container class="grey lighten-3">
      <v-row class="text-xs text--primary p-2">{{ date }}</v-row>
      <v-row>
        <v-col cols="12" md="10">
          <div class="text--primary">
            <p>{{ text }}</p>

            <v-btn color="red lighten-1" class="mx-0" outlined>
              read more
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row align="center" justify="end" class="text--primary p-2">
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
