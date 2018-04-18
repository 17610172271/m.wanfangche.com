<template>
    <i v-if="objClass" :class="objClass"></i>
</template>
<script>
export default {
  props: {
    value: 0
  },
  computed: {
    objClass () {
      if (parseInt(this.value) === 1) {
        return 'fd-male male-color'
      } else if (parseInt(this.value) === 2) {
        return 'fd-female female-color'
      } else {
        return
      }
    }
  }
}
</script>

<style type="text/css">

.male-color{
  color: #7099FF;
}
.female-color{
  color: #FE4848;
}
</style>
