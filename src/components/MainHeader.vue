<template lang="pug">
  .header
    .header-top-line
      .title
        .project-name {{projectName}}
        .settings-button
          .dots
      .header-buttons-block
        .share
          .share-avatar(
            v-for="(sharedAvatar, index) in sharedAvatars"
            :key="index"
          )
            img(:src="getImgUrl(sharedAvatar)" alt="Avatar")
          button.share-button Share
        .chat
          button.chat-button Chat
    nav.menu
      ul.menu-container
        li.menu-item(
          v-for="(contentTab, index) in contentTabs"
          :key="index"
          @click.prevent="changeContentTab(contentTab.component)"
        )
          a(
            href="#"
            :class="['content-menu-link', {active: contentTab.component === currentContentTab}]"
          )
            | {{contentTab.name}}
</template>

<script>
export default {
  name: "MainHeader",

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
    },

    changeContentTab: function (changedTab) {
      this.currentContentTab = changedTab;
      this.$emit('changeTab', changedTab)
    }
  }
}
</script>

<style scoped lang="scss">
  .header {
    display: flex;
    flex-direction: column;
  }

  .header-top-line {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 15px;
  }

  .title {
    font-size: 32px;
    margin: 20px 10px 0 83px;
    position: relative;
    display: flex;
    line-height: normal;

    &:before {
      @include icon(40px, -53px, -8px, "./../img/shapes@2x.png");
      background: $gold-highlight url("./../img/shapes@2x.png") center center no-repeat;
      background-size: cover;
      border-radius: 8px;
    }
  }

  .settings-button {
    @extend %dots-button;
    background-color: $gray-highlight;
    border-radius: 50%;
    margin: 0 10px;
  }

  .dots {
    position: relative;
    @include square-block(4px);
    border-radius: 50%;
    background-color: $sidebar-second-font-color;

    &:before, &:after {
      content: "";
      position: absolute;
      @include square-block(inherit);
      background-color: inherit;
      border-radius: inherit;
    }

    &:before {
      left: -6px;
    }

    &:after {
      left: 6px;
    }
  }

  .header-buttons-block {
    margin: 10px 22px 0 25px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .share {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-right: 10px;
  }

  .share-avatar {
    @include square-block(30px);
    padding: 10px 5px;

    &:last-of-type {
      padding-right: 10px;
    }

    img {
      @include square-block(inherit);
      border-radius: 50%;
    }
  }

  .share-button {
    @include button($gray-highlight);
  }

  .chat {
    padding: 10px 0;
  }

  .chat-button {
    @include button($chat-button-background);
    color: $gold-highlight;
    position: relative;
    padding-left: 45px;

    &:before {
      @include icon(18px, 18px, 6px, "./../img/combined-shape@1x.svg");
    }
  }

  .menu {
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0;
      margin: 6px 10px 16px 30px;

      li {
        list-style-type: none;
        padding: 16px 16px 0 0;

        a {
          text-decoration: none;
          color: rgba($content-font-color, 0.7);
          cursor: pointer;

          &.active {
            color: $content-font-color;
            border-bottom: 2px solid $gold-highlight;
            padding-bottom: 17px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 400px) {
    .title {
      align-items: center;

      &:before {
        top: 8px;
      }
    }
  }

  @media screen and (max-width: 365px) {
    .menu ul li a.active {
      padding-bottom: 0;
    }
  }
</style>
