<template lang="pug">
  .content-container
    .header Files count: {{files.length}}
    ul.files
      li.file(
        v-for="(file, index) in files"
        :key="index"
      )
        img.preview(
          :src="getImgUrl(file)"
          :alt="file"
        )
        a.link(
          :href="getImgUrl(file)"
          download
        ) {{file}}
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import CommonMixin from '@/components/mixin/CommonMixin'

const activityStore = namespace('activity');

@Component(
  {
    name: "FilesBlock"
  }
)
export default class FilesBlock extends Mixins(CommonMixin) {
  @activityStore.Getter('files') files!: Function;
}
</script>

<style scoped lang="scss">
  .header {
    align-self: center;
    font-weight: bold;
    font-size: 18px;
  }

  .files {
    padding: 0;
  }

  .file {
    list-style-type: none;
    display: flex;
    align-items: center;
    margin: 10px 0;
  }

  .preview {
    @include square-block(30px);
    object-fit: cover;
    border-radius: 2px;
  }

  .link {
    margin-left: 5px;
  }
</style>
