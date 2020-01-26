import {Component, Vue} from 'vue-property-decorator'

@Component
export default class CommonMixin extends Vue {
  getImgUrl(img: string): any {
    return require('@/img/' + img)
  }
}
