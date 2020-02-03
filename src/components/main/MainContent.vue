<template lang="pug">
  .content-wrap
    keep-alive
      router-view(
        @activityImgClick="$emit('activityImgClick', $event)"
      )
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'

@Component(
  {
    name: "MainContent",
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
