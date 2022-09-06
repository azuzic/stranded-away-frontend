<template>
  <div class="h-full py-8">
    <div class="rounded-md overflow-hidden drop-shadow">
        <v-toolbar color="#111011" dark>
            <v-toolbar-title class="text-slate-200">All Timeline Posts</v-toolbar-title>
        </v-toolbar>
        <v-list-item-group class="bg-background-color"> 
        <template v-for="(item, i) in reversedNews">
            <!--Works, but ESLint gives false error-->
            <v-list-item :key="item.title">
            <v-list-item-content>
                <v-list-item-title class="text-slate-300"
                v-text="item.title"
                ></v-list-item-title>

                <v-list-item-subtitle
                
                ><b class="text-red-500 font-normal">{{item.author}}</b></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
                <v-list-item-action-text  
                ><b class="text-slate-400 font-normal">{{item.date}}</b></v-list-item-action-text>
                <v-dialog
                v-model="deleteConfirm"
                persistent
                max-width="290"
                :retain-focus="false"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" text link>
                    <v-icon
                        @click="deleteSelection = item"
                        color="red"
                    >
                        mdi-delete
                    </v-icon>
                    </v-btn>
                </template>
                <v-card dark>
                    <v-card-title class="text-h5">
                    Remove post?
                    </v-card-title>
                    <v-card-text
                    >Are you sure you want to remove this
                    post?</v-card-text
                    >
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="error darken-1"
                        text
                        @click="deleteConfirm = false"
                    >
                        No
                    </v-btn>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="deleteTimelinePost(deleteSelection._id)"
                    >
                        Yes
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-list-item-action>
            </v-list-item>

            <v-divider
            v-if="i < reversedNews.length - 1"
            :key="i"
            ></v-divider>
        </template>
        </v-list-item-group>
    </div>
</div>
</template>

<script>
import { Admin } from "@/services";
import router from "@/router";

export default {
    name: "adminAllTimelinePosts",
    data: () => ({
        news: Admin.data.getTimelinePosts,
        timelinePost: {
            title: "",
            text: "",
            image: null,
            author: "",
            icon: "mdi-newspaper-variant",
            date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10),
        },
        hideAuthorCheckbox: null,
        deleteSelection: {},
        deleteConfirm: false,
    }),
    methods: {
        async deleteTimelinePost(postID) {
        let response = await Admin.deleteDocument(postID, "timelinePosts");
        if (response.status == 202) {
            router.go();
        }
        },
    },
    asyncComputed: {
        async reversedNews() {
        let result = await this.news;
        return result.data.reverse();
        },
    },
}
</script>