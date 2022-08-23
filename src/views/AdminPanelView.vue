<template>
  <v-container class="mt-16 mb-64 md:pl-24 md:pr-24">
    <h1 class="text-4xl mt-4">ADMIN PANEL</h1>
    <h2 class="mb-4">
      Welcome back, <b class="text-red-like-logo">{{ user.username }}</b>
    </h2>
    <v-card dark>
      <!---------------------------------------------------------------------------------->
      <v-row justify="start">
        <!--NAVIGATION BAR VERTICAL-->
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
                  <v-icon
                    :color="
                      panelItems.indexOf(item) == currentPanelItem
                        ? 'error'
                        : 'white'
                    "
                    >{{ item.icon }}</v-icon
                  >
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }} </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-col>
        <!--/NAVIGATION BAR VERTICAL-->
        <!--***CAROUSEL EDITOR***-->
        <v-col
          align-self="center"
          v-if="currentPanelItem == 0"
          :cols="$vuetify.breakpoint.mobile && currentPanelItem == 1 ? 12 : 10"
        >
          <h1 class="text-3xl mt-2">Current Carousel Images</h1>
          <p>Drag images to change their order</p>
          <!--Upload new image dialog-->
          <v-dialog transition="dialog-top-transition" max-width="1200">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="mb-6" color="error" v-bind="attrs" v-on="on"
                >Upload new image</v-btn
              >
            </template>
            <template v-slot:default="imageUploadDialog">
              <v-card>
                <v-img 
                  class="flex justify-center items-center"
                  :src="
                    carouselImagePreview
                      ? carouselImagePreview
                      : require('@/assets/carouselPlaceholder.png')
                  "
                >
                  <v-file-input
                    type="file"
                    ref="file"
                    class="justify-center"
                    hide-input
                    @change="previewCarouselImage()"
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Pick an avatar"
                    prepend-icon="mdi-image-plus"
                    label="CoverImage"
                    v-model="carouselImageUpload"
                    dark
                  >
                  </v-file-input>
                </v-img>
                <v-card-actions class="justify-end">
                  <v-btn text @click="imageUploadDialog.value = false"
                    >Close</v-btn
                  >
                  <v-btn text @click="uploadNewCarouselImage()">Upload</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
          <!--/Upload new image dialog-->
          <v-container>
            <v-row align="center" justify="center">
              <v-col :cols="12">
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
                        v-for="item in allCarouselPictures"
                        :key="item._id"
                        xs3
                        pa-2
                      >
                        <v-card
                          link
                          style="height: 200px"
                          class="text-center mb-12"
                        >
                          <v-img aspect-ratio="2" :src="item.url"> </v-img>
                          {{ item.url }}
                        </v-card>
                      </v-flex>
                    </draggable>
                  </v-flex>
                </draggable>
                <!--/Draggable images-->
              </v-col>
            </v-row>
          </v-container> </v-col
        ><!--***/CAROUSEL EDITOR***-->

        <!--***TIMELINE EDITOR***-->
        <v-col
          v-if="currentPanelItem == 1"
          :cols="$vuetify.breakpoint.mobile ? 12 : 4"
        >
          <v-container>
            <timelinePostForm :timelinePost="timelinePost"> </timelinePostForm>
          </v-container> </v-col
        ><!--***/TIMELINE EDITOR***-->

        <!--All timeline posts-->
        <v-col align-self="center" v-if="currentPanelItem == 1">
          <v-card class="mx-auto" max-width="500">
            <v-toolbar color="error" dark>
              <v-toolbar-title>All Timeline Posts</v-toolbar-title>
            </v-toolbar>
            <v-list two-line>
              <v-list-item-group>
                <template v-for="(item, i) in reversedNews">
                  <!--Works, but ESLint gives false error-->
                  <v-list-item :key="item.title">
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
                      <v-dialog
                        v-model="deleteConfirm"
                        persistent
                        max-width="290"
                        :retain-focus="false"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn v-bind="attrs" v-on="on" text link>
                            <v-icon
                              @click="deleteSelection = item"
                              color="grey lighten-1"
                            >
                              mdi-delete
                            </v-icon>
                          </v-btn>
                        </template>
                        <v-card dark>
                          <v-card-title class="text-h5">
                            Remove post?
                          </v-card-title>
                          <v-card-text
                            >Are you sure you want to remove this
                            post?</v-card-text
                          >
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="error darken-1"
                              text
                              @click="deleteConfirm = false"
                            >
                              No
                            </v-btn>
                            <v-btn
                              color="green darken-1"
                              text
                              @click="deleteTimelinePost(deleteSelection._id)"
                            >
                              Yes
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-list-item-action>
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

        <!--***GAMES EDITOR***-->
        <v-col
          v-if="currentPanelItem == 2"
          :cols="$vuetify.breakpoint.mobile ? 12 : 4"
        >
          <v-container>
            <gamesPostForm :gamePost="gamePost"> </gamesPostForm>
          </v-container> </v-col
        ><!--***/GAMES EDITOR***-->

        <!--Game card post preview-->
        <v-col v-if="currentPanelItem == 2" align-self="center" class="my-4">
          <gameCard
            :availability="
              gamePost.availability != ''
                ? gamePost.availability
                : 'availability'
            "
            :title="
              gamePost.title != '' ? gamePost.title : 'game title goes here '
            "
            :text="gamePost.text != '' ? gamePost.text : 'Start writing...'"
            :imageSrc="gamePost.image"
            :gName="gamePost.gameName"
          >
          </gameCard>
        </v-col>
        <!--/Game card post preview-->

        <!--***ALL USERS***-->
        <v-col align-self="start" v-if="currentPanelItem == 3" :cols="8">
          <v-card class="mx-auto mt-6" max-width="600">
            <v-toolbar color="error" dark>
              <v-toolbar-title>List of All Registered Users</v-toolbar-title>
            </v-toolbar>
            <v-list two-line>
              <v-list-item-group>
                <template v-for="(user, i) in allUsersList">
                  <!--Works, but ESLint gives false error-->
                  <v-list-item :key="user.username">
                    <template>
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="user.username"
                        ></v-list-item-title>

                        <v-list-item-subtitle
                          v-text="user.email"
                        ></v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-list-item-action-text
                          v-text="user.admin ? 'ADMIN' : 'PLAYER'"
                        ></v-list-item-action-text>
                        <router-link
                          :to="{
                            name: 'User',
                            params: { userName: user.username },
                          }"
                        >
                          <v-icon hover text link color="grey lighten-1">
                            mdi-account
                          </v-icon>
                        </router-link>
                      </v-list-item-action>
                    </template>
                  </v-list-item>

                  <v-divider
                    v-if="i < allUsers.length - 1"
                    :key="i"
                  ></v-divider>
                </template>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
        <!--***/ALL USERS***-->
      </v-row>
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
        <timelineCard
          :title="
            timelinePost.title != '' ? timelinePost.title : 'title goes here '
          "
          :text="
            timelinePost.text != '' ? timelinePost.text : 'Start writing...'
          "
          :icon="timelinePost.icon"
          :date="formattedDate"
          :author="timelinePost.author"
        >
        </timelineCard>
      </v-col> </v-row
    ><!--/Timeline post preview-->

    <!--***/TIMELINE EDITOR***-->
  </v-container>
