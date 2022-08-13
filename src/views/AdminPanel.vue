<template>
  <div class="mt-24">
    <v-card dark>
      <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-title>{{ user.username }}</v-list-item-title>

          <v-btn icon @click.stop="mini = !mini">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>

    <!--
    <v-row justify="start" align="center">
      <v-col :cols="width" align-self="center">
        <h1 class="text-center font-bold text-4xl">TIMELINE NEWS</h1>

        <v-card class="mx-auto" max-width="300" tile dark>
          <v-list dense>
            <v-subheader>REPORTS</v-subheader>
            <v-list-item-group v-model="selectedItem" color="red">
              <v-list-item v-for="(item, i) in items" :key="i">
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-pagination
            v-model="page"
            :length="4"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
          ></v-pagination>
        </v-card>
      </v-col>
    </v-row>
    -->
  </div>
</template>
<script>
import router from "@/router";
import store from "@/store";
import { Storage, Auth } from "@/services";
export default {
  name: "AdminPanel",
  components: {},
  data: () => ({
    drawer: true,
    items: [
      { title: "Timeline", icon: "mdi-chart-gantt" },
      { title: "My Account", icon: "mdi-account" },
      { title: "Users", icon: "mdi-account-group-outline" },
    ],
    user: {
      username: Auth.currentUser.username,
      email: Auth.email,
    },
    mini: true,
    selectedItem: 1,
    details: [
      { text: "Real-Time", icon: "mdi-clock" },
      { text: "Audience", icon: "mdi-account" },
      { text: "Conversions", icon: "mdi-flag" },
    ],
    page: 1,
  }),
  async mounted() {},

  methods: {},
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
};
</script>
<style></style>
