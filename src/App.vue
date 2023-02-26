<template>
  <div class="app-wrapper">
    <Skeleton v-if="isLoading" />

    <transition name="fade">
      <Settings
        v-if="isSettingsOpen"
        :citiesList="citiesList"
        @onClose="isSettingsOpen = false"
        @addCity="addCity"
        @onCityClick="onCityClick"
        @deleteCity="deleteCity"
        @sortCitiesList="sortCitiesList"
      />
    </transition>

    <Header
      v-if="!isLoading"
      :isActiveCityExist="isActiveCityExist"
      :activeCity="activeCity"
      :isCitiesListMoreThanOne="isCitiesListMoreThanOne"
      @onPrevCityClick="onPrevCityClick"
      @onNextCityClick="onNextCityClick"
      @onSettingsClick="isSettingsOpen = true"
    />

    <WeatherInfo
      v-if="!isLoading"
      :weather="weather"
      :isActiveCityExist="isActiveCityExist"
      :activeCity="activeCity"
    />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { IApp } from '@/models/app';
import { getWeather } from '@/services/weather';
import { getCitiesByCoords, getCurrentCity } from '@/services/cities';
import Header from '@/components/Header';
import WeatherInfo from '@/components/WeatherInfo';
import Skeleton from '@/components/Skeleton';
import Settings from '@/components/Settings';

export default defineComponent({
  name: 'App',
  components: {
    WeatherInfo,
    Header,
    Settings,
    Skeleton
  },

  data(): IApp {
    return {
      isLoading: false,
      isSettingsOpen: false,
      citiesList: [],
      activeCity: undefined,
      weather: {
        temperature: 0,
        feelsLike: 0,
        humidity: 0,
        visibility: 0,
        pressure: 0,
        dewPoint: 0,
        windSpeed: 0,
        windDeg: 0,
        description: '',
        icon: ''
      }
    };
  },

  mounted() {
    this.isLoading = true;

    if (localStorage.getItem('citiesList')) {
      try {
        const parsedData: any = localStorage.getItem('citiesList');

        this.citiesList = JSON.parse(parsedData);
      } catch (e) {
        localStorage.removeItem('citiesList');
      }
    }

    if (localStorage.getItem('activeCity')) {
      try {
        const parsedData: any = localStorage.getItem('activeCity');

        this.activeCity = JSON.parse(parsedData);

        this.citiesList = this.citiesList.map((city) => {
          if (city.id === this.activeCity.id) {
            return {
              ...city,
              isActive: true
            };
          }

          return city;
        });
      } catch (e) {
        localStorage.removeItem('activeCity');
      }
    }

    if (this.isActiveCityExist) {
      this.setWeather(this.activeCity);
      this.addCity({ ...this.activeCity, isActive: true });
    } else {
      getCurrentCity({
        enableHighAccuracy: true
      })
        .then((geolocationPosition: any) => {
          const { coords } = geolocationPosition;
          const { latitude, longitude } = coords;

          return getCitiesByCoords(longitude, latitude);
        })
        .then((data) => {
          const { features } = data;
          const currentCity = features[0];

          this.activeCity = currentCity;
          this.addCity({ ...currentCity, isActive: true });
          this.setWeather(currentCity);
        });
    }
  },

  methods: {
    setWeather(city: any) {
      this.isLoading = true;

      getWeather(city).then((response: any) => {
        const { current } = response;
        const { weather, temp, feels_like, humidity, visibility, pressure, dew_point, wind_speed, wind_deg } = current;

        const updatedWeather = {
          temperature: temp,
          feelsLike: feels_like,
          humidity: humidity,
          visibility: visibility,
          pressure: pressure,
          dewPoint: dew_point,
          windSpeed: wind_speed,
          windDeg: wind_deg,
          description: weather[0].description,
          icon: weather[0].icon
        };

        this.weather = updatedWeather;
        this.isLoading = false;
      });
    },

    addCity(item: any) {
      const citiesListIds = this.citiesList.map((city) => city.id);
      const isSameCityAlreadyExist = citiesListIds.includes(item.id);

      const biggerOrder = this.citiesList.reduce((order, city) => {
        return city.order > order ? city.order : order;
      }, 0);

      if (!isSameCityAlreadyExist) {
        this.citiesList = [...this.citiesList, { ...item, order: biggerOrder }];
      }
    },

    deleteCity(city: any) {
      if (this.isActiveCityExist) {
        const isActiveCity = this.activeCity.id === city.id;

        if (isActiveCity) {
          this.activeCity = undefined;
        }
      }

      this.citiesList = this.citiesList.filter((currentCity) => currentCity.id !== city.id);
    },

    setActiveCity(citiesList: any, activeCity: any) {
      return citiesList.map((city: any) => {
        const { id: currentCityId } = city;

        const isCurrentCity = currentCityId === activeCity.id;

        return {
          ...city,
          isActive: isCurrentCity
        };
      });
    },

    onCityClick(city: any) {
      const { id: selectedCityId } = city;
      const isStatusAlreadyActive = city.isActive;

      this.activeCity = isStatusAlreadyActive ? undefined : city;

      this.citiesList = this.citiesList.map((city) => {
        const { id: currentCityId } = city;

        const isCurrentCity = currentCityId === selectedCityId;

        return {
          ...city,
          isActive: isStatusAlreadyActive ? false : isCurrentCity
        };
      });

      if (this.isActiveCityExist) {
        this.setWeather(this.activeCity);
      }
    },

    sortCitiesList(value: any) {
      this.citiesList = value;
    },

    onNextCityClick() {
      if (this.isCitiesListMoreThanOne) {
        const citiesListCount = this.citiesList.length;
        const activeCityIndex = this.citiesList.findIndex((city) => city.id === this.activeCity.id);

        if (citiesListCount === activeCityIndex + 1) {
          const selectedCity = this.citiesList[0];

          this.citiesList = this.setActiveCity(this.citiesList, selectedCity);
          this.activeCity = selectedCity;
          this.setWeather(this.activeCity);

          return;
        }

        const selectedCity = this.citiesList[activeCityIndex + 1];

        this.citiesList = this.setActiveCity(this.citiesList, selectedCity);
        this.activeCity = this.citiesList[activeCityIndex + 1];
        this.setWeather(this.activeCity);
      }
    },

    onPrevCityClick() {
      if (this.isCitiesListMoreThanOne) {
        const citiesListCount = this.citiesList.length;
        const activeCityIndex = this.citiesList.findIndex((city) => city.id === this.activeCity.id);

        if (activeCityIndex === 0) {
          const selectedCity = this.citiesList[citiesListCount - 1];

          this.citiesList = this.setActiveCity(this.citiesList, selectedCity);
          this.activeCity = selectedCity;
          this.setWeather(this.activeCity);

          return;
        }

        const selectedCity = this.citiesList[activeCityIndex - 1];

        this.citiesList = this.setActiveCity(this.citiesList, selectedCity);
        this.activeCity = this.citiesList[activeCityIndex - 1];
        this.setWeather(this.activeCity);
      }
    }
  },

  computed: {
    isActiveCityExist(): boolean {
      return typeof this.activeCity !== 'undefined';
    },

    isCitiesListMoreThanOne(): boolean {
      return this.citiesList.length > 1;
    },
  },

  watch: {
    citiesList() {
      const parsed = JSON.stringify(this.citiesList);
      localStorage.setItem('citiesList', parsed);
    },

    activeCity() {
      const parsed = JSON.stringify(this.activeCity);
      localStorage.setItem('activeCity', parsed);
    }
  }
});
</script>

<style lang='scss'>
@import "@/assets/styles/main.scss";
</style>