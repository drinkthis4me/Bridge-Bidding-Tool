<template>
  <q-card bordered class="full-width">
    <q-card-section>
      <div>
        <span class="text-subtitle2">#{{ history.handNo }}:</span>
        <span class="text-h4 q-ml-sm">{{ resultString }}</span>
      </div>
      <div class="text-subtitle2">Dealer: {{ history.dealer }}</div>
      <div class="text-subtitle2">Vul: {{ vulString }}</div>
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
import type { History, ProactiveBid, PenaltyBid } from 'src/types'

const props = defineProps<{
  history: History
}>()

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
  return `${finalContractString} ${resultString}`
})
</script>
