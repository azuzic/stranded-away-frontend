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
            v-if="coverMounted"
            class="relative"
            :src="
              coverImage ? coverImage : require('@/assets/user/user_cover.jpg')
            "
            height=" 400px"
          >
            <div v-show="!showCoverImage" class="absolute bottom-0 right-0">
              <v-btn
                @click="showCoverImage = !showCoverImage"
                class="m-2"
                fab
                dark
                x-small
              >
                <v-icon dark> mdi-pencil </v-icon>
              </v-btn>
            </div>
            <div v-show="showCoverImage" class="h-full w-full">
              <div class="divCenter bg-transparent-50 px-16 pb-4 rounded-2xl">
                <v-file-input
                  class="justify-center"
                  hide-input
                  @change="previewCoverImage()"
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Pick an avatar"
                  prepend-icon="mdi-image-plus"
                  label="CoverImage"
                  v-model="coverImageUpload"
                  dark
                >
                </v-file-input>
                <div class="flex justify-center">
                  <v-btn
                    :loading="imageCoverUploading"
                    light
                    class="ma-2"
                    @click="uploadCoverImage()"
                  >
                    Upload
                    <v-icon right dark> mdi-cloud-upload </v-icon>
                  </v-btn>
                </div>
                <v-btn
                  v-show="!imageCoverUploading"
                  class="absolute top-0 right-0 m-1"
                  icon
                  @click="
                    (showCoverImage = !showCoverImage),
                      (coverImage = saveCoverImage)
                  "
                >
                  <v-icon class="mb-2 ml-1" color="white">{{
                    "mdi-close-circle"
                  }}</v-icon>
                </v-btn>
                <!--ALERT-->
                <div
                  v-show="authResolver.coverImageChangeRequest"
                  class="bg-footer-header rounded mt-2 animate__animated animate__fadeInUp"
                  :class="$vuetify.breakpoint.mobile ? 'w-64' : 'w-84'"
                >
                  <alert
                    :activator="authResolver.coverImageChangeRequest"
                    :text="
                      authResolver.promptType
                        ? 'Cover image successfully uploaded!'
                        : !coverImageUpload.name
                        ? 'Please choose image.'
                        : 'Error while uploading cover image. Please check your input for errors or contact support.'
                    "
                    :type="authResolver.promptType ? 'success' : 'error'"
                  >
                  </alert>
                </div>
                <!--ALERT END-->
              </div>
            </div>
          </v-img>
          <v-skeleton-loader v-else dark type="image"></v-skeleton-loader>
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
                class="relative cursor-default"
                :class="
                  $vuetify.breakpoint.mobile
                    ? 'justify-center flex align-center w-full'
                    : ''
                "
              >
                <v-avatar
                  v-if="avatarMounted"
                  v-show="!authResolver.avatarImageChangeRequest"
                  class="absolute avatar-image"
                  size="160"
                >
                  <v-img
                    :src="
                      avatarImage
                        ? avatarImage
                        : require('@/assets/default-user-icon.jpg')
                    "
                  >
                  </v-img>
                  <div
                    v-show="!showAvatarImage"
                    @click="
                      (showAvatarImage = !showAvatarImage),
                        (avatarImage = saveAvatarImage)
                    "
                    class="absolute avatar-text text-white h-full w-full cursor-pointer"
                  >
                    <div class="h-full w-full">Change avatar!</div>
                  </div>
                  <div
                    v-show="showAvatarImage"
                    class="divCenter bg-transparent-50 p-64 rounded-2xl"
                  >
                    <v-file-input
                      class="justify-center mb-2 ml-2"
                      hide-input
                      @change="previewAvatarImage()"
                      accept="image/png, image/jpeg, image/bmp"
                      placeholder="Pick an avatar"
                      prepend-icon="mdi-image-plus"
                      label="AvatarImage"
                      v-model="avatarImageUpload"
                      dark
                    >
                    </v-file-input>
                    <div class="flex justify-center">
                      <v-btn
                        :loading="imageAvatarUploading"
                        light
                        x-small
                        class="text-xs mb-1 bg-transparent"
                        @click="uploadAvatarImage()"
                      >
                        Upload
                        <v-icon right dark small> mdi-cloud-upload </v-icon>
                      </v-btn>
                    </div>
                    <v-btn
                      v-show="!imageAvatarUploading"
                      class="justify-center w-full"
                      icon
                      @click="
                        (showAvatarImage = !showAvatarImage),
                          (avatarImage = saveAvatarImage)
                      "
                    >
                      <v-icon color="white">{{ "mdi-close-circle" }}</v-icon>
                    </v-btn>
                  </div>
                </v-avatar>
                <v-skeleton-loader
                  v-else
                  dark
                  type="avatar"
                  class="absolute avatar-image"
                  height="160px"
                >
                </v-skeleton-loader>
                <!--ALERT-->
                <div
                  v-show="authResolver.avatarImageChangeRequest"
                  class="bg-footer-header rounded mt-2 animate__animated animate__fadeInUp"
                  :class="$vuetify.breakpoint.mobile ? 'w-64' : 'w-84 mr-8'"
                >
                  <alert
                    :activator="authResolver.avatarImageChangeRequest"
                    :text="
                      authResolver.promptType
                        ? 'Avatar image successfully uploaded!'
                        : !avatarImageUpload.name
                        ? 'Please choose image.'
                        : 'Error while uploading avatar image. Please check your input for errors or contact support.'
                    "
                    :type="authResolver.promptType ? 'success' : 'error'"
                  >
                  </alert>
                </div>
                <!--ALERT END-->
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
                <div class="text-4xl text-red-like-logo">
                  {{ user.username }}
                </div>
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
            <!--USERNAME, EMAIL, PASSWORD END-->
            <!--MEDALS-->
            <div
              v-show="!authResolver.emailChangeRequest"
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
        <!--USER DATA-->
        <v-container>
          <!--ABOUT ME-->
          <div class="pl-4 pt-2 pr-4">
            <p class="text-3xl text-red-like-logo">About me</p>
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
          <!--ABOUT ME END-->
          <v-row class="pr-4">
            <!--PLAYED GAMES-->
            <v-col cols="12" class="ml-4 text-2xl text-red-like-logo">
              <p class="text-3xl text-red-like-logo">Played games</p>
              <v-row class="mr-2 justify-left w-full">
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
            </v-col>
            <!--PLAYED GAMES END-->
            <!--TROPHIES-->
            <v-row class="ml-4 text-2xl text-red-like-logo">
              <v-col cols="12" class="text-3xl text-red-like-logo mt-4"
                >Trophies</v-col
              >
              <v-col class="col-12" v-for="(game, id) in games" :key="id">
                <v-col
                  cols="12"
                  class="text-left text-2xl text-white font-bold underline"
                >
                  {{ game.name }}
                </v-col>
                <v-col
                  class="flex flex-wrap align-center min-w-200px justify-start"
                >
                  <v-tooltip
                    color="#EF5350"
                    top
                    v-for="(trophies, id2) in game.trophies"
                    :key="id2"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <img
                        @click="
                          (overlay = !overlay),
                            (trophieImg =
                              game.name + '/' + trophies.name.slice(0, -1)),
                            (trophieLocked = !trophies.locked)
                        "
                        v-bind="attrs"
                        v-on="on"
                        class="trophy m-4"
                        :src="
                          !trophies.locked
                            ? require('@/assets/trophies/' +
                                game.name +
                                '/' +
                                trophies.name.slice(0, -1) +
                                '.png')
                            : require('@/assets/trophies/hidden_trophy.png')
                        "
                      />
                    </template>
                    <div class="text-center">
                      <div>
                        {{ trophies.locked ? "*HIDDEN*" : trophies.name }}
                      </div>
                      <div>{{ trophies.description }}</div>
                    </div>
                  </v-tooltip>
                </v-col>
              </v-col>
              <v-overlay @click="overlay = !overlay" :value="overlay">
                <div class="bg-transparent-90 p-8 rounded-xl">
                  <img
                    class="trophyOverlay m-4"
                    :src="
                      trophieLocked
                        ? require('@/assets/trophies/' + trophieImg + '.png')
                        : require('@/assets/trophies/hidden_trophy.png')
                    "
                  />
                </div>
              </v-overlay>
            </v-row>
            <!--TROPHIES END-->
          </v-row>
        </v-container>
        <!--USER DATA END-->
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
    games: [
      {
        name: "Doge",
        trophies: [
          { locked: false, name: "Home!", description: "Complete the game." },
          {
            locked: false,
            name: "OHKO!",
            description: "Complete the game without taking any damage.",
          },
          {
            locked: false,
            name: "Bolt!",
            description: "Complete the game in under 30 minutes.",
          },
        ],
      },
      {
        name: "Stranded Away",
        trophies: [
          {
            locked: false,
            name: "Beginning!",
            description: "Complete level 1.",
          },
          {
            locked: false,
            name: "Exploration!",
            description: "Complete level 2.",
          },
          {
            locked: false,
            name: "Light!",
            description: "Complete all levels in under 40 minutes.",
          },
          {
            locked: false,
            name: "Doom!",
            description: "Kill over 100 enemies.",
          },
          {
            locked: false,
            name: "Monopoly!",
            description: "Collect over 1000 coins.",
          },
          {
            locked: false,
            name: "Baby Steps!",
            description: "In challenge level reach height of 500.",
          },
          {
            locked: false,
            name: "Abyss?",
            description: "In challenge level reach height of 1000.",
          },
          {
            locked: false,
            name: "Neverending!",
            description: "In challenge level reach height of 1500.",
          },
          {
            locked: false,
            name: "Higher!",
            description: "In challenge level reach height of 2000.",
          },
          {
            locked: false,
            name: "King of Jumping!",
            description: "In challenge level reach height of 2500.",
          },
          {
            locked: false,
            name: "Celestial!",
            description: "In challenge level reach height of 3000.",
          },
          {
            locked: false,
            name: "Half way there!",
            description: "In challenge level reach height of 5000.",
          },
          {
            locked: false,
            name: "Dedication!",
            description: "In challenge level reach height of 10000.",
          },
          {
            locked: false,
            name: "Papers, please!",
            description: "Die when passing money barrier.",
          },
          {
            locked: false,
            name: "Hasta la vista!",
            description: "Fall for 100 tiles.",
          },
          {
            locked: false,
            name: "Master clock!",
            description: "Stop lava for 10 seconds.",
          },
          {
            locked: false,
            name: "Uno reverse!",
            description: "Spend over 1000 coins on lava valves.",
          },
        ],
      },
    ],
    overlay: false,
    trophieLocked: "",
    trophieImg: "",

    currentUser: null,
    store,
    auth: Auth.state,
    user: {
      username: "",
      email: "",
    },
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

    //cover image upload
    coverImageUpload: [],
    coverImage: "",
    saveCoverImage: "",
    imageCoverUploading: false,
    showCoverImage: false,

    //cover image upload
    avatarImageUpload: [],
    avatarImage: "",
    saveAvatarImage: "",
    imageAvatarUploading: false,
    showAvatarImage: false,

    //mount loading
    coverMounted: false,
    avatarMounted: false,
  }),
  async mounted() {
    this.currentUser = this.$route.params.userName;
    await this.getUserDetails();
    await this.setUserCover();
    (this.coverMounted = true), await this.setUserAvatar();
    (this.avatarMounted = true), (this.new_username = this.user.username);
    this.new_email = this.user.email;
  },
  methods: {
    async getUserDetails() {
      if (this.auth.authenticated) {
        let result = await Auth.getUserDetails(this.currentUser);
        this.user = result.data.userData;
      }
    },
    async setUserCover() {
      this.coverImage = await Auth.getImage(this.user.profile.coverImageID);
      this.coverImage = this.coverImage.data.img;
      this.saveCoverImage = this.coverImage;
    },
    async setUserAvatar() {
      this.avatarImage = await Auth.getImage(this.user.profile.avatarImageID);
      this.avatarImage = this.avatarImage.data.img;
      this.saveAvatarImage = this.avatarImage;
    },
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
    async changeUserEmail() {
      let isValid = this.$refs.observerEmail.validate();
      if (isValid) {
        this.submitting = true;
        console.log("Validated successfully!");

        let userData = Auth.getCurrentUserData();
        delete userData.email;
        userData.email = this.new_email;

        let response = {};
        try {
          response = await Auth.changeUserEmail(userData);
          console.log("Request sent successfully!");
          this.submitting = false;

          this.authResolver.changeEmailHandler("success", response);

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
    previewCoverImage() {
      this.coverImage = URL.createObjectURL(this.coverImageUpload);
    },
    previewAvatarImage() {
      this.avatarImage = URL.createObjectURL(this.avatarImageUpload);
    },
    async uploadCoverImage() {
      if (this.coverImageUpload.name) {
        this.fileImg = await this.encodeImageFileAsURL(this.coverImageUpload);
        this.imageCoverUploading = true;
        try {
          let imageData = {
            name: this.coverImageUpload.name,
            img: this.fileImg,
          };
          console.log("Uploading image...");
          let response = await Auth.postImage(imageData);
          this.authResolver.changeCoverImageHandler("success");
          await Auth.changeUserProfileCoverImage({ id: response.data.id });
          this.imageCoverUploading = false;
          await this.getUserDetails();
          await this.setUserCover();
        } catch (e) {
          console.log("Uploading failed: " + e);
          this.authResolver.changeCoverImageHandler("failed");
          this.imageCoverUploading = false;
        }
      } else {
        this.authResolver.changeCoverImageHandler("failed");
      }
    },
    async uploadAvatarImage() {
      if (this.avatarImageUpload.name) {
        this.fileImg = await this.encodeImageFileAsURL(this.avatarImageUpload);
        this.imageAvatarUploading = true;
        try {
          let imageData = {
            name: this.avatarImageUpload.name,
            img: this.fileImg,
          };
          console.log("Uploading image...");
          let response = await Auth.postImage(imageData);
          this.authResolver.changeAvatarImageHandler("success");
          await Auth.changeUserProfileAvatarImage({ id: response.data.id });
          this.imageAvatarUploading = false;
          await this.getUserDetails();
          await this.setUserAvatar();
        } catch (e) {
          console.log("Uploading failed: " + e);
          this.authResolver.changeAvatarImageHandler("failed");
          this.imageAvatarUploading = false;
        }
      } else {
        this.authResolver.changeAvatarImageHandler("failed");
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
::v-deep .v-skeleton-loader__avatar {
  height: 160px !important;
  width: 160px !important;
}

::v-deep .v-skeleton-loader__image {
  height: 400px !important;
}

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
  width: 128px;
  image-rendering: pixelated;
  &:hover {
    cursor: pointer;
    filter: drop-shadow(2px 0px 0px white) drop-shadow(0px -2px 0px white)
      drop-shadow(0px 2px 0px white) drop-shadow(-2px 0px 0px white);
  }
}
.trophyOverlay {
  width: 512px;
  image-rendering: pixelated;
  &:hover {
    filter: drop-shadow(8px 0px 0px white) drop-shadow(0px -8px 0px white)
      drop-shadow(0px 8px 0px white) drop-shadow(-8px 0px 0px white);
  }
}
.divCenter {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
