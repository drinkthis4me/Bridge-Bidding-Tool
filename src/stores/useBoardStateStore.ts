import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Vulnerability } from 'src/types'
import { useBiddingStore } from './useBiddingStore'

export const useBoardStateStore = defineStore('BoardState', () => {
  //
  // composables
  //
  const biddingStore = useBiddingStore()

  //
  // board state
  //
  const handNo = ref(1)

  const _players = ['West', 'North', 'East', 'South']

  const currentDealer = computed(() => {
    const idx = handNo.value % 4
    return _players[idx]
  })

  const currentBidder = computed(() => {
    const idx = (biddingStore.bidIndex + handNo.value) % 4
    return _players[idx]
  })

  const currentVulnerability = computed(() => {
    const vulnerabilitySequence: Vulnerability[] = [0, 1, 2, 3, 1, 2, 3, 0, 2, 3, 0, 1, 3, 0, 1, 2]
    const idx = (handNo.value % 16) - 1
    return vulnerabilitySequence[idx]
  })

  const isNSVul = computed(
    () => currentVulnerability.value === 1 || currentVulnerability.value === 3
  )

  const isEWVul = computed(
    () => currentVulnerability.value === 2 || currentVulnerability.value === 3
  )

  function incrementHandNo() {
    handNo.value++
  }

  function reset() {
    handNo.value = 1
  }

  return {
    // states
    handNo,

    // getters
    currentDealer,
    currentBidder,
    currentVulnerability,
    isNSVul,
    isEWVul,

    // actions
    incrementHandNo,
    reset
  }
})
