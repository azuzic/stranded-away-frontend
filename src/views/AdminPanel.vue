<template>
  <div class="mt-16 pl-32 pr-32">
    <h1 class="text-4xl mt-4">ADMIN PANEL</h1>
    <h2 class="mb-4">
      Welcome back, <b class="text-red-like-logo">{{ user.username }}</b>
    </h2>
    <v-card dark>
      <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img
              v-if="avatarMounted"
              :src="
                avatarImage
                  ? avatarImage
                  : require('@/assets/default-user-icon.jpg')
              "
            >
            </v-img>
          </v-list-item-avatar>

          <v-list-item-title>{{ user.username }}</v-list-item-title>

          <v-btn icon @click.stop="mini = !mini">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>
<script>
import router from "@/router";
import store from "@/store";
import { Auth } from "@/services";
export default {
  name: "AdminPanel",
  components: {},
  data: () => ({
    drawer: true,
    items: [
      { title: "Carousel", icon: "mdi-view-carousel" },
      { title: "Timeline", icon: "mdi-chart-gantt" },
      { title: "Games", icon: "mdi-controller" },
      { title: "Users", icon: "mdi-account-group-outline" },
    ],
    user: {
      username: Auth.currentUser.username,
      email: Auth.email,
    },
    mini: true,
    selectedItem: 1,
    details: [
      { text: "Real-Time", icon: "mdi-clock" },
      { text: "Audience", icon: "mdi-account" },
      { text: "Conversions", icon: "mdi-flag" },
    ],
    page: 1,
    auth: Auth.state,
    user: {
      username: "",
      email: "",
      admin: false,
    },
    avatarImage: "",
    //mount loading
    avatarMounted: false,
  }),
  async mounted() {
    await this.getUserDetails();

    await this.setUserAvatar();

    (this.avatarMounted = true),
      this.$root.$on("getUserDetails", () => {
        this.getUserDetails();
      });

    this.$root.$on("setUserAvatar", () => {
      this.getUserDetails();
    });
  },

  methods: {
    async getUserDetails() {
      if (this.auth.authenticated) {
        let userData = Auth.getCurrentUserData();
        let result = await Auth.getUserDetails(userData.username);
        this.user = result.data.userData;
      }
    },
    async setUserAvatar() {
      if (this.user.username) {
        this.avatarImage = await Auth.getImage(this.user.profile.avatarImageID);
        this.avatarImage = this.avatarImage.data.img;
      }
    },
  },
  width() {
    switch (this.$vuetify.breakpoint.name) {
      case "xs":
        return 11;
      case "sm":
        return 8;
      case "md":
        return 6;
      case "lg":
        return 4;
      case "xl":
        return 3;
    }
  },
};
</script>
<style></style>
