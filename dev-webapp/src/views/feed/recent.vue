<template>
  <div>
    {{list}}
    <div>
      <a @click="getList"> fetch & save </a>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  data: () => ({
    list: []
  }),
  computed: mapGetters({
    feedList: 'list'
  }),
  methods: {
    ...mapActions({
      save: 'save'
    }),
    initData () {
      this.list = this.feedList('recent')
      console.log(this.list)
    },

    getList () {
      this.save({list: [2, 3, 4, 5], page: 2, type: 'recent'})
    }
  },

  mounted () {
    this.initData()
  }
}
</script>
