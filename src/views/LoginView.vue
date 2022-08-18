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
          Log in to your MacroQuiet Account
        </h1>
        <validation-observer ref="observer" v-slot="{}">
          <form @submit.prevent="submit">
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
            <validation-provider
              v-slot="{ errors }"
              name="Password"
              rules="required"
            >
              <v-text-field
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                :error-messages="errors"
                dark
                label="Password"
                required
              ></v-text-field>
            </validation-provider>
            <validation-provider v-slot="{ errors }" name="checkboxRememberMe">
              <v-checkbox
                v-model="checkboxRememberMe"
                :error-messages="errors"
                value="1"
                label="Remember me"
                dark
                type="checkbox"
              ></v-checkbox>
            </validation-provider>

            <v-btn
              class="mr-4"
              width="100%"
              type="submit"
              dark
              v-show="!submitting"
            >
              <span>LOG IN</span>
            </v-btn>
            <rotatingLogo v-show="submitting" :height="80"></rotatingLogo>
          </form>
        </validation-observer>
        <h2 class="mt-4 text-center" v-show="!submitting">
          New to MacroQuiet?
          <router-link to="/register"
            ><span class="text-red-like-logo"
              >Create an account here</span
            ></router-link
          >
        </h2>
        <alert
          :activator="authResolver.loginRequest"
          :text="
            authResolver.promptType
              ? 'Logging in...'
              : 'Login unsuccessful! Wrong email or password.'
          "
          :type="authResolver.promptType ? 'success' : 'error'"
        ></alert>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { required, email } from "vee-validate/dist/rules";
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

export default {
  name: "Login",
  components: {
    ValidationProvider,
    ValidationObserver,
    alert,
    rotatingLogo,
  },
  data: () => ({
    email: "",
    password: "",
    checkboxRememberMe: null,
    authResolver,
    submitting: false,
    showPassword: false,
  }),

  methods: {
    async submit() {
      this.$refs.observer.validate();
      this.submitting = true;
      console.log("Validated successfully!");

      let userData = {
        email: this.email,
        password: this.password,
        rememberMe: this.checkboxRememberMe,
      };
      let response = {};
      try {
        response = await Auth.authenticateUser(userData);
        console.log("Request sent successfully!");

        this.authResolver.loginHandler("success", response);
      } catch (e) {
        this.submitting = false;
        if (e.response.data.error == "Cannot authenticate")
          this.authResolver.loginHandler("failed", response);

        console.error(e);
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
