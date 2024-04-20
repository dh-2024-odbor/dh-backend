<script lang="ts" setup>
import { useAuth0 } from '@auth0/auth0-vue';

const { loginWithRedirect, logout: auth0Logout, user, isAuthenticated } = useAuth0();

const login = () => {
  loginWithRedirect();
}

const logout = () => {
  auth0Logout({ logoutParams: { returnTo: window.location.origin } });
}

</script>


<template>
  <LayoutPageWrapper :is-narrow="true">
    <LayoutPageTitle title="Welcome!" />

    <LayoutCategoryPanel v-if="!isAuthenticated" title="Log in to continue">
      <template #buttons>
        <InputPrimaryButton @click="logout" v-if="isAuthenticated">Logout</InputPrimaryButton>
        <InputPrimaryButton @click="login" v-else>Login</InputPrimaryButton>
      </template>
    </LayoutCategoryPanel>

    <LayoutCategoryPanel v-if="isAuthenticated" :title="`Welcome, ${user?.name}`">
      <template #buttons>
        <InputPrimaryButton @click="logout" v-if="isAuthenticated">Logout</InputPrimaryButton>
      </template>
    </LayoutCategoryPanel>
  </LayoutPageWrapper>
</template>

<style>

</style>