<template>
  <v-container class="mt-12">
    <v-row justify="center" align="center">
      <v-col :cols="width" align-self="center">
        <v-img
          src="@/assets/macroquiet_logo_notext.png"
          width="25%"
          class="mx-auto animate__animated animate__fadeInDown"
        ></v-img>
        <h1 class="text-center font-bold text-4xl">
          Create your MacroQuiet Account
        </h1>
        <validation-observer ref="observer" v-slot="{}">
          <form @submit.prevent="submit">
            <!--USERNAME-->
            <validation-provider
              v-slot="{ errors }"
              name="Username"
              rules="required|max:16|min:3|alpha_dash"
            >
              <v-text-field
                v-model="username"
                :counter="16"
                :error-messages="errors"
                dark
                label="Username"
                required
              ></v-text-field>
            </validation-provider>
            <!--EMAIL-->
            <validation-provider
              v-slot="{ errors }"
              name="Email"
              rules="required|email"
            >
              <v-text-field
                v-model="email"
                :error-messages="errors"
                dark
                label="E-mail"
                required
              ></v-text-field>
            </validation-provider>
            <!--PASSWORD-->
            <validation-provider
              v-slot="{ errors }"
              name="Password"
              rules="required|password:@PasswordConfirm"
            >
              <v-text-field
                v-model="password"
                :error-messages="errors"
                dark
                label="Password"
                required
                type="password"
              ></v-text-field>
            </validation-provider>
            <!--PASSWORD CONFIRMATION-->
            <validation-provider
              v-slot="{ errors }"
              name="PasswordConfirm"
              rules="required"
            >
              <v-text-field
                v-model="passwordConfirm"
                :error-messages="errors"
                dark
                label="Password confirm"
                required
                type="password"
              ></v-text-field>
            </validation-provider>

            <v-btn
              v-show="!submitting"
              class="mr-4 mt-4"
              width="100%"
              type="submit"
              dark
            >
              <span>SIGN UP</span>
            </v-btn>
            <rotatingLogo v-show="submitting" :height="80"></rotatingLogo>
          </form>
        </validation-observer>

        <h2 class="mt-4 text-center" v-show="!submitting">
          Already have an account?
          <router-link to="/login"
            ><span class="text-red-like-logo">Sign in here</span></router-link
          >
        </h2>

        <alert
          :activator="authResolver.registerRequest"
          :text="
            authResolver.promptType
              ? 'Your account has been successfully created. Please confirm your email address to login.'
              : 'Error signing up. Please check your input for errors or contact support.'
          "
          :type="authResolver.promptType ? 'success' : 'error'"
        ></alert>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { required, email, max, min, alpha_dash } from "vee-validate/dist/rules";
import "animate.css";
import { Auth } from "@/services";

import authResolver from "@/services/authResolver";

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

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("min", {
  ...min,
  message: "{_field_} may not be less than {length} characters",
});

extend("alpha_dash", {
  ...alpha_dash,
  message:
    "Your username may only contain alphabetic characters, numbers, dashes or underscores. ",
});

extend("password", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Password confirmation does not match",
});

export default {
  name: "Register",
  components: {
    ValidationProvider,
    ValidationObserver,
    alert,
    rotatingLogo,
  },
  data: () => ({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    submitting: false, //For loading animation
    authResolver,
  }),

  methods: {
    async submit() {
      const isValid = this.$refs.observer.validate();
      console.log(isValid);
      if (isValid) {
        this.submitting = true;
        console.log("Validated successfully!");

        let userData = {
          username: this.username,
          email: this.email,
          password: this.password,
        };

        try {
          let response = await Auth.registerUser(userData);
          console.log("Request sent successfully!");

          this.authResolver.registerHandler("success", response);
        } catch (e) {
          this.submitting = false;
          console.log(e);
          this.authResolver.registerHandler("failed", response);
        }
      } else return;
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
