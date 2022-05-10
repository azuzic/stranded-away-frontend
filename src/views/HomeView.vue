<template>
  <div>
    <v-img src="@/assets/game_images/game1.png"
      ><v-row class="fill-height" align="center" justify="center"> </v-row>
    </v-img>

    <v-container>
      <h2 class="text-4xl text-white font-bold mb-4 mt-8">Featured Games</h2>
      <v-row>
        <v-col>
          <card-1
            :availability="'AVAILABLE NOW!'"
            :title="'DOGE'"
            :text="'The great and epic Doge game! Our first game ever. Made in just 2 weeks!'"
            :imageSrc="'cards/doge1.png'"
          ></card-1>
        </v-col>
        <v-col>
          <card-1
            :availability="'AVAILABLE IN JUNE'"
            :title="'Stranded Away'"
            :text="'2D shooter/puzzle game about exploring abandoned planets. Game is currently still in work in progress!'"
            :imageSrc="'cards/stranded1.png'"
          ></card-1>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import card1 from "@/components/card1.vue";
export default {
  name: "Home",
  components: {
    card1,
  },
  data: () => ({}),
};
</script>
