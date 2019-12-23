<template lang="pug">
  .tasks
    form.add-task-form(@submit.prevent="addTask" novalidate)
      .errors-block(
        v-if="errors.length"
      )
        p Please, fix this error(s):
        ul
          li(
            v-for="(error, index) in errors"
            :key="index"
          )
            | {{ error.text }}

      label.label(for="name") Name:
      input.input#name(
        type="text"
        placeholder="Some name"
        v-model="newTaskName"
        :class="{'input-error': errors.find(item => item.input === 'name') }"
        required
      )
      label.label(for="description") Description:
      input.input#description(
        type="text"
        placeholder="Some description"
        v-model="newTaskDescription"
        :class="{'input-error': errors.find(item => item.input === 'description') }"
        required
      )
      button.add-button Add Task

    .task-item(
      v-for="(task, index) in tasks"
      :key="index"
    )
      .task-content
        .task-name {{task.name}}
        .task-description {{task.description}}
        .task-planed-completion-date Planned completion date: {{task.planedCompletionDate}}
      button.delete-button(@click="deleteTask(index)") Delete
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {TaskInterface} from "@/types/TaskInterface";
import {InputErrorInterface} from "@/types/InputErrorInterface";

@Component(
  {
    name: "TaskBlock",
  }
)

export default class TaskBlock extends Vue {
  newTaskName: string = '';
  newTaskDescription: string = '';
  errors: InputErrorInterface[] = [];

  tasks: TaskInterface[] = [
    {
      name: 'Learn Vue Cli',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aut cumque, cupiditate dignissimos dolor eum laborum maiores numquam odit perferendis provident ratione repudiandae tempora tenetur voluptatum! Accusantium dolores illum rem.',
      planedCompletionDate: '11/19/2019'
    }
  ];

  mounted(): void {
    this.$emit('changeTaskCount', this.tasks.length);
  }

  addTask(): void {
    if (this.newTaskName && this.newTaskDescription) {
      this.tasks.push({
        name: this.newTaskName,
        description: this.newTaskDescription,
        planedCompletionDate: this.getDate()
      });

      this.newTaskName = '';
      this.newTaskDescription = '';
      this.errors = [];
      this.$emit('changeTaskCount', this.tasks.length);
      return;
    }

    //add errors if 'required' delete in HTML
    this.errors = [];

    if (!this.newTaskName) {
      this.errors.push({
        input: 'name',
        text: 'Name cannot be blank'
      })
    }

    if (!this.newTaskDescription) {
      this.errors.push({
        input: 'description',
        text: 'Description cannot be blank'
      })
    }
  }

  getDate(): string {
    // week in milliseconds
    const increaseTime: number = 604800000;
    return new Date(Date.now() + increaseTime).toLocaleDateString('en-US');
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
    this.$emit('changeTaskCount', this.tasks.length);
    this.$emit('deleteTask');
  }
}
</script>

<style scoped lang="scss">
  .tasks {
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

  .add-task-form {
    align-self: center;
    display: flex;
    flex-direction: column;
    max-width: 300px;
  }

  .input {
    margin-bottom: 10px;
    padding: 5px 0;
    width: 240px;
  }

  .add-button {
    @include button(#77bd8e);
    color: $content-font-color;
    margin-top: 8px;
  }

  .task-description, .task-planed-completion-date {
    padding-top: 15px;
  }

  .task-item {
    display: flex;
    justify-content: space-between;
    padding-top: 25px;
  }

  .task-content {
    display: flex;
    flex-direction: column;
  }

  .delete-button {
    @include button($error-color);
    color: white;
    align-self: center;
    margin-left: 10px;
  }

  .task-name {
    font-weight: bold;
    font-size: 18px;
  }

  .task-planed-completion-date {
    font-size: 14px;
    color: rgba($content-font-color, 0.7);
  }

  .errors-block {
    color: $error-color;
  }

  .input-error {
    border-color: $error-color;
  }

  @media screen and (max-width: 425px) {
    .task-item {
      flex-direction: column;
    }

    .delete-button {
      margin: 10px 0 0 0;
    }
  }

  @media screen and (max-width: 1023px) {
    .tasks {
      min-width: 320px;
    }
  }
</style>
