<template>
  <v-app>
    <!--Header-->
    <nav class="custom-nav">
      <v-main>
        <v-app-bar class="v-app-bar navbarColor" fixed>
          <v-row justify="start" align="start">
            <v-col
              align-self="center"
              :cols="$vuetify.breakpoint.mobile ? '12' : '2'"
            >
              <router-link to="/">
                <img
                  class="p-4"
                  src="@/assets/macroquiet_logo.png"
                  alt=""
                  :width="logoWidth"
                />
              </router-link>
            </v-col>
            <!--LINKS-->
            <v-col
              v-show="!$vuetify.breakpoint.mobile"
              align-self="center"
              cols="9"
              class="mt-2"
            >
              <v-btn
                v-for="link in links"
                :key="link.title"
                color="white"
                text
                rounded
                class="my-4"
                cols="2"
                @click="scroll(link.to)"
              >
                <v-icon color="red lighten-1" class="mr-1">{{
                  link.icon
                }}</v-icon>
                <strong class="text-sm">{{ link.title }}</strong>
              </v-btn>
            </v-col>
            <!--/LINKS-->
            <v-col
              cols="1"
              align-self="center"
              v-show="!$vuetify.breakpoint.mobile"
            >
              <v-btn
                v-if="!auth.authenticated"
                color="secondary"
                rounded
                class="my-4"
                @click="$router.push({ name: 'Login' })"
              >
                <strong class="text-sm">SIGN IN</strong>
              </v-btn>
              <!--User profile icon-->
              <v-col align-self="center" v-else>
                <v-menu bottom min-width="200px" rounded offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn icon x-large v-on="on">
                      <v-avatar color="gray " size="48">
                        <img src="@/assets/default-user-icon.jpg" alt="" />
                      </v-avatar>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-list-item-content class="justify-center">
                      <div class="mx-auto text-center">
                        <v-avatar color="gray " size="48">
                          <img src="@/assets/default-user-icon.jpg" alt="" />
                        </v-avatar>
                        <h3>{{ user.fullName }}</h3>
                        <p class="text-caption mt-1">
                          {{ user.email }}
                        </p>
                        <v-divider class="my-3"></v-divider>
                        <v-btn
                          @click="$router.push({ name: 'User', params: { userName: user.fullName } })"
                          depressed
                          rounded
                          text
                        >
                          MY PROFILE
                        </v-btn>
                        <v-divider class="my-3"></v-divider>
                        <v-btn @click="signOut()" depressed rounded text>
                          SIGN OUT
                        </v-btn>
                      </div>
                    </v-list-item-content>
                  </v-card>
                </v-menu>
              </v-col>
              <!--/User profile icon-->
            </v-col>
          </v-row>

          <!--Mobile navigation icon-->
          <v-app-bar-nav-icon
            color="white"
            v-show="$vuetify.breakpoint.mobile"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
          <!--/Mobile navigation icon-->
        </v-app-bar>
        <!--Mobile navigation-->

        <v-navigation-drawer v-model="drawer" absolute temporary height="auto" color="grey darken-4 h-100" >

          <v-list dense>

            <v-list-item v-for="link in links" :key="link.title" link class="ml-15">

              <div @click="scroll(link.to)" class="w-full">
                <v-list-item-icon class="white--text w-full">
                  <v-icon color="white">{{ link.icon }}</v-icon> &nbsp;{{ link.title }}
                </v-list-item-icon>
              </div>

            </v-list-item>

            <v-list-item>
                <v-list-item-content class="justify-center">
                    <v-divider class="divider mb-2"></v-divider>
                    <div class="mx-auto text-center text-white">
                        <v-avatar color="gray " size="48">
                            <img src="@/assets/default-user-icon.jpg" alt="" />
                        </v-avatar>
                        <h3 class="mt-2">{{ user.fullName }}</h3>
                        <p class="text-caption mt-1">
                            {{ user.email }}
                        </p>
                            <v-btn
                                @click="$router.push({ name: 'User', params: { userName: user.fullName } })"
                                depressed rounded> MY PROFILE
                        </v-btn>
                    </div>
                    <v-divider class="divider mt-4"></v-divider>
                </v-list-item-content>
            </v-list-item>

            <v-list-item class="justify-center white--text">

              <v-btn v-if="!auth.authenticated" color="secondary" rounded class="my-4" cols="2" @click="$router.push({ name: 'Login' })" >
                <strong class="text-sm">SIGN IN</strong>
              </v-btn>
              <v-btn v-else color="secondary" rounded class="my-4" cols="2" @click="signOut()" >
                <strong class="text-sm">SIGN OUT</strong>
              </v-btn>

            </v-list-item>

          </v-list>

        </v-navigation-drawer>

        <!--/Mobile navigation-->
      </v-main>
    </nav>
    <!--Header-->
    <router-view />
    <!--Footer-->
    <v-card>
      <v-footer :padless="padless" bottom fixed>
        <v-card flat tile width="100%" class="navbarColor text-center">
          <v-card-text
            class="white--text flex justify-center align-center mb-0"
          >
            <span class="-mb-4"
              ><strong>MacroQuiet Game Development <br /></strong>
              <p>Copyright © {{ new Date().getFullYear() }}</p></span
            >
          </v-card-text>
        </v-card>
      </v-footer>
    </v-card>
    <!--/Footer-->
  </v-app>
</template>

<script>
import router from "@/router";
import store from "@/store";
import { Storage, Auth } from "@/services";

export default {
  name: "App",
  data: () => ({
    drawer: null,
    store,
    links: [
      {
        title: "Our games",
        icon: "mdi-google-controller",
        to: "games",
      },
      {
        title: "About us",
        icon: "mdi-newspaper-variant-multiple",
        to: "about-us",
      },
      {
        title: "Contact us",
        icon: "mdi-account-box",
        to: "games",
      },
    ],
    //For footer
    items: ["default", "absolute", "fixed"],
    padless: true,
    variant: "fixed",

    //Get authenticated state from services/auth
    auth: Auth.state,
    user: {
      initials: "JD",
      fullName: "John Doe",
      email: "john.doe@doe.com",
    },
  }),
  mounted() {
    this.fetchData("gameCards");
    //this.fetchData("carouselPictures");

    this.getUserDetails();
  },
  methods: {
    getUserDetails() {
      if (this.auth.authenticated) {
        let userData = Auth.getUserData();
        this.user.fullName = userData.username;
        this.user.email = userData.email;
      }
    },
    //Backend fetcher
    async fetchData(data) {
      const response = await Storage.getAll(data);
      store[data] = response.data;
    },
    //Link scroll
    scroll(id) {
      if (this.$route.name != "home") router.push({ path: "/", replace: true });
      if (id == null) return;
      try {
        document.getElementById(id).scrollIntoView({
          behavior: "smooth",
        });
        this.drawer = false;
      } catch (e) {}
    },
    signOut() {
      Auth.signOut();
      router.go();
    },
  },
  computed: {
    logoWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 225;
        case "sm":
          return 175;
        case "md":
          return 225;
        case "lg":
          return 220;
        case "xl":
          return 225;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
//filter: drop-shadow(0px 0px 64px rgba(0, 0, 0, 1));
.v-footer {
  filter: drop-shadow(0px 0px 32px rgba(0, 0, 0, 1));
  z-index: 100;
}

.v-card {
  border: none !important;
}

#app {
  background-color: var(--firstColor);
  color: white;
}

.custom-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  overflow: visible !important;
}
.navbarColor {
  background-color: var(--secondColor) !important;
}

.divider {
    background: white;
}
</style>