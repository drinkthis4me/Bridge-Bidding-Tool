<template>
  <q-page class="column items-center justify-center">
    <div class="text-h4 text-center">Bidding Tool</div>
    <div class="q-my-md">v1.0.0-alpha</div>
    <q-btn label="Start Bidding" no-caps color="secondary" to="/bidding" size="xl" />
    <div>{{ domInfo }}</div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Device } from '@capacitor/device'

const domInfo = ref('loading')
const logDeviceInfo = async () => {
  const info = await Device.getInfo()
  domInfo.value = JSON.stringify(info)
}
logDeviceInfo()
</script>
