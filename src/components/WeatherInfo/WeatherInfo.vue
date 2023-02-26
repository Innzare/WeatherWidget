<template>
    <div class="content">
      <div v-if="isActiveCityExist">
        <div class="weather">
          <div class="weather__img">
            <img :src="weatherIconLink" alt="Weather icon" />
          </div>

          <div class="weather__temp">{{ temperature }}&deg;C</div>
        </div>

        <div class="description">
          <p>{{ weatherDescription }}</p>
        </div>

        <div class="parameters-wrapper">
          <div class="parameters-column">
          <div class="parameters">
            <LocationIcon />
            {{ weather.windSpeed }} m/s {{ windDirection }}
          </div>

          <div class="parameters">Humidity: {{ weather.humidity }}%</div>

          <div class="parameters">Visibility: {{ visibility }}km</div>
        </div>

        <div class="parameters-column">
          <div class="parameters">
            <CompassIcon />
            {{ weather.pressure }} hPa
          </div>

          <div class="parameters">Dew point: {{ dewPoint }}&deg;C</div>
        </div>
        </div>
      </div>

      <EmptyLocation v-else />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getImgApi } from '@/helpers/api';
import { getWindDirection } from '@/helpers/weather';
import EmptyLocation from '@/components/EmptyLocation';
import LocationIcon from '@/components/SvgIcons/LocationIcon.vue';
import CompassIcon from '@/components/SvgIcons/CompassIcon.vue';

export default defineComponent({
  name: 'WeatherInfo',
  components: {
    EmptyLocation,
    LocationIcon,
    CompassIcon
  },

  props: {
    weather: {
      type: Object,
      required: true
    },

    isActiveCityExist: {
      type: Boolean,
      default: false
    },

    activeCity: {
      type: Object,
      default: {}
    }
  },

  computed: {
    weatherIconLink(): string {
      return getImgApi(this.weather.icon);
    },

    temperature(): number {
      return Math.round(this.weather.temperature);
    },

    feelsLike(): number {
      return Math.round(this.weather.feelsLike);
    },

    dewPoint(): number {
      return Math.round(this.weather.dewPoint);
    },

    description(): string {
      return this.weather.description.slice(0, 1).toUpperCase() + this.weather.description.slice(1);
    },

    weatherDescription(): string {
      return `Feels like ${this.feelsLike}°C. ${this.description}.`;
    },

    visibility(): string {
      const visibilityKilometers: number = this.weather.visibility / 1000;
      return visibilityKilometers.toFixed(1);
    },

    parameters(): string {
      return '';
    },

    windDirection(): string {
      return getWindDirection(this.weather.windDeg);
    }
  }
})
</script>