<template>
  <div class="my-auction-box q-mb-md">
    <div class="my-auction-box-head row no-wrap text-center bg-white">
      <div
        v-for="item in header"
        :key="item.display"
        class="col flex justify-center items-center"
        :class="{ 'bg-red text-white': item.isVul }"
      >
        {{ item.display }}
      </div>
    </div>
    <q-list class="my-auction-box-body row bg-cyan-2">
      <!-- invisible items -->
      <q-item v-if="dealer !== 'West'" class="invisible col-3 q-pa-sm q-mb-md"></q-item>
      <q-item
        v-if="dealer === 'East' || dealer === 'South'"
        class="invisible col-3 q-pa-sm q-mb-md"
      >
      </q-item>
      <q-item v-if="dealer === 'South'" class="invisible col-3 q-pa-sm q-mb-md"></q-item>
      <!-- /invisible items -->
      <AuctionCell v-for="bid in sequence" :key="bid.id" :bid="bid" />
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AuctionCell from 'src/components/BidInformation/AuctionCell.vue'
import type { Bid, Vulnerability } from 'src/types'

const props = defineProps<{
  sequence: Bid[]
  dealer: string
  vulnerability: Vulnerability
}>()

const header = computed(() => {
  const isNSVul = props.vulnerability === 1 || props.vulnerability === 3
  const isEWVul = props.vulnerability === 2 || props.vulnerability === 3
  return [
    { display: 'West', isVul: isEWVul },
    { display: 'North', isVul: isNSVul },
    { display: 'East', isVul: isEWVul },
    { display: 'South', isVul: isNSVul }
  ]
})
</script>

<style scoped lang="scss">
.my-auction-box {
  .my-auction-box-head {
    border: 1px solid black;
    height: 40px;
  }

  .my-auction-box-body {
    border: 1px solid black;
    border-top: 0;
  }
  .my-auction-cell {
    border: 1px solid black;
    border-radius: 0.7rem;
    text-align: center;
    background-color: white;
  }
}
</style>
