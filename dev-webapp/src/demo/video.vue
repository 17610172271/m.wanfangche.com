<template>
  <div class="bg-light">

    <!-- <iframe src="http://open.iqiyi.com/developer/player_js/coopPlayerIndex.html?vid=fed5476be75be12bcb6cef1a82130955&tvId=10603609709&accessToken=2.f22860a2479ad60d8da7697274de9346&appKey=3955c3425820435e86d0f4cdfe56f5e7&appId=1368&height=100%&width=100%" frameborder="0" allowfullscreen="true" width="100%" height="100%"></iframe> -->

    <!-- http://m.iqiyi.com/w_19rus2ygap.html

    http://www.iqiyi.com/w_19rus2ygap.html -->

    <!-- <embed src="http://player.video.qiyi.com/fed5476be75be12bcb6cef1a82130955/0/0/w_19rus2ygap.swf-albumId=10603609709-tvId=10603609709-isPurchase=0-cnId=27" allowFullScreen="true" quality="high" width="480" height="350" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed> -->

    <!-- <iframe src="http://open.iqiyi.com/developer/player_js/coopPlayerIndex.html?vid=fed5476be75be12bcb6cef1a82130955&tvId=10603609709&accessToken=2.f22860a2479ad60d8da7697274de9346&appKey=3955c3425820435e86d0f4cdfe56f5e7&appId=1368&height=100%&width=100%" frameborder="0" allowfullscreen="true" width="100%" height="100%"></iframe> -->
<!-- 
    <video webkit-playsinline="" playsinline="" class="m-player hideControls" id="video" glue-id="video" glue-component="common.component.universalPlayer.video" glue-behavior="common.behavior.player.dispatcher" src="http://cache.m.iqiyi.com/mus/10603609709/b6bcb336447900a5b6ac0fa372a71a0f/afbe8fd3d73448c9//20171215/48/4b/b86453e7cd01a5024feea983ceb5b7d4.m3u8?qd_originate=tmts_py&amp;tvid=10603609709&amp;bossStatus=0&amp;qd_vip=0&amp;px=&amp;qd_src=2_20_201&amp;prv=&amp;previewType=&amp;previewTime=&amp;from=&amp;qd_time=1513326126318&amp;qd_p=d3900582&amp;qd_asc=6400752d1645fc9997032928f805152c&amp;qypid=10603609709_04000000001000000000_1&amp;qd_k=5c28893ab96c1dc849e37e4977819e7c&amp;isdol=0&amp;code=2&amp;preIdAll=1abd3eee93051117876617b306b703c3&amp;sgti=12_2dlwsg1yf5jqqctiymf685vk_1513326125879&amp;vf=dee7c79ba8c8f5087de4089dc6f0cbb0&amp;np_tag=nginx_part_tag&amp;qypid=10603609709_31" style="top: 0px;">
            </video> -->

    <div class="panel bg-white">
      <div class="wrapper text">
        输入视频地址：
        <textarea class="form-control" v-model="video" @change="onInputChange" rows="4"></textarea>
      </div>
      <video-view :src="video" allowfullscreen v-if="video" ref="videoComponent"></video-view>
      <div class="wrapper text">
        自定义地址：{{video}}
      </div>
    </div>
    <div class="panel bg-white" v-for="item in list">
      <video-view :src="item.video" allowfullscreen></video-view>
      <div class="wrapper text">
        <p>{{item.title}}</p>
        <p>{{item.video}}</p>
      </div>
    </div>

    <!-- // 播放器
    http://player.youku.com/embed/XMjk2NDc2ODI2NA==

    // 优酷网页
    http://v.youku.com/v_show/id_XMjk2NDc2ODI2NA==.html?spm=a2h0k.8191407.0.0&from=s1.8-1-1.2#paction
    <iframe height=498 width=510 src='http://player.youku.com/embed/XMjk2NDc2ODI2NA==' frameborder=0 'allowfullscreen'></iframe>

    // 优酷手机
    http://m.youku.com/video/id_XMjk2NDc2ODI2NA==.html?spm=a2h0k.8191407.0.0&from=s1.8-1-1.2&source=

    // 优酷APP
    http://v.youku.com/v_show/id_XMjk2NDc2ODI2NA==.html?sharefrom=iphone&sharekey=85adf34acf90585c105cfb7167de176b4
 -->
    <!-- <iframe height=498 width=510 src='http://player.youku.com/embed/XMzE1Njg3NzAyOA==' frameborder=0 'allowfullscreen'></iframe> -->

    <!-- <iframe src="http://open.iqiyi.com/developer/player_js/coopPlayerIndex.html?vid=fed5476be75be12bcb6cef1a82130955&tvId=10603609709&accessToken=2.f22860a2479ad60d8da7697274de9346&appKey=3955c3425820435e86d0f4cdfe56f5e7&appId=1368&height=100%&width=100%" frameborder="0" allowfullscreen="true" width="100%" height="100%"></iframe> -->
  </div>
</template>
<script>
import { VideoView } from '@/components'
export default {
  components: {
    VideoView
  },
  data: () => ({
    list: [
      // {title: '爱奇艺-播放器', video: 'http://open.iqiyi.com/developer/player_js/coopPlayerIndex.html?vid=fed5476be75be12bcb6cef1a82130955&tvId=10603609709&accessToken=2.f22860a2479ad60d8da7697274de9346&appKey=3955c3425820435e86d0f4cdfe56f5e7&appId=1368&height=100%&width=100%'},
      {title: '优酷-网页 和 app', video: 'http://v.youku.com/v_show/id_XMjk2NDc2ODI2NA==.html?spm=a2h0k.8191407.0.0&from=s1.8-1-1.2#paction'},
      {title: '优酷-手机', video: 'http://m.youku.com/video/id_XMjk2NDc2ODI2NA==.html?spm=a2h0k.8191407.0.0&from=s1.8-1-1.2&source='},
      {title: '优酷-播放器', video: 'http://player.youku.com/embed/XMjk2NDc2ODI2NA=='},
      {title: '.mp4地址', video: 'http://img01.wanfangche.com/video/Camping_World_Captures_The_West.mp4'},
      {title: '.webm地址', video: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'},
      {title: '腾讯视频网页链接', video: 'https://v.qq.com/x/page/u0552njvre1.html'},
      {title: '腾讯视频播放器', video: 'https://v.qq.com/iframe/player.html?vid=u0552njvre1&auto=0'},
      {title: '腾讯视频移动端链接', video: 'http://m.v.qq.com/play/play.html?vid=s0519muy95t&ptag=4_5.8.6.20828_copy'},
      {title: '', video: 'http://m.v.qq.com/play/play.html?vid=y0550gqwx13&ptag=4_5.8.6.20828_copy'},
      {title: '', video: 'https://m.v.qq.com/x/page/y/1/3/u0552njvre1.html?ptag=4_5.8.6.20828_copy'},
      {title: '', video: 'https://m.v.qq.com/x/page/u/e/1/u0552njvre1.html?coverid=&from=singlemessage'}
    ],
    video: null
  }),
  methods: {
    onInputChange (val) {
      this.$refs.videoComponent.init()
    }
  }
}
</script>

<style></style>
