<template>
  <div class="field-group">
    <div class="input-wrapper">
      <input @input="onChange" v-model="value" :id="id" type="text" required autocomplete="off" />
      <label :for="id">{{ placeholder }}</label>

      <Loader class="input-loader" v-if="isLoading" />
    </div>

    <div class="dropdown" v-if="isOpen">
      <ul>
        <li v-for="item in itemsList" :key="item.id" @click="onItemClick(item)">
          {{ typeof item.matching_place_name !== 'undefined' ? item.matching_place_name : item.place_name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Loader from '@/components/Loader';

export default defineComponent({
  name: 'Autocomplete',

  components: {
    Loader
  },

  props: {
    onSearch: {
      type: Function,
      default: () => {},
      required: true
    },
    placeholder: {
      type: String,
      default: '',
      required: false
    },
    id: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      value: '',
      itemsList: [] as any,
      isOpen: false,
      isLoading: false
    };
  },

  methods: {
    onChange(event: any) {
      this.isLoading = true;

      const value = event.target.value;

      if (value !== '') {
        this.onSearch(value).then((response: any) => {
          const { features } = response;
          const isFeaturesExist = features.length > 0;

          this.isOpen = isFeaturesExist;

          this.itemsList = features;

          this.isLoading = false;

          document.addEventListener('click', this.closeDropdown);
        });
      } else {
        this.closeDropdown();
        this.isLoading = false;
      }
    },

    onItemClick(item: any) {
      this.$emit('addCity', item);

      this.isOpen = false;
      this.value = '';

      document.removeEventListener('click', this.closeDropdown);
    },

    closeDropdown() {
      this.isOpen = false;

      document.removeEventListener('click', this.closeDropdown);
    }
  }
});
</script>
