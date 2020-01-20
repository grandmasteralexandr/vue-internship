<template lang="pug">
  .modal-backdrop(@click.self="$emit('close')")
    .modal-container

      .modal-header
        slot(name="header")

      .modal-body
        slot(name="body")

      .modal-footer
        slot(name="footer")
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator"

@Component(
  {
    name: "ModalWindow",
  }
)
export default class ModalWindow extends Vue {

}
</script>

<style lang="scss" scoped>
  .modal-backdrop {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 9998;
    background-color: rgba($content-font-color, 0.5);
    @extend %flex-center;
  }

  .modal-container {
    display: flex;
    flex-direction: column;
    background-color: white;
    box-sizing: border-box;
    max-width: 730px;
    padding: 35px 30px;
    border-radius: 2px;
  }
</style>
