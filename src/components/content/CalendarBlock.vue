<template lang="pug">
  .content-container
    .calendar
      h1 Coming Soon...
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component(
  {
    name: "CalendarBlock"
  }
)
export default class CalendarBlock extends Vue {}
</script>

<style scoped lang="scss">
  .calendar {
    display: flex;
    justify-content: center;
  }
</style>
