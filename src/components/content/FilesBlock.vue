<template lang="pug">
  .files
    h1 Coming Soon...
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component(
  {
    name: "FilesBlock"
  }
)
export default class FilesBlock extends Vue {}
</script>

<style scoped lang="scss">
  .files {
    display: flex;
    justify-content: center;
  }
</style>
