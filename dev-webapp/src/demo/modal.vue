<template>
  <div>
    <div class="wrapper">
      <h3>Modal</h3>

      <a @click="showModal('modal1')" class="btn btn-custom btn-block">Click Me</a>

      <a @click="showModal('modal2')" class="btn btn-custom btn-block">Dismissible is false</a>

      <modal ref="modal1">Hello</modal>
      <modal ref="modal2" :dismissible="false" class="text-center">I'm undismissible<br>go back or refresh</modal>
    </div>
  </div>
</template>
<script>
import { Modal } from '@/components'

export default {
  components: {
    Modal
  },
  methods: {
    showModal (target) {
      this.$refs[target].open()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
