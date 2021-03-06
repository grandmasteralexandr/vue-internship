<template lang="pug">
  .content-container
    .name-filter
      label.label(for="search-task-name") Search task:
      input.input.input-search#search-task-name(
        type="search"
        placeholder="Some task name"
        v-model="nameSearch"
      )

    .date-filter
      label.label(for="date-filter-from") Search by date From:
      input.input.input-time#date-filter-from(
        type="date"
        v-model="dateFrom"
      )
      label.label(for="date-filter-for") To:
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
            :class="{overdue: isOverdue(task.dueDate), 'soon-overdue': isSoonOverdue(task.dueDate)}"
          )
            .task-name {{task.name}}
            .due-date(
              :class="{overdue: isOverdue(task.dueDate), 'soon-overdue': isSoonOverdue(task.dueDate)}"
            ) Due date: {{task.dueDate | dateFormat}}

    ModalWindow(
      v-if="showModal"
      @close="showModal = false"
    )
      template(v-slot:body)
        TaskDetails(
          :task="currentTask"
          @close="showModal = false"
        )
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import {Status, TaskInterface} from "@/types/TaskInterface";
import ModalWindow from "@/components/modal/ModalWindow.vue";
import TaskDetails from "@/components/form/TaskDetails.vue";
import TaskMixin from "@/components/mixin/TaskMixin"
import {namespace} from 'vuex-class'

const taskStore = namespace('task');

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
  @taskStore.State('tasks') tasks!: TaskInterface[];
  @taskStore.Action('getTasksAction') getTasksAction!: Function;
  @taskStore.Action('editTaskAction') editTaskAction!: Function;
  @taskStore.Mutation('getTasksMutation') getTasksMutation!: Function;

  statusEnum: Object = Status;
  droppedColName: string = '';
  nameSearch: string = '';
  dateFrom: string = '';
  dateTo: string = '';

  async created() {
    // cal mutation in action don't work see issue https://github.com/michaelolof/vuex-class-component/issues/58
    this.getTasksMutation(await this.getTasksAction());
  }

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

  async onDrop(newStatus: Status) {
    this.droppedColName = '';

    if (
      this.currentTask == null ||
      this.currentTask.status == Status.Done && newStatus == Status.ToDo ||
      this.currentTask.status == newStatus
    ) {
      return;
    }

    this.getTasksMutation(
      await this.editTaskAction(
        {
          id: this.currentTask.id,
          name: this.currentTask.name,
          description: this.currentTask.description,
          status: newStatus,
          dueDate: this.currentTask.dueDate,
          createdDate: this.currentTask.createdDate
        }
      )
    );
  }

  clearDateFilter(): void {
    this.dateFrom = '';
    this.dateTo = '';
  }
}
</script>

<style scoped lang="scss">
  .name-filter {
    display: flex;
    align-items: center;
  }

  .input-search {
    width: 150px;
    margin: 0 5px;
  }

  .date-filter {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 15px 0;
  }

  .input-time {
    width: 130px;
    height: 15px;
    margin: 0 5px;
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

    &.overdue {
      box-shadow: 0 0 2px 2px $error-color;
    }

    &.soon-overdue {
      box-shadow: 0 0 2px 2px #cea501;
    }
  }

  .due-date {
    padding-top: 5px;
    font-size: 14px;
    color: rgba($content-font-color, 0.7);

    &.overdue {
      color: $error-color;
    }

    &.soon-overdue {
      color: #cea501;
    }
  }

  @media screen and (max-width: 800px){
    .name-filter, .date-filter {
      flex-direction: column;
      align-self: center;
    }

    .input-search {
      margin: 10px 0 0 0;
    }

    .input-time {
      margin: 10px 0;
      width: 150px;
    }

    .clear-button {
      align-self: center;
    }
  }
</style>
