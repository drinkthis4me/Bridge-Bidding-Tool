<template>
  <q-card bordered class="full-width">
    <q-card-section class="row justify-between">
      <div class="col">
        <div class="text-subtitle2">#{{ history.handNo }}:</div>
        <div class="text-h5">{{ resultString }}</div>
        <div class="text-subtitle2">Dealer: {{ history.dealer }}</div>
        <div class="text-subtitle2">Vul: {{ vulString }}</div>
      </div>
      <div v-if="isShowEditResultButton" class="col row justify-end items-start q-ma-sm">
        <q-btn
          outline
          color="primary"
          icon="mdi-pencil-outline"
          label="Result"
          no-caps
          class="text-capitalize"
          @click="onEditClick"
        />
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <InfoContent
        :sequence="history.sequence"
        :dealer="history.dealer"
        :vulnerability="history.vulnerability"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import InfoContent from 'src/components/BidInformation/InfoContent.vue'
import { computed } from 'vue'
import { useQuasar } from 'quasar'
import { useHistoryStore } from 'stores/useHistoryStore'
import type { History, ProactiveBid, PenaltyBid } from 'src/types'
import DialogInputResult from './DialogInputResult.vue'

const props = defineProps<{
  history: History
}>()

const $q = useQuasar()
const historyStore = useHistoryStore()

const vulString = computed(() => {
  const vulInStrings = ['None', 'N-S', 'E-W', 'Both']
  return vulInStrings[props.history.vulnerability]
})

const resultString = computed(() => {
  const contract = props.history.sequence.findLast((bid) => bid.call === 'Bid') as ProactiveBid

  // all pass
  if (!contract) return 'All pass'

  const penalty = props.history.sequence.findLast(
    (bid) => bid.call === 'Dbl' || bid.call === 'RDbl'
  ) as PenaltyBid

  let penaltyString = ''

  if (penalty) {
    penaltyString = (penalty.call === 'Dbl' ? 'x' : 'xx').toLowerCase()
  }

  const suits = ['C', 'D', 'H', 'S', 'NT']

  const finalContractString = `${contract.level}${suits[contract.suit]}${penaltyString}`

  // final contract
  if (props.history.result == null) return finalContractString

  let resultString = ''

  if (props.history.result > 0) {
    resultString = `+${props.history.result}`
  } else if (props.history.result === 0) {
    resultString = '='
  } else if (props.history.result < 0) {
    resultString = `${props.history.result}`
  }

  // final contract and result
  return `${finalContractString} ${resultString}`.trim()
})

const isShowEditResultButton = computed(() => {
  return props.history.sequence.some((bid) => bid.call === 'Bid')
})

const resultLimit = computed(() => {
  let max = 6
  let min = -13
  const lastProactiveBid = props.history.sequence.findLast(
    (bid) => bid.call === 'Bid'
  ) as ProactiveBid
  const level = lastProactiveBid?.level
  if (level) {
    max = 7 - level
    min = max - 13
  }
  return {
    max,
    min
  }
})

function onEditClick() {
  $q.dialog({
    component: DialogInputResult,
    componentProps: {
      max: resultLimit.value.max,
      min: resultLimit.value.min,
      result: props.history.result ?? 0
    }
  }).onOk((payload: number) => {
    // emit updated result
    historyStore.editResult(props.history.handNo, payload)
  })
}
</script>
