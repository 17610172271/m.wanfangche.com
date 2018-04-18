<template>
  <div>
     <div class="col-xs-4" v-for="image in comment.images">
       <div class="row thumb-feed">{{images}}
       <router-link :to="{name: 'album', query: {type: 'comment', id: comment.id}}">
       <img :src="image">
       </router-link>
       </div>
     </div>
  </div>
</template>
<script>
import { Rater, Popup } from 'vux'
import { isJson } from '@/tools/util'

export default {
  components: {
    Rater,
    Popup,
    isJson
  },
  props: {
    list: {}
  },
  data () {
    return {
    }
  }
}
</script>
<style>
  .thumb-feed{
    padding: 2px 2px;
  }
  .thumb-feed img{
    width: 100%;
  }
</style>
