import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Suit, Level, Call, Bid, ProactiveBid, PenaltyBid } from 'src/types'
import { Notify } from 'quasar'

export const useBiddingStore = defineStore('Bidding', () => {
  //
  // composables, stores
  //

  //
  // bid status
  //

  const bidIndex = ref(0)
  const call = ref<Call>()
  const level = ref<Level>()
  const suit = ref<Suit>()
  const isAlert = ref(false)

  const currentBid = computed<Bid | null>(() => {
    function checkValidBid(bid: object) {
      for (const value of Object.values(bid)) {
        if (value == null) {
          return false
        }
      }
      return true
    }
    if (call.value === 'Bid') {
      const proactiveBid = {
        id: bidSequence.value.length + 1,
        isAlert: isAlert.value,
        call: 'Bid',
        suit: suit.value,
        level: level.value
      }
      if (!checkValidBid(proactiveBid)) {
        return null
      }
      return proactiveBid as ProactiveBid
    } else {
      const nonProactiveBid = {
        id: bidSequence.value.length + 1,
        isAlert: isAlert.value,
        call: call.value
      }
      if (!checkValidBid(nonProactiveBid)) {
        return null
      }
      return nonProactiveBid as Exclude<Bid, ProactiveBid>
    }
  })

  function resetBidStatus() {
    call.value = undefined
    level.value = undefined
    suit.value = undefined
    isAlert.value = false
  }

  //
  // bidding sequence & history
  //

  const bidHistory = ref<Bid[][]>([[]])

  const bidSequence = ref<Bid[]>([])

  const lastProactiveBid = computed(() => {
    const found = bidSequence.value.findLast((bid) => bid.call === 'Bid') as ProactiveBid
    if (!found) return null
    return found
  })

  const lastPenaltyBid = computed(() => {
    const lastPenaltyIndex = bidSequence.value.findLastIndex(
      (bid) => bid.call === 'Dbl' || bid.call === 'RDbl'
    )
    if (lastPenaltyIndex === -1) {
      // penalty bid does not exist
      return null
    }
    const lastProactiveBidIndex = bidSequence.value.findLastIndex((bid) => bid.call === 'Bid')
    if (lastProactiveBidIndex > lastPenaltyIndex) {
      // last bid is not penalty
      return null
    }
    return bidSequence.value[lastPenaltyIndex] as PenaltyBid
  })

  const isAllPassed = computed(() => {
    const lastFourCalls = bidSequence.value.slice(-4)

    if (lastFourCalls.length < 4) return false

    return (
      lastFourCalls[1].call === 'P' &&
      lastFourCalls[1].call === lastFourCalls[2].call &&
      lastFourCalls[1].call === lastFourCalls[3].call
    )
  })

  // function _checkValidBid(currentBid: Bid, bidSequence: Bid[]) {
  //   if (bidSequence.length) {
  //     const lastBid = bidSequence[bidSequence.length - 1]
  //     const lastProactiveBid = bidSequence.toReversed().find((bid) => bid.call !== 'P')
  //     switch (lastBid.call) {
  //       case 'Bid': {
  //         // 1c-1d
  //         if (currentBid.call === 'Bid') {
  //           // check level & suit
  //           if (lastBid.level > currentBid.level) {
  //             return false
  //           } else if (lastBid.level === currentBid.level) {
  //             // check suit
  //             return lastBid.suit < currentBid.suit
  //           } else {
  //             return true
  //           }
  //         }
  //         // 1c-p | 1c-dbl
  //         return currentBid.call !== 'RDbl'
  //       }
  //       case 'Dbl': {
  //         // check level & suit
  //         // 1s-dbl-?
  //         // 1s-p-p-dbl-?
  //         if (lastProactiveBid && 'level' in lastProactiveBid) {
  //           if (currentBid.call === 'Bid') {
  //             if (lastProactiveBid.level > currentBid.level) {
  //               return false
  //             } else if (lastProactiveBid.level === currentBid.level) {
  //               return lastProactiveBid.suit < currentBid.suit
  //             } else {
  //               return true
  //             }
  //           } else {
  //             return currentBid.call !== 'Dbl'
  //           }
  //         }
  //         return currentBid.call !== 'Dbl'
  //       }
  //       case 'RDbl': {
  //         // check level & suit
  //         if (lastProactiveBid && 'level' in lastProactiveBid) {
  //           if (currentBid.call === 'Bid') {
  //             if (lastProactiveBid.level > currentBid.level) {
  //               return false
  //             } else if (lastProactiveBid.level === currentBid.level) {
  //               return lastProactiveBid.suit < currentBid.suit
  //             } else {
  //               return true
  //             }
  //           } else {
  //             return currentBid.call !== 'RDbl'
  //           }
  //         }
  //         return currentBid.call !== 'RDbl'
  //       }
  //       default: // 'P'
  //         if (lastProactiveBid && 'level' in lastProactiveBid) {
  //           if (currentBid.call === 'Bid') {
  //             if (lastProactiveBid.level > currentBid.level) {
  //               return false
  //             } else if (lastProactiveBid.level === currentBid.level) {
  //               return lastProactiveBid.suit < currentBid.suit
  //             } else {
  //               return true
  //             }
  //           } else {
  //             if (lastProactiveBid.id + 2 !== currentBid.id) {
  //               // 1d-p-p-?
  //               return currentBid.call === 'P' || currentBid.call === 'Dbl'
  //             }
  //             // 1d-p-?
  //             return currentBid.call === 'P'
  //           }
  //         }
  //         return currentBid.call === 'P' || currentBid.call === 'Bid'
  //     }
  //   } else {
  //     // first bid
  //     return currentBid.call === 'Bid' || currentBid.call === 'P'
  //   }
  // }

  function addNewBid() {
    try {
      // save new bid
      if (!currentBid.value) {
        // todo check valid bid
        throw new Error('Please choose level')
      }
      bidSequence.value.push(currentBid.value)
      // save new history
      pushNewHistory()
    } catch (e) {
      Notify.create({
        message: (e as Error).message,
        type: 'negative'
      })
    }
  }

  function addAllPass() {
    isAlert.value = false
    call.value = 'P'
    level.value = undefined
    suit.value = undefined

    // check number of trailing passes and fill up to 3 passes
    while (!isAllPassed.value) {
      addNewBid()
    }
  }

  function _clone(bidSequence: Bid[]) {
    return bidSequence.map((item) => ({ ...item }))
  }

  function pushNewHistory() {
    bidHistory.value.length = ++bidIndex.value
    bidHistory.value.push(_clone(bidSequence.value))
  }

  function undo() {
    if (bidIndex.value - 1 < 0) return
    bidSequence.value = _clone(bidHistory.value[--bidIndex.value])
  }

  function redo() {
    if (bidIndex.value + 1 > bidHistory.value.length - 1) return
    bidSequence.value = _clone(bidHistory.value[++bidIndex.value])
  }

  function reset() {
    bidIndex.value = 0
    resetBidStatus()
    bidHistory.value = [[]]
    bidSequence.value = []
  }

  return {
    // states
    bidIndex,
    call,
    level,
    suit,
    isAlert,
    bidHistory,
    bidSequence,

    // getters
    currentBid,
    lastProactiveBid,
    lastPenaltyBid,
    isAllPassed,

    //actions
    resetBidStatus,
    addNewBid,
    undo,
    redo,
    addAllPass,
    reset
  }
})
