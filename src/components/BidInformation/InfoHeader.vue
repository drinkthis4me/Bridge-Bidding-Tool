<template>
  <div class="my-infoBox text-center bg-white">
    <span class="text-capitalize">Hand #</span>
    <strong>
      {{ boardStateStore.handNo }}
    </strong>
    <div v-if="biddingStore.isAllPassed">Bidding over</div>
    <div v-else class="text-h4 text-capitalize">Next: {{ boardStateStore.currentBidder }}</div>
  </div>
</template>

<script setup lang="ts">
import { useBiddingStore } from 'src/stores/useBiddingStore'
import { useBoardStateStore } from 'src/stores/useBoardStateStore'

const biddingStore = useBiddingStore()
const boardStateStore = useBoardStateStore()
</script>

<style scoped lang="scss">
.my-infoBox {
  border: 1px solid black;
  border-bottom: 0;
}
</style>
