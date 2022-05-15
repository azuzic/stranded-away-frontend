<template>
  <v-alert
    dense
    text
    type="error"
    class="mt-2 animate__animated animate__tada"
    v-show="activator"
  >
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  name: "alert-failed",
  props: ["text", "activator"],
};
</script>

<style></style>
