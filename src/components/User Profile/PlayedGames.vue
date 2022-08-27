<template>
  <v-col cols="12" class="ml-4 text-2xl text-red-like-logo">
    <p class="text-3xl text-red-like-logo">Played games</p>
    <v-row class="mr-2 justify-left w-full">
    <v-col
        v-for="gameCard in isPlayed(store.gameCards)"
        :key="gameCard.id"
        :cols="width"
    >
        <gameCard
        :availability="''"
        :title="gameCard.title"
        :text="gameCard.text"
        :imageSrc="gameCard.imageSrc"
        :gName="gameCard.gameName"
        >
        </gameCard>
    </v-col>
    </v-row>
</v-col>
</template>

<script>
import store from "@/store";
import gameCard from "@/components/Home/gameCard.vue";

export default {
  name: "PlayedGames", 
  components: {
    gameCard,
  },
    data: () => ({
    store,
  }),
  props: ["user"],
  methods: {
    isPlayed(gameCards) {
      if (this.user.profile.games == null) {
        return [];
      }
      const result = gameCards.filter((gameCard) =>
        this.user.profile.games.find(
          (element) => element.name == gameCard.title
        )
      );
      return result;
    },
  }, 
  computed: {
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 11;
        case "sm":
          return 6;
        case "md":
          return 6;
        case "lg":
          return 4;
        case "xl":
          return 4;
      }
    },
  },
}
</script>