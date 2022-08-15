<template>
  <v-container class="mt-16 md:pl-32 md:pr-32">
    <h1 class="text-4xl mt-4">ADMIN PANEL</h1>
    <h2 class="mb-4">
      Welcome back, <b class="text-red-like-logo">{{ user.username }}</b>
    </h2>
    <v-card dark>
      <v-row justify="start">
        <v-col :cols="4">
          <v-navigation-drawer
            v-model="drawer"
            :mini-variant.sync="mini"
            permanent
          >
            <v-list-item class="px-2">
              <v-list-item-avatar>
                <v-img
                  v-if="avatarMounted"
                  :src="
                    avatarImage
                      ? avatarImage
                      : require('@/assets/default-user-icon.jpg')
                  "
                >
                </v-img>
              </v-list-item-avatar>

              <v-list-item-title>{{ user.username }}</v-list-item-title>

              <v-btn icon @click.stop="mini = !mini">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense>
              <v-list-item
                v-for="item in panelItems"
                :key="item.title"
                link
                @click="setCurrentitem(item)"
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }} </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-col>
        <v-col align-self="center" :cols="5">
          <!--Timeline-->
          <v-container v-if="currentPanelItem == 0">
            <v-row>
              <v-col v-for="n in 9" :key="n" class="d-flex child-flex" cols="4">
                <v-img
                  :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                  :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
            </v-row>
          </v-container>
          <v-container v-if="currentPanelItem == 1">
            <h2 class="text-3xl text-center">ADD NEW POST</h2>
            <validation-observer ref="observer" v-slot="{}">
              <v-form ref="form" lazy-validation class="mb-2">
                <!--TITLE-->
                <validation-provider v-slot="{ errors }" name="Title">
                  <v-text-field
                    v-model="post.title"
                    :counter="25"
                    label="Title"
                    :error-messages="errors"
                    required
                  ></v-text-field>
                </validation-provider>
                <!--/TITLE-->
                <!--TEXT-->
                <validation-provider
                  v-slot="{ errors }"
                  name="Text"
                  rules="required"
                >
                  <v-textarea
                    class="mt-2 mb-2"
                    clearable
                    filled
                    :counter="2000"
                    auto-grow
                    label="Text"
                    v-model="post.text"
                    required
                    :error-messages="errors"
                  ></v-textarea>
                </validation-provider>
                <!--/TEXT-->
                <!--ICON-->
                <validation-provider
                  v-slot="{ errors }"
                  name="Icon"
                  rules="required"
                >
                  <v-select
                    v-model="selectedIcon"
                    :items="availableIcons"
                    label="Icon"
                    prepend-icon="mdi-robot"
                    :error-messages="errors"
                  >
                  </v-select>
                </validation-provider>

                <div class="text-center">
                  <v-icon size="40"> {{ selectedIcon }} </v-icon>
                </div>
                <!--/ICON-->
                <!--IMAGE-->
                <validation-provider v-slot="{ errors }" name="Image">
                  <v-file-input
                    label="Image"
                    filled
                    prepend-icon="mdi-image"
                    :error-messages="errors"
                    class="mt-2"
                  ></v-file-input>
                </validation-provider>
                <!--/IMAGE-->
                <v-checkbox
                  v-model="postphoneCheckbox"
                  label="Postphone post"
                  required
                ></v-checkbox>

                <v-btn color="success" class="mr-4" @click="addNewPost">
                  POST
                </v-btn>

                <v-btn color="error" class="mr-4" @click="reset">
                  Reset Form
                </v-btn>
              </v-form>
            </validation-observer>
          </v-container>
        </v-col>
        <v-col :cols="2"></v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import { Auth } from "@/services";
import { required } from "vee-validate/dist/rules";
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

export default {
  name: "AdminPanel",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    drawer: true,
    panelItems: [
      { title: "Carousel", icon: "mdi-view-carousel" },
      { title: "Timeline", icon: "mdi-chart-gantt" },
      { title: "Games", icon: "mdi-controller" },
      { title: "Users", icon: "mdi-account-group-outline" },
    ],
    mini: true,
    currentPanelItem: 0,

    auth: Auth.state,
    user: {
      username: Auth.currentUser.username,
      email: Auth.currentUser.email,
      admin: true,
    },

    avatarImage: "",
    //mount loading
    avatarMounted: false,

    //Post |Timeline|
    post: {
      title: "",
      text: "",
      image: "",
      author: "",
      date: "",
    },
    postphoneCheckbox: null,
    availableIcons: [
      { text: "General news", value: "mdi-newspaper-variant" },
      { text: "Youtube video", value: "mdi-youtube" },
      { text: "Game news", value: "mdi-controller" },
      { text: "New Achievement", value: "mdi-trophy" },
      { text: "Celebration", value: "mdi-party-popper" },
    ],
    selectedIcon: "mdi-newspaper-variant",
  }),
  async mounted() {
    console.log(this.availableIcons);
    await this.getUserDetails();

    await this.setUserAvatar();

    (this.avatarMounted = true),
      this.$root.$on("getUserDetails", () => {
        this.getUserDetails();
      });

    this.$root.$on("setUserAvatar", () => {
      this.getUserDetails();
    });
  },

  methods: {
    setCurrentitem(item) {
      this.currentPanelItem = this.panelItems.indexOf(item);
    },
    async getUserDetails() {
      if (this.auth.authenticated) {
        let userData = Auth.getCurrentUserData();
        let result = await Auth.getUserDetails(userData.username);
        this.user = result.data.userData;
      }
    },
    async setUserAvatar() {
      if (this.user.username) {
        this.avatarImage = await Auth.getImage(this.user.profile.avatarImageID);
        this.avatarImage = this.avatarImage.data.img;
      }
    },
    addNewPost() {
      console.log("Adding new post to timeline");
      this.$refs.form.validate();
    },
    reset() {
      console.log("Resetting timeline form");
      this.$refs.form.reset();
    },
  },
  computed: {},
};
</script>
<style></style>
