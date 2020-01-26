import {Component, Vue} from 'vue-property-decorator'
import {Status, TaskInterface} from '@/types/TaskInterface';
import * as moment from 'moment';

@Component(
  {
    filters: {
      dateFormat: function(value: number): string {
        return moment(value).format('DD-MM-YYYY');
      }
    }
  }
)
export default class TaskMixin extends Vue {
  currentTask: TaskInterface | null = null;
  showModal: boolean = false;

  getStatusClass(status: Status): string {
    if (status == Status.ToDo) {
      return 'status-to-do'
    }

    if (status == Status.InProgress) {
      return 'status-in-progress'
    }

    return 'status-done'
  }

  showTaskDetails(task: TaskInterface): void {
    this.currentTask = task;
    this.showModal = true;
  }
}
