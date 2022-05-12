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
          class="mx-auto"
        ></v-img>
        <h1 class="text-center font-bold text-4xl">
          Sign in to your MacroQuiet Account
        </h1>
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form @submit.prevent="submit">
            <validation-provider
              v-slot="{ errors }"
              name="Email"
              rules="required|Email"
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
              rules="required|Password"
            >
              <v-text-field
                v-model="password"
                :error-messages="errors"
                dark
                label="required|Password"
                required
                type="password"
              ></v-text-field>
            </validation-provider>
            <validation-provider v-slot="{ errors }" name="checkboxRememberMe">
              <v-checkbox
                v-model="checkbox"
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
          <router-link to="/"
            ><span class="text-red-like-logo"
              >Create an account here</span
            ></router-link
          >
        </h2>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { required, email } from "vee-validate/dist/rules";
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

extend("Email", {
  ...email,
  message: "Email must be valid",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    email: "",
    password: "",
    checkboxRememberMe: null,
  }),

  methods: {
    submit() {
      this.$refs.observer.validate();
    },
  },
};
</script>
<style></style>
