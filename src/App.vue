<template>
  <v-app>
    <!--Header-->
    <nav>
        <v-main >
            <v-app-bar color="grey darken-4" class="v-app-bar">
                <v-row justify="left" align="start">

                    <v-col align-self="center" :cols="$vuetify.breakpoint.mobile ? '12' : '2'">
                        <router-link to="/">
                            <img class="p-4" 
                            src="@/assets/macroquiet_logo.png" alt="" :width="logoWidth"/>
                        </router-link>
                    </v-col>
                    <v-col v-show="!$vuetify.breakpoint.mobile" align-self="center" cols="9" class="mt-2">
                        <v-btn v-for="link in links" :key="link.title" color="white" text rounded class="my-4" cols="2" @click="scroll(link.to)">
                                <v-icon color="red lighten-1" class="mr-1" >{{ link.icon }}</v-icon >
                                <strong class="text-sm">{{ link.title }}</strong>
                        </v-btn>
                    </v-col>
                    <v-col cols="1" align-self="center" v-show="!$vuetify.breakpoint.mobile" >
                        <v-btn color="secondary" rounded class="my-4" cols="2" > <strong class="text-sm">LOG IN</strong> </v-btn>
                    </v-col>

                </v-row>

            <!--Mobile navigation icon-->
                <v-app-bar-nav-icon color="white" v-show="$vuetify.breakpoint.mobile" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <!--/Mobile navigation icon-->
            </v-app-bar>
        <!--Mobile navigation-->
        <v-navigation-drawer v-model="drawer" absolute temporary>
          <v-list dense>
            <v-list-item v-for="link in links" :key="link.title" link>
              <div @click="scroll(link.to)">
                <v-list-item-icon>
                  <v-icon>{{ link.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ link.title }}</v-list-item-title>
                </v-list-item-content>
              </div>
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
      <v-footer v-bind="localAttrs" :padless="padless" class="v-footer">
        <v-card flat tile width="100%" class="grey darken-4 text-center">
          <v-card-text class="white--text flex justify-center align-center mb-0">
            <span class="-mb-4"><strong>MacroQuiet Game development <br></strong><p>Copyright © {{ new Date().getFullYear() }}</p></span>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-card>
    <!--/Footer-->
  </v-app>
</template>

<script>
import router from "@/router";
export default {
  name: "App",
  data: () => ({
    drawer: null,
    links: [
      {
        title: "Discover",
        icon: "mdi-newspaper-variant-multiple",
        to: "/",
      },
      {
        title: "Our games",
        icon: "mdi-google-controller",
        to: "games",
      },
      {
        title: "Contact us",
        icon: "mdi-account-box",
        to: "contact-us",
      },
    ],
    //For footer
    items: ["default", "absolute", "fixed"],
    padless: true,
    variant: "fixed",
  }),
  methods: {
    scroll(id) {
      if (this.$route.name != "home-page")
        router.push({ path: "/", replace: true });
      if (id == null) return;
      document.getElementById(id).scrollIntoView({
        behavior: "smooth",
      });
      this.drawer = false;
    },
  },
  computed: {
    logoWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 200;
        case "sm":
          return 200;
        case "md":
          return 250;
        case "lg":
          return 240;
        case "xl":
          return 250;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.v-app-bar {
    height: 64+16px !important;
    padding-top: 8px;
    filter: drop-shadow(0px 0px 64px rgba(0, 0, 0, 1));
    z-index: 1;
}
.v-footer {
    filter: drop-shadow(0px 0px 32px rgba(0, 0, 0, 1));
    z-index: 1;
}

html,
#app {
  background-color: #212121ea;
}
</style>
