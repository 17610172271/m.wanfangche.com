<template>
  <ul class="nav nav-inline nav-custom">
    <li class="nav-item" v-for="item in value">
      <router-link :to="{name: item.name, query: {status: item.status}}" :class="{active: $route.query.status == item.status}" class="nav-link">{{item.title}}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: []
    }
  }
}
</script>
