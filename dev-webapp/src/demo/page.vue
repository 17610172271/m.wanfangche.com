<template>
  <div>
    <div class="app-container app-container-top">
      <div class="wrapper bg-white m-b" v-for="i in list">
        <router-link class="block" :to="{name: 'page-detail', query: {id: i}}">{{i}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    list: 100
  })
}
</script>
