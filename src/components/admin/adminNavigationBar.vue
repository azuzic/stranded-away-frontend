<template>
  <v-navigation-drawer
    v-if="!$vuetify.breakpoint.mobile"
    v-model="drawer"
    :mini-variant.sync="mini"
    permanent
    expand-on-hover
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
            <v-icon
            :color="
                panelItems.indexOf(item) == currentPanelItem
                ? 'error'
                : 'white'
            "
            >{{ item.icon }}</v-icon
            >
        </v-list-item-icon>

        <v-list-item-content>
            <v-list-item-title>{{ item.title }} </v-list-item-title>
        </v-list-item-content>
        </v-list-item>
    </v-list>
    </v-navigation-drawer>

    <v-toolbar v-else dense class="flex flex-wrap justify-center w-full">
        <v-list-item class="px-2">
            <v-list-item-avatar>
                <v-img v-if="avatarMounted" :src=" avatarImage ? avatarImage : require('@/assets/default-user-icon.jpg')"> </v-img>
            </v-list-item-avatar>
            <v-list-item-title>{{ user.username }}</v-list-item-title>
        </v-list-item>

        <v-list-item class="flex flex-wrap" v-for="item in panelItems" :key="item.title" link @click="setCurrentitem(item)">
            <v-icon :color="panelItems.indexOf(item) == currentPanelItem ? 'error' : 'white'">{{ item.icon }}</v-icon> 
        </v-list-item>
    </v-toolbar>
</template>

<script>
export default {
    name: "adminNavigationBar",
    props: ["avatarMounted", "user", "avatarImage"],
    data: () => ({
        drawer: true,
        mini: true,
        panelItems: [
        { title: "Carousel", icon: "mdi-view-carousel" },
        { title: "Timeline", icon: "mdi-chart-gantt" },
        { title: "Games", icon: "mdi-controller" },
        { title: "Users", icon: "mdi-account-group-outline" },
        ],
        currentPanelItem: 0,
    }),

  methods: {
    setCurrentitem(item) {
      this.currentPanelItem = this.panelItems.indexOf(item);
      this.$root.$emit("setCurrentitem", this.currentPanelItem);
    },
  },
};
</script>