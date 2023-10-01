<template>
  <router-view />
</template>

<script setup lang="ts">
import { useHistoryStore } from './stores/useHistoryStore'
import { useEnvironmentStore } from 'src/stores/useEnvironmentStore'
import { useCapacitorKeepAwake } from './composables/useCapacitorKeepAwake'

const historyStore = useHistoryStore()
historyStore.init()

const environmentStore = useEnvironmentStore()
environmentStore.init()

const { changeKeepAwake } = useCapacitorKeepAwake()
changeKeepAwake(environmentStore.settings.isScreenAlwaysOn)
</script>
