<template>
    <div class="w-full flex justify-center">
        <div class="mx-96">
            <v-col class="flex justify-center">
                <button class="button px-36 py-3 text-3xl mb-4" @click="show = !show"><i>{{ title }}</i></button>
            </v-col>
            <Transition name="bounce" class="transition">
                <div class="text text-lg mb-8" v-if="show && !hide">
                    <slot> placeholder </slot>
                </div>
            </Transition>
        </div> 
    </div>
</template>

<script>
export default {
  name: "ExpandText",
  props: ["title", "text", "hide"],
    data: () => ({
    show: false,
  }),
};
</script>

<style lang="scss" scoped>
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    height: 0%;
  }
  100% {
    height: 20vh;
  }
}
.button {
    background-color: rgba(207, 137, 71, 0.20);
    border: 2px solid rgba(207, 137, 71, 0.10);
    border-radius: 12px;
    transition: all 0.25s;
    &:hover {
        background-color: rgba(255, 123, 0, 0.4);
        border-radius: 24px;
        border: 2px solid rgba(255, 123, 0, 0.2);
    }
}
.text {
    background-color: rgba(63, 0, 19, 0.35);
    padding: 24px;
    border-radius: 16px;
    height: 20vh;
    overflow: scroll;
}
</style>