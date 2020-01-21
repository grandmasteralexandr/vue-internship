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

    .task-planed-completion-date(v-if="!isInput") Planned completion date: {{task.planedCompletionDate}}

    .button-block(:class="{'one-button': !isChanged}")
      button.add-button(v-if="isChanged" type="submit") Save
      button.edit-button(v-if="!isInput" type="button" @click.prevent="isInput = true") Edit
      button.cancel-button(v-if="isInput" type="button" @click.prevent="$emit('close')") Cancel
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {Status, TaskInterface} from "@/types/TaskInterface";
import {InputErrorInterface} from "@/types/InputErrorInterface";

@Component(
  {
    name: "TaskDetails",
  }
)
export default class TaskDetails extends Vue {
  @Prop({type: Object}) task!: TaskInterface;

  taskName: string = this.task.name;
  taskDescription: string = this.task.description;
  taskStatus: Status = this.task.status;
  statusEnum: Object = Status;
  errors: InputErrorInterface[] = [];
  isInput: boolean = false;
  isChanged: boolean = false;

  editTask(): void {
    if (this.taskName && this.taskDescription) {
      this.$emit(
        'editTask',
        {
          id: this.task.id,
          name: this.taskName,
          description: this.taskDescription,
          status: this.taskStatus,
          planedCompletionDate: this.task.planedCompletionDate
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
  }

  isAllowedStatus(status: Status): boolean {
    return !(status == Status.ToDo && this.task.status == Status.Done);
  }

  getStatusClass(status: Status): string {
    if (status == Status.ToDo) {
      return 'status-to-do'
    }

    if (status == Status.InProgress) {
      return 'status-in-progress'
    }

    return 'status-done'
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
    height: 250px;
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

  .task-description, .task-status, .task-planed-completion-date {
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

  .task-status, .task-planed-completion-date {
    font-size: 14px;
    color: rgba($content-font-color, 0.7);
  }

  .task-planed-completion-date {
    margin-bottom: 10px;
  }
</style>
