<template lang="pug">
  .content-wrap
    component(
      :is="currentContentTab"
      @activityImgClick="$emit('activityImgClick', $event)"
    )
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import ActivityBlock from './ActivityBlock.vue'
import TaskBlock from './TaskBlock.vue'

@Component(
  {
    name: "MainContent",

    components: {
      ActivityBlock,
      TaskBlock
    },

    props: {
      currentContentTab: {
        type: String,
        default: 'ActivityBlock'
      }
    }
  }
)

export default class MainContent extends Vue {}
</script>

<style scoped lang="scss">
  .content-wrap {
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: $content-background;
    flex: 1 0 auto;
  }
</style>
