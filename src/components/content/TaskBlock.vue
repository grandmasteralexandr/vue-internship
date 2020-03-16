<template lang="pug">
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
              .due-date(
                :class="{overdue: isOverdue(task.dueDate), 'soon-overdue': isSoonOverdue(task.dueDate)}"
              ) Due date: {{task.dueDate | dateFormat}}
            button.delete-button(@click="deleteTask(task)") Delete

    ModalWindow(
      v-if="showModal"
      @close="showModal = false"
    )
      template(v-slot:body)
        component(
          :is="modalComponent"
          :task="currentTask"
          @close="showModal = false"
        )
</template>

<script lang="ts">
import {Mixins, Component} from 'vue-property-decorator'
import {TaskInterface} from "@/types/TaskInterface";
import ModalWindow from "@/components/modal/ModalWindow.vue"
import TaskCreateForm from "@/components/form/TaskCreateForm.vue";
import TaskDetails from "@/components/form/TaskDetails.vue";
import TaskMixin from "@/components/mixin/TaskMixin"
import {namespace} from 'vuex-class'

const taskStore = namespace('task');

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
  @taskStore.State('tasks') tasks!: TaskInterface[];
  @taskStore.Action('getTasksAction') getTasksAction!: Function;
  @taskStore.Action('deleteTaskAction') deleteTaskAction!: Function;
  @taskStore.Mutation('getTasksMutation') getTasksMutation!: Function;

  scaleTasks: boolean = false;
  modalComponent: string = 'TaskCreateForm';

  async created() {
    // cal mutation in action don't work see issue https://github.com/michaelolof/vuex-class-component/issues/58
    this.getTasksMutation(await this.getTasksAction());
  }

  mounted(): void {
    this.scaleTasks = true;
  }

  async deleteTask(task: TaskInterface) {
    this.getTasksMutation(await this.deleteTaskAction(task));
    this.$gtag.event('Click on delete task', {
      'event_category': 'Click',
      'event_label': task.name
    });
  }

  showTaskCreateForm(): void {
    this.modalComponent = 'TaskCreateForm';
    this.showModal = true;
  }

  showTaskDetails(task: TaskInterface): void {
    this.modalComponent = 'TaskDetails';
    this.currentTask = task;
    this.showModal = true;
    this.$gtag.event('Click on show task', {
      'event_category': 'Click',
      'event_label': task.name
    });
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

  .overdue {
    color: $error-color;
  }

  .soon-overdue {
    color: #cea501;
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
