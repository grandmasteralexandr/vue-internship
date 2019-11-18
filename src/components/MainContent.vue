<template>
  <div class="content">
    <div class="content__header">
      <div class="content__header-top-line">
        <div class="content__title">
          <div>{{projectName}}</div>
          <div class="content__settings-button">
            <div class="dots"></div>
          </div>
        </div>
        <div class="content__header-buttons-block">
          <div class="share">
            <div v-for="(sharedAvatar, index) in sharedAvatars"
                 :key="index"
                 class="share__avatar"
            >
              <img :src="getImgUrl(sharedAvatar)" alt="Avatar">
            </div>
            <button class="share__button">Share</button>
          </div>
          <div class="chat">
            <button class="chat__button">Chat</button>
          </div>
        </div>
      </div>
      <nav class="content-menu">
        <ul class="content-menu__container">
          <li v-for="(contentTab, index) in contentTabs"
              :key="index"
              @click="currentContentTab = contentTab.component"
              class="content-menu__item"
          >
            <a href="#" :class="['content-menu__link', {active: contentTab.component === currentContentTab}]">
              {{contentTab.name}}
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="content-wrap">
      <component :is="currentContentTab"
                 @activityImgClick="$emit('activityImgClick', $event)"
      >
      </component>
    </div>
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

  data() {
    return {
      projectName: 'Website Redesign',
      sharedAvatars: [
        'shared-avatar.jpeg',
        'shared-avatar2.jpeg',
        'shared-avatar3.jpeg'
      ],
      contentTabs: [
        {
          name: 'Tasks',
          component: 'TaskBlock'
        },

        {
          name: 'Kanban',
          component: 'KanbanBlock'
        },

        {
          name: 'Activity',
          component: 'ActivityBlock'
        },

        {
          name: 'Calendar',
          component: 'CalendarBlock'
        },

        {
          name: 'Files',
          component: 'FilesBlock'
        },
      ],
      currentContentTab: 'ActivityBlock'
    }
  },

  methods: {
    getImgUrl: function (img) {
      return require('@/img/' + img)
    }
  }
}
</script>

<style scoped>

</style>
