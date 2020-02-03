<template lang="pug">
  .content-container
    .files(v-for="file in files")
      .file {{file}}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {namespace} from 'vuex-class'

const activityStore = namespace('activity');

@Component(
  {
    name: "FilesBlock"
  }
)
export default class FilesBlock extends Vue {
  @activityStore.Getter('files') files!: Function;
}
</script>

<style scoped lang="scss">
  .files {
    display: flex;
    justify-content: center;
  }
</style>
