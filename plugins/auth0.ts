import { createAuth0 } from '@auth0/auth0-vue'; 

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(
    createAuth0({
      domain: "dh-2024-odbor.eu.auth0.com",
      clientId: "MvJEdXwqZBOmk3q9t30eXyoiVdrju55S",
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  );
});