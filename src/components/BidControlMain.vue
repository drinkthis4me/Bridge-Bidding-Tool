<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<template>
  <div class="my-control-main full-width q-mb-md bg-cyan-2">
    <div class="my-bid-actions-group">
      <q-list class="row">
        <q-item
          v-for="reactiveCall in reactiveCallOptions"
          :key="reactiveCall.value"
          tag="label"
          clickable
          v-ripple
          class="my-bid-action col text-h4 text-center q-pl-none"
          :class="[
            reactiveCall.bgColor,
            reactiveCall.textColor,
            { 'text-italic': biddingStore.call === reactiveCall.value }
          ]"
          @dblclick.native="submitDblClick"
        >
          <q-item-section class="hidden">
            <q-radio
              v-model="biddingStore.call"
              :val="reactiveCall.value"
              @update:model-value="submitReactiveCall"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ reactiveCall.display }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="q-mt-md">
      <q-btn-toggle
        v-model="biddingStore.level"
        :options="levelOptions"
        toggle-color="blue-grey-3"
        toggle-text-color="black"
        color="white"
        text-color="black"
        spread
        push
        size="lg"
        @update:model-value="resetCall"
      />
    </div>
    <div class="q-mt-md">
      <q-btn-toggle
        v-model="biddingStore.suit"
        :options="suitOptions"
        toggle-color="blue-grey-3"
        toggle-text-color="black"
        color="white"
        text-color="black"
        spread
        push
        size="lg"
        @update:model-value="submitProactiveCall"
        @dblclick.native="submitDblClick"
      >
      </q-btn-toggle>
    </div>
    <div class="q-mt-md flex justify-center">
      <q-item tag="label">
        <q-item-section>
          <q-toggle v-model="biddingStore.isAlert" size="lg">
            <span class="text-h6 full-width">Alert</span>
          </q-toggle>
        </q-item-section>
      </q-item>
      <q-btn
        v-show="environmentStore.settings.inputMethod === 'button'"
        class="full-width"
        label="Confirm"
        size="xl"
        color="yellow"
        text-color="black"
        @click="handleAddNewCall"
      />
      <div class="row full-width">
        <q-btn
          class="col"
          label="Undo"
          no-caps
          icon="mdi-arrow-u-left-top"
          size="xl"
          color="grey-4"
          text-color="black"
          :disable="biddingStore.bidIndex < 1"
          @click="onUndoClick"
        />
        <q-btn
          class="col"
          label="Redo"
          no-caps
          icon="mdi-arrow-u-right-top"
          size="xl"
          color="grey-4"
          text-color="black"
          :disable="biddingStore.bidIndex + 1 > biddingStore.bidHistory.length - 1"
          @click="onRedoClick"
        />
      </div>
      <q-btn
        class="full-width text-capitalize"
        label="All pass"
        no-caps
        icon="mdi-fast-forward"
        size="xl"
        color="grey-4"
        text-color="black"
        @click="onAllPassClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useBiddingStore } from 'src/stores/useBiddingStore'
import { useEnvironmentStore } from 'src/stores/useEnvironmentStore'
import { Suit } from 'src/types'

const biddingStore = useBiddingStore()
const environmentStore = useEnvironmentStore()

