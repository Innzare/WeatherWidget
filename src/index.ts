import { defineCustomElement } from 'vue';
import App from '@/App.vue';
import '@/assets/styles/main.scss';

customElements.define('weather-widget', defineCustomElement(App))