<template lang="pug">
  .content-container
    table.table
      thead
        tr
          th(
            v-for="status in statusEnum"
          ) {{status}}
      tbody
        tr(
          v-for="(row, rowIndex) in getSortedTaskByStatus()"
          :key="rowIndex"
        )
          td(
            v-for="(task, colIndex) in row"
            :key="colIndex"
          )
            .task-card(
              v-if="task"
            )
              .task-name {{task.name}}
              .task-planed-completion-date Due date: {{task.planedCompletionDate}}
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {TaskInterface, Status} from "@/types/TaskInterface";

@Component(
  {
    name: "KanbanBlock"
  }
)
export default class KanbanBlock extends Vue {
  @Prop({type: Array}) tasks!: TaskInterface[];

  statusEnum: Object = Status;

  getSortedTaskByStatus(): Array<Array<TaskInterface | null>> {
    const toDoTasks: TaskInterface[] = this.tasks.filter((task: TaskInterface) => {
      return task.status == Status.ToDo;
    });

    const inProgressTasks: TaskInterface[] = this.tasks.filter((task: TaskInterface) => {
      return task.status == Status.InProgress;
    });

    const doneTasks: TaskInterface[] = this.tasks.filter((task: TaskInterface) => {
      return task.status == Status.Done;
    });

    const rowCount: number = Math.max(toDoTasks.length, inProgressTasks.length, doneTasks.length);

    let result: Array<Array<TaskInterface | null>> = [];

    for (let i = 0; i < rowCount; i++) {
      result.push([
        toDoTasks[i] ? toDoTasks[i] : null,
        inProgressTasks[i] ? inProgressTasks[i] : null,
        doneTasks[i] ? doneTasks[i] : null,
      ]);
    }

    return result;
  }
}
</script>

<style scoped lang="scss">
  .table {
    border-collapse: collapse;

    th, td {
      border: $content-font-color 1px solid;
      padding: 5px;
    }
  }

  .task-planed-completion-date {
    padding-top: 5px;
    font-size: 14px;
    color: rgba($content-font-color, 0.7);
  }
</style>
