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
    v-model="newTaskName"
    :class="{'input-error': errors.find(item => item.input === 'name') }"
    required
    )
    label.label(for="description") Description:
    textarea.textarea#description(
    placeholder="Some description"
    v-model="newTaskDescription"
    :class="{'input-error': errors.find(item => item.input === 'description') }"
    required
    )
    label.label Status:
    select.select(v-model="newTaskStatus")
      option(v-for="status in statusEnum" :key="status") {{status}}

    .button-block
      button.add-button(type="submit") Add Task
      button.cancel-button(type="button" @click="$emit('close')") Cancel
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {Status} from "@/types/TaskInterface";
import {InputErrorInterface} from "@/types/InputErrorInterface";

@Component(
  {
    name: "TaskCreateForm",
  }
)
export default class TaskCreateForm extends Vue {
  @Prop({type: Number, default: 0}) taskLastId!: number;

  newTaskName: string = '';
  newTaskDescription: string = '';
  newTaskStatus: Status = Status.ToDo;
  statusEnum: Object = Status;
  errors: InputErrorInterface[] = [];

  addTask(): void {
    if (this.newTaskName && this.newTaskDescription) {
      this.$emit(
        'addTask',
        {
          id: this.taskLastId + 1,
          name: this.newTaskName,
          description: this.newTaskDescription,
          status: this.newTaskStatus,
          planedCompletionDate: this.getDate()
        }
      );

      this.newTaskName = '';
      this.newTaskDescription = '';
      this.newTaskStatus = Status.ToDo;
      this.errors = [];
      this.$emit('close');
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
</style>