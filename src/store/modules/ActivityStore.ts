import {createModule, mutation, action} from 'vuex-class-component';
import {ActivityInterface} from "@/types/ActivityInterface";
import {getActivities} from '@/service/activitiesApi'
import {AxiosResponse} from "axios";

const VuexModule = createModule({
  namespaced: "activity",
  strict: true,
});

export class ActivityStore extends VuexModule {
  private activities: ActivityInterface[] = [];

  @action async getActivitiesAction() {
    try {
      const response: AxiosResponse = await getActivities();
      // cal mutation in action don't work see issue https://github.com/michaelolof/vuex-class-component/issues/58
      // this.addAllActivities(response.data);
      return response.data
    } catch (e) {
      console.log(e.message);
    }
  }

  @mutation addActivitiesMutation(activities: any) {
    this.activities = activities;
  }

  get files(): string[] {
    let result: string[] = [];

    this.activities.forEach(
      activity => {
        activity.activityItems.forEach(activityItem => {
          if (activityItem.imgs) {
            result = result.concat(activityItem.imgs);
          }
        })
      }
    );

    return result;
  }
}
