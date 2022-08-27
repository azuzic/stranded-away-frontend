<template>
  <v-row class="ml-4 text-2xl text-red-like-logo">
    <v-col cols="12" class="text-3xl text-red-like-logo mt-4"
    >Trophies</v-col
    >
    <v-col
    class="col-12"
    v-for="(game, id) in user.profile.games"
    :key="id"
    >
    <v-col
        cols="12"
        class="text-left text-2xl text-white font-bold underline"
    >
        {{ game.name }}
    </v-col>
    <v-col
        class="flex flex-wrap align-center min-w-200px justify-start"
    >
        <v-tooltip
        color="#EF5350"
        top
        v-for="(trophies, id2) in game.trophies"
        :key="id2"
        >
        <template v-slot:activator="{ on, attrs }">
            <img
            @click="
                (overlay = !overlay),
                (trophieImg =
                    game.name + '/' + trophies.spriteName),
                (trophieLocked = trophies.unlocked)
            "
            v-bind="attrs"
            v-on="on"
            class="trophy m-4"
            :src="
                trophies.unlocked
                ? require('@/assets/trophies/' +
                    game.name +
                    '/' +
                    trophies.spriteName +
                    '.png')
                : require('@/assets/trophies/hidden_trophy.png')
            "
            />
        </template>
        <div class="text-center">
            <div>
            {{
                !trophies.unlocked ? "*HIDDEN*" : trophies.trophieName
            }}
            </div>
            <div>{{ trophies.description }}</div>
        </div>
        </v-tooltip>
    </v-col>
    </v-col>
    <v-overlay @click="overlay = !overlay" :value="overlay">
    <div class="bg-transparent-90 p-8 rounded-xl">
        <img
        class="trophyOverlay m-4"
        :src="
            trophieLocked
            ? require('@/assets/trophies/' + trophieImg + '.png')
            : require('@/assets/trophies/hidden_trophy.png')
        "
        />
    </div>
    </v-overlay>
</v-row>
</template>

<script>
export default {

  name: "Trophies", 
  props: ["user"],
  data: () => ({
    overlay: false,
    trophieLocked: "",
    trophieImg: "",
  }),
}
</script>

<style lang="scss" scoped>
.trophy {
  width: 128px;
  image-rendering: pixelated;
  &:hover {
    cursor: pointer;
    filter: drop-shadow(2px 0px 0px white) drop-shadow(0px -2px 0px white)
      drop-shadow(0px 2px 0px white) drop-shadow(-2px 0px 0px white);
  }
}
.trophyOverlay {
  width: 512px;
  image-rendering: pixelated;
  &:hover {
    filter: drop-shadow(8px 0px 0px white) drop-shadow(0px -8px 0px white)
      drop-shadow(0px 8px 0px white) drop-shadow(-8px 0px 0px white);
  }
}
</style>