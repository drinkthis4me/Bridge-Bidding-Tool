<template>
  <q-page class="column items-center justify-center">
    <div class="text-h3 q-mb-md">Welcome</div>
    <div class="text-h4 text-center q-mb-md">Bidding Tool v0.0.7</div>
    <q-btn label="Start Bidding" no-caps color="purple" to="/bidding" size="xl" />
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta } from 'components/models'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1'
      },
      {
        id: 2,
        content: 'ct2'
      },
      {
        id: 3,
        content: 'ct3'
      },
      {
        id: 4,
        content: 'ct4'
      },
      {
        id: 5,
        content: 'ct5'
      }
    ])
    const meta = ref<Meta>({
      totalCount: 1200
    })
    return { todos, meta }
  }
})
</script>
