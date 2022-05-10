<template>
  <div> 
      <div class="title-carousel">
        <SimpleCarousel :itemsPerView=1 :autoplay=true :autoplayTimeout=10000>
            <div><img src="@/assets/game_images/GameScreenshot_1.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_29.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_16.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_14.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_19.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_28.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_7.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_21.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_4.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_26.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_25.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_6.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_24.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_15.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_23.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_8.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_22.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_9.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_10.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_21.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_11.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_12.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_13.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_18.png"></div>
            <div><img src="@/assets/game_images/GameScreenshot_17.png"></div>
        </SimpleCarousel>
        <div class="center flex absolute justify-center">
            <img class="img mr-6" src="@/assets/Stranded_Away_Icon.png">
            <div class="h-full justify-center align-text-bottom align-end flex-end mt-12">
                    <div>Stranded</div> 
                    <div class="-mt-14 ml-3">Away</div>  
            </div>
        </div>
        <div class="over"></div>
      </div>
  </div>
</template>

<script>
import SimpleCarousel from "vue2-simple-carousel";

export default {
  name: "Home",
  components: {
      SimpleCarousel
  },
  data: () => ({}),
};
</script>

<style lang="scss" scoped>
@font-face { font-family: pdark; src: url('@/assets/fonts/pdark.ttf');}
.title-carousel {
    position: relative;
    height: 100%;
    .center {
        color: white;
        width: 100%;
        top: 30%;
        font-size: 100px;
        font-family: pdark;
        z-index: 10000;
        filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.75));
    }
    .img {
        height: 251px;
    }
}

.over {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(172, 255, 47, 0);
}

</style>
