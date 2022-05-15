<template>
  <v-alert
    dense
    text
    type="success"
    class="mt-2 animate__animated animate__fadeInUp"
    v-show="activator"
  >
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  name: "alert-success",
  props: ["text", "activator"],
};
</script>

<style></style>
