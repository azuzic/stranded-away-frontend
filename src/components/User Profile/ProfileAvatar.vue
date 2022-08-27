<template>
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
        v-if="canEdit"
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
</template>

<script>
import "animate.css";

import { Auth } from "@/services";

import alert from "@/components/alert.vue";
import authResolver from "@/services/authResolver";

export default {
  name: "ProfileAvatar",
  components: {
    alert,
  },
  props: ["user", "canEdit"],
  data: () => ({
    //avatar image upload
    avatarImageUpload: [],
    avatarImage: "",
    saveAvatarImage: "",
    imageAvatarUploading: false,
    showAvatarImage: false,

    authResolver,

    //mount loading
    avatarMounted: false,
  }),
  watch: {
    async user(newVal, oldVal) {
      await this.setUserAvatar();
      this.avatarMounted = true;
    },
  },
  methods: {
    async setUserAvatar() {
      let result = await Auth.getImage(this.user.profile.avatarImageID);
      if (result) {
        this.avatarImage = result.data.img;
        this.saveAvatarImage = this.avatarImage;
      }
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
    previewAvatarImage() {
      this.avatarImage = URL.createObjectURL(this.avatarImageUpload);
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
          this.$root.$emit("getUserDetails", async done => {
            await this.setUserAvatar();
          });
          this.$root.$emit("appSetUserAvatar");
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
};
</script>

<style lang="scss" scoped>
::v-deep .v-skeleton-loader__avatar {
  height: 160px !important;
  width: 160px !important;
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
.divCenter {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>