<template>
    <v-row>
        <v-col v-if="!$vuetify.breakpoint.mobile" md="1" lg="1" xl="2"></v-col>
        <v-col md="12" lg="10" xl="8" class="h-full pb-16 mb-16" >
            <v-data-table
                :class="$vuetify.breakpoint.mobile ? '' : 'p-12'"
                :headers="headers"
                :items="sortedUsersScore"
                hide-default-footer
                :page.sync="page"
                :items-per-page="itemsPerPage"
                @page-count="pageCount = $event"
                dark>
                <!--Works, but ESLint gives false error-->
                <template v-slot:item ="{ item, index }">
                    <tr v-if="!$vuetify.breakpoint.xs" :class="index == 0 && (maxHR.p == item.user || maxMC.p == item.user || maxEK.p == item.user || maxBD.p == item.user || maxTP.p == item.user) ? 'text-stone-900 bg-red-500 font-bold' : ''">
                        <td class="text-start flex justify-start content-center"  @click=" $router.push({ name: 'User', params: { userName: item.user }, })">
                            <v-avatar class="cursor" color="gray " size="48">
                                <v-img class="avatar" :src=" item.avatarImage ? item.avatarImage : require('@/assets/default-user-icon.jpg')"></v-img>
                            </v-avatar>
                            <div class="cursor hover:underline flex flex-wrap content-center"><span>{{ item.user }}</span></div>
                        </td>
                        <td class="text-start" :class="maxHR.p == item.user ? index == 0 ? 'text-stone-900 font-bold' : 'text-red-500' : 'text-stone-200 font-normal'">{{ item.heightReached }}</td>
                        <td class="text-start" :class="maxMC.p == item.user ? index == 0 ? 'text-stone-900 font-bold' : 'text-red-500' : 'text-stone-200 font-normal'">{{ item.moneyCollected }}</td>
                        <td class="text-start" :class="maxEK.p == item.user ? index == 0 ? 'text-stone-900 font-bold' : 'text-red-500' : 'text-stone-200 font-normal'">{{ item.enemiesKilled }}</td>
                        <td class="text-start" :class="maxBD.p == item.user ? index == 0 ? 'text-stone-900 font-bold' : 'text-red-500' : 'text-stone-200 font-normal'">{{ item.boxesDestroyed }}</td>
                        <td class="text-start" :class="maxTP.p == item.user ? index == 0 ? 'text-stone-900 font-bold' : 'text-red-500' : 'text-stone-200 font-normal'">{{ timePlayed(item.timePlayed) }}</td>
                    </tr>
                    <tr v-else>
                        <td class="custom">
                            <div class="flex w-full">
                                <div class="w-full">
                                    <div class="flex justify-center" @click=" $router.push({ name: 'User', params: { userName: item.user }, })">
                                        <v-avatar class="cursor" color="gray " size="48">
                                        <v-img class="avatar" :src=" item.avatarImage ? item.avatarImage : require('@/assets/default-user-icon.jpg')"></v-img>
                                        </v-avatar>
                                    </div>
                                    <div @click=" $router.push({ name: 'User', params: { userName: item.user }, })" class="cursor hover:underline text-center mb-2 text-lg" :class="index == 0 && (maxHR.p == item.user || maxMC.p == item.user || maxEK.p == item.user || maxBD.p == item.user || maxTP.p == item.user) ? 'text-red-500' : ''">{{ item.user }}</div>
                                    <v-row no-gutters class="mb-1">
                                        <v-col class="text-right mr-2"> Height reached: </v-col>
                                        <v-col class="text-left"> <b :class="maxHR.p == item.user ? 'text-red-500' : ''">{{ item.heightReached }}</b> </v-col>
                                    </v-row>
                                    <v-row no-gutters class="mb-1">
                                        <v-col class="text-right mr-2"> Money collected: </v-col>
                                        <v-col class="text-left"> <b :class="maxMC.p == item.user ? 'text-red-500' : ''">{{ item.moneyCollected }}</b> </v-col>
                                    </v-row>
                                    <v-row no-gutters class="mb-1">
                                        <v-col class="text-right mr-2"> Enemies killed: </v-col>
                                        <v-col class="text-left"> <b :class="maxEK.p == item.user ? 'text-red-500' : ''">{{ item.enemiesKilled }}</b> </v-col>
                                    </v-row>
                                    <v-row no-gutters class="mb-1">
                                        <v-col class="text-right mr-2"> Boxes destroyed: </v-col>
                                        <v-col class="text-left"> <b :class="maxBD.p == item.user ? 'text-red-500' : ''">{{ item.boxesDestroyed }}</b> </v-col>
                                    </v-row>
                                    <v-row no-gutters class="mb-1">
                                        <v-col class="text-right mr-2"> Time played: </v-col>
                                        <v-col class="text-left"> <b :class="maxTP.p == item.user ? 'text-red-500' : ''">{{ timePlayed(item.timePlayed) }}</b> </v-col>
                                    </v-row>
                                </div>
                            </div>
                        </td>
                    </tr>
                </template>
            </v-data-table>
            <div v-if="list.length>10" class="text-center pt-2">
                <v-pagination
                    color="#EF5350"
                    v-model="page"
                    :length="pageCount"
                ></v-pagination>
            </div>
        </v-col>
        <v-col v-if="!$vuetify.breakpoint.mobile" md="1" lg="1" xl="2"></v-col>
    </v-row>
