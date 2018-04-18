<template>
  <div class="app-bodys">
    <nav-header>评价</nav-header>
    <div class="app-body ">
      <div class="media padder-v padder m-bottom">
        <span class="pull-left">
          <img class="thumb-md" :src="order.image">
        </span>
        <div class="media-body padder-v padder">
          <div class="text-lg">整体评价</div>
          <div class="padder-v">
            <rater :max="5" v-model="comment.rater" active-color="#FE4848" :font-size="24" :margin="5"></rater>
          </div>
        </div>
      </div>
      <div class="clear padder-v padder">
        <textarea class="comment-input" rows="6" v-model="txt" placeholder="这辆车的真实驾驶感受是什么样的呢？是不是一路上有很多有趣的故事分享，晒晒你的旅行吧"></textarea>
      </div>
      <!-- <div class="padder-v padder-i padder-ia">
        <ul class="padder-u">
          <li>11<img src="../../../static/img/cha.png"/></li>
        </ul>
        <div class="padder-v padder padder-add fl_r">
          <img src="../../../static/img/photo.png"/>
          <p>添加照片</p>
        </div>
      </div> -->
      <album-upload v-model="images" style="width:100%; margin-bottom:20px;"></album-upload>
      <div @click="submit" class="m-l-10" >
        <button class="btn btn-custom btn-block btn-lg" :style="examine">发布评论</button>
      </div>
      
    </div>
    <popup v-model="deal_shows" class="message" style="height: 56px;" :show-mask="false">
      <h2>评论内容不能为空</h2>
    </popup>
  </div>
</template>

<script>
import NavHeader from '../Common/Navheader.vue'
import { Rater, Popup } from 'vux'
import {AlbumUpload} from '@/components'
import api from '@/api'

export default {
  components: {
    NavHeader,
    Rater,
    AlbumUpload,
    Popup
  },
  data () {
    return {
      comment: {
        content: '',
        images: [],
        order_id: 10001,
        rv_id: 10002,
        rater: 5
      },
      order: {
        image: '../../static/img/rv-1.png'
      },
      images: null,
      deal_shows: false,
      txt: '',
      isTxt: false
    }
  },
  created () {
  },
  computed: {
    examine () {
      return {
        'opacity': this.isTxt ? 1 : 0.5
      }
    }
  },
  methods: {
    submit () {
      if (!this.txt) {
        this.deal_shows = true
      } else {
        this.axios.post(api.rv.add, {rv_id: parseInt(this.$route.params.rv), order_id: parseInt(this.$route.params.id), content: this.txt, images: this.images, score: this.comment.rater})
        .then(response => {
          if (response.data.code === 200) {
            this.$router.replace('/order/' + this.$route.params.id + '/')
          }
        })
      }
    }
  },
  watch: {
    deal_shows (val) {
      if (val) {
        setTimeout(() => {
          this.deal_shows = false
        }, 1000)
      }
    },
    txt (val) {
      if (val.length > 0) {
        this.isTxt = true
      } else {
        this.isTxt = false
      }
    }
  }
}
</script>
<style>
  .comment-input{
    border:none;
    border-radius: 4px;
    background-color: #f5f5f5;
    width: 100%;
    resize: none;
    padding: 10px 10px;
    line-height: 20px;
  }
  .comment-input::placeholder{
    color:#C8D1DC;
  }
</style>
