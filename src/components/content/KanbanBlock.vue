<template lang="pug">
  .content-container
    .status-table
      .status-col(
        v-for="status in statusEnum"
        :key="status"
        :class="{'drag-enter': status === droppedColName}"
        @dragover="onDragOver($event, status)"
        @dragleave="droppedColName = ''"
        @drop="onDrop(status)"
      )
        .status-col-head {{status}}
        .status-col-body
          .task-card(
            v-for="task in getTasksByStatus(status)"
            :key="task.id"
            @click="showTaskDetails(task)"
            draggable="true"
            @dragstart="dragStart($event, task)"
          )
            .task-name {{task.name}}
            .task-planed-completion-date Due date: {{task.planedCompletionDate}}

    ModalWindow(
      v-if="showModal"
      @close="showModal = false"
    )
      template(v-slot:body)
        TaskDetails(
          :task="currentTask"
          @editTask="$emit('editTask', $event)"
          @close="showModal = false"
        )
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {Status, TaskInterface} from "@/types/TaskInterface";
import ModalWindow from "@/components/modal/ModalWindow.vue";
import TaskDetails from "@/components/form/TaskDetails.vue";

@Component(
  {
    name: "KanbanBlock",
    components: {
      ModalWindow,
      TaskDetails,
    }
  }
)
export default class KanbanBlock extends Vue {
  @Prop({type: Array}) tasks!: TaskInterface[];

  statusEnum: Object = Status;
  showModal: boolean = false;
  droppedColName: string = '';
  currentTask: TaskInterface | null = null;

  get toDoTasks(): TaskInterface[] {
    return this.tasks.filter((task: TaskInterface) => {
      return task.status == Status.ToDo;
    });
  }

  get inProgressTasks(): TaskInterface[] {
    return this.tasks.filter((task: TaskInterface) => {
      return task.status == Status.InProgress;
    });
  }

  get doneTasks(): TaskInterface[] {
    return this.tasks.filter((task: TaskInterface) => {
      return task.status == Status.Done;
    });
  }

  getTasksByStatus(status: Status): TaskInterface[] {
    if (status == Status.ToDo) {
      return this.toDoTasks;
    }

    if (status == Status.InProgress) {
      return this.inProgressTasks;
    }

    return this.doneTasks;
  }

  showTaskDetails(task: TaskInterface): void {
    this.currentTask = task;
    this.showModal = true;
  }

  dragStart($event: any, task: TaskInterface): void {
    $event.dataTransfer.effectAllowed = 'move';
    this.currentTask = task;
  }

  onDragOver($event: DragEvent, newStatus: Status): void {
    if (
      this.currentTask == null ||
      this.currentTask.status == Status.Done && newStatus == Status.ToDo ||
      this.currentTask.status == newStatus
    ) {
      return;
    }

    this.droppedColName = newStatus;
    $event.preventDefault();
  }

  onDrop(newStatus: Status): void {
    this.droppedColName = '';

    if (
      this.currentTask == null ||
      this.currentTask.status == Status.Done && newStatus == Status.ToDo ||
      this.currentTask.status == newStatus
    ) {
      return;
    }

    this.$emit(
      'editTask',
      {
        id: this.currentTask.id,
        name: this.currentTask.name,
        description: this.currentTask.description,
        status: newStatus,
        planedCompletionDate: this.currentTask.planedCompletionDate,
      }
    );
  }
}
</script>

<style scoped lang="scss">
  .status-table {
    display: flex;
  }

  .status-col {
    display: flex;
    flex-direction: column;
    width: 33.33%;
    background-color: #ebecf0;
    margin: 0 5px;
    border-radius: 5px;

    &.drag-enter {
      background-color: #adadaf;
    }
  }

  .status-col-head {
    font-size: 18px;
    font-weight: bold;
    align-self: center;
    margin: 10px;
  }

  .status-col-body {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .task-card {
    cursor: pointer;
    margin: 5px 10px;
    padding: 10px;
    border-radius: 5px;
    background-color: white;

    &:first-child {
      margin-top: 10px;
    }

    &:last-child {
      margin-bottom: 10px;
    }
  }

  .task-planed-completion-date {
    padding-top: 5px;
    font-size: 14px;
    color: rgba($content-font-color, 0.7);
  }
</style>
