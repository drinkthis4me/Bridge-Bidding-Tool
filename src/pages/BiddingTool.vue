<template>
  <q-page padding class="myPage-style">
    <div class="column">
      <BidInformation />

      <BidControlMain v-if="!biddingStore.isAllPassed" />

      <BidControlSub v-else />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useBiddingStore } from 'src/stores/useBiddingStore'
import { useHistoryStore } from 'src/stores/useHistoryStore'
import { useQuasar } from 'quasar'
import BidControlMain from 'src/components/BidControlMain.vue'
import BidControlSub from 'src/components/BidControlSub.vue'
import BidInformation from 'src/components/BidInformation/BidInformation.vue'

const biddingStore = useBiddingStore()
const historyStore = useHistoryStore()
const $q = useQuasar()

watch(
  () => biddingStore.isAllPassed,
  (val) => {
    if (val) {
      $q.notify({
        message: 'Bidding over!',
        type: 'positive',
        timeout: 2000
      })
    }
  }
)

historyStore.$subscribe(() => {
  historyStore.save()
})
</script>

<style scoped lang="scss">
.myPage-style {
  background-color: green;
}
</style>
