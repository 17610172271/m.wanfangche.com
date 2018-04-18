<template>
  <div>
    {{data}}
  </div>
</template>

<script>
export default {
  data: () => ({
    data: null
  }),
  mounted () {
    this.data = this.$route.query
  }
}
</script>
