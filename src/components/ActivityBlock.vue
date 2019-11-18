<template>
  <div class="activity">
    <div v-for="(activityForDay, index) in activities"
         :key="index"
         class="activity__for-day"
    >
      <div class="content__date">{{activityForDay.activityDate}}</div>
      <div v-for="(activity, index) in activityForDay.activityItems"
           :key="index"
           class="activity__item"
      >
        <div :class="activity.iconClass"></div>
        <div class="activity__item-wrap">
          <p class="activity__description">
            {{activity.description}}
          </p>
          <p v-if="activity.comment" class="activity__comment">
            {{activity.comment}}
          </p>
          <div v-if="activity.imgs" class="activity__img">
            <ul class="activity__img-box">
              <li v-for="(img, index) in activity.imgs"
                  :key="index"
                  class="activity__img-item"
              >
                <img :src="getImgUrl(img)"
                     @click="$emit('activityImgClick', index)"
                     alt="Activity Img"
                >
              </li>
            </ul>
          </div>
        </div>
        <time :datetime="activity.datetime" class="activity__time">{{activity.time}}</time>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActivityBlock",

  data() {
    return {
      activities: [
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
                'cat4.jpeg',
              ]
            }
          ]
        },
      ]
    }
  },

  methods: {
    getImgUrl: function (img) {
      return require('@/img/' + img)
    }
  }
}
</script>

<style scoped>

</style>
