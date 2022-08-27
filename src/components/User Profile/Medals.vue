<template>
  <div
    v-show="!authResolver.emailChangeRequest"
    class="medals flex flex-wrap align-center min-w-200px overfow-hidden"
    :class="
    $vuetify.breakpoint.mobile
        ? 'mb-4 justify-center'
        : 'justify-left'
    "
>
    <img
    v-for="n in 10"
    :key="n"
    class="medal"
    src="@/assets/user/user_medal.png"
    />
</div>
</template>

<script>
import authResolver from "@/services/authResolver";

export default {
    name: "Medals",
    data: () => ({
        authResolver,
     }),
}
</script>

<style lang="scss" scoped>
.medals {
  .medal {
    transition-duration: 0.5s;
    margin: 10px;
    width: 45px;
    &:hover {
      transition-duration: 0.5s;
      margin: 0px;
      width: 65px;
    }
  }
}
</style>