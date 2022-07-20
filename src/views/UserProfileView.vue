<template>
    <v-container>
        <v-row no-gutters>
            <v-col sm="0" md="1" lg="1" xl="2"></v-col>
            <v-col sm="12" md="10" lg="10" xl="8" class="bg-background-cards h-full pb-16 mb-16">
                <!--COVER IMAGE-->
                <div>
                    <v-img class="relative" src="@/assets/user/user_cover.jpg" height="400px" >
                        <div class="absolute bottom-0 right-0">
                            <v-btn class="m-2" fab dark x-small> 
                                <v-icon dark> mdi-pencil </v-icon> 
                            </v-btn>
                        </div>
                    </v-img>
                </div>
                <v-container class="bg-footer-header min-h-100px">
                    <v-row class="min-h-100px">
                        <!--AVATAR-->
                        <div :class="$vuetify.breakpoint.mobile ? 'w-full min-h-75px' : 'w-48 ml-3 min-h-100px'">
                            <button class="relative" 
                            :class="$vuetify.breakpoint.mobile ? 'justify-center flex align-center w-full' : ''">
                                <v-avatar class="absolute avatar" size="160">
                                    <v-img class="user-avatar" src="@/assets/default-user-icon.jpg"></v-img>
                                    <div class="absolute avatar-text text-white h-full w-full">
                                        <div class="h-full w-full">
                                            Change avatar!
                                        </div>
                                    </div>
                                </v-avatar>
                            </button>
                        </div>
                            <!--NAME & EMAIL-->
                            <div class="flex flex-wrap justify-left align-center">
                                <div class="grow" :class="$vuetify.breakpoint.mobile ? 'text-center mb-4' : ''">
                                    <div class="text-4xl text-red-like-logo">{{ user.fullName }}</div>
                                    <div class="text-slate-300">{{ user.email }}</div>
                                </div>
                            <!--MEDALS-->
                                <div class="flex flex-wrap justify-center align-center min-w-200px" 
                                :class="$vuetify.breakpoint.mobile ? 'mb-4' : ''" >
                                    <img v-for="n in 6" :key="n" class="medal" src="@/assets/user/user_medal.png">
                                </div>
                            </div>
                    </v-row>
                </v-container>
                <v-container>
                    <div class="pl-4 pt-2 pr-4">       
                        <p class="text-xl text-red-like-logo">About me</p>
                        <p class="text-justify text-slate-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas semper diam facilisis nisl scelerisque aliquam. Donec rhoncus, augue in facilisis tincidunt, arcu arcu eleifend velit, et interdum nibh mauris et purus. Nunc condimentum velit a lorem condimentum, non imperdiet libero blandit. Mauris at dolor neque. Pellentesque porta varius porta. Suspendisse potenti. Fusce tristique a dui a commodo. Phasellus vitae ante ligula. Suspendisse bibendum metus eu eleifend sagittis. Nunc euismod malesuada congue. Quisque eleifend nisl vitae ex fermentum, tempus cursus erat posuere. Nulla urna velit, elementum ac molestie vel, ornare et nulla. Integer convallis non odio eget malesuada.</p>
                    </div>
                    <v-row class="pr-4">
                        <v-col cols="12" class="ml-4 text-2xl text-red-like-logo">
                            Played games
                        </v-col>
                        <v-row class="ml-4 mr-1 justify-left"> 
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
                        <v-col cols="12" class="ml-4 text-2xl text-red-like-logo">
                            Throphies
                        </v-col>
                        <v-col>
                            <div class="flex flex-wrap justify-left align-center min-w-200px" 
                            :class="$vuetify.breakpoint.mobile ? 'mb-4' : ''" >
                                <img v-for="n in 13" :key="n" class="trophy" src="@/assets/user/user_trophy.png">
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
                <br><br><br><br>
            </v-col>
            <v-col sm="0" md="1" lg="1" xl="2"></v-col>
        </v-row>
    </v-container>
</template>

<script>
import gameCard from "@/components/gameCard.vue";
import { Auth } from "@/services";
import store from "@/store";

export default {
  name: "User",
  components: {
    gameCard,
  },
  data: () => ({ 
    store,
    auth: Auth.state,
    user: {
        fullName: "",
        email: ""
    }
   }),
  mounted() {
    this.getUserDetails();
  },
  methods: {
  getUserDetails() {
        if (this.auth.authenticated) {
            let userData = Auth.getUserData();
            this.user.fullName = userData.username;
            this.user.email = userData.email;
        }
    }
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
.avatar {
    bottom: -76px;
}
.avatar-text {
    transition-duration: 0.25s;
    padding-top: 72px;
    opacity: 0;
}
.avatar-text:hover {
    transition-duration: 0.25s;
    opacity: 100;
    background-color: rgba(0, 0, 0, 0.75);
}
.medal {
    transition-duration: 0.5s;
    margin: 10px;
    width: 45px;
}
.medal:hover {
    transition-duration: 0.5s;
    margin: 0px;
    width: 65px;
}
.trophy {
    transition-duration: 0.5s;
    margin: 10px;
    width: 100px;
}
.trophy:hover {
    transition-duration: 0.5s;
    margin: -15px;
    width: 150px;
}
</style>