<template>
  <v-alert
    dense
    text
    :type="type"
    class="mt-2 animate__animated animate__fadeInUp"
    v-show="activator"
  >
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  name: "alert",
  props: ["text", "activator", "type"],
};
</script>

<style></style>
