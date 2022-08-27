<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="0" md="1" lg="1" xl="2"></v-col>
      <v-col sm="12" md="10" lg="10" xl="8" class="bg-background-cards h-full pb-16 mb-16" >

        <CoverImage :user="user" :canEdit="canEdit"></CoverImage>

        <v-container class="bg-footer-header min-h-100px">
          <div class="flex flex-wrap min-h-100px">
            <ProfileAvatar :user="user" :canEdit="canEdit"></ProfileAvatar>
            <UserData :user="user" :canEdit="canEdit"></UserData>
            <Medals v-show="false"></Medals>
          </div>
        </v-container>

        <v-container>
          
          <AboutMe :user="user" :canEdit="canEdit"></AboutMe>

          <v-row class="pr-4">
            <PlayedGames :user="user"></PlayedGames>
            <Trophies :user="user"></Trophies>
          </v-row>

        </v-container>
      </v-col>
      <v-col sm="0" md="1" lg="1" xl="2"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import "animate.css";

import { Auth } from "@/services";

import CoverImage from "@/components/User Profile/CoverImage.vue";
import ProfileAvatar from "../components/User Profile/ProfileAvatar.vue";
import UserData from "../components/User Profile/UserData.vue";
import Medals from "@/components/User Profile/Medals.vue";
import PlayedGames from "@/components/User Profile/PlayedGames.vue";
import Trophies from "../components/User Profile/Trophies.vue";
import AboutMe from "../components/User Profile/AboutMe.vue";

export default {
  name: "User",
  components: {
    CoverImage,
    ProfileAvatar,
    UserData,
    Medals,
    PlayedGames,
    Trophies,
    AboutMe
},
  data: () => ({

    currentUser: null,
    auth: Auth.state,
    user: {
      username: "",
      email: "",
      admin: false,
      profile: {
        description: "",
        games: [],
      },
    },

    canEdit: false,

    tokenUser: Auth.currentUser.getCurrentUserData.username,
  }),
  async mounted() {
    this.currentUser = this.$route.params.userName;

    await this.getUserDetails();

    this.$root.$on("getUserDetails", async () => {
        await this.getUserDetails();
        return true;
    });
    
    this.$root.$on("appGetUserDetails", async () => {
        this.appGetUserDetails();
    });
    
    this.$root.$on("appSetUserAvatar", async () => {
        this.appSetUserAvatar();
    });
  },
  methods: {
    async getUserDetails() {
      if (this.auth.authenticated) {
        let result = await Auth.getUserDetails(this.currentUser);
        this.user = result.data.userData;

        if (this.tokenUser === this.$route.params.userName) {
          this.canEdit = true;
        }
      }
    },
    appGetUserDetails() {
      this.$root.$emit("getUserDetails");
    },
    appSetUserAvatar() {
      this.$root.$emit("setUserAvatar");
    },
  },
};
</script>