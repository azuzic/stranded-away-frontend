<template>
  <v-container class="mt-16 md:pl-24 md:pr-24">
    <h1 class="text-4xl mt-4">ADMIN PANEL</h1>
    <h2 class="mb-4">
      Welcome back, <b class="text-red-like-logo">{{ user.username }}</b>
    </h2>
    <v-card dark>
      <v-row justify="start">
        <v-col :cols="$vuetify.breakpoint.mobile ? 0 : 2">
          <v-navigation-drawer
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
        <v-col align-self="center" :cols="$vuetify.breakpoint.mobile ? 12 : 5">
          <!--***CAROUSEL EDITOR***-->
          <v-container v-if="currentPanelItem == 0">
            <v-row>
              <v-col v-for="n in 9" :key="n" class="d-flex child-flex" cols="4">
                <v-img
                  :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                  :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
            </v-row>
          </v-container>
          <!--***/CAROUSEL EDITOR***-->
          <!--***TIMELINE EDITOR***-->
          <v-container v-if="currentPanelItem == 1">
            <!--<h2 class="text-3xl text-center">ADD NEW POST</h2>-->
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
                <form class="" @submit.prevent="addNewPost">
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
                        <v-row>
                          <!--Postpone post-->
                          <validation-provider
                            v-slot="{ errors }"
                            name="postponeCheckbox"
                          >
                            <v-checkbox
                              v-model="postponeCheckbox"
                              label="Postpone post"
                              :error-messages="errors"
                            ></v-checkbox>
                          </validation-provider>
                        </v-row>
                        <v-row>
                          <!--/Postpone post-->
                          <!--New postponed date-->
                          <validation-provider
                            v-if="postponeCheckbox"
                            v-slot="{ errors }"
                            name="select"
                            rules="required"
                          >
                            <v-date-picker
                              v-model="postponedDate"
                              :min="datePickerFormatter"
                              :max="'2022-08-31'"
                              :error-messages="errors"
                              color="error"
                            ></v-date-picker>
                          </validation-provider>
                          <!---/New postpones date-->
                        </v-row>
                        <v-row>
                          <!--Post and Reset buttons-->
                          <v-btn
                            color="success"
                            class="mt-2 mr-4"
                            @click="addNewPost"
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
          <!--***/TIMELINE EDITOR***-->
        </v-col>
        <v-col
          :cols="$vuetify.breakpoint.mobile ? 12 : 4"
          v-if="currentPanelItem == 1"
          align-self="center"
        >
          <timelinePost
            :title="
              timelinePost.title != '' ? timelinePost.title : 'title goes here '
            "
            :text="
              timelinePost.text != '' ? timelinePost.text : 'Start writing...'
            "
            :icon="selectedIcon"
            :date="currentDate"
          >
          </timelinePost>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import "animate.css";
import moment from "moment";
import { Auth, Admin } from "@/services";
import { required, max, min } from "vee-validate/dist/rules";
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
  },
  data: () => ({
    drawer: true,

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
      username: Auth.currentUser.username,
      email: Auth.currentUser.email,
      admin: true,
    },

    avatarImage: "",
    //mount loading
    avatarMounted: false,

    //Post |Timeline|
    step: 1,
    timelinePost: {
      title: "",
      text: "",
      image: null,
      author: Auth.currentUser.username,
      date: "",
    },
    postponedDate: "",
    postponeCheckbox: null,
    availableIcons: [
      { text: "General news", value: "mdi-newspaper-variant" },
      { text: "Youtube video", value: "mdi-youtube" },
      { text: "Game news", value: "mdi-controller" },
      { text: "New Achievement", value: "mdi-trophy" },
      { text: "Celebration", value: "mdi-party-popper" },
    ],
    selectedIcon: "mdi-newspaper-variant",
    submittingTimelinePost: false,
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
      }
    },
    async setUserAvatar() {
      if (this.user.username) {
        this.avatarImage = await Auth.getImage(this.user.profile.avatarImageID);
        this.avatarImage = this.avatarImage.data.img;
      }
    },
    postponedDateFormatter(unformattedDate) {
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
      console.log(formattedDate);
      return formattedDate;
    },
    async addNewPost() {
      const isValid = this.$refs.observer.validate();
      console.log(isValid);
      if (isValid) {
        this.submittingTimelinePost = true;
        console.log("Validated successfully!");
        console.log(this.postponedDate);
        if (this.postponeCheckbox) {
          this.timelinePost.date = this.postponedDateFormatter(
            this.postponedDate
          );
        } else this.timelinePost.date = this.currentDate;
        this.timelinePost.icon = this.selectedIcon;
        let postData = this.timelinePost;
        Admin.addNewTimelinePost(postData);
      }
    },
    reset() {
      Object.keys(this.timelinePost).forEach((key) => {
        if (key == "image") this.timelinePost[key] = null;
        else this.timelinePost[key] = "";
      });
      this.selectedIcon = "mdi-newspaper-variant";
      this.postponeCheckbox = null;
      this.postponedDate = "";
      this.$refs.observer.reset();
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
          return "Postpone post";
      }
    },
    currentDate() {
      let unformattedDate = moment().toDate();

      let month = moment().format("MMMM");
      let formattedDate = `${unformattedDate.getDate()} ${month}, ${unformattedDate.getFullYear()}`;

      return formattedDate;
    },
    datePickerFormatter() {
      let unformattedDate = moment().toDate();
      let formattedDate = `${unformattedDate.getFullYear()}-0${
        unformattedDate.getMonth() + 1
      }-${unformattedDate.getDate() + 1}`;

      return formattedDate;
    },
  },
};
</script>
<style></style>
