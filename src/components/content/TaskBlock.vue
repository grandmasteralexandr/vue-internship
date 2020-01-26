<template lang="pug" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  .content-container
    button.add-button(@click="showTaskCreateForm") Add Task

    transition(name="tasks-block")
      div(v-if="scaleTasks")
        transition-group(
          :css="false"
          @enter="blinks"
        )
          .task-item(
            v-for="task in tasks"
            :key="task.id"
          )
            .task-content(@click="showTaskDetails(task)")
              .task-name {{task.name}}
              .task-description {{task.description}}
              .task-status Status:&nbsp
                span(
                  :class="getStatusClass(task.status)"
                ) {{task.status}}
              .due-date Due date: {{task.dueDate | dateFormat}}
            button.delete-button(@click="deleteTask(task)") Delete

    ModalWindow(
      v-if="showModal"
      @close="showModal = false"
    )
      template(v-slot:body)
        component(
          :is="modalComponent"
          :task="currentTask"
          :taskLastId="taskLastId"
          @addTask="$emit('addTask', $event)"
          @editTask="$emit('editTask', $event)"
          @close="showModal = false"
        )
</template>

<script lang="ts">
import {Mixins, Component, Prop} from 'vue-property-decorator'
import {TaskInterface, Status} from "@/types/TaskInterface";
import ModalWindow from "@/components/modal/ModalWindow.vue"
import TaskCreateForm from "@/components/form/TaskCreateForm.vue";
import TaskDetails from "@/components/form/TaskDetails.vue";
import TaskMixin from "@/components/mixin/TaskMixin"

@Component(
  {
    name: "TaskBlock",
    components: {
      ModalWindow,
      TaskCreateForm,
      TaskDetails,
    }
  }
)

export default class TaskBlock extends Mixins(TaskMixin) {
  @Prop({type: Array}) tasks!: TaskInterface[];

  scaleTasks: boolean = false;
  modalComponent: string = 'TaskCreateForm';

  get taskLastId(): number {
    return this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id : 0;
  }

  mounted(): void {
    this.scaleTasks = true;
  }

  showTaskCreateForm(): void {
    this.modalComponent = 'TaskCreateForm';
    this.showModal = true;
  }

  showTaskDetails(task: TaskInterface): void {
    this.modalComponent = 'TaskDetails';
    this.currentTask = task;
    this.showModal = true;
  }

  deleteTask(index: number): void {
    this.$emit('deleteTask', index);
  }

  //using js because transition-group don't correct work with css animation-iteration-count (blink only 1 iteration)
  blinks(element: Element): void {
    element.scrollIntoView();
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
  .add-button {
    @include button(#77bd8e);
    color: $content-font-color;
    margin-top: 8px;
    width: 200px;
    align-self: center;
  }

  .task-description, .task-status, .due-date {
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
    cursor: pointer;
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
