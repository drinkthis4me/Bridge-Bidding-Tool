import { defineStore } from 'pinia';
import { ref, computed, watch, reactive } from 'vue';
import { Bid, History } from '../types';
export const useBiddingStore = defineStore('bidding', () => {
  const biddingArray = ref<Bid[]>([]);
  const bidHistory = ref<History[]>([]);

  const userInputModel = reactive({
    action: '',
    lv: '',
    suit: '',
    alert: false,
  });

  const userInputBid = computed(() => {
    const bidWAction = userInputModel.action;
    const bidWLvAndSuit =
      userInputModel.lv.length > 0 && userInputModel.suit.length > 0
        ? userInputModel.lv + userInputModel.suit
        : '';
    const userBid: Bid = {
      bidding: bidWAction || bidWLvAndSuit,
      isAlert: userInputModel.alert,
      id: biddingArray.value.length + 1,
    };
    return userBid;
  });

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

  const status = reactive({
    isEnd: false,
    handNumber: 1,
    nIsVul: false,
    eIsVul: false,
  });

  const currentDealer = computed(() => {
    const r = status.handNumber % 4;
    let ans = '';

    switch (r) {
      case 1:
        ans = 'N';
        break;
      case 2:
        ans = 'E';
        break;
      case 3:
        ans = 'S';
        break;
      case 0:
        ans = 'W';
        break;
      default:
        ans = 'error';
    }

    return ans;
  });

  function clearLvBid() {
    userInputModel.lv = '';
    userInputModel.suit = '';
  }

  function clearActionBid() {
    userInputModel.action = '';
  }

  function clearAllbid() {
    userInputModel.action = '';
    userInputModel.lv = '';
    userInputModel.suit = '';
    userInputModel.alert = false;
  }

  function onAlertClick() {
    userInputModel.alert = true;
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
    status.isEnd = false;
  }

  function onNextClick() {
    // Save to history
    saveToHistory();

    // Clear all
    clearAllbid();
    biddingArray.value = [];
    status.isEnd = false;

    // Go to next Hand
    goToNextHand();
  }

  function checkEnding(arr: Bid[]) {
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
        ? (status.isEnd = true)
        : null;
    }
  );

  function changeVul() {
    const target = vulSequence[status.handNumber - 1];
    switch (target) {
      case 'N':
        status.nIsVul = true;
        status.eIsVul = false;
        break;
      case 'E':
        status.nIsVul = false;
        status.eIsVul = true;
        break;
      case 'B':
        status.nIsVul = true;
        status.eIsVul = true;
        break;
      case 'O':
        status.nIsVul = false;
        status.eIsVul = false;
        break;
    }
  }

  function goToNextHand() {
    // Change hand NO
    status.handNumber < 16 ? (status.handNumber += 1) : (status.handNumber = 1);

    // Change vulnerability
    changeVul();
  }

  function saveToHistory() {
    const target = {
      handNo: status.handNumber,
      dealer: currentDealer.value,
      vul: vulSequence[status.handNumber - 1],
      nIsVul: status.nIsVul,
      eIsVul: status.eIsVul,
      sequence: [...biddingArray.value],
    };
    bidHistory.value.push(target);
  }

  return {
    biddingArray,
    bidHistory,

    userInputModel,

    status,
    currentDealer,

    clearLvBid,
    clearActionBid,
    onOKClick,
    onUndoClick,
    onAlertClick,
    onNextClick,

    goToNextHand,
  };
});
