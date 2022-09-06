<template>
<div class="h-screen w-full overflow-y-scroll">
    <!--Upload new image dialog-->
    <v-dialog transition="dialog-top-transition" max-width="1200">
        <template v-slot:activator="{ on, attrs }">
            <div class="w-full flex justify-center z-20 sticky top-0">
                <div class="text-center sticky w-full top-0 z-10 pt-4 bg-footer-header drop-shadow-lg">
                    <h1 class="text-3xl">Current Carousel Images</h1>
                    <p>Drag images to change their order</p>
                    <v-btn class="mb-6" color="error" v-bind="attrs" v-on="on">Upload new image</v-btn>
                </div>
            </div>
        </template>
        <template v-slot:default="imageUploadDialog">
            <v-card dark>
                <v-img class="flex justify-center items-center" :src=" carouselImagePreview ? carouselImagePreview : require('@/assets/cards/placeholder.jpg')">
                    <v-file-input 
                        type="file" 
                        ref="file" 
                        class="justify-center" 
                        hide-input 
                        @change="previewCarouselImage()" 
                        accept="image/png, image/jpeg, image/bmp" 
                        placeholder="Pick an avatar" 
                        prepend-icon="mdi-image-plus" 
                        label="CoverImage" 
                        v-model="carouselImageUpload" 
                        dark>
                    </v-file-input>
                </v-img>
                <v-card-actions class="justify-end">
                    <v-btn text @click="imageUploadDialog.value = false">Close</v-btn>
                    <v-btn text @click="uploadNewCarouselImage()">Upload</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
    <!--/Upload new image dialog-->
    <!--Draggable images-->
    <draggable v-model="rows" class="sortable-list h-full w-full p-8">
        <v-flex v-for="row in rows" :key="row.index" class="sortable">
            <draggable :list="row.items" :group="{ name: 'row' }" class="row justify-center">
                <v-col :cols="width" v-for="item in allCarouselPictures" :key="item._id">
                    <v-img class="rounded-md"  aspect-ratio="2" :src="item.url"> </v-img>
                </v-col>
                
            </draggable>
        </v-flex>
    </draggable>
    <!--/Draggable images-->
</div>
</template>

<script>
import store from "@/store";
import { Admin } from "@/services";
import draggable from "vuedraggable";
import router from "@/router";

export default {
    name: "carouselEditor",
    components: {
        draggable,
    },
    data: () => ({
        //Vue draggable
        imageUploadDialog: false,
        carouselPictures: Admin.data.getCarouselPictures,
        enabled: true,
        rows: [
        {
            index: 1,
            items: store.carouselPictures,
        },
        ],
        //New image upload
        carouselImageUpload: [],
        carouselImagePreview: "",
    }),
    methods: {
        async encodeImageFileAsURL(file) {
            let reader = new FileReader();
            return await new Promise((resolve, reject) => {
            reader.onloadend = async () => {
                try {
                let response = reader.result;
                resolve(response);
                } catch (err) {
                reject(err);
                }
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(file);
            });
        },
        //Carousel image upload//
        previewCarouselImage() {
            this.carouselImagePreview = URL.createObjectURL(this.carouselImageUpload);
        },
        async uploadNewCarouselImage() {
            let base64_string = await this.encodeImageFileAsURL(
            this.carouselImageUpload
            );

            let result = await Admin.uploadImage(base64_string, "carouselPictures");
            if (result.status == 201) router.go();
        },
    },
    asyncComputed: {
        async allCarouselPictures() {
            let result = await this.carouselPictures;
            return result.data;
        },
        width() {
            switch (this.$vuetify.breakpoint.name) {
                case "xs":
                return 12;
                case "sm":
                return 12;
                case "md":
                return 6;
                case "lg":
                return 4;
                case "xl":
                return 4;
            }
        },
    },
}
</script>