</template>

<script>
import { Auth, Admin } from "@/services";

export default {
    name: "Scoreboard",
    data () {
      return {
        allUsers: Admin.data.getAllUsers,
        
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        headers: [
          {
            text: 'Players',
            align: 'start',
            sortable: false,
            value: 'user',
          },
          { text: 'Max height reached', value: 'heightReached' },
          { text: 'Money collected', value: 'moneyCollected' },
          { text: 'Enemies killed', value: 'enemiesKilled' },
          { text: 'Boxes destroyed', value: 'boxesDestroyed' },
          { text: 'Time played', value: 'timePlayed' },
        ],
        list: [],
        maxHR:{p:"",v:0}, maxMC:{p:"",v:0}, maxEK:{p:"",v:0}, maxBD:{p:"",v:0}, maxTP:{p:"",v:0}
      }
    }, 
    async mounted() {
        await this.allUsersScore();
    },
    methods: {
        async allUsersScore() {
            let result = await this.allUsers;
            this.maxHR={p:"",v:0}; this.maxMC={p:"",v:0}; this.maxEK={p:"",v:0}; this.maxBD={p:"",v:0}; this.maxTP={p:"",v:0};
            result = result.data.map(obj => ({ username: obj.username, profile: obj.profile }));
            for (let a of result) {
                let avatarImageID = a.profile.avatarImageID;
                a.profile = a.profile.games.filter( a => a.name == "Stranded Away").map(a => a.score);
                a.profile[0].user = a.username;
                let result = await Auth.getImage(avatarImageID);
                a.profile[0].avatarImage = result ? result.data.img : "";
                a.score = a.profile[0];
                delete a.profile;
                delete a.username;
                this.maxHR = this.maxHR.v < a.score.heightReached ? {p: a.score.user, v: a.score.heightReached } : this.maxHR;
                this.maxMC = this.maxMC.v < a.score.moneyCollected ? {p: a.score.user, v: a.score.moneyCollected } : this.maxMC;
                this.maxEK = this.maxEK.v < a.score.enemiesKilled ? {p: a.score.user, v: a.score.enemiesKilled } : this.maxEK;
                this.maxBD = this.maxBD.v < a.score.boxesDestroyed ? {p: a.score.user, v: a.score.boxesDestroyed } : this.maxBD;
                this.maxTP = this.maxTP.v < a.score.timePlayed ? {p: a.score.user, v: a.score.timePlayed } : this.maxTP;
                this.list.push(a.score);
            };
            this.list.sort((a, b) => b.heightReached - a.heightReached)
        },
        timePlayed(e) {
            let s = Math.floor(e % 60).toString();
            let m = Math.floor(e % 3600 / 60).toString();
            let h = Math.floor(e / 3600).toString();
            let d = h>23 ?  Math.floor(h / 24).toString() : 0;
            h = h%24;

            return e>0 ? ((d>0 ? d==1 ? d + ' day ' : d+ ' days ' : '') + (h>0 ? h==1 ? h + ' hour ' : h + ' hours ' : '') + (m>0 ? m==1 ? m + ' minute ' : m + ' minutes ' : '') + (s>0 ? s==1 ? s + ' second ' : s + ' seconds ' : '')) : 'none';
        }
    },
    computed: {
        sortedUsersScore() {
            return this.list;
        },
    },
  }
</script>

<style lang="scss" scoped>
.cursor:hover {
    cursor: url(@/assets/StrandedAway/mouse_point.png), auto;
    animation: cursor 400ms infinite;
    @keyframes cursor {
        0% {
        cursor: url(@/assets/StrandedAway/mouse_point2.png), auto;
        }
        20% {
        cursor: url(@/assets/StrandedAway/mouse_point2.png), auto;
        }
        40% {
        cursor: url(@/assets/StrandedAway/mouse_point2.png), auto;
        }
        60% {
        cursor: url(@/assets/StrandedAway/mouse_point.png), auto;
        }
        80% {
        cursor: url(@/assets/StrandedAway/mouse_point.png), auto;
        }
        100% {
        cursor: url(@/assets/StrandedAway/mouse_point.png), auto;
        }
    }
}
.avatar:hover {
    filter: drop-shadow(1px 0px 0px white) drop-shadow(0px -1px 0px white)
        drop-shadow(0px 1px 0px white) drop-shadow(-1px 0px 0px white);
}
.v-data-table {
    background-color: rgb(2, 10, 14, 0.549) !important;
    border: #020a0e solid 12px;
    border-radius: 12px;
}
.custom {
    width: 1000vh;
}
</style>