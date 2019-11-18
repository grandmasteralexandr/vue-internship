<template>
  <div id="app">
    <div class="wrap">
      <MainSidebar :notificationCount="notificationCount"/>
      <MainContent @activityImgClick="changeNotificationCount($event)"
      />
    </div>
  </div>
</template>

<script>
import MainSidebar from './components/MainSidebar'
import MainContent from './components/MainContent'

export default {
  name: 'app',
  components: {
    MainSidebar,
    MainContent
  },

  data() {
    return {
      notificationCount: 3
    }
  },

  methods: {
    changeNotificationCount: function (number) {
      this.notificationCount = number
    }
  }
}
</script>

<style lang="scss">
  @import "./styles/main";
</style>
