<template lang="pug">
  .content-container
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

    transition(name="tasks-block")
      div(v-if="scaleTasks")
        transition-group(
          :css="false"
          @enter="blinks"
        )
          .task-item(
            v-for="(task, index) in tasks"
            :key="task.name"
          )
            .task-content
              .task-name {{task.name}}
              .task-description {{task.description}}
              .task-planed-completion-date Planned completion date: {{task.planedCompletionDate}}
            button.delete-button(@click="deleteTask(index)") Delete
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {TaskInterface} from "@/types/TaskInterface";
import {InputErrorInterface} from "@/types/InputErrorInterface";

@Component(
  {
    name: "TaskBlock",
  }
)

export default class TaskBlock extends Vue {
  @Prop({type: Array}) tasks!: TaskInterface[];

  scaleTasks: boolean = false;
  newTaskName: string = '';
  newTaskDescription: string = '';
  errors: InputErrorInterface[] = [];

  mounted(): void {
    this.scaleTasks = true;
  }

  addTask(): void {
    if (this.newTaskName && this.newTaskDescription) {
      this.$emit(
        'addTask',
        {
          name: this.newTaskName,
          description: this.newTaskDescription,
          planedCompletionDate: this.getDate()
        }
      );

      this.newTaskName = '';
      this.newTaskDescription = '';
      this.errors = [];
      return;
    }

    //add errors
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
    this.$emit('deleteTask', index);
  }

  //using js because transition-group don't correct work with css animation-iteration-count (blink only 1 iteration)
  blinks(element: Element): void {
    element.animate(
      //keyframes
      {
        opacity: [1, 0]
      },

      // timing options
      {
        duration: 500,
        iterations: 4
      }
    )
  }
}
</script>

<style scoped lang="scss">
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

  .tasks-block-enter-active {
    animation: scale 2.5s;
  }

  @keyframes scale {
    50% {
      transform: scale(1.3);
    }

    100% {
      transform: scale(1);
    }
  }

  @media screen and (max-width: 425px) {
    .task-item {
      flex-direction: column;
    }

    .delete-button {
      margin: 10px 0 0 0;
    }
  }
</style>
