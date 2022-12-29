import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'indexPage',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: '/bidding',
        name: 'Bidding-tool',
        component: () => import('pages/Bidding-tool.vue'),
      },
      {
        path: '/history',
        name: 'Bid History',
        component: () => import('pages/BidHistory.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
