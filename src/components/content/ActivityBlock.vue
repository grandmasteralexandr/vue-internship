<template lang="pug">
  .content-container
    .activity-for-day(
      v-for="(activityForDay, index) in activities"
      :key="index"
    )
      .content-date {{activityForDay.activityDate}}
      .activity-item(
        v-for="(activity, index) in activityForDay.activityItems"
        :key="index"
      )
        div(:class="activity.iconClass")
        .activity-item-wrap
          p.activity-description
            | {{activity.description}}
          p.activity-comment(
            v-if="activity.comment"
          )
            | {{activity.comment}}
          .activity-img(
            v-if="activity.imgs"
          )
            ul.activity-img-box
              li.activity-img-item(
                v-for="(img, index) in activity.imgs"
                :key="index"
              )
                img(
                  :src="getImgUrl(img)"
                  @click="$emit('activityImgClick', index)"
                  alt="Activity Img"
                )
        time.activity-time(
          :datetime="activity.datetime"
        )
          | {{activity.time}}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {ActivityInterface} from "@/types/ActivityInterface";

@Component(
  {
    name: "ActivityBlock",
  }
)

export default class ActivityBlock extends Vue {
  activities: ActivityInterface[] = [
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

  getImgUrl(img: string): any {
    return require('@/img/' + img)
  }
}
</script>

<style scoped lang="scss">
  .content-date {
    font-size: 14px;
    color: rgba($content-font-color, 0.5);
  }

  .activity-item {
    display: flex;
    align-items: baseline;
  }

  .activity-description-block {
    display: flex;
  }

  .activity-description {
    max-width: 520px;
  }

  .activity-time {
    display: flex;
    justify-content: flex-end;
    margin-left: auto;
    font-size: 14px;
    color: rgba($content-font-color, 0.7);
    min-width: 65px;
  }

  .done-icon, .comment-icon, .download-icon {
    position: relative;
    margin-right: 20px;
    top: 24px;
  }

  .done-icon {
    @include circle(40px, $green-highlight);

    &:before {
      @include icon(9px, 15px, 16px, "../../img/cheked@3x.svg");
      width: 12px;
    }
  }

  .comment-icon {
    @include circle(40px, $comment-icon-background);

    &:before {
      @include icon(18px, 12px, 12px, "../../img/comment-icon.png");
      background-size: cover;
    }
  }

  .download-icon {
    @include circle(40px, $download-background);

    &:before {
      @include icon(15px, 13px, 12px, "../../img/download-icon.png");
      background-size: cover;
    }
  }

  .activity-comment {
    padding: 20px 30px;
    margin-bottom: 0;
    background-color: $comment-background;
    border-radius: 10px;
  }

  .activity-img {
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0;
      margin-top: 0;

      li {
        list-style-type: none;
        padding-top: 10px;
        padding-right: 10px;
        @include square-block(100px);

        img {
          @include square-block(inherit);
          object-fit: cover;
          border-radius: 8px;
          cursor: pointer;
        }
      }
    }
  }
</style>
