<template>
    <div>
        <v-img
        v-if="coverMounted"
        class="relative"
        :src="
            coverImage ? coverImage : require('@/assets/user/user_cover.jpg')
        "
        height=" 400px"
        >
        <div
            v-if="canEdit"
            v-show="!showCoverImage"
            class="absolute bottom-0 right-0"
        >
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
</template>

<script>
import "animate.css";

import { Auth } from "@/services";

import alert from "@/components/alert.vue";
import authResolver from "@/services/authResolver";

export default {
  name: "CoverImage",
  components: {
    alert,
  },
  props: ["user", "canEdit"],
  data: () => ({
    //cover image upload
    coverImageUpload: [],
    coverImage: "",
    saveCoverImage: "",
    imageCoverUploading: false,
    showCoverImage: false,

    authResolver,

    //mount loading
    coverMounted: false,
  }),
  watch: {
    async user(newVal, oldVal) {
      await this.setUserCover();
      this.coverMounted = true;
    },
  },
  methods: {
    async setUserCover() {
      let result = await Auth.getImage(this.user.profile.coverImageID);
      if (result) {
        this.coverImage = result.data.img;
        this.saveCoverImage = this.coverImage;
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
    previewCoverImage() {
      this.coverImage = URL.createObjectURL(this.coverImageUpload);
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
          this.$root.$emit("getUserDetails", async done => {
            await this.setUserCover();
          });
        } catch (e) {
          console.log("!!!!!Uploading failed: " + e);
          this.authResolver.changeCoverImageHandler("failed");
          this.imageCoverUploading = false;
        }
      } else {
        this.authResolver.changeCoverImageHandler("failed");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .v-skeleton-loader__image {
  height: 400px !important;
}

.divCenter {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>