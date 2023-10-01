<template>
  <q-item class="my-auction-cell col-3 text-h5 q-pa-sm q-my-sm" :class="itemClass">
    <q-item-section>
      <span class="flex justify-center items-center">
        <div :class="{ 'text-white': isTextWhite }">{{ text }}</div>
        <q-icon v-if="'suit' in bid && bid.suit < 4" :name="iconName" />
      </span>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Bid } from 'src/types'

const props = defineProps<{
  bid: Bid
}>()

const itemClass = computed(() => {
  const isBid = props.bid.call == 'Bid'
  const isBgRed = props.bid.call === 'Dbl' || props.bid.call === 'RDbl'
  return [
    { 'bg-red': isBgRed },
    { 'bg-blue-3': props.bid.isAlert },
    { 'text-green': isBid && props.bid.suit === 0 },
    { 'text-orange': isBid && props.bid.suit === 1 },
    { 'text-red': isBid && props.bid.suit === 2 },
    { 'text-indigo-10': isBid && props.bid.suit === 3 }
  ]
})

const text = computed(() => {
  if (props.bid.call === 'Bid') {
    if (props.bid.suit === 4) {
      // no-trump
      return `${props.bid.level}NT`
    }
    // club, diamond, heart, spade
    return props.bid.level
  } else {
    // pass, double, re-double
    return props.bid.call
  }
})

const iconName = computed(() => {
  if ('suit' in props.bid) {
    const symbol = ['mdi-cards-club', 'mdi-cards-diamond', 'mdi-cards-heart', 'mdi-cards-spade']
    return symbol[props.bid.suit] ?? ''
  } else {
    return ''
  }
})

const isTextWhite = computed(() => props.bid.call === 'Dbl' || props.bid.call === 'RDbl')
</script>
