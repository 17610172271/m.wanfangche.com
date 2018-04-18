<template>
  <div class="appbody">
  <nav-header class="fiex">全部评价</nav-header>
    <div class="appbodys">
      <div class="panel app-container" style="height:auto;top:44px;background:#FFFFFF;">
        <div class="panel-body">
          <comment-list :list="comment_list"></comment-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavHeader from '../Common/Navheader'
import CommentList from '../Comment/List'
import api from '@/api'

export default {
  components: {
    NavHeader,
    CommentList
  },
  data () {
    return {
      comment_list: []
    }
  },
  created () {
    this.axios.get(api.rv.detail, {params: {rv_id: parseInt(this.$route.params.id)}})
    .then(response => {
      if (response.data.code === 200) {
        this.comment_list = response.data.data.list
        for (var key in this.comment_list) {
          this.comment_list[key].score = parseInt(this.comment_list[key].score)
        }
      }
    })
  }
}
</script>
