<template>
  <div>
    <p>Game: {{ name }}</p>
  </div>
</template>

<script>
export default {
  name: "Game",
  data: () => ({
    name: this.$route.params.name,
  }),
  methods: {
    getData() {
      //Get Data
    },
  },
};
</script>

<style></style>
