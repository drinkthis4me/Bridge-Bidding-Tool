import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { History } from 'src/types'
import { useBiddingStore } from 'src/stores/useBiddingStore'
import { useBoardStateStore } from 'src/stores/useBoardStateStore'
import { useCapacitorPreferences } from 'src/composables/useCapacitorPreferences'
import { Notify } from 'quasar'

const LOCAL_STORAGE_KEY = 'bid-histories'

export const useHistoryStore = defineStore('History', () => {
  //
  // composables, stores
  //
  const { getPreferences, setPreferences, removePreferences } = useCapacitorPreferences()
  const biddingStore = useBiddingStore()
  const boardStateStore = useBoardStateStore()

  //
  // history
  //
  const histories = ref<History[]>([])

  /**
   * Get history from local storage
   */
  async function init() {
    try {
      const value = await getPreferences(LOCAL_STORAGE_KEY)
      if (!value) return
      histories.value = value
      boardStateStore.handNo = (histories.value.at(-1)?.handNo ?? 0) + 1
    } catch (e) {
      Notify.create({
        message: (e as Error).message,
        type: 'negative'
      })
    }
  }

  async function save() {
    await setPreferences(LOCAL_STORAGE_KEY, histories.value)
  }

  async function reset() {
    histories.value = []
    await removePreferences(LOCAL_STORAGE_KEY)
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
  }

  function editResult(handNo: number, result: number) {
    try {
      const target = histories.value.find((h) => h.handNo === handNo)
      if (!target) throw new Error('Cannot find history')
      target.result = result
    } catch (e) {
      Notify.create({
        message: (e as Error).message,
        type: 'negative'
      })
    }
  }

  return {
    // states
    histories,

    // actions
    init,
    save,
    reset,
    pushNewHistory,
    editResult
  }
})
