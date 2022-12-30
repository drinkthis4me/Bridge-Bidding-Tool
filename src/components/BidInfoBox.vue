<template>
  <div class="infoBox text-center bg-white">
    Current Hand:
    <strong>
      {{ handNumber }}
    </strong>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'BidInfoBox',
  props: {
    handNumber: Number,
  },
});
</script>

<style scoped lang="scss">
.infoBox {
  border-left: 1px solid black;
  border-top: 1px solid black;
  border-right: 1px solid black;
}
</style>