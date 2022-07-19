<template>
    <v-container>
        <v-row no-gutters>
            <v-col md="2"></v-col>
            <v-col md="8" class="bg-background-cards h-full pb-16 mb-16">
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
                <v-container class="bg-footer-header h-24">
                    <!--AVATAR-->
                    <div class="relative bottom-20 w-min">
                        <button>
                            <v-avatar size="160">
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
                    <div class="relative left-48 bottom-40">
                        <v-row>
                            <v-col md="2">
                                <div class="text-4xl text-red-like-logo">{{ user.fullName }}</div>
                                <div class="mt-1 text-slate-300">{{ user.email }}</div>
                            </v-col>
                            <v-col md="8 pl-8">
                                <div class="text-4xl text-red-like-logo"> Medals: 1,2,3,4... - temporary</div>
                            </v-col>
                        </v-row>
                    </div>
                </v-container>
                <v-container>
                        <div class="pl-4 pt-2 pr-4">       
                            <p class="text-xl text-red-like-logo">About me</p>
                            <p class="text-justify text-slate-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas semper diam facilisis nisl scelerisque aliquam. Donec rhoncus, augue in facilisis tincidunt, arcu arcu eleifend velit, et interdum nibh mauris et purus. Nunc condimentum velit a lorem condimentum, non imperdiet libero blandit. Mauris at dolor neque. Pellentesque porta varius porta. Suspendisse potenti. Fusce tristique a dui a commodo. Phasellus vitae ante ligula. Suspendisse bibendum metus eu eleifend sagittis. Nunc euismod malesuada congue. Quisque eleifend nisl vitae ex fermentum, tempus cursus erat posuere. Nulla urna velit, elementum ac molestie vel, ornare et nulla. Integer convallis non odio eget malesuada.</p>
                        </div>
                    <v-row class="pr-4">
                        <v-col md="6">
                            <div class="pl-4 pt-2">       
                                <p class="text-xl text-red-like-logo">Games played</p>
                                <p class="text-justify text-slate-200">Doge, Stranded Away - temporary</p>
                            </div>
                        </v-col>
                        <v-col md="6">
                            <div class="pl-4 pt-2 ">       
                                <p class="text-xl text-red-like-logo">Throphies</p>
                                <p class="text-justify text-slate-200">1 2 3 4 5 6 - temporary</p>
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
                <br><br><br><br>
            </v-col> 
            <v-col md="2"></v-col>
        </v-row>
    </v-container>
</template>

<script>
import { Storage, Auth } from "@/services";
export default {
  name: "User",
  data: () => ({ 
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
};
</script>

<style lang="scss" scoped>
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
</style>