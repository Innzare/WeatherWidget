<template>
  <div class="settings-wrapper">
    <div class="settings">
      <div class="settings__title">Settings</div>

      <div class="settings__cross" @click="onClose">
        <CrossIcon />
      </div>
    </div>

    <div class="autocomplete-wrapper">
      <div class="autocomplete">
        <Autocomplete :onSearch="onSearch" placeholder="Add city" id="location" @addCity="addCity" />
      </div>

      <EnterIcon />
    </div>

    <div class="locations-wrapper">
      <draggable
        class="list-group"
        handle=".city__drag"
        :component-data="{
          tag: 'ul',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null
        }"
        v-model="myList"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        item-key="order"
      >
        <template #item="{ element }">
          <div class="location" @click="onCityClick(element)">
            <City :city="element" @delete="deleteCity" />
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import draggable from 'vuedraggable';
import { getCities } from '@/services/cities';
import CrossIcon from '@/components/SvgIcons/CrossIcon.vue';
import EnterIcon from '@/components/SvgIcons/EnterIcon.vue';
import Autocomplete from '@/components/Autocomplete';
import City from '@/components/City';

export default defineComponent({
  name: 'Settings',
  components: {
    CrossIcon,
    EnterIcon,
    Autocomplete,
    City,
    draggable
  },

  props: {
    citiesList: {
      type: Array,
      default: []
    }
  },

  data() {
    return {
      drag: false
    };
  },

  methods: {
    onSearch(text: string) {
      return getCities(text);
    },

    onClose() {
      this.$emit('onClose');
    },

    addCity(item: any) {
      this.$emit('addCity', item);
    },

    onCityClick(city: any) {
      this.$emit('onCityClick', city);
    },

    deleteCity(city: any) {
      this.$emit('deleteCity', city);
    }
  },

  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      };
    },

    myList: {
      get() {
        return this.citiesList;
      },
      set(value: any) {
        this.$emit('sortCitiesList', value);
      }
    }
  }
});
</script>