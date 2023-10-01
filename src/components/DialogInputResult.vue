<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h5">Result</div>
      </q-card-section>

      <q-card-section>
        <q-select outlined v-model="result" :options="options" autofocus />
      </q-card-section>

      <q-separator dark />

      <!-- buttons example -->
      <q-card-actions align="center">
        <q-btn color="primary" label="Close" outline @click="onDialogCancel" />
        <q-btn color="primary" label="Ok" :disabled="result == null" @click="onDialogOK(result)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDialogPluginComponent } from 'quasar'
// todo: check capacitor dialog config
// https://quasar.dev/vue-components/dialog#cordova-capacitor-back-button

interface Props {
  max?: number
  min?: number
}

const props = withDefaults(defineProps<Props>(), {
  max: 6,
  min: -13
})

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome
const result = ref<number>()
const _options: number[] = []

for (let i = 7; i > -14; i--) {
  _options.push(i)
}

const options = computed(() => _options.filter((o) => o >= props.min && o <= props.max))
</script>
