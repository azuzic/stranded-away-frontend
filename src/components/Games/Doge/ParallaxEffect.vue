<template>
    <div class="parallax-wrap">
        <span class="span" value="0.5"><v-img class="img" src="@/assets/Doge/4.png"></v-img></span>
        <span class="span" value="-0.8"><v-img class="img" src="@/assets/Doge/3.png"></v-img></span>
        <span class="span" value="1.1"><v-img class="img" src="@/assets/Doge/2.png"></v-img></span>
        <span class="span" value="-1.3"><v-img class="img" src="@/assets/Doge/1.png"></v-img></span>
        <span class="span" value="1.6"><v-img class="img" src="@/assets/Doge/0.png"></v-img></span>
        <div class="slot">
           <slot>
           </slot>    
        </div>
    </div>
</template>

<script>
document.addEventListener("mousemove", parallax);
function parallax(event) {
  this.querySelectorAll(".parallax-wrap .span").forEach((shift) => {
    const position = shift.getAttribute("value");
    const x = (window.innerWidth - event.pageX * position) / 90;
    shift.style.transform = `translateX(${x}px)`;
  });
}
export default {
  name: "ParallaxEffect",
};
</script>

<style lang="scss" scoped>
$img-height: 240vh;
$img-height2: 250vh;
.parallax-wrap {
  position: relative;
  width: 100%;
  min-height: $img-height;
  max-height: $img-height2;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.parallax-wrap div {
  position: relative;
  z-index: 2;
}
.parallax-wrap .span {
  position: absolute;
  height: $img-height;
  max-height: $img-height2;
  border-radius: 100%;
}
.img {
    height: $img-height;
    max-height: $img-height2;
    width: 75%;
    margin-left: 175vh;
}
.slot {
    height: $img-height;
    max-height: $img-height2;
    overflow: scroll;
}
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: transparent;
  }
</style>