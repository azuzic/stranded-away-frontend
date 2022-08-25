<template>
  <v-card class="mx-auto" max-width="500">
    <v-card-title class="text-h6 font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
      <v-avatar
        color="error"
        class="subheading white--text"
        size="24"
        v-text="step"
      ></v-avatar>
    </v-card-title>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="addNewTimelinePost">
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
              <!--Icon select-->
              <validation-provider v-slot="{ errors }" name="Icon">
                <v-select
                  v-model="timelinePost.icon"
                  :items="availableIcons"
                  label="Icon"
                  prepend-icon="mdi-robot"
                  :error-messages="errors"
                  data-vv-name="icon"
                >
                </v-select>
              </validation-provider>
              <!--/Icon select-->
              <div class="text-center">
                <v-icon size="40"> {{ timelinePost.icon }} </v-icon>
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
                  :return-value.sync="timelinePost.date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="timelinePost.date"
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
                      v-model="timelinePost.date"
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
                        @click="$refs.menu.save(timelinePost.date)"
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
      <v-btn :disabled="step === 1" text @click="step--"> Back </v-btn>
      <v-spacer></v-spacer>
      <v-btn :disabled="step === 3" color="error" depressed @click="step++">
        Next
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import "animate.css";

import router from "@/router";
import moment from "moment";
import { Admin } from "@/services";
import { required, max, min } from "vee-validate/dist/rules";
import rotatingLogo from "@/components/rotatingLogo.vue";

import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

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
  name: "timelinePost",
  props: ["timelinePost"],
  components: {
    ValidationProvider,
    ValidationObserver,
    rotatingLogo,
  },
  data: () => ({
    step: 1,
    menu: false,
    availableIcons: [
      { text: "General news", value: "mdi-newspaper-variant" },
      { text: "Youtube video", value: "mdi-youtube" },
      { text: "Game news", value: "mdi-controller" },
      { text: "New Achievement", value: "mdi-trophy" },
      { text: "Celebration", value: "mdi-party-popper" },
    ],
    hideAuthorCheckbox: null,
  }),
  methods: {
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
    async addNewTimelinePost() {
      const isValid = this.$refs.observer.validate();
      console.log(isValid);
      if (isValid) {
        try {
          console.log("Validated successfully!");
          this.timelinePost.date = this.formatDate(this.timelinePost.date);
          if (this.hideAuthorCheckbox) this.timelinePost.author = "MacroQuiet";
          let postData = this.timelinePost;

          let result = await Admin.insertDocument(postData, "timelinePosts");
          if (result.status == 201) {
            router.go();
          }
        } catch (e) {
          console.log(`Error inserting data: ${e}`);
        }
      }
    },

    reset() {
      Object.keys(this.timelinePost).forEach((key) => {
        if (key == "image") this.timelinePost[key] = null;
        else this.timelinePost[key] = "";
      });
      if (key == "icon") this.timelinePost[key] = "mdi-newspaper-variant";
      this.hideAuthorCheckbox = null;
      this.postponedDate = this.formatDate(this.timelinePost.date);
      this.$refs.observer.reset();
    },
  },
  computed: {
    timelinePostData: {},
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
    datePickerFormat() {
      let unformattedDate = moment().toDate();
      let formattedDate = `${unformattedDate.getFullYear()}-0${
        unformattedDate.getMonth() + 1
      }-${unformattedDate.getDate()}`;

      return formattedDate;
    },
  },
};
</script>

<style></style>
