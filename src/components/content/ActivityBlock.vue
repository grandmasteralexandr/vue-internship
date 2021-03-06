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
import {Component, Mixins} from 'vue-property-decorator'
import CommonMixin from '@/components/mixin/CommonMixin'
import {ActivityInterface} from "@/types/ActivityInterface";
import {namespace} from 'vuex-class'

const activityStore = namespace('activity');

@Component(
  {
    name: "ActivityBlock",
  }
)
export default class ActivityBlock extends Mixins(CommonMixin) {
  @activityStore.State('activities') activities!: ActivityInterface[];
  @activityStore.Action('getActivitiesAction') getActivitiesAction!: Function;
  @activityStore.Mutation('addActivitiesMutation') addActivitiesMutation!: Function;

  async created() {
    // cal mutation in action don't work see issue https://github.com/michaelolof/vuex-class-component/issues/58
    this.addActivitiesMutation(await this.getActivitiesAction());
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
