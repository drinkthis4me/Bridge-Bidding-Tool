<template>
  <q-page padding>
    <div class="column">
      <div class="auctionBox col q-pa-md q-mb-md">
        <div class="auctionBox-head row text-center">
          <div class="col">West</div>
          <div class="col">North</div>
          <div class="col">East</div>
          <div class="col">South</div>
        </div>
        <q-list class="row">
          <!-- <q-item class="col-3 auctionCell q-ma-sm">
            <q-item-section> show if delear is North </q-item-section>
          </q-item>
          <q-item class="col-3 auctionCell q-ma-sm">
            <q-item-section> show if delear is East </q-item-section>
          </q-item>
          <q-item class="col-3 auctionCell q-ma-sm">
            <q-item-section> show if delear is South </q-item-section>
          </q-item> -->
          <q-item
            class="col-3 auctionCell q-pa-sm q-my-sm"
            v-for="bid in biddingArray"
            :key="bid"
          >
            <q-item-section> {{ bid }} </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="control">
        <div class="row">
          <div class="col bid-option-group">
            <div class="row bid-actions-group">
              <div
                class="col bid-action"
                v-for="option in bidOptions"
                :key="option"
              >
                {{ option }}
              </div>
            </div>
            <div class="row bid-levels">
              <div class="col bid-level-group" v-for="n in 7" :key="n">
                {{ n }}
              </div>
            </div>
            <div class="row bid-suits-group">
              <div class="col bid-suit" v-for="n in 4" :key="n">
              C/ D/ H/ S
              </div>
            </div>
          </div>
        </div>
        <div class="ranks col"></div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'bidding-tool',
  setup() {
    const biddingArray = ['1', '2', '3', '4', '5', '6'];

    const bidOptions = ['pass', 'double', 'redouble', 'alert'];

    return {
      biddingArray,
      bidOptions,
    };
  },
});
</script>

<style scoped lang="scss">
.auctionBox {
  border: 1px solid black;

  .auctionCell {
    background-color: bisque;
    border: 1px solid black;
    text-align: center;
  }
}

.control {
  border: 1px solid black;
}
</style>
