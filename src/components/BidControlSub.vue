<template>
  <div class="control-sub bg-cyan-2">
    <q-btn
      class="full-width q-mb-md"
      icon="undo"
      label="Undo"
      size="xl"
      color="grey-4"
      text-color="black"
      :disable="store.biddingArray.length < 1"
      @click="store.onUndoClick"
    />
    <q-btn
      class="full-width"
      icon="arrow_forward"
      label="Next Hand"
      no-caps
      size="xl"
      :color="store.status.isEnd ? 'yellow' : 'grey-4'"
      text-color="black"
      :disable="!store.status.isEnd"
      @click="store.onNextClick"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useBiddingStore } from 'src/stores/bidding-store';
 
export default defineComponent({
  name: 'BidControlSub',
  setup() {
    const store = useBiddingStore();
    return {
      store,
    };
  },
});
</script>

<style scoped lang="scss">
.control-sub {
  border: 1px solid black;
}
</style>
