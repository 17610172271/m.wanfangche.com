<template>
  <div id="album-page">
    <div class="nav-header no-bg">
      <div class="nav-header-left">
        <a class="nav-header-back" href="javascript:" @click="goBack">
          <img src="../../assets/icon_back_white.png">
          &nbsp;
        </a>
      </div>
    </div>
    <div class="app-body bg-black">
      <swiper :list="list" dots-position="center" :height="screenHeight" class="swiper-auto-height"></swiper>
    </div>
  </div>
</template>
<script>
  import { Swiper } from 'vux'
  import api from '@/api'

  export default {
    components: {
      Swiper
    },
    data () {
      return {
        list: []
      }
    },
    computed: {
      screenHeight () {
        return (window.screen.availHeight - 200) + 'px'
      }
    },
    methods: {
      goBack () {
        this.$router.go(-1)
      }
    },
    created () {
      this.axios.get(api.rv.find, {params: {id: parseInt(this.$route.params.id)}})
      .then(response => {
        this.list = JSON.parse(response.data.data.images)
        for (var key in this.list) {
          this.list[key] = {img: this.list[key]}
        }
      })
    }
  }
</script>
<style>
  #album-page{
    background-color: #000;
  }
</style>
