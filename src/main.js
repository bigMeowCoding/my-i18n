
import { createApp } from 'vue';
import App from './App.vue';
import i18next from 'i18next';
import I18NextVue from "i18next-vue";
import en from './i18n/en.json';
import zh from './i18n/zh.json';


i18next.init({
  resources: {
    en: {
      translation: en
    },
    zh: {
      translation: zh
    }
  },
  lng: 'en', // $t('$t('$t('默认语言')')')
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false // Vue already does escaping
  }
});

const app = createApp(App);
app.use(I18NextVue, { i18next })
app.mount('#app');
