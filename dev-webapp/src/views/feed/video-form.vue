<template>
  <div class="video-form">
    <div class="nav-header">
      <div class="nav-header-left">
        <router-link :to="{name: 'feed_add'}" class="nav-header-back text-lg">
          <i class="fa fa-times"></i>
        </router-link>
      </div>
      <div class="nav-header-right">
        <a class="nav-header-more text-normal text-lg" @click="done">完成</a>
      </div>
    </div>

    <div class="app-container app-container-top">
      <div class="wrapper bg-white">
        <textarea class="form-control" placeholder="输入视频地址" rows="3" v-model="link"  @change="onInputChange"></textarea>
      </div>
      <div class="wrapper bg-white">
        <div class="text-center" v-if="link">
          <video-view :src="link" ref="videoComponent" allowfullscreen></video-view>
        </div>
      </div>
      <div class="wrapper bg-white m-t" style="line-height:1.5em">
        <div class="text-muted m-t">
          使用方法：
          <ol class="m-t-sm">
            <li>1.找到您要分享的视频;</li>
            <li>2.点击分享按钮;</li>
            <li>3.选择“复制链接”;</li>
            <li>4.将复制的链接粘贴到当前页面输入框中;</li>
          </ol>
        </div>
         <div class="text-muted">
          注：目前支持  腾讯视频<!-- ，爱奇艺，优酷，土豆，西瓜视频，秒拍，抖音，火山小视频，mp4地址 -->
        </div>
      </div>
      </div>
  </div>
</template>

<script>
import { VideoView } from '@/components'

export default {
  components: {
    VideoView
  },
  data: () => ({
    link: null
  }),
  computed: {
    videoHeight () {
      return (this.$el.clientWidth - 30) * 9 / 16 + 2
    }
  },
  methods: {

    done () {
      this.$emit('input', this.link)
      this.$emit('done', this.link)
      this.$router.replace({name: 'feed_add'})
    },

    onInputChange (val) {
      this.$refs.videoComponent.init()
    }
  }
}
</script>
