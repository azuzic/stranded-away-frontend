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
            <v-card class="mx-auto" max-width="500">
              <v-card-title
                class="text-h6 font-weight-regular justify-space-between"
              >
                <span>{{ currentTitle }}</span>
                <v-avatar
                  color="error"
                  class="subheading white--text"
                  size="24"
                  v-text="step"
                ></v-avatar>
              </v-card-title>
              <validation-observer ref="observer" v-slot="{ invalid }">
                <form class="" @submit.prevent="addNewTimelinePost">
                  <v-window v-model="step">
                    <!--PAGE 1-->
                    <v-window-item :value="1">
                      <v-card-text>
                        <!--Title-->
                        <validation-provider
                          v-slot="{ errors }"
                          name="Title"
                          rules="required|max:50|min:3"
                        >
                          <v-text-field
                            v-model="timelinePost.title"
                            :counter="50"
                            label="Title"
                            :error-messages="errors"
                            required
                          ></v-text-field>
                        </validation-provider>
                        <!--/Title-->

                        <!--Text-->
                        <validation-provider
                          v-slot="{ errors }"
                          name="Text"
                          rules="required"
                        >
                          <v-textarea
                            class="mt-2 mb-2"
                            clearable
                            filled
                            :counter="2000"
                            auto-grow
                            label="Text"
                            v-model="timelinePost.text"
                            required
                            :error-messages="errors"
                          ></v-textarea>
                        </validation-provider>
                        <!--/Text-->
                      </v-card-text>
                    </v-window-item>
                    <!--/PAGE 1-->
                    <!--Icon-->
                    <v-window-item :value="2">
                      <v-card-text>
                        <validation-provider v-slot="{ errors }" name="Icon">
                          <v-select
                            v-model="selectedIcon"
                            :items="availableIcons"
                            label="Icon"
                            prepend-icon="mdi-robot"
                            :error-messages="errors"
                            data-vv-name="selectedIcon"
                          >
                          </v-select>
                        </validation-provider>

                        <div class="text-center">
                          <v-icon size="40"> {{ selectedIcon }} </v-icon>
                        </div>
                        <!--/Icon-->
                        <!--Image-->
                        <validation-provider v-slot="{ errors }" name="Image">
                          <v-file-input
                            v-model="timelinePost.image"
                            label="Image"
                            filled
                            prepend-icon="mdi-image"
                            :error-messages="errors"
                            class="mt-2"
                          ></v-file-input>
                        </validation-provider>
                        <!--/Image-->
                      </v-card-text>
                    </v-window-item>
                    <v-window-item :value="3">
                      <v-card-text>
                        <v-row align="center" justify="center">
                          <!--/Postpone post-->
                          <!--New postponed date-->
                          <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="date"
                                label="Post date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <validation-provider
                              v-slot="{ errors }"
                              name="select"
                              rules="required"
                            >
                              <v-date-picker
                                v-model="date"
                                :min="datePickerFormat"
                                :error-messages="errors"
                                color="error"
                                scrollable
                                no-title
                                dark
                              >
                                <v-spacer></v-spacer>
                                <v-btn text color="error" @click="menu = false">
                                  Cancel
                                </v-btn>
                                <v-btn
                                  text
                                  color="success"
                                  @click="$refs.menu.save(date)"
                                >
                                  OK
                                </v-btn>
                              </v-date-picker>
                            </validation-provider>
                          </v-menu>

                          <!---/New postpones date-->
                        </v-row>
                        <v-row align="center" justify="center">
                          <validation-provider
                            v-slot="{ errors }"
                            name="hideAuthorCheckbox"
                          >
                            <v-checkbox
                              v-model="hideAuthorCheckbox"
                              label="Hide author"
                              :error-messages="errors"
                            ></v-checkbox>
                          </validation-provider>
                        </v-row>
                        <v-row align="center" justify="center">
                          <!--Post and Reset buttons-->
                          <v-btn
                            color="success"
                            class="mt-2 mr-4"
                            type="submit"
                            :disabled="invalid"
                          >
                            post
                          </v-btn>
                          <v-btn color="error" class="mt-2 mr-4" @click="reset">
                            Reset Form
                          </v-btn>
                          <!--/Post and Reset buttons-->
                        </v-row>
                      </v-card-text>
                    </v-window-item>
                  </v-window>
                </form>
              </validation-observer>
              <v-card-actions>
                <v-btn :disabled="step === 1" text @click="step--">
                  Back
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="step === 3"
                  color="error"
                  depressed
                  @click="step++"
                >
                  Next
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-container>
        </v-col>
        <!--All timeline posts-->
        <v-col align-self="center">
          <v-card class="mx-auto" max-width="500">
            <v-list two-line>
              <v-list-item-group>
                <template v-for="(item, i) in reversedNews">
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

                  <v-divider v-if="i < items.length - 1" :key="i"></v-divider>
                </template>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
        <!--/All timeline posts-->
        <!--***/TIMELINE EDITOR***-->
      </v-row>
    </v-card>
    <!--Timeline post preview-->
    <v-row align="center" justify="center" class="mb-6 mt-4">
      <v-col v-if="currentPanelItem == 1" align-self="center" cols="4">
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
      </v-col>
    </v-row>
    <!--/Timeline post preview-->
  </v-container>
