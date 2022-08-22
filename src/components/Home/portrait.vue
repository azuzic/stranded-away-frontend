<template>
    <div>
        <router-link :to="{ name: 'User', params: { userName: userName } }">
        <figure>
            <v-tooltip bottom color="#EF5350">
            <template v-slot:activator="{ on, attrs }">
                <v-img
                class="align-end portret"
                height="294px"
                width="294px"
                :src="require('@/assets/' + imageSrc)"
                v-bind="attrs"
                v-on="on"
                >
                </v-img>
            </template>
            <span>{{name}}</span>
            </v-tooltip>
        </figure>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "portrait",
    props: ["userName", "imageSrc", "name"],
}
</script>

<style lang="scss" scoped>
.portret {
    image-rendering: pixelated;
    &:hover {
    cursor: pointer;
    filter: drop-shadow(4px 0px 0px white) drop-shadow(0px -4px 0px white)
        drop-shadow(0px 4px 0px white) drop-shadow(-4px 0px 0px white);
    }
}
</style>