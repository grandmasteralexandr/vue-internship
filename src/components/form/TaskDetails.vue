<template lang="pug">
  form.add-task-form(@submit.prevent="editTask" novalidate)
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

    template(v-if="isInput")
      label.label(for="name") Name:
      input.input#name(
        type="text"
        placeholder="Some name"
        v-model="taskName"
        :class="{'input-error': errors.find(item => item.input === 'name') }"
        required
        @input="isChanged = true"
      )
    .task-name(v-else) {{taskName}}

    template(v-if="isInput")
      label.label(for="description") Description:
      textarea.textarea#description(
        placeholder="Some description"
        v-model="taskDescription"
        :class="{'input-error': errors.find(item => item.input === 'description') }"
        required
        @input="isChanged = true"
      )
    .task-description(v-else) {{taskDescription}}

    template(v-if="isInput")
      label.label Status:
      select.select(v-model="taskStatus" @change="isChanged = true")
        option(
          v-for="status in statusEnum"
          :key="status"
          :disabled="!isAllowedStatus(status)"
        ) {{status}}
    .task-status(v-else) Status:&nbsp
      span(
        :class="getStatusClass(task.status)"
      ) {{task.status}}

    template(v-if="isInput")
      label.label(for="due-date") Due date:
      input.input#due-date(
        type="date"
        :class="{'input-error': errors.find(item => item.input === 'due-date') }"
        @input="isChanged = true"
        required
        v-model="taskDueDate"
      )
    .due-date(v-else) Due date: {{task.dueDate | dateFormat}}

    .button-block(:class="{'one-button': !isChanged}")
      button.add-button(v-if="isChanged" type="submit") Save
      button.edit-button(v-if="!isInput" type="button" @click.prevent="isInput = true") Edit
      button.cancel-button(v-if="isInput" type="button" @click.prevent="$emit('close')") Cancel
</template>

<script lang="ts">
import {Component, Prop, Mixins} from 'vue-property-decorator'
import {Status, TaskInterface} from "@/types/TaskInterface";
import {InputErrorInterface} from "@/types/InputErrorInterface";
import TaskMixin from "@/components/mixin/TaskMixin"
import * as moment from 'moment';

@Component(
  {
    name: "TaskDetails",
  }
)
export default class TaskDetails extends Mixins(TaskMixin) {
  @Prop({type: Object}) task!: TaskInterface;

  taskName: string = this.task.name;
  taskDescription: string = this.task.description;
  taskStatus: Status = this.task.status;
  taskDueDate: string = moment(this.task.dueDate).format('YYYY-MM-DD');
  statusEnum: Object = Status;
  errors: InputErrorInterface[] = [];
  isInput: boolean = false;
  isChanged: boolean = false;

  editTask(): void {
    if (this.taskName && this.taskDescription && this.taskDueDate) {
      this.$emit(
        'editTask',
        {
          id: this.task.id,
          name: this.taskName,
          description: this.taskDescription,
          status: this.taskStatus,
          dueDate: Date.parse(this.taskDueDate)
        }
      );

      this.$emit('close');
      return;
    }

    //add errors
    this.errors = [];

    if (!this.taskName) {
      this.errors.push({
        input: 'name',
        text: 'Name cannot be blank'
      })
    }

    if (!this.taskDescription) {
      this.errors.push({
        input: 'description',
        text: 'Description cannot be blank'
      })
    }

    if (!this.taskDueDate) {
      this.errors.push({
        input: 'due-date',
        text: 'Due date cannot be blank'
      })
    }
  }

  isAllowedStatus(status: Status): boolean {
    return !(status == Status.ToDo && this.task.status == Status.Done);
  }
}
</script>

<style lang="scss" scoped>
  .add-task-form {
    align-self: center;
    display: flex;
    flex-direction: column;
    max-width: 300px;
  }

  .textarea {
    resize: none;
    height: 200px;
  }

  .button-block {
    display: flex;
    justify-content: space-between;
  }

  .one-button {
    justify-content: flex-end;
  }

  .edit-button {
    @include button(#00a3e3);
    color: white;
    margin-top: 8px;
  }

  .task-description, .task-status, .due-date {
    padding-top: 15px;
  }

  .task-name {
    font-weight: bold;
    font-size: 18px;
  }

  .status-to-do {
    color: green;
  }

  .status-in-progress {
    color: chocolate;
  }

  .status-done {
    color: blue;
  }

  .task-status, .due-date {
    font-size: 14px;
    color: rgba($content-font-color, 0.7);
  }

  .due-date {
    margin-bottom: 10px;
  }
</style>
