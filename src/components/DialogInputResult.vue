<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h5">Result</div>
      </q-card-section>

      <q-card-section>
        <q-select
          outlined
          autofocus
          v-model="_result"
          :options="options"
          options-selected-class="text-white bg-secondary"
        />
      </q-card-section>

      <q-separator dark />

      <q-card-actions align="right">
        <q-btn color="primary" label="Close" flat @click="onDialogCancel" />
        <q-btn
          color="primary"
          label="Ok"
          :disabled="_result == null"
          @click="onDialogOK(_result)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import { QSelect } from 'quasar'
interface Props {
  max?: number
  min?: number
  result?: number
}

const props = defineProps<Props>()

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
const _result = ref<number>(0)

const options = computed(() => {
  const _options: number[] = []
  const max = props.max ?? 6
  const min = props.min ?? -13

  for (let i = max; i > min; i--) {
    _options.push(i)
  }

  return _options
})

onMounted(() => {
  if (props.result !== undefined) {
    _result.value = props.result
  }
})
</script>
