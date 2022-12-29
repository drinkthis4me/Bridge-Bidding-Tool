<template>
  <q-page padding class="myPage-style">
    <div class="column">
      <div class="q-my-md text-center">
        <q-btn class="full-width" label="Back" color="info" size="lg" @click="$router.go(-1)" />
      </div>
      <div class="historyList">
        <q-list v-if="store.bidHistory.length > 0" >
          <q-item v-for="item in store.bidHistory" :key="item.handNo">
            <q-card bordered class="full-width">
              <q-card-section>
                <div class="text-h4">No.{{ item.handNo }}</div>
                <div class="text-subtitle2">Dealer: {{ item.dealer }} / Vul: {{ item.vul }}</div>
              </q-card-section>
              <q-separator />
              <q-card-section class="row">
                <div
                  class="col-3 bidCall"
                  v-for="bid in item.sequence"
                  :key="bid.id"
                >
                  {{ bid.bidding }} -
                </div>
              </q-card-section>
            </q-card>
          </q-item></q-list
        >
        <div v-else class="text-h4 text-center bg-white q-pa-md">
          No history.<br />
          Go play some cards!
        </div>
      </div>
    </div>
  </q-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useBiddingStore } from 'stores/bidding-store';

export default defineComponent({
  name: 'BidHistory',
  setup() {
    const store = useBiddingStore();

    return {
      store,
    };
  },
});
</script>
<style lang="scss">
.myPage-style {
  background-color: green;
}
</style>
