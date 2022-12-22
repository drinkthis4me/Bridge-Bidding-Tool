<template>
  <q-page padding class="myPage-style">
    <div class="column">
      <div class="auctionBox col q-mb-md bg-white">
        <div class="auctionBox-head row text-center">
          <div class="col text-h4">West</div>
          <div class="col text-h4">North</div>
          <div class="col text-h4">East</div>
          <div class="col text-h4">South</div>
        </div>
        <div class="auctionBox-body bg-cyan-2">
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
              class="col-3 auctionCell text-h4 q-pa-sm q-mb-md"
              v-for="bid in biddingArray"
              :key="bid"
              active-class="bg-teal-1"
            >
              <q-item-section> {{ bid }} </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
      <div class="control-main q-mb-md bg-cyan-2">
        <div class="bid-actions-group q-mb-md">
          <q-list class="row">
            <q-item
              v-for="option in bidOptions"
              :key="option.value"
              tag="label"
              clickable
              v-ripple
              class="bid-action col text-h4 text-center"
              :class="[option.bgColor, option.textColor]"
              @click="clearLvBid"
            >
              <q-item-section class="hidden">
                <q-radio v-model="bidOptionModel" :val="option.value" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ option.value }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="bid-level-group q-mb-sm">
          <q-btn-toggle
            v-model="bidLvModel"
            :options="bidLvOptions"
            toggle-color="amber-7"
            toggle-text-color="black"
            color="white"
            text-color="black"
            spread
            push
          />
        </div>
        <div class="bid-suits-group q-mb-md">
          <q-btn-toggle
            v-model="bidSuitModel"
            :options="bidSuitOptions"
            toggle-color="amber-7"
            toggle-text-color="black"
            color="white"
            text-color="black"
            spread
            push
          >
            <template v-slot:DSlot>
              <div class="row items-center no-wrap">
                <q-icon name="mdi-cards-diamond" color="red" />
              </div>
            </template>
            <template v-slot:HSlot>
              <div class="row items-center no-wrap">
                <q-icon name="mdi-cards-diamond" color="red" />
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
          />
          <q-btn
            class="full-width"
            label="OK"
            size="xl"
            color="yellow"
            text-color="black"
            @click="onOKClick"
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
          @click="onUndoClick"
        />

        <q-btn
          class="full-width"
          icon="arrow_forward"
          label="next hand"
          no-caps
          size="xl"
          color="grey-4"
          text-color="black"
          disable
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
export default defineComponent({
  name: 'bidding-tool',
  setup() {
    const biddingArray = ref([
      'PASS',
      'PASS',
      'PASS',
      'PASS',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
    ]);

    const bidOptions = [
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

    const bidOptionModel = ref('');
    const bidLvModel = ref('1');
    const bidSuitModel = ref('C');
    const userInputBid = computed(() => bidLvModel.value + bidSuitModel.value);

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
        value: 'C',
        icon: 'mdi-cards-club',
      },
      {
        value: 'D',

        slot: 'DSlot',
      },
      {
        value: 'H',

        slot: 'HSlot',
      },
      {
        value: 'S',
        icon: 'mdi-cards-spade',
      },
      {
        label: 'NT',
        value: 'NT',
      },
    ];

    function clearLvBid() {
      bidLvModel.value = '';
      bidSuitModel.value = '';
    }

    function onOKClick() {
      console.log('>>> New bid: ', bidOptionModel.value);
      console.log('>>> old bid: ', userInputBid.value);

      // biddingArray.value.push(userInputBid.value);
      // .push() new item to biddingArray
    }

    function onUndoClick() {
      biddingArray.value.pop();
    }

    return {
      biddingArray,
      bidOptions,
      bidOptionModel,
      bidLvModel,
      bidSuitModel,
      bidLvOptions,
      bidSuitOptions,

      clearLvBid,
      onOKClick,
      onUndoClick,
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
