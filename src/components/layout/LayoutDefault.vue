<template lang="pug">
  .wrap
    MainSidebar(
      :notification-count="notificationCount"
      :open-task-count="openTaskCount"
      @changeTaskCount="changeOpenTaskCount($event)"
    )
    .content
      MainHeader
      MainContent(
        @activityImgClick="changeNotificationCount($event)"
        @changeTaskCount="changeOpenTaskCount($event)"
      )
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import MainSidebar from '../main/MainSidebar.vue'
import MainHeader from '../main/MainHeader.vue'
import MainContent from '../main/MainContent.vue'

@Component(
  {
    name: "LayoutDefault",
    components: {
      MainSidebar,
      MainHeader,
      MainContent
    },
  }
)

export default class LayoutDefault extends Vue {
  notificationCount: number = 3;
  openTaskCount: number = 0;

  changeNotificationCount(number: number): void {
    this.notificationCount = number
  }

  changeOpenTaskCount(taskCount: number): void {
      this.openTaskCount = taskCount;
  }
}
</script>

<style lang="scss">
  @font-face {
    font-family: Helvetica;
    src: url("../../fonts/HelveticaRegular.ttf");
  }

  body {
    margin: 0;
    font-family: Helvetica, Verdana, serif;
    font-size: 16px;
    color: $content-font-color;
    line-height: 1.2em;
  }

  button {
    outline: none;
    border: none;
    background: transparent;
    font-family: Helvetica, Verdana, serif;
  }

  .wrap {
    display: flex;
    min-height: 100vh;
  }

  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  @media screen and (max-width: 700px) {
    .wrap {
      flex-direction: column;
    }
  }
</style>
