<template>
  <div class="wrap">
    <MainSidebar :notification-count="notificationCount"/>
    <div class="content">
      <MainHeader @changeTab="changeCurrentTab($event)"/>
      <MainContent
          :current-content-tab="currentContentTab"
          @activityImgClick="changeNotificationCount($event)"
      />
    </div>
  </div>
</template>

<script>
import MainSidebar from './MainSidebar'
import MainHeader from './MainHeader'
import MainContent from './MainContent'

export default {
  name: "LayoutDefault",
  components: {
    MainSidebar,
    MainHeader,
    MainContent
  },

  data() {
    return {
      notificationCount: 3,
      currentContentTab: 'ActivityBlock'
    }
  },

  methods: {
    changeNotificationCount: function (number) {
      this.notificationCount = number
    },

    changeCurrentTab: function (newTab) {
      this.currentContentTab = newTab
    }
  }
}
</script>

<style lang="scss">
  @font-face {
    font-family: Helvetica;
    src: url("./../fonts/HelveticaRegular.ttf");
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
