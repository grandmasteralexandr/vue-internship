<template>
  <div class="content-wrap">
    <component
        :is="currentContentTab"
        @activityImgClick="$emit('activityImgClick', $event)"
    >
    </component>
  </div>
</template>

<script>
import ActivityBlock from './ActivityBlock'
import TaskBlock from './TaskBlock'

export default {
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
