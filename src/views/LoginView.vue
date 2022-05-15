<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col
        :cols="$vuetify.breakpoint.mobile ? '10' : '3'"
        align-self="center"
      >
        <v-img
          src="@/assets/macroquiet_logo_notext.png"
          width="25%"
          class="mx-auto animate__animated animate__fadeInDown"
        ></v-img>
        <h1 class="text-center font-bold text-4xl">
          Sign in to your MacroQuiet Account
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
                v-model="password"
                :error-messages="errors"
                dark
                label="Password"
                required
                type="password"
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

            <v-btn class="mr-4" width="100%" type="submit" dark>
              SIGN IN
            </v-btn>
          </form>
        </validation-observer>
        <h2 class="mt-4 text-center">
          New to MacroQuiet?
          <router-link to="/register"
            ><span class="text-red-like-logo"
              >Create an account here</span
            ></router-link
          >
        </h2>
        <alert-success
          :activator="loginSuccess"
          :text="'You have logged in successfully!'"
        ></alert-success>
        <alert-failed
          :activator="loginFailed"
          :text="'Login unsuccessful! Wrong email or password.'"
        ></alert-failed>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
let wait = function (seconds) {
  return new Promise((resolveFn) => {
    setTimeout(resolveFn, seconds * 1000);
  });
};

import { required, email } from "vee-validate/dist/rules";
import "animate.css";
import { Auth } from "@/services";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

import alertSuccess from "@/components/alertSuccess.vue";
import alertFailed from "@/components/alertFailed.vue";

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
  components: {
    ValidationProvider,
    ValidationObserver,
    alertSuccess,
    alertFailed,
  },
  data: () => ({
    email: "",
    password: "",
    checkboxRememberMe: null,
    loginSuccess: false,
    loginFailed: false,
  }),

  methods: {
    async submit() {
      this.$refs.observer.validate();
      console.log("Validated successfully!");
      let userData = {
        email: this.email,
        password: this.password,
      };
      try {
        await Auth.authenticateUser(userData);
        console.log("Request sent successfully!");
        this.authResolver("success");
      } catch (e) {
        if (e.response.data.error == "Cannot authenticate")
          this.authResolver("failed");
        console.error(e);
      }
    },
    async authResolver(alert) {
      if (alert == "success") {
        this.loginSuccess = true;
        await wait(3);
        this.loginSuccess = false;
        this.$router.replace({ name: "home" });
      } else {
        this.loginFailed = true;
        await wait(3);
        this.loginFailed = false;
      }
    },
  },
};
</script>
<style></style>
