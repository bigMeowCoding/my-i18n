import { createI18n } from "vue-i18n";

import { createApp } from "vue";
import App from "./App.vue";
import en from "./i18n/en.json";
import zh from "./i18n/zh.json";
const messages = {
  en: {
    ...en,
  },
  zh: {
      ...zh
  },
};

const app = createApp(App);
const i18n = createI18n({
  locale: "zh",
  legacy: false,
  messages,
});

app.use(i18n);
debugger
window.$t = i18n.global.t;
app.mount("#app");
