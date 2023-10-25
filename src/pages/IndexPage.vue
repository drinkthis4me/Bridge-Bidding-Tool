<template>
  <q-page class="column items-center justify-center">
    <div class="text-h4 text-center">Bidding Tool</div>
    <div class="q-my-md">v1.0.0-alpha</div>
    <q-btn label="Start Bidding" no-caps color="secondary" to="/bidding" size="xl" />
    <div v-if="deviceInfo" class="q-my-md">Device Info: {{ deviceInfo }}</div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDeviceInfo } from 'src/composables/useDeviceInfo'

const { getDeviceInfo } = useDeviceInfo()

const deviceInfo = ref('')

onMounted(async () => {
  const result = await getDeviceInfo()
  if (result?.osVersion) {
    deviceInfo.value = result.osVersion
  }
})
</script>
