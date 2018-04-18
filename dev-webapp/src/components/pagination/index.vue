<template>
  <ul class="pagination pagination-md">
    <li><a @click="pre"><i class="fa fa-chevron-left"></i></a></li>
    <li :class="{active: page == i + step}" v-for="i in 5"><a @click="onClick(i+step)">{{i+step}}</a></li>
    <li><a @click="next"><i class="fa fa-chevron-right"></i></a></li>
  </ul>
</template>

<script>
export default {
  props: {
    max: null
  },
  data: () => ({
    query: undefined,
    page: 1
  }),
  computed: {
    step () {
      return parseInt((this.page - 1) / 5) * 5
    }
  },
  methods: {
    pre () {
      if (this.page > 1) {
        this.page--
      } else {
        this.page = 1
      }
      this.go()
    },
    next () {
      this.page++
      this.go()
    },
    onClick (p) {
      this.page = p
      this.go()
    },
    go () {
      let query = {
        ...this.$route.query,
        page: this.page
      }
      this.$router.push({name: this.$route.name, query: query})
    },
    onRouteChange () {
      this.page = this.$route.query.page || 1
    }
  },
  created () {
    this.page = this.$route.query.page || 1
  },
  watch: {
    '$route.query': 'onRouteChange'
  }
}
</script>
