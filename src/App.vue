<template lang="pug">
  #app
    LayoutDefault
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import LayoutDefault from './components/LayoutDefault.vue'

@Component(
  {
    name: 'app',
    components: {
      LayoutDefault
    }
  }
)

export default class App extends Vue {}
</script>
