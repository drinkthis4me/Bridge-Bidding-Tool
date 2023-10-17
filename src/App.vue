<template>
  <router-view />
</template>

<script setup lang="ts">
import { useHistoryStore } from './stores/useHistoryStore'
import { useEnvironmentStore } from 'src/stores/useEnvironmentStore'

const historyStore = useHistoryStore()
historyStore.init()

const environmentStore = useEnvironmentStore()
environmentStore.init()
</script>
