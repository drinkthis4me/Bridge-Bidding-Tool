<template>
  <q-layout view="lhh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-btn flat stretch label="Bidding Tool" no-caps to="/" class="text-h6"/>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header> Planned feature: settings/ about </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: 'History',
    caption: 'quasar.dev',
    icon: 'history',
    link: '/history',
  },
  {
    title: 'Setting',
    caption: 'github.com/quasarframework',
    icon: 'settings',
    link: '/',
  },
  {
    title: 'About',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: '/about',
  },
 
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
