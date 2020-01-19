<template lang="pug">
  .content-wrap
    keep-alive
      router-view(
        :tasks="tasks"
        @activityImgClick="$emit('activityImgClick', $event)"
        @addTask="$emit('addTask', $event)"
        @editTask="$emit('editTask', $event)"
        @deleteTask="$emit('deleteTask', $event)"
      )
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {TaskInterface} from "@/types/TaskInterface";

@Component(
  {
    name: "MainContent",
  }
)

export default class MainContent extends Vue {
  @Prop({type: Array}) tasks!: TaskInterface[];
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
