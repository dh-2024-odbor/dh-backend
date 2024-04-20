<script lang="ts" setup>
import { useAuth0 } from '@auth0/auth0-vue';

definePageMeta({
  middleware: ['auth']
});

const { logout: auth0Logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0();

const logout = () => {
  auth0Logout({ logoutParams: { returnTo: window.location.origin } });
}

const telemetryData = await useFetch('/api/data', {
  headers: {
    Authorization: `Bearer ${await getAccessTokenSilently()}`
  }
});

</script>


<template>
  <LayoutPageWrapper :is-narrow="true">
    <LayoutPageTitle title="Welcome!" />

    <LayoutCategoryPanel v-if="isAuthenticated" :title="`Welcome, ${user?.name}`">
      <template #buttons>
        <InputPrimaryButton @click="logout">Logout</InputPrimaryButton>
      </template>
    </LayoutCategoryPanel>


    <LayoutCategoryPanel v-if="isAuthenticated" title="Data">
      <template #buttons>
      </template>
      <p>{{ telemetryData.data ?? '' }}</p>
    </LayoutCategoryPanel>


  </LayoutPageWrapper>
</template>

<style>

</style>