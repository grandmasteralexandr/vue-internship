<template lang="pug">
  .content-container
    .kanban
      h1 Coming Soon...
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component(
  {
    name: "KanbanBlock"
  }
)
export default class KanbanBlock extends Vue {}
</script>

<style scoped lang="scss">
  .kanban {
    display: flex;
    justify-content: center;
  }
</style>
