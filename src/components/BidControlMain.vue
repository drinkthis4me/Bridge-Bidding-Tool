<template>
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
            <q-radio
              v-model="store.userInputModel.action"
              :val="action.value"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ action.value }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="bid-level-group q-mb-sm">
      <q-btn-toggle
        v-model="store.userInputModel.lv"
        :options="bidLvOptions"
        toggle-color="blue-grey-3"
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
        v-model="store.userInputModel.suit"
        :options="bidSuitOptions"
        toggle-color="blue-grey-3"
        toggle-text-color="black"
        color="white"
        text-color="black"
        spread
        push
        size="lg"
      >
        <template v-slot:CSlot>
          <div class="row items-center no-wrap">
            <q-icon name="mdi-cards-club" color="green" />
          </div>
        </template>
        <template v-slot:DSlot>
          <div class="row items-center no-wrap">
            <q-icon name="mdi-cards-diamond" color="orange" />
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
        :label="store.status.isEnd ? 'Bidding Over' : 'OK'"
        size="xl"
        :color="store.status.isEnd ? 'grey-4' : 'yellow'"
        text-color="black"
        @click="store.onOKClick"
        :disable="store.status.isEnd"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useBiddingStore } from 'src/stores/bidding-store';
export default defineComponent({
  name: 'BidControlMain',
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
        slot: 'CSlot',
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
</style>
