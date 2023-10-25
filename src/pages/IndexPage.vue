<template>
  <q-page class="column items-center justify-center">
    <div class="text-h4 text-center">Bidding Tool</div>
    <div class="q-my-md">v1.0.0-alpha</div>
    <q-btn
      label="Device Info"
      no-caps
      outline
      color="primary"
      class="q-mb-md"
      @click="openDeviceInfoDialog"
    />
    <q-btn label="Start Bidding" no-caps color="secondary" to="/bidding" size="xl" />
  </q-page>
</template>

<script setup lang="ts">
import { useDeviceInfo } from 'src/composables/useDeviceInfo'
import { useQuasar } from 'quasar'
import DialogDeviceInfo from 'src/components/DialogDeviceInfo.vue'

const $q = useQuasar()
const { getDeviceInfo } = useDeviceInfo()

async function openDeviceInfoDialog() {
  const result = await getDeviceInfo()

  $q.dialog({
    component: DialogDeviceInfo,
    componentProps: {
      deviceInfo: result
    }
  })
}
</script>
