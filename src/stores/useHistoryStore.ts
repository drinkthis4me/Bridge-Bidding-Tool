import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { History } from 'src/types'
import { useBiddingStore } from 'src/stores/useBiddingStore'
import { useBoardStateStore } from 'src/stores/useBoardStateStore'
import { Preferences } from '@capacitor/preferences'

export const useHistoryStore = defineStore('History', () => {
  // composables, stores
  const biddingStore = useBiddingStore()
  const boardStateStore = useBoardStateStore()

  const histories = ref<History[]>([])

  /**
   * Get history from local storage
   */
  async function init() {
    const { value } = await Preferences.get({ key: 'bid-histories' })
    if (!value) return
    histories.value = JSON.parse(value)
    boardStateStore.handNo = (histories.value.at(-1)?.handNo ?? 0) + 1
  }

  function pushNewHistory(result?: number) {
    const newEntry: History = {
      handNo: boardStateStore.handNo,
      dealer: boardStateStore.currentDealer,
      vulnerability: boardStateStore.currentVulnerability,
      sequence: biddingStore.bidSequence
    }
    if (result !== null) {
      newEntry.result = result
    }
    histories.value.push(newEntry)
    _saveHistories()
  }

  async function _saveHistories() {
    await Preferences.set({
      key: 'bid-histories',
      value: JSON.stringify(histories.value)
    })
  }

  async function reset() {
    histories.value = []
    await Preferences.remove({ key: 'bid-histories' })
  }

  return {
    // states
    histories,

    // actions
    init,
    pushNewHistory,
    reset
  }
})
