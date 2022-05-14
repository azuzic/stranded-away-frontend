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

            <v-btn class="mr-4 mt-4" width="100%" type="submit" dark>
              SIGN UP
            </v-btn>
          </form>
        </validation-observer>
        <h2 class="mt-4 text-center">
          Already have an account?
          <router-link to="/login"
            ><span class="text-red-like-logo">Sign in here</span></router-link
          >
        </h2>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { required, email, max, min, alpha_dash } from "vee-validate/dist/rules";
import "animate.css";
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
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
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
