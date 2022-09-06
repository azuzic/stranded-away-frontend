<template>
<div class="w-full" :class="$vuetify.breakpoint.mobile ? 'mx-4' : 'mx-32'">
    <div class="rounded-md overflow-hidden drop-shadow">
        <v-toolbar color="#111011" dark>
            <v-toolbar-title  class="text-slate-200">List of All Registered Users</v-toolbar-title>
        </v-toolbar>
            <v-list-item-group  class="bg-background-color">
            <template v-for="(user, i) in allUsersList">
                <!--Works, but ESLint gives false error-->
                <v-list-item :key="user.username">
                <template>
                    <v-list-item-content>
                    <v-list-item-title  class="text-slate-300" 
                        v-text="user.username"
                    ></v-list-item-title>

                    <v-list-item-subtitle
                    ><b class="text-red-500 font-normal">{{user.email}}</b></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                    <v-list-item-action-text
                    ><b class="text-slate-400 font-normal">{{user.admin ? 'ADMIN' : 'PLAYER'}}</b></v-list-item-action-text>
                    <router-link
                        :to="{
                        name: 'User',
                        params: { userName: user.username },
                        }"
                    >
                        <v-icon hover text link color="red">
                        mdi-account
                        </v-icon>
                    </router-link>
                    </v-list-item-action>
                </template>
                </v-list-item>

                <v-divider
                v-if="i < allUsers.length - 1"
                :key="i"
                ></v-divider>
            </template>
            </v-list-item-group>
    </div>
</div>
</template>

<script>
import { Admin } from "@/services";
export default {
    name: "adminAllUsers", 
    data: () => ({
        allUsers: Admin.data.getAllUsers,
    }),
    asyncComputed: {
        async allUsersList() {
        let result = await this.allUsers;
        return result.data;
        },
    },
}
</script>