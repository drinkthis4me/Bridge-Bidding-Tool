<template>
  <q-layout view="lhh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-btn flat stretch icon="mdi-home" to="/" />
        <q-btn
          flat
          stretch
          icon="mdi-cards-playing"
          no-caps
          to="/bidding"
          class="text-capitalize"
        />
        <q-btn flat stretch icon="mdi-history" no-caps to="/history" />
        <q-btn flat stretch icon="mdi-cog" no-caps to="/setting" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const essentialLinks = [
  {
    title: 'Bidding',
    caption: 'quasar.dev',
    icon: 'mdi-cards-playing',
    link: '/bidding'
  },
  {
    title: 'History',
    caption: 'quasar.dev',
    icon: 'mdi-history',
    link: '/history'
  },
  {
    title: 'Setting',
    caption: 'github.com/quasarframework',
    icon: 'mdi-cog',
    link: '/setting'
  },
  {
    title: 'About',
    caption: 'chat.quasar.dev',
    icon: 'mdi-message-text',
    link: '/about'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
