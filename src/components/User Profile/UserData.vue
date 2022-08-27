<template>
<div
    class="grow flex align-center"
    :class="$vuetify.breakpoint.mobile ? 'text-center mb-4' : ''"
>
    <div
    class="name-email"
    :class="$vuetify.breakpoint.mobile ? 'grow' : ''"
    >
    <!--USERNAME-->
    <div class="text-4xl text-red-like-logo">
        {{ user.username }}
        <v-chip v-if="user.admin" color="red" text-color="white">
        ADMIN</v-chip
        >
    </div>

    <!--USERNAME END-->
    <!--EMAIL-->
    <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
        <div v-if="canEdit">
            <div
            @click="emailChange = !emailChange"
            v-show="!emailChange"
            v-bind="attrs"
            v-on="on"
            class="text email text-slate-300"
            >
            {{ user.email }}
            </div>
        </div>
        <div v-else>
            {{ user.email }}
        </div>
        <validation-observer ref="observerEmail" v-slot="{}">
            <form
            v-show="emailChange"
            class="text-red-like-logo"
            @submit.prevent="changeUserEmail"
            >
            <validation-provider
                v-slot="{ errors }"
                name="Email"
                rules="required|email"
            >
                <v-text-field
                v-show="!authResolver.emailChangeRequest"
                x-small
                v-model="new_email"
                :error-messages="errors"
                dark
                label="Email"
                required
                >
                <v-btn
                    v-show="!submitting"
                    @click="emailChange = !emailChange"
                    class="exit"
                    icon
                    small
                    slot="prepend"
                >
                    <v-icon> mdi-close-circle </v-icon>
                </v-btn>
                <v-btn
                    v-show="!submitting"
                    class="send"
                    icon
                    small
                    slot="append"
                    type="submit"
                >
                    <v-icon> mdi-send </v-icon>
                </v-btn>
                </v-text-field>
                <!--ALERT-->
                <div
                v-show="authResolver.emailChangeRequest"
                class="bg-footer-header rounded mt-2 animate__animated animate__fadeInUp"
                >
                <alert
                    :activator="authResolver.emailChangeRequest"
                    :text="
                    authResolver.promptType
                        ? 'Email successfully changed!'
                        : 'Error changing email. Please check your input for errors or contact support.'
                    "
                    :type="
                    authResolver.promptType ? 'success' : 'error'
                    "
                >
                </alert>
                </div>
                <!--ALERT END-->
            </validation-provider>
            </form>
        </validation-observer>
        </template>
        <span>Change email!</span>
    </v-tooltip>
    <!--EMAIL END-->
    <div
        v-if="canEdit"
        @click="passwordChange = !passwordChange"
        class="password text-xs text-slate-500"
    >
        Change Password
    </div>
    </div>
    <!--PASSWORD CHANGE-->
    <v-overlay class="z-1000" :value="passwordChange">
    <validation-observer ref="observerPassword" v-slot="{}">
        <form
        class="bg-footer-header rounded-2xl"
        :class="
            $vuetify.breakpoint.mobile ? 'p-6 w-80' : 'p-8 w-96'
        "
        @submit.prevent="changeUserPassword"
        >
        <h1 class="text-center font-bold text-3xl mb-4">
            Change password
        </h1>
        <!--OLD PASSWORD-->
        <validation-provider
            v-slot="{ errors }"
            name="Old password"
            rules="required|diffPassword:@New password"
        >
            <v-text-field
            :append-icon="
                showOldPassword ? 'mdi-eye' : 'mdi-eye-off'
            "
            @click:append="showOldPassword = !showOldPassword"
            :type="showOldPassword ? 'text' : 'password'"
            v-model="oldPassword"
            :error-messages="errors"
            dark
            label="Old password"
            required
            >
            </v-text-field>
        </validation-provider>
        <!--OLD PASSWORD END-->
        <!--NEW PASSWORD-->
        <validation-provider
            v-slot="{ errors }"
            name="New password"
            rules="required"
        >
            <v-text-field
            :append-icon="
                showNewPassword ? 'mdi-eye' : 'mdi-eye-off'
            "
            @click:append="showNewPassword = !showNewPassword"
            :type="showNewPassword ? 'text' : 'password'"
            v-model="newPassword"
            :error-messages="errors"
            dark
            label="New password"
            required
            >
            </v-text-field>
        </validation-provider>
        <!--NEW PASSWORD END-->
        <v-btn
            v-show="!submitting"
            class="mr-4 mt-4"
            width="100%"
            type="submit"
            dark
        >
            <span>CHANGE PASSWORD</span>
        </v-btn>
        <rotatingLogo
            v-show="submitting"
            :height="80"
        ></rotatingLogo>
        <v-btn
            v-show="!submitting"
            class="absolute top-0 right-0 m-1"
            icon
            @click="passwordChange = !passwordChange"
        >
            <v-icon color="grey">{{ "mdi-exit-to-app" }}</v-icon>
        </v-btn>
        </form>
    </validation-observer>
    <!--ALERT-->
    <div
        v-show="authResolver.passwordChangeRequest"
        class="bg-footer-header rounded mt-2 animate__animated animate__fadeInUp"
        :class="$vuetify.breakpoint.mobile ? 'w-80' : 'w-96'"
    >
        <alert
        :activator="authResolver.passwordChangeRequest"
        :text="
            authResolver.promptType
            ? 'Password successfully changed!'
            : 'Error changing password. Please check your input for errors or contact support.'
        "
        :type="authResolver.promptType ? 'success' : 'error'"
        >
        </alert>
    </div>
    <!--ALERT END-->
    </v-overlay>
    <!--PASSWORD CHANGE END-->
