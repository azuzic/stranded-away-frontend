<template>
  <v-app>
    <!--Header-->
    <nav>
      <v-main>
        <v-app-bar color="grey darken-4" padless>
          <v-row justify="left" align="start">
            <v-col
              align-self="center"
              :cols="$vuetify.breakpoint.mobile ? '12' : '2'"
            >
              <img
                src="@/assets/macroquiet_logo.png"
                alt=""
                :width="logoWidth"
              />
            </v-col>
            <v-col
              v-show="!$vuetify.breakpoint.mobile"
              align-self="center"
              cols="10"
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
                <v-icon
                  color="red lighten-1
"
                  class="mr-1"
                  >{{ link.icon }}</v-icon
                >
                <strong>{{ link.title }}</strong>
              </v-btn>
            </v-col>
          </v-row>

          <!--Mobile navigation icon-->
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-app-bar-nav-icon
            color="white"
            v-show="$vuetify.breakpoint.mobile"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
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
        <router-view />
      </v-main>
    </nav>
    <!--Header-->
    <!--Footer-->
    <v-card height="400px">
      <v-footer v-bind="localAttrs" :padless="padless">
        <v-card flat tile width="100%" class="grey darken-4 text-center">
          <v-divider></v-divider>

          <v-card-text class="white--text">
            <strong>MacroQuiet Game development</strong>
            <p>Copyright © {{ new Date().getFullYear() }}</p>
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
          return 175;
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
    //For Footer
    localAttrs() {
      const attrs = {};

      if (this.variant === "default") {
        attrs.absolute = false;
        attrs.fixed = false;
      } else {
        attrs[this.variant] = true;
      }
      return attrs;
    },
  },
};
</script>
