<template>
  <div class="city" :class="{ city__active: city.isActive }" ref="location">
    <div class="city__text-wrapper">
      <div>
        <BurgerIcon class="city__drag" @click.stop="" @dragstart.stop="" />
      </div>

      <div class="city__text">
        {{ cityName }}
      </div>
    </div>

    <div>
      <TrashIcon @click.stop="onDeleteCityClick" />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import BurgerIcon from '../SvgIcons/BurgerIcon.vue';
import TrashIcon from '../SvgIcons/TrashIcon.vue';

export default defineComponent({
  name: 'City',

  components: {
    BurgerIcon,
    TrashIcon
  },

  props: {
    city: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      dx: 0,
      dy: 0
    };
  },

  methods: {
    onDeleteCityClick() {
      this.$emit('delete', this.city);
    },

    dragStart(event: any) {
      const draggedItem: any = this.$refs.location;

      this.dx = event.clientX - draggedItem.getBoundingClientRect().x;
      this.dy = event.clientY - draggedItem.getBoundingClientRect().y;

      draggedItem.style.position = 'absolute';
    },

    drag(event: any) {
      const draggedItem: any = this.$refs.location;

      draggedItem.style.left = event.ClientX - this.dx;
      draggedItem.style.top = event.ClientY - this.dy;
    }
  },

  computed: {
    cityName(): string {
      const { context } = this.city;
      const cityName = this.city.text_en;

      const countryData = context.find((item: any) => item.id.startsWith('country'));
      const country = countryData.short_code.toUpperCase();

      return `${cityName}, ${country}`;
    }
  }
});
</script>