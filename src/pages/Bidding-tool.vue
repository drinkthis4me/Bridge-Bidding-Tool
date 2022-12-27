<template>
  <q-page padding class="myPage-style">
    <div class="column">
      <div class="auctionBox col q-mb-md bg-white">
        <div class="auctionBox-head row text-center">
          <div class="col text-h5" :class="{ 'bg-red': store.eIsVul }">
            West
          </div>
          <div class="col text-h5" :class="{ 'bg-red': store.nIsVul }">
            North
          </div>
          <div class="col text-h5" :class="{ 'bg-red': store.eIsVul }">
            East
          </div>
          <div class="col text-h5" :class="{ 'bg-red': store.nIsVul }">
            South
          </div>
        </div>
        <div class="auctionBox-body bg-cyan-2">
          <q-list class="row">
            <!-- v-Show if Dealer changes -->
            <q-item
              v-show="store.currentDealer !== 0"
              class="col-3 auctionCell q-pa-sm q-mb-md"
            >
              <q-item-section> Next to bid → </q-item-section>
            </q-item>
            <q-item
              v-show="store.currentDealer === 2 || store.currentDealer === 3"
              class="col-3 auctionCell q-pa-sm q-mb-md"
            >
              <q-item-section> Next to bid → </q-item-section>
            </q-item>
            <q-item
              v-show="store.currentDealer === 3"
              class="col-3 auctionCell q-pa-sm q-mb-md"
            >
              <q-item-section> Next to bid → </q-item-section>
            </q-item>
            <!-- end show if -->
            <q-item
              class="col-3 auctionCell text-h5 q-pa-sm q-mb-md"
              v-for="bid in store.biddingArray"
              :key="bid.id"
              active-class="bg-teal-1"
              :class="bid.isAlert ? 'bg-blue' : ''"
            >
              <q-item-section> {{ bid.bidding }} </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
      <div class="control-main q-mb-md bg-cyan-2">
        <div class="bid-actions-group q-mb-md">
          <q-list class="row">
            <q-item
              v-for="action in bidActions"
              :key="action.value"
              tag="label"
              clickable
              v-ripple
              class="bid-action col text-h4 text-center q-pl-none"
              :class="[action.bgColor, action.textColor]"
              @click="store.clearLvBid"
            >
              <q-item-section class="hidden">
                <q-radio v-model="store.bidActionModel" :val="action.value" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ action.value }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="bid-level-group q-mb-sm">
          <q-btn-toggle
            v-model="store.bidLvModel"
            :options="bidLvOptions"
            toggle-color="amber-7"
            toggle-text-color="black"
            color="white"
            text-color="black"
            spread
            push
            size="lg"
            @update:model-value="store.clearActionBid"
          />
        </div>
        <div class="bid-suits-group q-mb-md">
          <q-btn-toggle
            v-model="store.bidSuitModel"
            :options="bidSuitOptions"
            toggle-color="amber-7"
            toggle-text-color="black"
            color="white"
            text-color="black"
            spread
            push
            size="lg"
          >
            <template v-slot:DSlot>
              <div class="row items-center no-wrap">
                <q-icon name="mdi-cards-diamond" color="red" />
              </div>
            </template>
            <template v-slot:HSlot>
              <div class="row items-center no-wrap">
                <q-icon name="mdi-cards-heart" color="red" />
              </div>
            </template>
          </q-btn-toggle>
        </div>
        <div class="bid-confirm-btn">
          <q-btn
            class="full-width q-ma-xs"
            label="Alert"
            no-caps
            text-color="black"
            color="blue"
            size="lg"
            @click="store.onAlertClick"
          />
          <q-btn
            class="full-width"
            :label="store.isEnd ? 'Bidding Over' : 'OK'"
            size="xl"
            :color="store.isEnd ? 'grey-4' : 'yellow'"
            text-color="black"
            @click="store.onOKClick"
            :disable="store.isEnd"
          />
        </div>
      </div>
      <div class="control-sub bg-cyan-2">
        <q-btn
          class="full-width q-mb-md"
          icon="undo"
          label="Undo"
          size="xl"
          color="grey-4"
          text-color="black"
          :disable="store.biddingArray.length < 1"
          @click="store.onUndoClick"
        />

        <q-btn
          class="full-width"
          icon="arrow_forward"
          label="Next Hand"
          no-caps
          size="xl"
          :color="store.isEnd ? 'yellow' : 'grey-4'"
          text-color="black"
          :disable="!store.isEnd"
          @click="store.onNextClick"
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useBiddingStore } from 'stores/bidding-store';
export default defineComponent({
  name: 'bidding-tool',
  setup() {
    const store = useBiddingStore();

    const bidActions = [
      {
        value: 'Pass',
        textColor: 'text-black',
        bgColor: 'bg-light-green-4',
      },
      {
        value: 'Dbl',
        textColor: 'text-white',
        bgColor: 'bg-red-8',
      },
      {
        value: 'RDbl',
        textColor: 'text-white',
        bgColor: 'bg-red-8',
      },
    ];
    const bidLvOptions = [
      {
        label: '1',
        value: '1',
      },
      {
        label: '2',
        value: '2',
      },
      {
        label: '3',
        value: '3',
      },
      {
        label: '4',
        value: '4',
      },
      {
        label: '5',
        value: '5',
      },
      {
        label: '6',
        value: '6',
      },
      {
        label: '7',
        value: '7',
      },
    ];
    const bidSuitOptions = [
      {
        value: '♣',
        icon: 'mdi-cards-club',
      },
      {
        value: '♦',
        slot: 'DSlot',
      },
      {
        value: '♥',
        slot: 'HSlot',
      },
      {
        value: '♠',
        icon: 'mdi-cards-spade',
      },
      {
        label: 'NT',
        value: 'NT',
      },
    ];

    return {
      store,

      bidActions,
      bidLvOptions,
      bidSuitOptions,
    };
  },
});
</script>

<style scoped lang="scss">
.myPage-style {
  background-color: green;
}

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

.control-main {
  border: 1px solid black;

  .bid-actions-group {
    .bid-action {
      border-color: rgba(255, 255, 255, 0.5);
      border-style: solid;
      border-width: 1px;
      border-radius: 0.5rem;
    }
  }
}

.control-sub {
  border: 1px solid black;
}
</style>
