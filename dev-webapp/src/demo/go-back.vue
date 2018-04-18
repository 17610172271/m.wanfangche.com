<template>
  <div class="wrapper text-center ">
    <a @click="goBack" class="btn btn-custom w-md">后退</a>

    <a target="_blank" href="/demo/go-back" class="btn btn-custom w-md">新页面</a>
  </div>
</template>

<script>
export default {
  methods: {
    goBack () {
      // 后退处理
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push({name: 'feed'})
    }
  }
}
</script>
