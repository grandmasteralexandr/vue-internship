<template lang="pug">
  .content-container
    .error
      h1.red Internal server error 500
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component(
  {
    name: "InternalServerError500"
  }
)
export default class InternalServerError500 extends Vue {}
</script>

<style scoped lang="scss">
  .error {
    display: flex;
    justify-content: center;
  }

  .red {
    color: red;
  }
</style>
