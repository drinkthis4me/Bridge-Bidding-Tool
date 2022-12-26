<template>
  <q-page padding class="myPage-style">
    <div class="column">
      <div class="auctionBox col q-mb-md bg-white">
        <div class="auctionBox-head row text-center">
          <div class="col text-h4" :class="{ 'bg-red': eIsVul }">West</div>
          <div class="col text-h4" :class="{ 'bg-red': nIsVul }">North</div>
          <div class="col text-h4" :class="{ 'bg-red': eIsVul }">East</div>
          <div class="col text-h4" :class="{ 'bg-red': nIsVul }">South</div>
        </div>
        <div class="auctionBox-body bg-cyan-2">
          <q-list class="row">
            <!-- v-Show if Dealer changes -->
            <q-item
              v-show="currentDealer !== 0"
              class="col-3 auctionCell q-pa-sm q-mb-md"
            >
              <q-item-section> Next to bid → </q-item-section>
            </q-item>
            <q-item
              v-show="currentDealer === 2 || currentDealer === 3"
              class="col-3 auctionCell q-pa-sm q-mb-md"
            >
              <q-item-section> Next to bid → </q-item-section>
            </q-item>
            <q-item
              v-show="currentDealer === 3"
              class="col-3 auctionCell q-pa-sm q-mb-md"
            >
              <q-item-section> Next to bid → </q-item-section>
            </q-item>
            <!-- end show if -->
            <q-item
              class="col-3 auctionCell text-h4 q-pa-sm q-mb-md"
              v-for="bid in biddingArray"
              :key="bid.id"
              active-class="bg-teal-1"
              :class="bid.isAlert ? 'bg-red' : ''"
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
              class="bid-action col text-h4 text-center"
              :class="[action.bgColor, action.textColor]"
              active-class="text-bold"
              @click="clearLvBid"
            >
              <q-item-section class="hidden">
                <q-radio v-model="bidActionModel" :val="action.value" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ action.value }}</q-item-label>
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
            size="lg"
            @update:model-value="clearActionBid"
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
            @click="onAlertClick"
          />
          <q-btn
            class="full-width"
            label="OK"
            size="xl"
            :color="isEnd ? 'grey-4' : 'yellow'"
            text-color="black"
            @click="onOKClick"
            :disable="isEnd"
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
          :color="isEnd ? 'yellow' : 'grey-4'"
          text-color="black"
          :disable="!isEnd"
          @click="onNextClick"
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
export default defineComponent({
  name: 'bidding-tool',
  setup() {
    interface bid {
      bidding: string;
      isAlert: boolean;
      id: number;
    }

    const biddingArray = ref<bid[]>([]);

    const bidActionModel = ref('');
    const bidLvModel = ref('');
    const bidSuitModel = ref('');
    const isAlert = ref(false);
    const userInputBid = computed(() => {
      const userBid: bid = {
        bidding:
          bidActionModel.value.length > 0
            ? bidActionModel.value
            : bidLvModel.value + bidSuitModel.value,
        isAlert: isAlert.value,
        id: biddingArray.value.length + 1,
      };
      return userBid;
    });

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

    const isEnd = ref(false);
    const vulSequence = [
      'O',
      'N',
      'E',
      'B',
      'N',
      'E',
      'B',
      'O',
      'E',
      'B',
      'O',
      'N',
      'B',
      'O',
      'N',
      'E',
    ];
    const currentHand = ref(1);
    const currentDealer = computed(() => currentHand.value % 4);
    const nIsVul = ref(false);
    const eIsVul = ref(false);

    function clearLvBid() {
      bidLvModel.value = '';
      bidSuitModel.value = '';
    }

    function clearActionBid() {
      bidActionModel.value = '';
    }

    function clearAllbid() {
      bidActionModel.value = '';
      bidLvModel.value = '';
      bidSuitModel.value = '';
      isAlert.value = false;
    }

    function onAlertClick() {
      isAlert.value = true;
      // add red outline to bid
    }

    function onOKClick() {
      // Block action if bid is empty
      if (!userInputBid.value.bidding) {
        console.log('>>> Bid is empty');
        return;
      }

      // .push() new item to biddingArray
      biddingArray.value.push(userInputBid.value);

      // Reset all
      setTimeout(() => clearAllbid(), 100);
    }

    function onUndoClick() {
      biddingArray.value.pop();
    }

    function onNextClick() {
      // Clear all
      clearAllbid();
      biddingArray.value = [];
      isEnd.value = false;

      // Go to next Hand
      goToNextHand();
    }

    function checkEnding(arr: bid[]) {
      return (
        arr[1].bidding === 'Pass' &&
        arr[1].bidding === arr[2].bidding &&
        arr[2].bidding === arr[3].bidding
      );
    }

    const target = computed(() => biddingArray.value.slice(-4));

    // Watcher checks if 3 or 4 consecutive passes appear
    watch(
      () => target.value,
      () => {
        target.value.length < 4
          ? null
          : checkEnding(target.value)
          ? (isEnd.value = true)
          : null;
      }
    );

  
    function goToNextHand() {
      // Change hand NO
      currentHand.value < 16
        ? (currentHand.value += 1)
        : (currentHand.value = 1);

      // Change vulnerability
      changeVul();
    }

    function changeVul() {
      const target = vulSequence[currentHand.value - 1];
      switch (target) {
        case 'N':
          nIsVul.value = true;
          eIsVul.value = false;
          break;
        case 'E':
          nIsVul.value = false;
          eIsVul.value = true;
          break;
        case 'B':
          nIsVul.value = true;
          eIsVul.value = true;
          break;
        case 'O':
          nIsVul.value = false;
          eIsVul.value = false;
          break;
      }
    }

    return {
      biddingArray,

      bidActionModel,
      bidSuitModel,
      bidLvModel,

      bidActions,
      bidLvOptions,
      bidSuitOptions,

      isEnd,
      currentDealer,

      nIsVul,
      eIsVul,

      clearLvBid,
      clearActionBid,
      onOKClick,
      onUndoClick,
      onAlertClick,
      onNextClick,

      goToNextHand,
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
