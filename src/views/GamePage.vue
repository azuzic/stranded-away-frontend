<template>
    <div class="min-h-screen">   
        <component :is="dynamicComponent"></component>
    </div>
</template>

<script>
import StrandedAway from '@/components/Games/StrandedAway.vue';
import Doge from '@/components/Games/Doge.vue';

export default {
	components: { StrandedAway, Doge },
    name: "GamePage",
    computed: {
        dynamicComponent() {
            return this.$route.params.gameName;
        }
    }
}
</script>