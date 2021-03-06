<template lang="pug">
  .sidebar
    .logo
      .logo-name PROJECTUS
    .main-menu-wrap
      .user
        .user-info
          .user-name {{userName}}
          .user-role {{userRole}}
        .user-setting-button
          .dots
      .tasks
        .completed-tasks
          .task-count {{completedTaskCount}}
          .task-status Completed Tasks
        .open-tasks(@click="goToTasks")
          .task-count {{openTaskCount}}
          .task-status Open Tasks
      nav.main-menu
        .main-menu-name MENU
        ul.main-menu-container
          li.main-menu-item
            a.main-menu-link(href="#") Home
          li.main-menu-item
            a.main-menu-link(href="#") My Tasks
          li.main-menu-item
            a.main-menu-link(href="#") Notifications
              span.count-highlight {{notificationCount}}
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import {TaskInterface} from "@/types/TaskInterface";

const taskStore = namespace('task');

@Component(
  {
    name: 'MainSidebar',
  }
)
export default class MainSidebar extends Vue {
  @Prop({type: Number, default: 3}) notificationCount!: number;
  @taskStore.State('tasks') tasks!: TaskInterface[];

  completedTaskCount: number = 372;
  userName: string = 'Jean Gonzales';
  userRole: string = 'Product Owner';

  @Watch('tasks')
  onTaskChanged(tasks: TaskInterface[], oldTasks: TaskInterface[]) {
    if (oldTasks.length > tasks.length) {
      this.completedTaskCount++;
    }
  }

  get openTaskCount(): number {
    return this.tasks.length;
  }

  goToTasks(): void {
    if (this.openTaskCount === 0) {
      alert('No more open tasks');
      return;
    }

    this.$router.push({name: 'Tasks'}).catch(err => {console.log(err.message)})
  }
}
</script>

<style scoped lang="scss">
  .sidebar {
    background-color: $sidebar-background-color;
    color: $sidebar-main-font-color;
    display: flex;
    flex-direction: column;
    min-width: 270px;
  }

  .logo-name {
    font-weight: bold;
    padding: 30px;

    &:before {
      content: url("../../img/logo@3x.svg");
      float: left;
      position: relative;
      left: -13px;
      padding-left: 13px;
    }

    &:after {
      content: url("../../img/search@3x.svg");
      position: relative;
      left: 72px;
      top: 2px;
      cursor: pointer;
    }
  }

  .main-menu-wrap {
    display: flex;
    flex-direction: column;
  }

  .user {
    background-color: $user-block-color;
    min-height: 80px;
    display: flex;
    align-items: center;

    &:before {
      content: "";
      background: url("../../img/user-avatar.jpeg") center center;
      background-size: cover;
      @include square-block(48px);
      border-radius: 50%;
      margin-left: 30px;
      margin-right: 13px;
    }
  }

  .user-info {
    display: flex;
    flex-direction: column;
  }

  .user-name {
    font-size: 14px;
  }

  .user-role, .task-status, .main-menu-name {
    font-size: 12px;
    color: $sidebar-second-font-color;
  }

  .user-setting-button {
    @extend %dots-button;
    margin-left: auto;
    margin-right: 15px;
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

  .tasks {
    display: flex;
    margin-top: 20px;
  }

  .completed-tasks {
    margin-left: 30px;
  }

  .open-tasks {
    margin-left: 20px;
    cursor: pointer;
  }

  .task-count {
    font-size: 20px;
    padding: 2px 0;
  }

  .main-menu {
    margin-top: 30px;
    padding-left: 30px;

    ul {
      padding: 0;
      margin: 20px 0;
      font-size: 14px;

      li {
        padding: 10px 0;
        list-style-type: none;

        a {
          text-decoration: none;
          color: $sidebar-main-font-color;
          display: flex;
          align-items: center;
        }
      }
    }
  }

  .count-highlight {
    @include square-block(20px);
    @extend %flex-center;
    background-color: $gold-highlight;
    color: $content-font-color;
    font-size: 13px;
    border-radius: 50%;
    margin-left: 10px;
  }

  @media screen and (max-width: 700px) {
    .main-menu-wrap {
      display: none;
    }
  }
</style>