</div>
</template>


<script>
import { required, email, max, min, alpha_dash } from "vee-validate/dist/rules";
import "animate.css";
import authResolver from "@/services/authResolver";

import { Auth } from "@/services";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

import rotatingLogo from "@/components/rotatingLogo.vue";
import alert from "@/components/alert.vue";

setInteractionMode("eager");

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

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("diffPassword", {
  params: ["target"],
  validate(value, { target }) {
    return value !== target;
  },
  message: "New password cannot be the same as your old password.",
});
let wait = function (seconds) {
  return new Promise((resolveFn) => {
    setTimeout(resolveFn, seconds * 1000);
  });
};

export default {
  name: "UserData",
  components: {
    ValidationProvider,
    ValidationObserver,
    alert,
    rotatingLogo
},
  props: ["user", "canEdit"],
  data: () => ({
    emailChange: false,
    passwordChange: false,

    //email, password
    new_email: "",
    oldPassword: "",
    newPassword: "",

    showOldPassword: false,
    showNewPassword: false,

    submitting: false, //For loading animation
    authResolver,
  }),
  async mounted() {
    this.$root.$emit("getUserDetails", async done => {
        this.new_username = this.user.username;
        this.new_email = this.user.email;
    });
  },
  methods: {
    async changeUserPassword() {
      let isValid = this.$refs.observerPassword.validate();
      if (isValid) {
        this.submitting = true;
        console.log("Validated successfully!");

        let passwordData = {
          old_password: this.oldPassword,
          new_password: this.newPassword,
        };
        let response = {};
        try {
          response = await Auth.changeUserPassword(passwordData);
          console.log("Request sent successfully!");
          this.submitting = false;
          this.authResolver.changePasswordHandler("success", response);
          await wait(3);
          this.passwordChange = false;
        } catch (e) {
          this.submitting = false;
          this.authResolver.changePasswordHandler("failed", response);
          if (e.response.data.error == "Cannot change password!")
            console.log("Cannot change password!");
          console.error(e);
        }
      } else return;
    },
    async changeUserEmail() {
      let isValid = this.$refs.observerEmail.validate();
      if (isValid) {
        this.submitting = true;
        console.log("Validated successfully!");
        let response = {};

        let userData = Auth.getCurrentUserData();
        delete userData.email;
        userData.email = this.new_email;

        try {
          response = await Auth.changeUserEmail(userData);

          console.log("Request sent successfully!");
          this.submitting = false;

          this.authResolver.changeEmailHandler("success", response);

          await wait(3);
          this.$root.$emit("getUserDetails", async done => {
            this.appGetUserDetails();
            this.emailChange = false;
          });
        } catch (e) {
          this.submitting = false;
          this.authResolver.changeEmailHandler("failed", response);
          if (e.response.data.error == "Cannot change email!")
            console.log("Cannot change email!");
          console.error(e);
        }
      } else return;
    },
    appGetUserDetails() {
      this.$root.$emit("appGetUserDetails");
    },
  },
};
</script>

<style lang="scss" scoped>
.name-email {
  .text {
    transition: 0.2s;
    &:hover {
      transition: 0.2s;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 16px;
      padding: 0 8px 0 8px;
      margin: 0 -8px 0 -8px;
      cursor: pointer;
    }
  }
  .password {
    &:hover {
      color: rgb(146, 146, 255);
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .send {
    color: gray !important;
    height: 0px;
    width: 0px;
    top: 10px;
    right: 10px;
    margin-left: 20px;
    &:hover {
      background: transparent !important;
      cursor: pointer;
      color: white !important;
    }
  }
  .exit {
    height: 0px;
    width: 0px;
    top: 10px;
    right: 10px;
    color: indianred !important;
    background: rgba(255, 0, 0, 0) !important;
    &:hover {
      border: 0px !important;
      cursor: pointer;
      color: crimson !important;
    }
  }
}
</style>
