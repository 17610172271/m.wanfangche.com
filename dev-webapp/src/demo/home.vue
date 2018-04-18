<template>
  <div class="">
    <div class="wrapper">
      <h3>Demo</h3>
    </div>
    <div class="list-group list-group-underline list-group-lg">
        <router-link :to="{name: link.name}"  v-for="(link, index) in links" :key="index" class="list-group-item">{{link.path ? link.path : 'home'}}</router-link>
    </div>
    <div class="text-light text-center">
      <p>&copy; 北京露营者房车科技有限公司</p>
      <p>MIT License</p>
    </div>
  </div>

</template>
<script>
import routes from './routes'

export default {
  data: () => ({
    links: routes.children
  }),
  created () {
  }
}
</script>
