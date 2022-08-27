<template>
  <v-app class="overflow-x-hidden">
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
                <strong class="text-sm text-stone-200">{{ link.title }}</strong>
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
                @click="$router.push({ name: 'Login' }).catch(() => {})"
              >
                <strong class="text-sm">LOG IN</strong>
              </v-btn>
              <!--User profile icon-->
              <v-col align-self="center" v-else>
                <v-menu bottom min-width="200px" rounded offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn icon x-large v-on="on">
                      <v-avatar color="gray " size="48">
                        <v-img
                          v-if="avatarMounted"
                          :src="
                            avatarImage
                              ? avatarImage
                              : require('@/assets/default-user-icon.jpg')
                          "
                        >
                        </v-img>
                        <v-skeleton-loader
                          v-else
                          dark
                          type="avatar"
                          height="48px"
                        >
                        </v-skeleton-loader>
                      </v-avatar>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-list-item-content class="justify-center">
                      <div class="mx-auto text-center">
                        <v-avatar color="gray " size="48">
                          <v-img
                            v-if="avatarMounted"
                            :src="
                              avatarImage
                                ? avatarImage
                                : require('@/assets/default-user-icon.jpg')
                            "
                          >
                          </v-img>
                          <v-skeleton-loader
                            v-else
                            light
                            type="avatar"
                            height="48px"
                          >
                          </v-skeleton-loader>
                        </v-avatar>
                        <h3>{{ user.username }}</h3>
                        <p class="text-caption mt-1">
                          {{ user.email }}
                        </p>
                        <v-divider class="my-3"></v-divider>
                        <v-btn
                          @click="
                            $router.push({
                              name: 'User',
                              params: { userName: user.username },
                            })
                          "
                          depressed
                          rounded
                          text
                        >
                          MY PROFILE
                        </v-btn>
                        <v-btn
                          v-if="user.admin"
                          @click="
                            $router.push({
                              name: 'AdminPanel',
                            })
                          "
                          depressed
                          rounded
                          text
                        >
                          ADMIN PANEL
                        </v-btn>
                        <v-divider class="my-3"></v-divider>
                        <v-btn @click="logOut()" depressed rounded text>
                          LOG OUT
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
        <v-navigation-drawer
          v-model="drawer"
          fixed
          temporary
          height="auto"
          color="grey darken-4 h-100"
        >
          <v-list dense>
            <v-list-item
              v-for="link in links"
              :key="link.title"
              link
              class="ml-15"
            >
              <div @click="scroll(link.to)" class="w-full">
                <v-list-item-icon class="text-stone-200 w-full">
                  <v-icon color="white">{{ link.icon }}</v-icon> &nbsp;{{
                    link.title
                  }}
                </v-list-item-icon>
              </div>
            </v-list-item>

            <v-list-item v-show="user.username">
              <v-list-item-content class="justify-center">
                <v-divider class="divider mb-2"></v-divider>
                <div class="mx-auto text-center text-white">
                  <v-avatar color="gray " size="48">
                    <v-img
                      v-if="avatarMounted"
                      :src="
                        avatarImage
                          ? avatarImage
                          : require('@/assets/default-user-icon.jpg')
                      "
                    >
                    </v-img>
                    <v-skeleton-loader v-else dark type="avatar" height="48px">
                    </v-skeleton-loader>
                  </v-avatar>
                  <h3 class="mt-2 text-red-500">{{ user.username }}</h3>
                  <p class="text-caption mt-1 text-stone-300">
                    {{ user.email }}
                  </p>
                  <v-btn
                    @click="
                      $router
                        .push({
                          name: 'User',
                          params: { userName: user.username },
                        })
                        .catch(() => {})
                    "
                    depressed
                    rounded
                  >
                    MY PROFILE
                  </v-btn>
                  <v-btn
                    v-if="user.admin"
                    class="mt-2"
                    @click="
                      $router.push({
                        name: 'AdminPanel',
                      })
                    "
                    depressed
                    rounded
                    color="red"
                  >
                    ADMIN PANEL
                  </v-btn>
                </div>
                <v-divider class="divider mt-4"></v-divider>
              </v-list-item-content>
            </v-list-item>

            <v-list-item class="justify-center">
              <v-btn
                v-if="!auth.authenticated"
                rounded
                class="my-4 text-stone-200"
                cols="2"
                @click="$router.push({ name: 'Login' }).catch(() => {})"
              >
                <strong class="text-sm">LOG IN</strong>
              </v-btn>
              <v-btn
                v-else
                color="secondary"
                rounded
                class="my-4"
                cols="2"
                @click="logOut()"
              >
                <strong class="text-sm text-stone-200">LOG OUT</strong>
              </v-btn>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>

        <!--/Mobile navigation-->
      </v-main>
    </nav>
    <!--Header-->
    <!--Dynamic route matching-->
    <router-view :key="$route.fullPath"></router-view>
    <!--Footer-->
    <v-card>
      <v-footer padless bottom absolute dark>
        <v-card flat tile width="100%" class="navbarColor text-center">
          <v-card-text class="flex justify-center align-center mb-0">
            <span class="-mb-4"
              ><strong class="text-stone-300"
                >MacroQuiet Game Development <br
              /></strong>
              <div class="text-stone-400">
                Copyright © {{ new Date().getFullYear() }}
              </div>
              <v-divider class="mt-2"></v-divider>
              <div class="mb-1">
                <v-btn
                  text
                  icon
                  href="https://www.facebook.com/MacroQuiet-107101702108343"
                  target="_blank"
                  ><v-icon class="p-2" color="white"
                    >mdi-facebook</v-icon
                  ></v-btn
                >
                <v-btn
                  text
                  icon
                  href="https://www.youtube.com/channel/UCCZgds9-ACGOKfnwk8gQBTA"
                  target="_blank"
                  ><v-icon class="p-2" color="white">mdi-youtube</v-icon></v-btn
                >
                <v-btn
                  text
                  icon
                  href="https://twitter.com/MacroQuiet"
                  target="_blank"
                  ><v-icon class="p-2" color="white">mdi-twitter</v-icon></v-btn
                >
              </div>
            </span>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-card>
    <!--/Footer-->
  </v-app>
</template>

<script>
let wait = function (seconds) {
  return new Promise((resolveFn) => {
    setTimeout(resolveFn, seconds * 1000);
  });
};
import router from "@/router";
import store from "@/store";
import { Auth, Admin } from "@/services";

export default {
  name: "App",
  data: () => ({
    drawer: null,
    store,
    links: [
      {
        title: "Our games",
        icon: "mdi-controller",
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
        to: "contact-us",
      },
    ],
    //For footer
    items: ["default", "absolute", "fixed"],
    variant: "fixed",

    //Get authenticated state from services/auth
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
      this.setUserAvatar();
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
      await this.getUserDetails();
      if (this.user.username) {
        let result = await Auth.getImage(this.user.profile.avatarImageID);
        this.avatarImage = result ? result.data.img : "";
      }
    },
    //Link scroll
    async scroll(id) {
      if (id == "contact-us") {
        router.push({ path: "/contact-us" }).catch(() => {});
        return;
      }
      if (this.$route.name != "Home") {
        router.push({ path: "/", replace: true }).catch(() => {});
        await wait(0.1);
      }

      if (id == null) return;

      try {
        document.getElementById(id).scrollIntoView({
          behavior: "smooth",
        });
        this.drawer = false;
      } catch (e) {}
    },
    logOut() {
      Auth.logOut();
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
* {
  font-family: "Poppins", sans-serif;
}
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
