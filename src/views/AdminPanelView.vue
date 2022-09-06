<template>
  <v-container class="mt-16 mb-64 md:pl-24 md:pr-24">
    <h1 class="text-4xl mt-4">ADMIN PANEL</h1>
    <h2 class="mb-4">
      Welcome back, <b class="text-red-like-logo">{{ user.username }}</b>
    </h2>
    <v-card dark>
      <!---------------------------------------------------------------------------------->
      <div :class="$vuetify.breakpoint.mobile ? '' : 'flex'">
        <div>
            <AdminNavigationBar :avatarMounted="avatarMounted" :user="user" :avatarImage="avatarImage" ></AdminNavigationBar>
        </div>

        <div class="flex flex-wrap justify-around align-center h-screen w-full overflow-x-hidden">
            
            <CarouselEditor v-if="currentPanelItem == 0" ></CarouselEditor>

            <timelinePostForm v-if="currentPanelItem == 1" :timelinePost="timelinePost"></timelinePostForm>

            <AdminAllTimelinePosts v-if="currentPanelItem == 1"></AdminAllTimelinePosts>

            <gamesPostForm v-if="currentPanelItem == 2"  :gamePost="gamePost"></gamesPostForm>

            <gameCard
                v-if="currentPanelItem == 2"
                :availability="gamePost.availability != '' ? gamePost.availability : 'availability'"
                :title="gamePost.title != '' ? gamePost.title : 'game title goes here'"
                :text="gamePost.text != '' ? gamePost.text : 'Start writing...'"
                :imageSrc="gamePost.image"
                :gName="gamePost.gameName">
            </gameCard>

            <AdminAllUsers v-if="currentPanelItem == 3"></AdminAllUsers>
        </div>
      </div>
      <!---------------------------------------------------------------------------------->
    </v-card>
    <!--Timeline post preview-->
    <v-row
      v-if="currentPanelItem == 1"
      align="center"
      justify="center"
      class="mb-6 mt-2"
    >
      <v-col align-self="center" :cols="$vuetify.breakpoint.mobile ? 12 : 4">
        
      </v-col> 
    </v-row
    ><!--/Timeline post preview-->

    <!--***/TIMELINE EDITOR***-->
  </v-container>
</template>
<script>
import "animate.css";

import { Auth } from "@/services";
//Components
import timelinePostForm from "@/components/admin/timelinePostForm.vue";
import gamesPostForm from "@/components/admin/gamesPostForm.vue";

import gameCard from "@/components/Home/gameCard.vue";
import AdminNavigationBar from "@/components/admin/adminNavigationBar.vue";
import CarouselEditor from '@/components/admin/carouselEditor.vue';
import AdminAllTimelinePosts from '../components/admin/adminAllTimelinePosts.vue';
import AdminAllUsers from '../components/admin/adminAllUsers.vue';


export default {
  name: "AdminPanel",
  components: {
    timelinePostForm,
    gamesPostForm,
    gameCard,
    AdminNavigationBar,
    CarouselEditor,
    AdminAllTimelinePosts,
    AdminAllUsers
},
  data: () => ({
    //////////////Navigation drawer///////////
    currentPanelItem: 0,
    //////////////////////////////////////////

    ///////////////Fetch user data////////////
    auth: Auth.state,
    user: {
      username: "",
      email: "",
      admin: true,
    },
    avatarImage: "",
    avatarMounted: false,
    //////////////////////////////////////////

    ////////////////EDITORS///////////////////
    /////////////1. Post Timeline///////////
    timelinePost: {
      title: "",
      text: "",
      image: null,
      author: "",
      icon: "mdi-newspaper-variant",
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    },
    ////////////2. Post Games///////////////
    gamePost: {
      title: "",
      text: "",
      availability: "",
      image: "cards/placeholder.jpg",
      gameName: "default",
    },
    //////////////////////////////////////////
  }),
  async mounted() {
    await this.getUserDetails();
    await this.setUserAvatar();

    (this.avatarMounted = true),
      this.$root.$on("getUserDetails", () => {
        this.getUserDetails();
      });
    this.$root.$on("setCurrentitem", (currentPanelItem) => {
        this.currentPanelItem = currentPanelItem;
    });
  },

  methods: {
    async getUserDetails() {
      if (this.auth.authenticated) {
        let userData = Auth.getCurrentUserData();
        let result = await Auth.getUserDetails(userData.username);
        this.user = result.data.userData;
        this.timelinePost.author = result.data.userData.username;
      }
    },
    async setUserAvatar() {
      if (this.user.username) {
        this.avatarImage = await Auth.getImage(this.user.profile.avatarImageID);
        this.avatarImage = this.avatarImage.data.img;
      }
    },
  },
};
</script>