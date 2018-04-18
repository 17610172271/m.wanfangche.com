<template>
  <img v-if="src" :src="src">
</template>

<script>
export default {
  props: {
    src: null
  }
}
</script>
