<template>
  <InfoHeader />
  <InfoContent
    :sequence="biddingStore.bidSequence"
    :dealer="boardStateStore.currentDealer"
    :vulnerability="boardStateStore.currentVulnerability"
  />
</template>

<script setup lang="ts">
import { useBiddingStore } from 'src/stores/useBiddingStore'
import { useBoardStateStore } from 'src/stores/useBoardStateStore'
import InfoHeader from 'src/components/BidInformation/InfoHeader.vue'
import InfoContent from 'src/components/BidInformation/InfoContent.vue'

const biddingStore = useBiddingStore()
const boardStateStore = useBoardStateStore()
</script>
