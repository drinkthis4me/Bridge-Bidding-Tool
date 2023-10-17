<template>
  <q-page padding>
    <main>
      <div class="text-h4 q-pa-md">Settings</div>
      <q-list bordered padding>
        <q-item-label header class="text-capitalize">Input method</q-item-label>
        <q-item
          v-for="(option, idx) in inputMethodOptions"
          :key="option.value"
          tag="label"
          v-ripple
        >
          <q-item-section>
            <q-item-label class="text-capitalize">{{ option.label }}</q-item-label>
            <q-item-label v-if="idx === 2" caption>Click on confirm button to submit</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-radio v-model="settings.inputMethod" :val="option.value" />
          </q-item-section>
        </q-item>

        <q-separator spaced />

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label class="text-capitalize">Screen always on</q-item-label>
            <q-item-label caption>Prevent screen from sleeping</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle
              v-model="settings.isScreenAlwaysOn"
              color="primary"
              keep-color
              @update:model-value="(val) => onScreenOnClick(val as boolean)"
            />
          </q-item-section>
        </q-item>

        <q-separator spaced />

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label class="text-capitalize">Sound effect</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle v-model="settings.isSoundOn" color="primary" keep-color />
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section side>
            <q-icon name="mdi-volume-low" />
          </q-item-section>
          <q-item-section>
            <q-slider
              v-model="settings.volume"
              :min="0"
              :max="1"
              :step="0.05"
              :disable="!settings.isSoundOn"
              @change="(val) => playBeep(val)"
            />
          </q-item-section>
          <q-item-section side>
            <q-icon name="mdi-volume-high" />
          </q-item-section>
        </q-item>

        <q-separator spaced />

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label class="text-capitalize">Haptic feedback</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle
              v-model="settings.isVibrationOn"
              color="primary"
              keep-color
              @update:model-value="onVibrationClick"
            />
          </q-item-section>
        </q-item>

        <q-separator spaced />

        <q-item tag="label" v-ripple @click="onResetClick">
          <q-item-section>
            <q-item-label class="text-capitalize">Reset settings</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </main>
  </q-page>
</template>

<script setup lang="ts">
import { onUpdated } from 'vue'
import { storeToRefs } from 'pinia'
import { useEnvironmentStore } from 'src/stores/useEnvironmentStore'
import { useQuasar } from 'quasar'
import { usePlayAudio } from 'src/composables/usePlayAudio'
import { useCapacitorHaptics } from 'src/composables/useCapacitorHaptics'
import { useCapacitorKeepAwake } from 'src/composables/useCapacitorKeepAwake'

const environmentStore = useEnvironmentStore()
const { settings } = storeToRefs(environmentStore)
const $q = useQuasar()
const { hapticsNotification, NotificationType } = useCapacitorHaptics()
const { playBeep } = usePlayAudio()
const { changeKeepAwake } = useCapacitorKeepAwake()

const inputMethodOptions = [
  { value: 'single', label: 'Single click' },
  { value: 'double', label: 'Double click' },
  { value: 'button', label: 'Confirm button' }
]

async function onVibrationClick() {
  hapticsNotification(NotificationType.Success)
}

async function onScreenOnClick(val: boolean) {
  changeKeepAwake(val)
}

function onResetClick() {
  $q.dialog({
    title: 'Confirm',
    message: 'Reset all settings?',
    ok: {
      color: 'negative'
    },
    cancel: true
  }).onOk(() => {
    environmentStore.reset()
  })
}

onUpdated(() => {
  environmentStore.save()
})
</script>
