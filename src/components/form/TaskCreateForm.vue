<template lang="pug">
  form.add-task-form(@submit.prevent="createTask" novalidate)
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
    label.label(for="due-date") Due date:
    input.input#due-date(
      type="date"
      :class="{'input-error': errors.find(item => item.input === 'due-date') }"
      v-model="newTaskDueDate"
      required
    )

    .button-block
      button.add-button(type="submit") Add Task
      button.cancel-button(type="button" @click="$emit('close')") Cancel
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {Status} from "@/types/TaskInterface";
import {InputErrorInterface} from "@/types/InputErrorInterface";
import {namespace} from 'vuex-class'

const taskStore = namespace('task');

@Component(
  {
    name: "TaskCreateForm",
  }
)
export default class TaskCreateForm extends Vue {
  @taskStore.Action('addTaskAction') addTaskAction!: Function;
  @taskStore.Mutation('getTasksMutation') getTasksMutation!: Function;

  newTaskName: string = '';
  newTaskDescription: string = '';
  newTaskStatus: Status = Status.ToDo;
  newTaskDueDate: string = '';
  statusEnum: Object = Status;
  errors: InputErrorInterface[] = [];

  async createTask() {
    if (this.newTaskName && this.newTaskDescription && this.newTaskDueDate) {
      this.getTasksMutation(
        await this.addTaskAction(
          {
            name: this.newTaskName,
            description: this.newTaskDescription,
            status: this.newTaskStatus,
            dueDate: Date.parse(this.newTaskDueDate),
            createdDate: Date.now()
          }
        )
      );

      this.newTaskName = '';
      this.newTaskDescription = '';
      this.newTaskStatus = Status.ToDo;
      this.newTaskDueDate = '';
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

    if (!this.newTaskDueDate) {
      this.errors.push({
        input: 'due-date',
        text: 'Due date cannot be blank'
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

  .textarea {
    resize: none;
    height: 200px;
  }

  .button-block {
    display: flex;
    justify-content: space-between;
  }
</style>
