<template>
  <div class="control-sub full-width bg-cyan-2">
    <q-btn
      class="full-width q-mb-md"
      icon="mdi-arrow-u-left-top"
      label="Undo"
      size="xl"
      color="grey-4"
      text-color="black"
      :disable="biddingStore.bidIndex < 1"
      @click="biddingStore.undo"
    />
    <q-btn
      class="full-width q-mb-md"
      icon="mdi-clipboard-edit-outline"
      :label="labelResult"
      no-caps
      no-wrap
      size="xl"
      color="grey-4"
      text-color="black"
      @click="openInputDialog"
    />
    <q-btn
      class="full-width"
      icon="mdi-skip-next"
      label="Next Hand"
      no-caps
      size="xl"
      color="yellow"
      text-color="black"
      @click="onNextClick"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useBiddingStore } from 'src/stores/useBiddingStore'
import { useHistoryStore } from 'src/stores/useHistoryStore'
import { useBoardStateStore } from 'stores/useBoardStateStore'
import DialogInputResult from 'src/components/DialogInputResult.vue'

const $q = useQuasar()
const biddingStore = useBiddingStore()
const historyStore = useHistoryStore()
const boardStateStore = useBoardStateStore()

const result = ref<number | null>(null)

const labelResult = computed(() => {
  if (result.value === null) {
    return 'Result (optional)'
  }
  if (result.value >= 0) {
    return `Result: +${result.value}`
  } else {
    return `Result: ${result.value}`
  }
})

const resultLimit = computed(() => {
  let max = 6
  let min = -13
  const level = biddingStore.lastProactiveBid?.level
  if (level) {
    max = 7 - level
    min = max - 13
  }
  return {
    max,
    min
  }
})

function openInputDialog() {
  // todo : https://quasar.dev/quasar-plugins/dialog#cordova-capacitor-back-button
  // todo: use custom dialog component with select
  $q.dialog({
    component: DialogInputResult,
    componentProps: {
      max: resultLimit.value.max,
      min: resultLimit.value.min
    }
  }).onOk((payload) => {
    // save payload to local
    result.value = Number(payload)
  })
}

function onNextClick() {
  // save to history store
  if (result.value !== null) {
    historyStore.pushNewHistory(result.value)
  } else {
    historyStore.pushNewHistory()
  }
  // go to next hand
  boardStateStore.incrementHandNo()
  // reset
  biddingStore.reset()
  result.value = null
}
</script>

<style scoped lang="scss">
.control-sub {
  border: 1px solid black;
}
</style>
