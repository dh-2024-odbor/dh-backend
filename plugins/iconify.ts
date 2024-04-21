import { Icon } from '@iconify/vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use((app) => {
    app.component('Icon', Icon);
  });
});
