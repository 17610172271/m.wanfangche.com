<template>
    <keep-alive><router-view></router-view></keep-alive>
</template>
<script>
import TopHeader from './top-header'
export default {
  components: {
    TopHeader
  }
}
</script>
<style>
  .m-t-header {
    margin-top: 44px;
  }
</style>
