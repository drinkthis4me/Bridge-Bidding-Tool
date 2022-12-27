import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue'

export const useBiddingStore = defineStore('bidding',()=> {
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
    isEnd.value = false;
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

  // Watcher checks ending: if 3 or 4 consecutive passes appear
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

  return{
    biddingArray,

    bidActionModel,
    bidSuitModel,
    bidLvModel,

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
  }
});
