<template>
  <div class="auctionBox col q-mb-md bg-white">
    <div class="auctionBox-head row text-center">
      <div class="col text-h5" :class="{ 'bg-red': eIsVul }">West</div>
      <div class="col text-h5" :class="{ 'bg-red': nIsVul }">North</div>
      <div class="col text-h5" :class="{ 'bg-red': eIsVul }">East</div>
      <div class="col text-h5" :class="{ 'bg-red': nIsVul }">South</div>
    </div>
    <div class="auctionBox-body bg-cyan-2">
      <q-list class="row">
        <!-- v-Show if Dealer changes -->
        <q-item
          v-show="currentDealer !== 'W'"
          class="col-3 auctionCell q-pa-sm q-mb-md"
        >
          <q-item-section> Dealer → </q-item-section>
        </q-item>
        <q-item
          v-show="currentDealer === 'E' || currentDealer === 'S'"
          class="col-3 auctionCell q-pa-sm q-mb-md"
        >
          <q-item-section> Dealer → </q-item-section>
        </q-item>
        <q-item
          v-show="currentDealer === 'S'"
          class="col-3 auctionCell q-pa-sm q-mb-md"
        >
          <q-item-section> Dealer → </q-item-section>
        </q-item>
        <!-- end show if -->
        <q-item
          class="col-3 auctionCell text-h5 q-pa-sm q-mb-md"
          v-for="bid in biddingArray"
          :key="bid.id"
          active-class="bg-teal-1"
          :class="[
            { 'bg-blue-3': bid.isAlert },
            { 'text-green': bid.bidding.includes('♣') },
            { 'text-orange': bid.bidding.includes('♦') },
            { 'text-red': bid.bidding.includes('♥') },
          ]"
        >
          <q-item-section> {{ bid.bidding }} </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Bid } from '../types';
export default defineComponent({
  name: 'BidAuctionBox',
  props: {
    eIsVul: { type: Boolean, required: true },
    nIsVul: { type: Boolean, required: true },
    currentDealer: { type: String, required: true },
    biddingArray: {
      type: Array as PropType<Bid[]>,
      default: () => [] as Bid[],
    },
  },
});
</script>

<style scoped lang="scss">
.auctionBox {
  border: 1px solid black;

  .auctionBox-head {
    border-bottom: 1px solid black;
    height: 40px;
  }

  .auctionCell {
    border: 1px solid black;
    border-radius: 1rem;
    text-align: center;
    background-color: white;
  }
}
</style>
