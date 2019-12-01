<template lang="pug">
  .tasks
    .task-item(
      v-for="(task, index) in tasks"
      :key="index"
    )
      .task-name {{task.name}}
      .task-description {{task.description}}
      .task-planed-completion-date Planned completion date: {{task.planedCompletionDate}}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Task} from "@/types/task";

@Component(
  {
    name: "TaskBlock",
  }
)

export default class TaskBlock extends Vue {
  tasks: Task[] = [
    {
      name: 'Learn Vue Cli',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aut cumque, cupiditate dignissimos dolor eum laborum maiores numquam odit perferendis provident ratione repudiandae tempora tenetur voluptatum! Accusantium dolores illum rem.',
      planedCompletionDate: '19/11/2019'
    },

    {
      name: 'Learn Vue Components',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aut cumque, cupiditate dignissimos dolor eum laborum maiores numquam odit perferendis provident ratione repudiandae tempora tenetur voluptatum! Accusantium dolores illum rem.',
      planedCompletionDate: '22/11/2019'
    },

    {
      name: 'Learn Vue Mixins',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aut cumque, cupiditate dignissimos dolor eum laborum maiores numquam odit perferendis provident ratione repudiandae tempora tenetur voluptatum! Accusantium dolores illum rem.',
      planedCompletionDate: '23/11/2019'
    },

    {
      name: 'Learn Vue best practices',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aut cumque, cupiditate dignissimos dolor eum laborum maiores numquam odit perferendis provident ratione repudiandae tempora tenetur voluptatum! Accusantium dolores illum rem.',
      planedCompletionDate: '29/11/2019'
    },
  ]
}
</script>

<style scoped lang="scss">
  .tasks {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 35px 30px;
    margin-top: 30px;
    max-width: 670px;
    border-radius: 8px;
  }

  .task-item, .task-description, .task-planed-completion-date {
    padding-top: 15px;
  }

  .task-item:first-child {
    padding-top: 0;
  }

  .task-name {
    font-weight: bold;
    font-size: 18px;
  }

  .task-planed-completion-date {
    font-size: 14px;
    color: rgba($content-font-color, 0.7);
  }
</style>
