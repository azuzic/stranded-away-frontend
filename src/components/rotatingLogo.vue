<template>
  <v-img
    contain
    class="rotate animate_animated animate__fadeIn"
    :height="height"
    src="@/assets/macroquiet_logo_rotate.png"
  >
  </v-img>
</template>

<script>
import "animate.css";
export default {
  name: "rotatingLogo",
  props: ["height"],
};
</script>

<style>
.rotate {
  animation: rotation 4s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
