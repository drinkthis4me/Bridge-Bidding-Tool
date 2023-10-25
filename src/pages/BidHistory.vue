<template>
  <q-page padding class="my-page">
    <div class="column">
      <div class="col q-my-md text-center">
        <q-btn
          class="full-width"
          label="Back"
          color="secondary"
          size="lg"
          @click="$router.go(-1)"
        />
        <q-btn
          v-show="historyStore.histories.length"
          class="full-width text-capitalize"
          label="Delete all"
          no-caps
          color="negative"
          size="lg"
          @click="onClearClick"
        />
      </div>
      <div class="col">
        <q-list v-if="historyStore.histories.length > 0">
          <q-item v-for="item in historyStore.histories" :key="item.handNo">
            <HistoryCard :history="item" />
          </q-item>
        </q-list>
        <div v-else class="text-center bg-white q-pa-md">
          History is empty.<br />
          Go play some cards!
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { useBiddingStore } from 'src/stores/useBiddingStore'
import { useBoardStateStore } from 'src/stores/useBoardStateStore'
import { useHistoryStore } from 'src/stores/useHistoryStore'
import HistoryCard from 'src/components/HistoryCard.vue'

const $q = useQuasar()
const biddingStore = useBiddingStore()
const boardStateStore = useBoardStateStore()
const historyStore = useHistoryStore()

function onClearClick() {
  $q.dialog({
    title: 'Confirm',
    message: 'Delete all history?',
    ok: {
      color: 'negative'
    },
    cancel: true
  }).onOk(() => {
    onDialogOK()
  })
}

function onDialogOK() {
  biddingStore.reset()
  boardStateStore.reset()
  historyStore.reset()
  $q.notify({
    message: 'History deleted',
    type: 'info',
    timeout: 2000
  })
}

historyStore.$subscribe(() => {
  historyStore.save()
})
</script>

<style lang="scss">
.my-page {
  background-color: green;
}
</style>