const reactiveCallOptions = computed(() => {
  const buttons = [
    {
      value: 'P',
      display: 'Pass',
      textColor: 'text-black',
      bgColor: 'bg-light-green-4'
    },
    {
      value: 'Dbl',
      display: 'Dbl',
      textColor: 'text-white',
      bgColor: 'bg-red-8'
    },
    {
      value: 'RDbl',
      display: 'RDbl',
      textColor: 'text-white',
      bgColor: 'bg-red-8'
    }
  ]
  // no bid: pass only
  if (!biddingStore.bidSequence.length) {
    return buttons.slice(0, 1)
  }

  // at least one bid
  // 1 last bid is penalty
  // 1-1. last bid is dbl: allow rdbl on opponent
  if (biddingStore.lastPenaltyBid?.call === 'Dbl') {
    const diff = biddingStore.bidSequence.length + 1 - biddingStore.lastPenaltyBid.id
    if (diff === 1 || diff === 3) {
      return buttons.filter((btn) => btn.value !== 'Dbl')
    }
    return buttons.slice(0, 1)
  }

  // 1-2. last bid is rdbl: pass only
  if (biddingStore.lastPenaltyBid?.call === 'RDbl') {
    return buttons.slice(0, 1)
  }

  // 2. last bid is not penalty
  // allow dbl on opponent
  if (biddingStore.lastProactiveBid) {
    const diff = biddingStore.bidSequence.length + 1 - biddingStore.lastProactiveBid.id
    if (diff === 1 || diff === 3) {
      return buttons.slice(0, 2)
    }
  }

  // default: pass only
  return buttons.slice(0, 1)
})

const levelOptions = computed(() => {
  const options = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 }
  ]
  return options.filter((o) => {
    if (biddingStore.lastProactiveBid?.suit === Suit.nt) {
      return o.value > (biddingStore.lastProactiveBid?.level ?? 0)
    } else {
      return o.value >= (biddingStore.lastProactiveBid?.level ?? 0)
    }
  })
})

const suitOptions = computed(() => {
  const options = [
    {
      value: 0,
      icon: 'mdi-cards-club',
      textColor: 'green',
      toggleTextColor: 'green',
      toggleColor: 'green-2'
    },
    {
      value: 1,
      icon: 'mdi-cards-diamond',
      textColor: 'orange',
      toggleTextColor: 'orange',
      toggleColor: 'orange-2'
    },
    {
      value: 2,
      icon: 'mdi-cards-heart',
      textColor: 'red',
      toggleTextColor: 'red',
      toggleColor: 'red-2'
    },
    {
      value: 3,
      icon: 'mdi-cards-spade',
      textColor: 'indigo-9',
      toggleTextColor: 'indigo-9',
      toggleColor: 'indigo-2'
    },
    {
      value: 4,
      label: 'NT'
    }
  ]
  return options.filter((o) => {
    if (
      biddingStore.level &&
      biddingStore.lastProactiveBid?.suit !== null &&
      biddingStore.lastProactiveBid?.level === biddingStore.level &&
      biddingStore.lastProactiveBid?.suit !== Suit.nt
    ) {
      return o.value > biddingStore.lastProactiveBid.suit
    }
    return true
  })
})

function submitReactiveCall() {
  biddingStore.level = undefined
  biddingStore.suit = undefined
  submitBid()
}

function resetCall() {
  biddingStore.call = undefined
}

function submitProactiveCall() {
  resetCall()
  submitBid()
}

function submitBid() {
  // single click to add bid
  if (environmentStore.settings.inputMethod !== 'single') return
  handleAddNewCall()
}

function submitDblClick() {
  // double click to add bid
  if (environmentStore.settings.inputMethod !== 'double') return
  handleAddNewCall()
}

function handleAddNewCall() {
  giveFeedback()
  if (!biddingStore.call) {
    biddingStore.call = 'Bid'
  }
  biddingStore.addNewBid()
  biddingStore.resetBidStatus()
}

function onUndoClick() {
  giveFeedback()
  biddingStore.undo()
}

function onRedoClick() {
  giveFeedback()
  biddingStore.redo()
}

function onAllPassClick() {
  giveFeedback()
  biddingStore.addAllPass()
  biddingStore.resetBidStatus()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function giveFeedback() {
  environmentStore.playBeepSound()
  environmentStore.vibrate()
}
</script>

<style scoped lang="scss">
.my-control-main {
  border: 1px solid black;

  .my-bid-actions-group {
    .my-bid-action {
      border-color: rgba(255, 255, 255, 0.5);
      border-style: solid;
      border-width: 1px;
      border-radius: 0.5rem;
    }
  }
}
</style>
