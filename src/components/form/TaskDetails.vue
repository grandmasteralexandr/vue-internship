<template lang="pug">
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
    v-model="taskName"
    :class="{'input-error': errors.find(item => item.input === 'name') }"
    required
    )
    label.label(for="description") Description:
    input.input#description(
    type="text"
    placeholder="Some description"
    v-model="taskDescription"
    :class="{'input-error': errors.find(item => item.input === 'description') }"
    required
    )
    label.label Status:
    select.select(v-model="taskStatus")
      option(v-for="status in statusEnum" :key="status") {{status}}

    .button-block
      button.add-button(@click="editTask") Save
      button.cancel-button(@click="$emit('close')") Cancel
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {TaskInterface, Status} from "@/types/TaskInterface";
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
}
</script>

<style lang="scss" scoped>
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

  .select {
    height: 30px;
    background-color: transparent;
    margin-bottom: 10px;
  }

  .add-button {
    @include button(#77bd8e);
    color: $content-font-color;
    margin-top: 8px;
  }

  .errors-block {
    color: $error-color;
  }

  .input-error {
    border-color: $error-color;
  }

  .cancel-button {
    @include button(#cac6c6);
    color: $content-font-color;
    margin-top: 8px;
  }
</style>
