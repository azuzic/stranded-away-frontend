<template>
    <div class="pl-4 pt-2 pr-4">
        <p class="text-3xl text-red-like-logo">About me</p>
        <p v-show="!canEdit" class="text-justify text-slate-300"> {{ user.profile.description }}</p>
        <p v-show="canEdit" v-if="!editing" class="text-justify text-slate-300 text" @click="editing=!editing, description = user.profile.description"> {{ user.profile.description }} </p>
        <div v-else class="flex relative h-full">
            <v-textarea
                counter
                color="red lighten-1"
                name="input-7-4"
                dark
                :rules="rules"
                :value="description"
                v-model="description"
            ></v-textarea>
            
            <div class="h-full">
                <v-row>
                    <v-btn class="send" icon small slot="append" type="submit" dark>
                        <v-icon @click="editing=!editing"> mdi-close </v-icon>
                    </v-btn>
                </v-row>
                <v-row class="absolute bottom-0">
                    <v-btn class="send" icon small slot="append" type="submit" dark>
                        <v-icon @click="changeUserProfileDescription()"> mdi-send </v-icon>
                    </v-btn>
                </v-row>
            </div>
        </div>
    </div>
    
</template>

<script>
import { Auth } from "@/services";

export default {
    name: "AboutMe",
    props: ["user", "canEdit"],
    data: () => ({
      editing: false,
      rules: [v => v.length <= 2500 || 'Max 2500 characters'],
      description: 'Hello!',
    }),
    methods: {
        async changeUserProfileDescription() {
            if (this.description.length <= 2500) {
                let response = {};
                this.editing = !this.editing;

                try { 
                    response = await Auth.changeUserProfileDescription({ description: this.description });

                    this.$root.$emit("getUserDetails", async done => {
                        this.appGetUserDetails();
                    });
                } catch (e) {
                    if (e.response.data.error == "Cannot change description!")
                    console.log("Cannot change description!");
                    console.error(e);
                }
            }
        },
        appGetUserDetails() {
            this.$root.$emit("appGetUserDetails");
        },
    }
}
</script>

<style lang="scss" scoped>
  .text {
    transition: 0.2s;
    &:hover {
      transition: 0.2s;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 16px;
      padding: 8px 8px 8px 8px;
      margin: -8px 8px 8px -8px;
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
</style>