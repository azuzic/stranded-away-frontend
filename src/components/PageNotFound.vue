<template>
  <div class="flex items-center justify-center h-screen min-h-full">
    <v-row>
      <v-col class="mb-32">
        <v-img max-height="225" contain src="@/assets/trader_villager_idle.gif">
        </v-img>
        <p class="text-center mt-2">
          This is not the page you are looking for.
        </p>
        <div
          style="cursor: pointer; color: red"
          class="justify-center text-center"
          @click="$router.push({ name: 'Home' }).catch(() => {})"
        >
          Go back home
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
};
</script>

<style></style>
