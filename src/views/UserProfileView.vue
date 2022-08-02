<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="0" md="1" lg="1" xl="2"></v-col>
      <v-col
        sm="12"
        md="10"
        lg="10"
        xl="8"
        class="bg-background-cards h-full pb-16 mb-16"
      >
        <!--COVER IMAGE-->
        <div>
          <v-img
            class="relative"
            src="@/assets/user/user_cover.jpg"
            height="400px"
          >
            <div class="absolute bottom-0 right-0">
              <v-btn class="m-2" fab dark x-small>
                <v-icon dark> mdi-pencil </v-icon>
              </v-btn>
            </div>
          </v-img>
        </div>
        <!--COVER IMAGE END-->
        <v-container class="bg-footer-header min-h-100px">
          <div class="flex flex-wrap min-h-100px">
            <!--AVATAR-->
            <div
              class="avatar"
              :class="
                $vuetify.breakpoint.mobile
                  ? 'min-h-75px min-w-full'
                  : 'ml-3 min-h-100px min-w-200px'
              "
            >
              <button
                class="relative"
                :class="
                  $vuetify.breakpoint.mobile
                    ? 'justify-center flex align-center w-full'
                    : ''
                "
              >
                <v-avatar class="absolute avatar-image" size="160">
                  <v-img src="@/assets/default-user-icon.jpg"></v-img>
                  <div class="absolute avatar-text text-white h-full w-full">
                    <div class="h-full w-full">Change avatar!</div>
                  </div>
                </v-avatar>
              </button>
            </div>
            <!--AVATAR END-->
            <!--USERNAME, EMAIL, PASSWORD-->
            <div
              class="grow flex align-center"
              :class="$vuetify.breakpoint.mobile ? 'text-center mb-4' : ''"
            >
              <div
                class="name-email"
                :class="$vuetify.breakpoint.mobile ? 'grow' : ''"
              >
                <!--USERNAME-->
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <div
                      @click="usernameChange = !usernameChange"
                      v-show="!usernameChange"
                      v-bind="attrs"
                      v-on="on"
                      class="text text-4xl text-red-like-logo"
                    >
                      {{ user.username }}
                    </div>

                    <validation-observer ref="observerUsername" v-slot="{}">
                      <form
                        v-show="usernameChange"
                        class="text-red-like-logo"
                        @submit.prevent="changeUserUsername"
                      >
                        <validation-provider
                          v-slot="{ errors }"
                          name="Username"
                          rules="required|max:16|min:3|alpha_dash"
                        >
                          <v-text-field
                            v-show="!authResolver.usernameChangeRequest"
                            x-small
                            v-model="new_username"
                            :counter="16"
                            :error-messages="errors"
                            dark
                            label="Username"
                            required
                          >
                            <v-btn
                              v-show="!submitting"
                              @click="usernameChange = !usernameChange"
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
                            v-show="authResolver.usernameChangeRequest"
                            class="bg-footer-header rounded mt-2 animate__animated animate__fadeInUp"
                          >
                            <alert
                              :activator="authResolver.usernameChangeRequest"
                              :text="
                                authResolver.promptType
                                  ? 'Username successfully changed!'
                                  : 'Error changing username. Please check your input for errors or contact support.'
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
                  <span>Change username!</span>
                </v-tooltip>
                <!--USERNAME END-->
                <!--EMAIL-->
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <div
                      @click="emailChange = !emailChange"
                      v-show="!emailChange"
                      v-bind="attrs"
                      v-on="on"
                      class="text email text-slate-300"
                    >
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
                      ></v-text-field>
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
                      ></v-text-field>
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
            <!--USERNAME, EMAIL, PASSWORD END-->
            <!--MEDALS-->
            <div
              v-show="
                !authResolver.usernameChangeRequest &&
                !authResolver.emailChangeRequest
              "
              class="medals flex flex-wrap align-center min-w-200px overfow-hidden"
              :class="
                $vuetify.breakpoint.mobile
                  ? 'mb-4 justify-center'
                  : 'justify-left'
              "
            >
              <img
                v-for="n in 10"
                :key="n"
                class="medal"
                src="@/assets/user/user_medal.png"
              />
            </div>
            <!--MEDALS END-->
          </div>
        </v-container>
        <v-container>
          <div class="pl-4 pt-2 pr-4">
            <p class="text-xl text-red-like-logo">About me</p>
            <p class="text-justify text-slate-200">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              semper diam facilisis nisl scelerisque aliquam. Donec rhoncus,
              augue in facilisis tincidunt, arcu arcu eleifend velit, et
              interdum nibh mauris et purus. Nunc condimentum velit a lorem
              condimentum, non imperdiet libero blandit. Mauris at dolor neque.
              Pellentesque porta varius porta. Suspendisse potenti. Fusce
              tristique a dui a commodo. Phasellus vitae ante ligula.
              Suspendisse bibendum metus eu eleifend sagittis. Nunc euismod
              malesuada congue. Quisque eleifend nisl vitae ex fermentum, tempus
              cursus erat posuere. Nulla urna velit, elementum ac molestie vel,
              ornare et nulla. Integer convallis non odio eget malesuada.
            </p>
          </div>
          <v-row class="pr-4">
            <!--PLAYED GAMES-->
            <v-col cols="12" class="ml-4 text-2xl text-red-like-logo">
              Played games
            </v-col>
            <v-row class="ml-4 mr-1 justify-left w-full">
              <v-col
                v-for="gameCard in store.gameCards"
                :key="gameCard.id"
                :cols="width"
              >
                <gameCard
                  :availability="''"
                  :title="gameCard.title"
                  :text="gameCard.text"
                  :imageSrc="gameCard.imageSrc"
                  :gName="gameCard.gameName"
                ></gameCard>
              </v-col>
            </v-row>
            <!--PLAYED GAMES END-->
            <!--TROPHIES-->
            <v-col cols="12" class="ml-4 text-2xl text-red-like-logo">
              Throphies
            </v-col>
            <v-col>
              <div
                class="flex flex-wrap align-center min-w-200px"
                :class="
                  $vuetify.breakpoint.mobile
                    ? 'mb-4 justify-center'
                    : 'justify-left'
                "
              >
                <img v-for="n in 13" :key="n" class="trophy" :src="imgTest" />
              </div>
              <div>
                <v-file-input
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Pick an avatar"
                    prepend-icon="mdi-camera"
                    label="Image"
                    v-model="file"
                    dark
                ></v-file-input>
                <v-btn
                :loading="imageUploading"
                color="blue-grey"
                class="ma-2 white--text"
                @click="uploadImage()"
                >
                Upload
                <v-icon
                    right
                    dark
                >
                    mdi-cloud-upload
                </v-icon>
                </v-btn>
              </div>
              <div id="blah">as</div>
            </v-col>
            <!--TROPHIES END-->
          </v-row>
        </v-container>
        <br /><br /><br /><br />
      </v-col>
      <v-col sm="0" md="1" lg="1" xl="2"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, email, max, min, alpha_dash } from "vee-validate/dist/rules";
