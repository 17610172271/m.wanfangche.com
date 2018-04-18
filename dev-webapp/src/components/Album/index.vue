<template>
  <div>
    <div class="app-body">
      <swiper :list="image_list" dots-position="center" height="500px" class="swiper-auto-height"></swiper>
    </div>
    
  </div>
</template>
<script>
  import { Swiper } from 'vux'

  export default {
    components: {
      Swiper
    },
    props: {
      list: {
        type: Array,
        default () {
          return []
        }
      },
      value: false
    },
    computed: {
      image_list () {
        let tempList = []
        for (let i of this.list) {
          tempList.push({title: '', img: i})
        }
        return tempList
      }
    }
  }
</script>
<style>
.swiper-auto-height > .vux-swiper > .vux-swiper-item > a > .vux-img{
    background-size: 100%;
  }
</style>
