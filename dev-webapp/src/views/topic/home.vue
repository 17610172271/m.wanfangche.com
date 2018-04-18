<template>
  <div>
    <nav-header>话题</nav-header>
    <div class="app-container app-container-top">
      <div class="app-wrapper bg-white">
        <div class="list-group b-t list-group-underline list-group-lg">
          <router-link  v-for="(item, index) in list" :key="index" class="list-group-item" :to="{name: 'topic_feed', params: {id: item.id}}">
            #{{item.title}}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavHeader from '../Common/Navheader'
import api from '@/api'

export default {
  components: {
    NavHeader
  },
  data: () => ({
    list: []
  }),
  methods: {
    initData () {
      this.getList()
    },

    getList () {
      this.axios.get(api.topic.list)
      .then(response => {
        if (response.data.code === 1) {
          this.list = response.data.data.list
        }
      })
    }
  },

  mounted () {
    this.initData()
  }
}
</script>