</template>
<script>
import store from "@/store";
import router from "@/router";
import draggable from "vuedraggable";

import "animate.css";
import rotatingLogo from "@/components/rotatingLogo.vue";

import { required, max, min } from "vee-validate/dist/rules";

import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

import { Auth, Admin } from "@/services";
//Components
import timelinePostForm from "@/components/admin/timelinePostForm.vue";
import gamesPostForm from "@/components/admin/gamesPostForm.vue";

import timelineCard from "@/components/Home/timelineCard.vue";
import gameCard from "@/components/Home/gameCard.vue";

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

    rotatingLogo,
    draggable,

    timelinePostForm,
    gamesPostForm,
    timelineCard,
    gameCard,
  },
  data: () => ({
    store,

    //////////////Navigation drawer///////////
    drawer: true,
    mini: true,
    panelItems: [
      { title: "Carousel", icon: "mdi-view-carousel" },
      { title: "Timeline", icon: "mdi-chart-gantt" },
      { title: "Games", icon: "mdi-controller" },
      { title: "Users", icon: "mdi-account-group-outline" },
    ],
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

    ////////////////Fetch timeline posts//////
    news: Admin.data.getTimelinePosts,
    //All users
    allUsers: Admin.data.getAllUsers,
    allGames: Admin.data.getAllGames,
    //////////////////////////////////////////

    ////////////////EDITORS///////////////////
    ////////////0. Post Carousel////////////
    //Vue draggable
    imageUploadDialog: false,
    carouselPictures: Admin.data.getCarouselPictures,
    enabled: true,
    rows: [
      {
        index: 1,
        items: store.carouselPictures,
      },
    ],
    //New image upload
    carouselImageUpload: [],
    carouselImagePreview: "",
    //////////////////////////////////////////

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
    hideAuthorCheckbox: null,
    deleteSelection: {},
    deleteConfirm: false,
    //////////////////////////////////////////

    ////////////2. Post Games///////////////
    gamePost: {
      title: "",
      text: "",
      availability: "",
      image: "cards/placeholder.png",
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
    this.$root.$on("setUserAvatar", () => {
      this.getUserDetails();
    });
  },

  methods: {
    //Changes navigation panel
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
    async deleteTimelinePost(postID) {
      let response = await Admin.deleteDocument(postID, "timelinePosts");
      if (response.status == 202) {
        router.go();
      }
    },
    async encodeImageFileAsURL(file) {
      let reader = new FileReader();
      return await new Promise((resolve, reject) => {
        reader.onloadend = async () => {
          try {
            let response = reader.result;
            resolve(response);
          } catch (err) {
            reject(err);
          }
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    },
    //Carousel image upload//
    previewCarouselImage() {
      this.carouselImagePreview = URL.createObjectURL(this.carouselImageUpload);
    },
    async uploadNewCarouselImage() {
      let base64_string = await this.encodeImageFileAsURL(
        this.carouselImageUpload
      );

      let result = await Admin.uploadImage(base64_string, "carouselPictures");
      if (result.status == 201) router.go();
    },
  },
  asyncComputed: {
    async reversedNews() {
      let result = await this.news;
      return result.data.reverse();
    },
    async allUsersList() {
      let result = await this.allUsers;
      return result.data;
    },
    async allCarouselPictures() {
      let result = await this.carouselPictures;
      return result.data;
    },
  },
  computed: {
    handleImages(files) {
      console.log(files);
    },
    formattedDate() {
      let day = this.timelinePost.date.slice(-2);
      let month = this.timelinePost.date.slice(5, 7);
      let year = this.timelinePost.date.slice(0, 4);
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
