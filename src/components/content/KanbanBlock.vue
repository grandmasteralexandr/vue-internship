<template lang="pug">
  .content-container
    .name-filter
      label.label(for="search-task-name") Search task:&nbsp
        input.input.input-search#search-task-name(
        type="search"
        placeholder="Some task name"
        v-model="nameSearch"
        )

    .date-filter
      label.label(for="date-filter-from") Search by date from:&nbsp
        input.input.input-time#date-filter-from(
        type="date"
        v-model="dateFrom"
        )
      label.label(for="date-filter-for") &nbsp to:&nbsp
        input.input.input-time#date-filter-for(
        type="date"
        v-model="dateTo"
        )
      button.clear-button(type="button" @click="clearDateFilter") Clear

    .status-table
      .status-col(
        v-for="status in statusEnum"
        :key="status"
        :class="{'drag-enter': status === droppedColName}"
        @dragover="onDragOver($event, status)"
        @dragleave="droppedColName = ''"
        @drop="onDrop(status)"
      )
        .status-col-head {{status}} ({{getTasksByStatus(status).length}})
        .status-col-body
          .task-card(
            v-for="task in getTasksByStatus(status)"
            :key="task.id"
            @click="showTaskDetails(task)"
            draggable="true"
            @dragstart="dragStart($event, task)"
          )
            .task-name {{task.name}}
            .due-date Due date: {{task.dueDate | dateFormat}}

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
import {Component, Prop, Mixins} from 'vue-property-decorator';
import {Status, TaskInterface} from "@/types/TaskInterface";
import ModalWindow from "@/components/modal/ModalWindow.vue";
import TaskDetails from "@/components/form/TaskDetails.vue";
import TaskMixin from "@/components/mixin/TaskMixin"

@Component(
  {
    name: "KanbanBlock",
    components: {
      ModalWindow,
      TaskDetails,
    }
  }
)
export default class KanbanBlock extends Mixins(TaskMixin) {
  @Prop({type: Array}) tasks!: TaskInterface[];

  statusEnum: Object = Status;
  droppedColName: string = '';
  nameSearch: string = '';
  dateFrom: string = '';
  dateTo: string = '';

  get filterTasks(): TaskInterface[] {
    let filteredTask: TaskInterface[] = [];

    for (let task of this.tasks) {
      if (
        task.name.toLowerCase().includes(this.nameSearch.toLowerCase()) &&
        (this.dateFrom == '' || Date.parse(this.dateFrom) <= task.dueDate) &&
        (this.dateTo == '' || Date.parse(this.dateTo) >= task.dueDate)
      ) {
        filteredTask.push(task);
      }
    }

    return filteredTask;
  }

  get toDoTasks(): TaskInterface[] {
    return this.filterTasks.filter((task: TaskInterface) => {
      return task.status == Status.ToDo;
    });
  }

  get inProgressTasks(): TaskInterface[] {
    return this.filterTasks.filter((task: TaskInterface) => {
      return task.status == Status.InProgress;
    });
  }

  get doneTasks(): TaskInterface[] {
    return this.filterTasks.filter((task: TaskInterface) => {
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
        dueDate: this.currentTask.dueDate,
      }
    );
  }

  clearDateFilter(): void {
    this.dateFrom = '';
    this.dateTo = '';
  }
}
</script>

<style scoped lang="scss">
  .input-search {
    width: 150px;
  }

  .input-time {
    width: 130px;
  }

  .clear-button {
    @include button(#f3be17);
    color: white;
  }

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

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
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

  .due-date {
    padding-top: 5px;
    font-size: 14px;
    color: rgba($content-font-color, 0.7);
  }
</style>