</template>
<script>
import "animate.css";
import store from "@/store";
import draggable from "vuedraggable";
import router from "@/router";
import moment from "moment";
import { Auth, Admin } from "@/services";
import { required, max, min } from "vee-validate/dist/rules";
import rotatingLogo from "@/components/rotatingLogo.vue";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

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
    step: 1,
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

    menu: false,
    hideAuthorCheckbox: null,
    //All timeline posts
    news: Admin.data.getTimelinePosts,
    items: [
      {
        action: "15 min",
        headline: "Brunch this weekend?",
        subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        title: "Ali Connors",
      },
      {
        action: "2 hr",
        headline: "Summer BBQ",
        subtitle: `Wish I could come, but I'm out of town this weekend.`,
        title: "me, Scrott, Jennifer",
      },
      {
        action: "6 hr",
        headline: "Oui oui",
        subtitle: "Do you have Paris recommendations? Have you ever been?",
        title: "Sandra Adams",
      },
      {
        action: "12 hr",
        headline: "Birthday gift",
        subtitle:
          "Have any ideas about what we should get Heidi for her birthday?",
        title: "Trevor Hansen",
      },
      {
        action: "18hr",
        headline: "Recipe to try",
        subtitle:
          "We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
        title: "Britta Holt",
      },
    ],

    availableIcons: [
      { text: "General news", value: "mdi-newspaper-variant" },
      { text: "Youtube video", value: "mdi-youtube" },
      { text: "Game news", value: "mdi-controller" },
      { text: "New Achievement", value: "mdi-trophy" },
      { text: "Celebration", value: "mdi-party-popper" },
    ],
    selectedIcon: "mdi-newspaper-variant",
    submitting: false,
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
    //Timeline post upload//
    formatDate(unformattedDate) {
      let day = unformattedDate.slice(-2);
      let month = unformattedDate.slice(5, 7);
      let year = unformattedDate.slice(0, 4);
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
    addNewTimelinePost() {
      const isValid = this.$refs.observer.validate();
      console.log(isValid);
      if (isValid) {
        this.submitting = true;
        console.log("Validated successfully!");
        this.timelinePost.date = this.formatDate(this.date);
        if (this.hideAuthorCheckbox) this.timelinePost.author = "MacroQuiet";

        this.timelinePost.icon = this.selectedIcon;

        let postData = this.timelinePost;

        Admin.addNewTimelinePost(postData);
        router.go();
      }
    },
    async deleteTimelinePost(post) {
      let response = await Admin.deleteTimelinePost(post);
      if (response.status == 200) {
        router.go();
      }
    },
    reset() {
      Object.keys(this.timelinePost).forEach((key) => {
        if (key == "image") this.timelinePost[key] = null;
        else this.timelinePost[key] = "";
      });
      this.selectedIcon = "mdi-newspaper-variant";
      this.hideAuthorCheckbox = null;
      this.postponedDate = this.formatDate(this.date);
      this.$refs.observer.reset();
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
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Add new post";
        case 2:
          return "Select icon and image";
        default:
          return "Pick post date";
      }
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
    datePickerFormat() {
      let unformattedDate = moment().toDate();
      let formattedDate = `${unformattedDate.getFullYear()}-0${
        unformattedDate.getMonth() + 1
      }-${unformattedDate.getDate()}`;

      return formattedDate;
    },
    handleImages(files) {
      console.log(files);
    },
  },
};
</script>
<style></style>
