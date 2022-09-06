<template>
<v-col :cols="$vuetify.breakpoint.mobile ? 12 : 4">
  <div class="rounded-md overflow-hidden drop-shadow">
    <v-card-title class="justify-space-between bg-footer-header text-slate-200">
      <span>{{ currentTitle }}</span>
      <v-avatar
        class="subheading text-slate-100"
        size="32"
        v-text="step + '.'"
      ></v-avatar>
    </v-card-title>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="addNewGamePost">
        <v-window v-model="step" class="h-64 bg-background-color">
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
                  v-model="gamePost.title"
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
                  v-model="gamePost.text"
                  required
                  :error-messages="errors"
                ></v-textarea>
              </validation-provider>
              <!--/Text-->
            </v-card-text>
          </v-window-item>
          <!--/PAGE 1-->

          <v-window-item :value="2">
            <v-card-text>
              <!--Availability-->
              <validation-provider
                v-slot="{ errors }"
                name="Availability"
                rules="required"
              >
                <v-text-field
                  v-model="gamePost.availability"
                  label="Availability"
                  :error-messages="errors"
                  required
                ></v-text-field>
              </validation-provider>
              <!--/Availability-->

              <!--Image
              <validation-provider v-slot="{ errors }" name="Image">
                <v-file-input
                  v-model="gamePost.image"
                  label="Image"
                  filled
                  prepend-icon="mdi-image"
                  :error-messages="errors"
                  class="mt-2"
                ></v-file-input>
              </validation-provider>
              /Image-->
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
    <v-card-actions  class="bg-background-color">
      <v-btn :disabled="step === 1" text @click="step--"> Back </v-btn>
      <v-spacer></v-spacer>
      <v-btn :disabled="step === 3" color="error" depressed @click="step++">
        Next
      </v-btn>
    </v-card-actions>
  </div>
</v-col>
</template>

<script>
import moment from "moment";
import "animate.css";
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
  name: "gamePost",
  props: ["gamePost"],
  components: {
    ValidationProvider,
    ValidationObserver,
    rotatingLogo,
  },
  data: () => ({
    step: 1,
    menu: false,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
  }),
  mounted() {},
  methods: {
    async addNewGamePost() {
      const isValid = this.$refs.observer.validate();
      console.log(isValid);
      if (isValid) {
        try {
          console.log("Validated successfully!");
          let postData = this.gamePost;
          console.log(postData);
          let result = await Admin.insertDocument(postData, "gameCards");
          if (result.status == 201) {
            router.go();
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
    reset() {
      Object.keys(this.gamePost).forEach((key) => {
        this.gamePost[key] = "";
      });
      this.gamePost[image] = "cards/placeholder.png";
      this.gamePost[gameName] = "default";
      this.$refs.observer.reset();
    },
  },
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Add new game";
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
  },
};
</script>