<template>
    <div>
        <div class="page-bg"></div>
        <div class="animation-wrapper">
            <div class="particle particle-1"></div>
            <div class="particle particle-2"></div>
            <div class="particle particle-3"></div>
            <div class="particle particle-4"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: "ParticleEffectWind",
};
</script>

<style lang="scss" scoped>
/* Config */
$color-bg: #1e1e1e00;
$color-particle: rgb(random(165), random(151), random(151));
$spacing: 2560px;
$time-1: 60s;
$time-2: 120s;
$time-3: 180s;
$time-4: 200s;

/* mixins */
@function particles($max) {
  $val: 0px 0px $color-particle;
  @for $i from 1 through $max {
    $val: #{$val}, random($spacing)+px random($spacing)+px rgb(random(165), random(151), random(151));
  }
  @return $val;
}

@mixin particles($max) {
  box-shadow: particles($max);
  border-radius: 50%;
}

.page-bg, .animation-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.particle, .particle:after {
  background: transparent;
}

.particle:after {
  position: absolute;
  content: "";
  top: $spacing;
}

.particle-1 {
  animation: animParticle $time-1 linear infinite;
  @include particles(600);
  height: 2px;
  width: 2px;
}

.particle-1:after {
  @include particles(500);
  height: 2px;
  width: 2px;
}

.particle-2 {
  animation: animParticle $time-2 linear infinite;
  @include particles(400);
  height: 2px;
  width: 2px;
}

.particle-2:after {
  @include particles(100);
  height: 3px;
  width: 3px;
}

.particle-3:after {
  @include particles(700);
  height: 3px;
  width: 3px;
  border-radius: 50%;
}

.particle-4 {
  animation: animParticle $time-4 linear infinite;
  @include particles(800);
  height: 1px;
  width: 1px;
}

.particle-4:after {
  @include particles(300);
  height: 1px;
  width: 1px;
}

@keyframes animParticle {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX($spacing * -1);
  }
}
</style>