<template>
  <div class="header">
    <div class="header__name">
      <button @click="$emit('onPrevCityClick')" v-if="isArrowButtonsShow">
        <LeftArrowIcon />
      </button>

      <div class="header__name-text">
        {{ cityName }}
      </div>

      <button @click="$emit('onNextCityClick')" v-if="isArrowButtonsShow">
        <RightArrowIcon />
      </button>
    </div>

    <div class="header__settings" @click="$emit('onSettingsClick')">
      <SettingsIcon />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SettingsIcon from '@/components/SvgIcons/SettingsIcon.vue';
import LeftArrowIcon from '@/components/SvgIcons/LeftArrowIcon.vue';
import RightArrowIcon from '@/components/SvgIcons/RightArrowIcon.vue';

export default defineComponent({
  name: 'Header',
  components: {
    SettingsIcon,
    RightArrowIcon,
    LeftArrowIcon
  },

  props: {
    isActiveCityExist: {
      type: Boolean,
      default: false
    },

    isCitiesListMoreThanOne: {
      type: Boolean,
      default: false
    },

    activeCity: {
      type: Object,
      default: {}
    }
  },

  computed: {
    cityName(): string {
      if (this.isActiveCityExist) {
        const { context } = this.activeCity;
        const cityName = this.activeCity.text_en;

        const countryData = context.find((item: any) => item.id.startsWith('country'));
        const country = countryData.short_code.toUpperCase();

        return `${cityName}, ${country}`;
      }

      return '';
    },

    isArrowButtonsShow(): boolean {
      return this.isCitiesListMoreThanOne && this.isActiveCityExist;
    },
  }
})
</script>