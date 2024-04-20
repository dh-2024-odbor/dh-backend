<script lang="ts" setup>
import { useAuth0 } from '@auth0/auth0-vue';


const { loginWithRedirect,  isAuthenticated } = useAuth0();

const login = async () => {
  await loginWithRedirect();
} 


const maybeLogin = () => {
 if (isAuthenticated.value) {
    console.log('redirecting to home');
    navigateTo('/home');
  }
}

onMounted(() => {
  maybeLogin();
});

onUpdated(() => {
  maybeLogin();
})

</script>


<template>
  <LayoutPageWrapper :is-narrow="true">
    <LayoutPageTitle title="DragonHack 2024 - Odbor" />
    <LayoutCategoryPanel title="Log in to continue">
      <template #buttons>
        <InputPrimaryButton @click="login">Login</InputPrimaryButton>
      </template>
    </LayoutCategoryPanel>

  </LayoutPageWrapper>
</template>

<style>

</style>