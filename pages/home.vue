<script lang="ts" setup>
import { useAuth0 } from '@auth0/auth0-vue';
import type { NodeDetails } from '~/types/telemetry';

definePageMeta({
  middleware: ['auth']
});

const { logout: auth0Logout, user } = useAuth0();

const logout = () => {
  auth0Logout({ logoutParams: { returnTo: window.location.origin } });
}

const { data: nodes } = useFetch<{[key: string]: any}[]>('/api/nodes', {
  headers: await getAuthHeaders(),
});

</script>


<template>
  <LayoutPageWrapper :is-narrow="true">
    <LayoutPageTitle title="Welcome!" />

    <LayoutCategoryPanel :title="`Welcome, ${user?.name}`">
      <template #buttons>
        <InputPrimaryButton @click="logout">Logout</InputPrimaryButton>
      </template>
    </LayoutCategoryPanel>

    <LayoutPageTitle title="Nodes" />

    <LayoutCategoryPanel v-for="node in nodes" :title="node.label">
      <template #buttons>
        <LastSeen :timestamp="node?.telemetry?.timestamp" />
        <InputPrimaryButton @click="() => $router.push(`/nodes/${node.nodeId}`)">View</InputPrimaryButton>
      </template>

      <p>Last update: {{ new Date(node?.telemetry?.timestamp).toLocaleString('sl') }}</p>
      
      <p class="property" v-for="key in Object.keys(node?.telemetry?.data || {})">
       <b>{{ key }}</b>: {{ node?.telemetry?.data[key] }}
      </p>
    </LayoutCategoryPanel>


  </LayoutPageWrapper>
</template>

<style lang="scss" scoped>
.property {
  margin-top: 0.5rem;
  text-transform: capitalize;
}

</style>