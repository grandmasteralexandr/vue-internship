<template lang="pug">
  .wrap
    MainSidebar(
      :notification-count="notificationCount"
    )
    .content
      MainHeader
      MainContent(
        @activityImgClick="changeNotificationCount($event)"
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

  changeNotificationCount(number: number): void {
    this.notificationCount = number
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

  .content-container {
    display: flex;
    flex-direction: column;
    background-color: white;
    box-sizing: border-box;
    max-width: 730px;
    min-width: 730px;
    padding: 35px 30px;
    margin-top: 30px;
    border-radius: 8px;
  }

  .input, .textarea {
    margin-bottom: 10px;
    padding: 5px 0;
    width: 240px;
  }

  .select {
    height: 30px;
    background-color: transparent;
    margin-bottom: 10px;
  }

  .add-button {
    @include button(#77bd8e);
    color: $content-font-color;
    margin-top: 8px;
  }

  .errors-block {
    color: $error-color;
  }

  .input-error {
    border-color: $error-color;
  }

  .cancel-button {
    @include button(#cac6c6);
    color: $content-font-color;
    margin-top: 8px;
  }

  @media screen and (max-width: 1023px) {
    .content-container {
      min-width: 320px;
    }
  }

  @media screen and (max-width: 700px) {
    .wrap {
      flex-direction: column;
    }
  }
</style>
