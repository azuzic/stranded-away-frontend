<template>
  <v-container class="mt-16 mb-24 md:pl-24 md:pr-24">
    <h1 class="text-4xl mt-4">ADMIN PANEL</h1>
    <h2 class="mb-4">
      Welcome back, <b class="text-red-like-logo">{{ user.username }}</b>
    </h2>
    <v-card dark>
      <v-row justify="start">
        <v-col :cols="$vuetify.breakpoint.mobile ? 0 : 2">
          <v-navigation-drawer
            v-if="!$vuetify.breakpoint.mobile"
            v-model="drawer"
            :mini-variant.sync="mini"
            permanent
            expand-on-hover
          >
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
              <v-list-item
                v-for="item in panelItems"
                :key="item.title"
                link
                @click="setCurrentitem(item)"
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }} </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-col>
        <v-col
          align-self="center"
          v-if="currentPanelItem == 0"
          :cols="$vuetify.breakpoint.mobile && currentPanelItem == 1 ? 12 : 10"
        >
          <!--***CAROUSEL EDITOR***-->
          <v-container>
            <h1 class="text-2xl">Current Carousel Images</h1>
            <v-row align="center" justify="center">
              <v-col :cols="12" class="mt-4">
                <!--Upload new image dialog-->
                <v-dialog transition="dialog-top-transition" max-width="1200">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn class="mb-6" color="error" v-bind="attrs" v-on="on"
                      >Upload new image</v-btn
                    >
                  </template>
                  <template v-slot:default="dialog">
                    <v-card>
                      <v-toolbar color="error" dark
                        >Upload new image here</v-toolbar
                      >
                      <croppa
                        v-model="myCroppa"
                        :width="1200"
                        :height="600"
                        :disable-scroll-to-zoom="true"
                        :prevent-white-space="true"
                        :disable-drag-to-move="true"
                      ></croppa>
                      <v-card-actions class="justify-end">
                        <v-btn text @click="dialog.value = false">Close</v-btn>
                        <v-btn text @click="uploadNewCarouselImage"
                          >Upload</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
                <!--/Upload new image dialog-->
                <!--Draggable images-->
                <draggable
                  v-model="rows"
                  class="row no-wrap fill-height align-center sortable-list"
                >
                  <v-flex
                    v-for="row in rows"
                    :key="row.index"
                    class="sortable"
                    xs12
                    my-2
                  >
                    <draggable
                      :list="row.items"
                      :group="{ name: 'row' }"
                      class="row wrap justify-space-around"
                    >
                      <v-flex
                        v-for="item in row.items"
                        :key="item.title"
                        xs3
                        pa-2
                      >
                        <v-card link style="height: 200px" class="text-center">
                          <v-img
                            aspect-ratio="1"
                            :src="require('@/assets/game_images/' + item)"
                          >
                          </v-img>
                          {{ item }}
                        </v-card>
                      </v-flex>
                    </draggable>
                  </v-flex>
                </draggable>
                <!--/Draggable images-->
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <!--***/CAROUSEL EDITOR***-->

        <!--***TIMELINE EDITOR***-->
        <v-col>
          <v-container v-if="currentPanelItem == 1">
            <timeline :timelinePost="timelinePost"> </timeline>
          </v-container>
        </v-col>
        <!--All timeline posts-->
        <v-col align-self="center" v-if="currentPanelItem == 1">
          <v-card class="mx-auto" max-width="500">
            <v-list two-line>
              <v-list-item-group>
                <template v-for="(item, i) in reversedNews">
                  <!--Works, but ESLint gives false error-->
                  <v-list-item :key="item.title">
                    <template>
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.title"
                        ></v-list-item-title>

                        <v-list-item-subtitle
                          v-text="item.author"
                        ></v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-list-item-action-text
                          v-text="item.date"
                        ></v-list-item-action-text>
                        <v-btn text link @click="deleteTimelinePost(item._id)">
                          <v-icon color="grey lighten-1"> mdi-delete </v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </template>
                  </v-list-item>

                  <v-divider
                    v-if="i < reversedNews.length - 1"
                    :key="i"
                  ></v-divider>
                </template>
              </v-list-item-group>
            </v-list>
          </v-card> </v-col
        ><!--/All timeline posts-->
      </v-row>
    </v-card>
    <!--Timeline post preview-->
    <v-row align="center" justify="center" class="mb-6 mt-2">
      <v-col v-if="currentPanelItem == 1" align-self="center" cols="4">
        <h1 class="text-center text-3xl">PREVIEW</h1>
        <timelinePost
          :title="
            timelinePost.title != '' ? timelinePost.title : 'title goes here '
          "
          :text="
            timelinePost.text != '' ? timelinePost.text : 'Start writing...'
          "
          :icon="selectedIcon"
          :date="formattedDate"
        >
        </timelinePost>
      </v-col> </v-row
    ><!--/Timeline post preview-->
    <!--***/TIMELINE EDITOR***-->
  </v-container>
</template>
<script>
import "animate.css";
import store from "@/store";
import draggable from "vuedraggable";
import router from "@/router";
import { Auth, Admin } from "@/services";
import { required, max, min } from "vee-validate/dist/rules";
import rotatingLogo from "@/components/rotatingLogo.vue";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

import timeline from "@/components/admin/timeline.vue";
import timelinePost from "@/components/timelinePost.vue";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});
extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("min", {
  ...min,
  message: "{_field_} may not be less than {length} characters",
});

export default {
  name: "AdminPanel",
  components: {
    ValidationProvider,
    ValidationObserver,
    timelinePost,
    rotatingLogo,
    draggable,
    timeline,
  },
  data: () => ({
    drawer: true,
    store,

    panelItems: [
      { title: "Carousel", icon: "mdi-view-carousel" },
      { title: "Timeline", icon: "mdi-chart-gantt" },
      { title: "Games", icon: "mdi-controller" },
      { title: "Users", icon: "mdi-account-group-outline" },
    ],
    mini: true,
    currentPanelItem: 1,

    auth: Auth.state,
    user: {
      username: "",
      email: "",
      admin: true,
    },

    avatarImage: "",
    //mount loading
    avatarMounted: false,

    //Post [Carousel]
    //Vue draggable
    enabled: true,
    rows: [
      {
        index: 1,
        items: store.carouselPictures,
      },
    ],
    myCroppa: {},

    //Post |Timeline|
    timelinePost: {
      title: "",
      text: "",
      image: null,
      author: "",
      date: "",
    },
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    selectedIcon: "mdi-newspaper-variant",

    hideAuthorCheckbox: null,
    //All timeline posts
    news: Admin.data.getTimelinePosts,
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
    setCurrentitem(item) {
      this.currentPanelItem = this.panelItems.indexOf(item);
    },
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
    async deleteTimelinePost(post) {
      let response = await Admin.deleteTimelinePost(post);
      if (response.status == 200) {
        router.go();
      }
    },
    //Carousel image upload//
    uploadNewCarouselImage() {
      return true;
    },
  },
  asyncComputed: {
    async reversedNews() {
      let result = await this.news;
      return result.data.reverse();
    },
  },
  computed: {
    handleImages(files) {
      console.log(files);
    },
    formattedDate() {
      let day = this.date.slice(-2);
      let month = this.date.slice(5, 7);
      let year = this.date.slice(0, 4);
      let monthsNames = {
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        10: "October",
        11: "November",
        12: "December",
      };
      let formattedDate = day + " " + monthsNames[month] + ", " + year;
      return formattedDate;
    },
  },
};
</script>
<style></style>
