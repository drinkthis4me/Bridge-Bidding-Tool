<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h5">Device Info</div>
      </q-card-section>

      <q-card-section v-if="deviceInfo">
        <div v-for="(item, idx) in deviceInfo" :key="(item as string)">{{ idx }} - {{ item }}</div>
      </q-card-section>
      <q-card-section v-else> Cannot get device info </q-card-section>

      <q-separator dark />

      <q-card-actions align="right">
        <q-btn color="primary" label="Close" flat @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { DeviceInfo } from '@capacitor/device'

interface Props {
  deviceInfo: DeviceInfo | undefined
}

defineProps<Props>()

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome
</script>
