<template>
    <div class="flex justify-center">
        <ParallaxEffect>
            <div class="pt-64">
                <p class="text-9xl text-center EHSMB font-bold mb-16"><i>Doge</i></p>
                <div>
                    <expand-text :title="'About'" :hide="false"></expand-text> 
                    <expand-text :title="'About2'" :hide="false"></expand-text> 
                    <expand-text :title="'About3'" :hide="false"></expand-text> 

                    <v-divider class="divider my-8"></v-divider>

                    <p class="text-6xl text-center EHSMB font-bold"><i>OST</i></p>
                    <music-card class="p-32"></music-card>

                    <v-divider class="divider my-8"></v-divider>

                    <p class="text-6xl text-center EHSMB font-bold"><i>GALLERY</i></p>
                    <gallery-doge></gallery-doge>

                    <v-divider class="divider my-8"></v-divider>
                    <expand-text class="mb-64" :title="'DOWNLOAD'" :hide="true"></expand-text> 
                </div>
            </div>
        </ParallaxEffect>
    </div>
</template>

<script>
import ExpandText from './Doge/ExpandText.vue';
import GalleryDoge from './Doge/GalleryDoge.vue';
import MusicCard from './Doge/MusicCard.vue';
import ParallaxEffect from "./Doge/ParallaxEffect.vue";
export default {
    name: "Doge",
    components: { 
        ParallaxEffect,
        ExpandText,
        MusicCard,
        GalleryDoge
    },
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: EHSMB;
  src: url("@/assets/fonts/EHSMB.TTF");
}
.EHSMB {
  font-family: EHSMB;
};
.v-divider {
    background-color: rgba(207, 137, 71, 0.20);
    border-width: 2px;
    border-radius: 16px;
}
</style>