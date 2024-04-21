<script lang="ts" setup>
// @ts-ignore
import { Line as ChartJsLine } from 'vue-chartjs';
import 'chartjs-adapter-moment';
import {
  Chart as ChartJS,
  Tooltip,
  LineElement,
  CategoryScale,
  PointElement,
  LinearScale,
  TimeScale,
  type ChartData,
  type ScatterDataPoint,
  type ChartOptions,
} from 'chart.js';



const { params } = useRoute();
const { nodeId } = params;

const { data: node, status: nodeStatus } = useFetch<{[key: string]: any}>(`/api/nodes/${nodeId}`, {
  headers: await getAuthHeaders(),
});

const { data: telemetry, status: telemetryStatus } = useFetch<{data: {[key: string]: any}, [key: string]: any}[]>(`/api/telemetry/${nodeId}`, {
  headers: await getAuthHeaders(),
});

const lastTelemetry = computed(() => telemetry.value?.at(telemetry.value?.length - 1));

ChartJS.register(Tooltip, LineElement, LinearScale, CategoryScale, PointElement, TimeScale);

const chartOptions = {
  responsive: true,
  yAxes: [{
    gridLines: {
        zeroLineColor: 'white'
    }
}],
  scales: {
    x: {
      type: 'time',
      adapters: { 
        date: {
          locale: 'sl', 
        },
      }, 
      grid: {
        borderColor: '#ffffff50',
        color: '#ffffff30',
      },
    },
    y: {
      grid: {
        borderColor: '#ffffff50',
        color: '#ffffff30',
      },
    },
  },
  tension: 0.4,
} as ChartOptions;

onMounted(async () => {
  await nextTick();
});

const chartData = computed<{[key: string]: any}>(() => {
  const keys = Object.keys(telemetry.value?.at(0)?.data || {});
  
  const data = keys.reduce((acc, curr) => ({
    ...acc,
    [curr]: {
      labels: telemetry.value?.map((e) => new Date(e.timestamp).getTime()),
      datasets: [{
        label: capitalize(curr),
        borderColor: 'white',
        data: (telemetry.value ?? []).map((e) => e.data[curr]),
        fill: 'origin',
        pointBorderColor: 'transparent',
        pointBackgroundColor: 'transparent',
      }],
    },
  }), {});

  console.log(data);
  
  return data;
   
 
});



</script>

<template>
  <LayoutPageWrapper :is-narrow="true" v-if="nodeStatus === 'success'">
    <GoBackButton to="/home" />
    <LayoutPageTitle title="Node" />

    <LayoutCategoryPanel :title="node?.label">
      <template #buttons v-if="telemetryStatus === 'success'">
        <LastSeen :timestamp="lastTelemetry?.timestamp" />
      </template>
      <p>Last update: {{ new Date(lastTelemetry?.timestamp).toLocaleString('sl') }}</p>
      <p class="property" v-for="key in Object.keys(lastTelemetry?.data || {})">
        <b>{{ key }}</b>: {{ lastTelemetry?.data[key] || 'N/A' }}
      </p>
    </LayoutCategoryPanel>

    <LayoutCategoryPanel :title="key" v-for="key in Object.keys(telemetry?.at(0)?.data || {})" class="telemetry-data" >
      <ChartJsLine
        v-if="telemetryStatus === 'success'"
        :chart-options="chartOptions"
        :chart-data="chartData != null && chartData ? (chartData[key] as {[key: string]: any}) : {}"
      />
    </LayoutCategoryPanel>
  </LayoutPageWrapper>
</template>

<style lang="scss" scoped>
.property {
  margin-top: 0.5rem;
  text-transform: capitalize;
}

:deep(.telemetry-data.category h1) {
  text-transform: capitalize;
}
</style>