import {createModule, mutation} from 'vuex-class-component';
import {ActivityInterface} from "@/types/ActivityInterface";

const VuexModule = createModule({
  namespaced: "activity",
  strict: true,
});

export class ActivityStore extends VuexModule {
  private activities: ActivityInterface[] = [
    {
      activityDate: 'TODAY',
      activityItems: [
        {
          iconClass: 'done-icon',
          description: 'Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users',
          datetime: '20:40',
          time: '8:40 PM'
        },

        {
          iconClass: 'comment-icon',
          description: 'Emilee Simchenko commented on Account for teams and personal in bottom style',
          datetime: '19:32',
          time: '7:32 PM',
          comment: 'During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes'
        },

        {
          iconClass: 'download-icon',
          description: 'Darika Samak uploaded 4 files on An option to search in current projects or in all projects',
          datetime: '18:02',
          time: '6:02 PM',
          imgs: [
            'cat.jpeg',
            'cat2.jpeg',
            'cat3.jpeg',
            'cat4.jpeg'
          ]
        }
      ]
    }
  ];

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