import "animate.css";
import authResolver from "@/services/authResolver";

import gameCard from "@/components/gameCard.vue";
import { Auth } from "@/services";
import store from "@/store";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

import rotatingLogo from "@/components/rotatingLogo.vue";
import alert from "@/components/alert.vue";
import { el } from "vuetify/lib/locale";

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
  name: "User",
  components: {
    gameCard,
    ValidationProvider,
    ValidationObserver,
    alert,
    rotatingLogo,
  },
  data: () => ({
    store,
    auth: Auth.state,
    user: {
      username: "",
      email: "",
    },
    usernameChange: false,
    emailChange: false,
    passwordChange: false,

    new_username: "",
    new_email: "",
    oldPassword: "",
    newPassword: "",

    showOldPassword: false,
    showNewPassword: false,

    submitting: false, //For loading animation
    authResolver,

    imgTest: "",
    file: [],
    fileImg: "",
    imageUploading: false,
  }),
  async mounted() {
    await this.getUserDetails();
    this.new_username = this.user.username;
    this.new_email = this.user.email;
    this.imgTest = await Auth.getImage();
    this.imgTest = "data:image/png;base64," + this.imgTest.data;
  },
  methods: {
    async encodeImageFileAsURL(file) {
        let reader = new FileReader();
        return await new Promise((resolve, reject) => {
            reader.onloadend = async () => {
                try {
                    let response = reader.result;
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(file);
        });
    },
    async getUserDetails() {
      if (this.auth.authenticated) {
        let userData = Auth.getUserData();
        this.user.username = userData.username;
        this.user.email = userData.email;
      }
    },
    async changeUserPassword() {
      let isValid = this.$refs.observerPassword.validate();
      if (isValid) {
        this.submitting = true;
        console.log("Validated successfully!");

        let userData = {
          username: this.user.username,
          old_password: this.oldPassword,
          new_password: this.newPassword,
        };
        let response = {};
        try {
          response = await Auth.changeUserPassword(userData);
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
    async changeUserUsername() {
      let isValid = this.$refs.observerUsername.validate();
      if (isValid) {
        this.submitting = true;
        console.log("Validated successfully!");
        let userData = {
          new_username: this.new_username,
        };
        let response = {};
        try {
          response = await Auth.changeUserUsername(userData);
          let token = await Auth.updateToken({
            username: this.new_username,
            email: this.user.email,
          });
          console.log("Request sent successfully!");
          this.submitting = false;
          this.authResolver.changeUsernameHandler("success", token);
          await wait(3);
          await this.getUserDetails();
          this.appGetUserDetails();
          this.usernameChange = false;
        } catch (e) {
          this.submitting = false;
          this.authResolver.changeUsernameHandler("failed", response);
          if (e.response.data.error == "Cannot change username!")
            console.log("Cannot change username!");
          console.error(e);
        }
      } else return;
    },
    async changeUserEmail() {
      let isValid = this.$refs.observerEmail.validate();
      if (isValid) {
        this.submitting = true;
        console.log("Validated successfully!");

        let userData = {
          new_email: this.new_email,
        };
        let response = {};
        try {
          response = await Auth.changeUserEmail(userData);
          let token = await Auth.updateToken({
            username: this.user.username,
            email: this.new_email,
          });
          console.log("Request sent successfully!");
          this.submitting = false;
          this.authResolver.changeEmailHandler("success", token);
          await wait(3);
          await this.getUserDetails();
          this.appGetUserDetails();
          this.emailChange = false;
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
      this.$root.$emit("getUserDetails");
    },
    async uploadImage() {
        this.fileImg = await this.encodeImageFileAsURL(this.file);
        this.imageUploading = true;
        try {
          let imageData = {
            name: this.file.name,
            img: this.fileImg,
          }
          console.log("Uploading image...");
          let response = await Auth.postImage(imageData);
          console.log(response.data);
          this.imageUploading = false;
        }
        catch (e) {
            console.log("Uploding failed: " + e);       
            this.imageUploading = false; 
        }
    },
  },
  computed: {
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 11;
        case "sm":
          return 6;
        case "md":
          return 6;
        case "lg":
          return 4;
        case "xl":
          return 4;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-image {
  bottom: -76px;
  .avatar-text {
    transition-duration: 0.25s;
    padding-top: 72px;
    opacity: 0;
    &:hover {
      transition-duration: 0.25s;
      opacity: 100;
      background-color: rgba(0, 0, 0, 0.75);
    }
  }
}
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
.medals {
  .medal {
    transition-duration: 0.5s;
    margin: 10px;
    width: 45px;
    &:hover {
      transition-duration: 0.5s;
      margin: 0px;
      width: 65px;
    }
  }
}
.trophy {
  transition-duration: 0.5s;
  margin: 10px;
  width: 80px;
  &:hover {
    transition-duration: 0.5s;
    margin: -10px;
    width: 120px;
  }
}
</style>
