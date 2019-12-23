<template lang="pug">
  .content-container
    .error
      h1.red Page Not Found 404
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component(
  {
    name: "NotFound404"
  }
)
export default class NotFound404 extends Vue {}
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
