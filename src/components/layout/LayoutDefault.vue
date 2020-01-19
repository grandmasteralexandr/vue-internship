<template lang="pug">
  .wrap
    MainSidebar(
      :notification-count="notificationCount"
      :open-task-count="tasks.length"
      :completed-task-count="completedTaskCount"
    )
    .content
      MainHeader
      MainContent(
        :tasks="tasks"
        @activityImgClick="changeNotificationCount($event)"
        @addTask="addTask($event)"
        @editTask="editTask($event)"
        @deleteTask="deleteTask($event)"
      )
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import MainSidebar from '../main/MainSidebar.vue'
import MainHeader from '../main/MainHeader.vue'
import MainContent from '../main/MainContent.vue'
import {Status, TaskInterface} from "@/types/TaskInterface";

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
  completedTaskCount: number = 372;
  tasks: TaskInterface[] = [
    {
      id: 0,
      name: 'Learn Vue Cli',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aut cumque, cupiditate dignissimos dolor eum laborum maiores numquam odit perferendis provident ratione repudiandae tempora tenetur voluptatum! Accusantium dolores illum rem.',
      status: Status.ToDo,
      planedCompletionDate: '11/19/2019'
    },

    {
      id: 1,
      name: 'Some task',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aut cumque, cupiditate dignissimos dolor eum laborum maiores numquam odit perferendis provident ratione repudiandae tempora tenetur voluptatum! Accusantium dolores illum rem.',
      status: Status.InProgress,
      planedCompletionDate: '11/22/2019'
    },
  ];

  changeNotificationCount(number: number): void {
    this.notificationCount = number
  }

  addTask(task: TaskInterface): void {
    this.tasks.push(task);
  }

  editTask(task: TaskInterface): void {
    this.$set(this.tasks, task.id, task);
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
    this.completedTaskCount++;
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
