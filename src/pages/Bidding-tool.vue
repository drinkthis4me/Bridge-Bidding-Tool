<template>
  <q-page padding class="myPage-style">
    <div class="column">
      <BidInfoBox :hand-number="store.status.handNumber" />

      <BidAuctionBox
        :n-is-vul="store.status.nIsVul"
        :e-is-vul="store.status.eIsVul"
        :current-dealer="store.currentDealer"
        :bidding-array="store.biddingArray"
      />

      <BidControlMain />

      <BidControlSub />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useBiddingStore } from 'stores/bidding-store'
import BidInfoBox from 'src/components/BidInfoBox.vue'
import BidAuctionBox from 'src/components/BidAuctionBox.vue'
import BidControlMain from 'src/components/BidControlMain.vue'
import BidControlSub from 'src/components/BidControlSub.vue'
export default defineComponent({
  name: 'bidding-tool',
  components: {
    BidInfoBox,
    BidAuctionBox,
    BidControlMain,
    BidControlSub
  },
  setup() {
    const store = useBiddingStore()

    return {
      store
    }
  }
})
</script>

<style scoped lang="scss">
.myPage-style {
  background-color: green;
}
</style>
