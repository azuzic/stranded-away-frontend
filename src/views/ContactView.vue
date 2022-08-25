<template>
  <v-container class="mt-12 min-h-full">
    <v-row justify="center" align="center">
      <v-col :cols="width" align-self="center" class="mt-24">
        <v-img
          class="float-right"
          max-height="175"
          contain
          src="@/assets/trader_robot_idle.gif"
        >
        </v-img>
        <h1 class="text-left font-bold text-4xl">Contact us!</h1>
        <validation-observer ref="observer" v-slot="{}">
          <form @submit.prevent="submit">
            <validation-provider
              v-slot="{ errors }"
              name="Name"
              rules="required"
            >
              <v-text-field
                v-model="contactQuery.name"
                :error-messages="errors"
                dark
                label="Name"
                required
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Email"
              rules="required|email"
            >
              <v-text-field
                v-model="contactQuery.email"
                :error-messages="errors"
                dark
                label="E-mail"
                required
              ></v-text-field>
            </validation-provider>

            <!--Subject select-->
            <validation-provider v-slot="{ errors }" name="Subject">
              <v-select
                dark
                v-model="contactQuery.subject"
                :items="availableSubjects"
                label="Subject"
                prepend-icon="mdi-subtitles"
                :error-messages="errors"
                data-vv-name="Subject"
              >
              </v-select>
            </validation-provider>
            <!--/Subject select-->

            <!--Message-->
            <validation-provider
              v-slot="{ errors }"
              name="Your message"
              rules="required"
            >
              <v-textarea
                class="mt-2 mb-2"
                clearable
                dark
                filled
                :counter="2000"
                auto-grow
                label="Message"
                v-model="contactQuery.message"
                required
                :error-messages="errors"
              ></v-textarea>
            </validation-provider>
            <!--/Message-->

            <v-btn
              class="mr-4"
              width="100%"
              type="submit"
              dark
              v-show="!submitting"
            >
              <span class="text-red-like-logo mb-6">SEND</span>
            </v-btn>
            <rotatingLogo v-show="submitting" :height="80"></rotatingLogo>
          </form>
        </validation-observer>

        <alert
          :activator="alert.activator"
          :text="alert.text"
          :type="alert.type"
        ></alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, email } from "vee-validate/dist/rules";
import "animate.css";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

import rotatingLogo from "@/components/rotatingLogo.vue";
import alert from "@/components/alert.vue";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});
let wait = function (seconds) {
  return new Promise((resolveFn) => {
    setTimeout(resolveFn, seconds * 1000);
  });
};
import emailjs from "@emailjs/browser";
import router from "@/router";

export default {
  name: "Contact",
  components: {
    ValidationProvider,
    ValidationObserver,
    alert,
    rotatingLogo,
  },
  data: () => ({
    contactQuery: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    availableSubjects: [
      "Registration problem",
      "Achievements problem",
      "Bug report",
      "Suggestion",
      "Cooperation",
      "Other",
    ],
    alert: {
      activator: false,
      text: "",
      type: "success",
      activate: async function (status) {
        this.activator = true;
        if (status == 200) {
          this.text =
            "Your message has been successfully sent. We will contact you very soon!";
          this.type = "success";
        } else {
          this.text =
            "Error sending message! This is not your fault, we are probably working on it!";
          this.type = "error";
        }
        await wait(3);
        this.activator = false;
        router.replace({ name: "Home" });
      },
    },
    submitting: false,
  }),

  methods: {
    async submit() {
      this.$refs.observer.validate();
      console.log("Validated successfully!");
      this.submitting = true;
      let queryData = {
        from_name: this.contactQuery.name,
        from_email: this.contactQuery.email,
        message: this.contactQuery.message,
        subject: this.contactQuery.subject,
      };
      try {
        let result = await emailjs.send(
          "service_iionnfg",
          "template_1z8rw3r",
          queryData
        );
        this.submitting = false;
        this.alert.activate(result.status);
      } catch (e) {
        console.error("Error sending message!");
        this.alert.activate(result.status);
        this.submitting = false;
      }
    },
  },
  computed: {
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 11;
        case "sm":
          return 8;
        case "md":
          return 6;
        case "lg":
          return 4;
        case "xl":
          return 3;
      }
    },
  },
};
</script>
<style></style>
