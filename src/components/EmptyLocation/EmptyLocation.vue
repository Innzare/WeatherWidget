<template>
  <div class="location-empty">
    <WeatherIcon />

    <div class="location-empty__text">Select location</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WeatherIcon from '@/components/SvgIcons/WeatherIcon.vue';

export default defineComponent({
  name: 'EmptyLocation',
  components: {
    WeatherIcon
  }
})
</script>