<template lang="pug">
  .content-container
    .table-header {{currentDate.format('MMMM YYYY')}}
    .table-block
      font-awesome-icon.arrow(icon="angle-double-left" @click="showPrevMonth()")
      table.table
        thead
          tr
            th(
              v-for="dayOfWeek in daysOfWeek"
              :key="dayOfWeek"
            ) {{dayOfWeek}}
        tbody
          tr(
            v-for="(week, rowIndex) in createCalendar"
            :key="rowIndex"
          )
            td(
              v-for="(day, colIndex) in week"
              :key="colIndex"
              :class=`{
                  hasTask: day.tasks.length > 0,
                  'current-month': day.dayOfMonth,
                  'current-day': checkedDate.dayOfMonth === day.dayOfMonth
                }`
              @click="changeDay(day)"
            ) {{day.dayOfMonth}}

      font-awesome-icon.arrow(icon="angle-double-right" @click="showNextMonth()")

    .task-block
      .task-list(v-if="checkedDate.tasks.length === 0") No task created on this day
      .task-list(v-else) Task list:
        .task-item(
          v-for="task in checkedDate.tasks"
          :key="task.id"
        )
          .task-content(@click="showTaskDetails(task)")
            .task-name {{task.name}}

    ModalWindow(
      v-if="showModal"
      @close="showModal = false"
    )
      template(v-slot:body)
        TaskDetails(
          :task="currentTask"
          :isEditable="false"
          @close="showModal = false"
        )
</template>

<script lang="ts">
import {Mixins, Component, Watch} from 'vue-property-decorator'
import {TaskInterface} from "@/types/TaskInterface"
import {CalendarDayInterface} from "@/types/CalendarDayInterface"
import ModalWindow from "@/components/modal/ModalWindow.vue"
import TaskDetails from "@/components/form/TaskDetails.vue"
import TaskMixin from "@/components/mixin/TaskMixin"
import {namespace} from 'vuex-class'
import * as moment from 'moment'
import {Moment} from 'moment'

const taskStore = namespace('task');

@Component(
  {
    name: "CalendarBlock",
    components: {
      ModalWindow,
      TaskDetails
    }
  }
)
export default class CalendarBlock extends Mixins(TaskMixin) {
  @taskStore.State('tasks') tasks!: TaskInterface[];
  daysOfWeek: string[] = moment.weekdaysShort();
  currentDate: Moment = moment.utc();
  checkedDate: CalendarDayInterface = {
    dayOfMonth: moment.utc().date(),
    tasks: []
  };

  showPrevMonth():void {
    this.currentDate = this.currentDate.clone().subtract(1, 'month');
  }

  showNextMonth(): void {
    this.currentDate = this.currentDate.clone().add(1, 'month');
  }

  @Watch('tasks', {immediate: true})
  onTaskChanged() {
    this.checkedDate.tasks = this.getTasksByDay(this.checkedDate.dayOfMonth);
  }

  get createCalendar(): Array<Array<CalendarDayInterface>> {
    let result: Array<Array<CalendarDayInterface>> = [];
    let dayOfMonth: Moment = this.currentDate.clone().startOf('month');

    for (let weekIndex = 0; weekIndex < this.weeksOfMonth; weekIndex++) {
      let weekArray: Array<CalendarDayInterface> = [];

      for (let dayIndex = 0; dayIndex < this.daysOfWeek.length; dayIndex++) {
        const currentDayOfMonth: number | null = this.getDayNumberByWeekDay(dayIndex, dayOfMonth);

        weekArray.push({
          dayOfMonth: currentDayOfMonth,
          tasks: this.getTasksByDay(currentDayOfMonth)
        });
      }

      result.push(weekArray);
    }

    return result;
  }

  get weeksOfMonth(): number {
    const startOfMonth = this.currentDate.clone().startOf('month');
    const endOfMonth = this.currentDate.clone().endOf('month');

    // In some years week() will return 1 for the last days of the year
    if (endOfMonth.year() !== endOfMonth.weekYear()) {
      return endOfMonth.subtract(1, 'week').week() + 1 - startOfMonth.week() + 1;
    }

    return endOfMonth.week() - startOfMonth.week() + 1;
  }

  getDayNumberByWeekDay(dayOfWeek: number, dayOfMonth: Moment): number | null{
    let result: number | null = null;

    if (dayOfWeek == dayOfMonth.day()) {
      result = dayOfMonth.date();

      if (dayOfMonth.date() != dayOfMonth.clone().endOf('month').date()) {
        dayOfMonth.add(1, 'days');
      }
    }

    return result;
  }

  get tasksByMonth(): TaskInterface[] {
    return this.tasks.filter(
      (task: TaskInterface) => {
        return moment.utc(task.createdDate).isBetween(
          this.currentDate.clone().startOf('month'),
          this.currentDate.clone().endOf('month'),
          'day',
          '[]'
        )
      }
    )
  }

  getTasksByDay(dayOfMonth: number | null): TaskInterface[] {
    if (dayOfMonth) {
      return this.tasksByMonth.filter(
        (task: TaskInterface) => {
          return moment.utc(task.createdDate).isBetween(
            this.currentDate.clone().set(
                {
                  'date': dayOfMonth,
                  'hour': 0,
                  'minute': 0
                }
              ),
            this.currentDate.clone().set(
              {
                'date': dayOfMonth,
                'hour': 23,
                'minute': 59
              }
            ),
            'minute',
            '[]'
          )
        }
      )
    }

    return [];
  }

  changeDay(day: CalendarDayInterface): void {
    if (day.dayOfMonth) {
      this.checkedDate = day;
    }
  }
}
</script>

<style scoped lang="scss">
  .calendar {
    display: flex;
    justify-content: center;
  }

  .table-block {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .arrow {
    font-size: 48px;
  }

  .table-header {
    align-self: center;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
  }

  .table {
    margin: 0 10px;
    border-collapse: collapse;
    flex-grow: 1;

    th, td {
      border: $content-font-color 1px solid;
      padding: 5px;
    }

    td.current-day {
      border: 2px dashed gray;
    }

    .current-month {
      cursor: pointer;
    }
  }

  .hasTask {
    background-color: #77bd8e;
    cursor: pointer;
  }

  .task-block {
    margin-top: 10px;
    margin-left: 52px;
  }

  .task-item {
    margin: 10px 0;
    font-weight: bold;
    cursor: pointer;
  }

  @media screen and (max-width: 424px) {
    .arrow {
      font-size: 18px;
    }

    .task-block {
      margin-left: 25px;
    }
  }

  @media screen and (max-width: 374px) {
    .table {
      font-size: 12px;
    }
  }
</style>
