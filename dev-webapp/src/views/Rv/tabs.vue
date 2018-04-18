<template>
  <div class="tab-bodys" id="tab-bodys" :class="{'p-top-44': subNav}">
    <div class="menu-title-item nav-tab" ref="nav-tab" :class="{'fixeds': subNav}">
        <ul style="margin:0;padding-top:10px;">
        <li v-for="(item,index) in menuList" @click="jump(index)" :class="isActive === index ? 'active' : ''">
          {{item}}<span></span>
        </li>
        </ul>
    </div>
    <div class="tab-surround cate-list" :scrollTop.prop="scrollTop">
      <div class="tab-txt cate-translate-container">
        <div class="one cate-item rv-detail-tab-container panel-body" id="imgdetail">
          <div class="segmentation"><p><span></span>图文详情</p><p></p></div>
          <div class="camp-video" v-show="tabdata.video">
            <video-view :src="tabdata.video" allowfullscreen></video-view>
          </div> 
          <div  v-html="tabdata.one" class="p-l-4">{{tabdata.one}}</div>
        </div>

        <div class="three cate-item rv-detail-tab-container panel-body">
          <div class="segmentation"><p><span></span>租车须知</p><p></p></div>
          <div v-html="tabdata.three" class="p-l-4">{{tabdata.three}}</div>

        </div>

        <div class="two cate-item rv-detail-tab-container panel-body">
          <div class="segmentation"><p><span></span>费用说明</p><p></p></div>
          <div v-html="tabdata.two" class="p-l-4">{{tabdata.two}}</div>

        </div>



        <div class="four cate-item cate-menu-wrapper" style="padding:20px 5px 0 15px;">
          <div class="segmentation"><p><span></span>用户评价</p><p></p></div>
          <div class="panelcp-l-4" >
            <div class="rv-detail-tab-container panel-body" id="tab-container-4" v-if="!tabdata.four">
              <div class="err-img">
                <img src="../../../static/img/group_4.png" alt="" />
              </div>
              <div class="err-txt">
                <p>暂时没有人评价</p>
                <p>快去体验之后分享给大家吧</p>
              </div>
            </div>
          <div class="panel-body">
            <comment-list :list="tabdata.four" class="padder-v"></comment-list>
          </div>
          <div class="panel-body allcomment" v-if="tabdata.four">
            <a class="btn btn-block" @click="goEvaluate">查看全部评价</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
<script>
import { isJson } from '@/tools/util'
import CommentList from '../Comment/List'
import { VideoView } from '@/components'

export default {
  components: {
    isJson,
    CommentList,
    VideoView
  },
  props: {
    tabdata: {
      one: '',
      two: '',
      three: '',
      list: {},
      evaluateListid: '',
      video: ''
    }
  },
  data () {
    return {
      scrollTop: '',
      menuList: [
        '图文详情',
        '租车须知',
        '费用说明',
        '用户评价'
      ],
      isActive: 0,
      scroll: '',
      subNav: false
    }
  },
  methods: {
    menu () {
      if (document.querySelectorAll('.cate-item').length !== 0) {
        const cateItem = document.querySelectorAll('.cate-item')
        this.scroll = document.body.scrollTop - 580
        if (this.scroll >= 20) {
          this.subNav = true
        } else {
          this.subNav = false
        }
        if (cateItem) {
          if (this.scroll >= cateItem[3].offsetTop) {
            this.isActive = 3
          } else if (this.scroll >= cateItem[2].offsetTop) {
            this.isActive = 2
          } else if (this.scroll >= cateItem[1].offsetTop) {
            this.isActive = 1
          } else if (this.scroll >= cateItem[0].offsetTop) {
            this.isActive = 0
          }
        }
      }
    },
    goEvaluate () {
      this.$router.push({
        name: 'rv_comment',
        params: {id: this.tabdata.evaluateListid}
      })
    },
    jump (index) {
      const cateItem = document.querySelectorAll('.cate-item')
      var h = document.documentElement.clientHeight
      var hone = 0
      if (h > 670) {
        hone = h - 80
      } else {
        hone = h
      }
      let total = cateItem[index].offsetTop + hone
      let distance = document.body.scrollTop + 120 // 获取到顶部的距离(this.container便是.cate-list,为了方便存起来了)
      let step = total / 50
      this.isActive = index // 菜单列表显示当前样式
      if (total > distance) {
        smoothDown()
      } else {
        let newTotal = distance - total
        step = newTotal / 50
        smoothUp()
      }
      function smoothDown () {
        if (distance < total) {
          distance += step
          document.body.scrollTop = distance
          setTimeout(smoothDown, 10)
        } else {
          document.body.scrollTop = total
        }
      }
      function smoothUp () {
        if (distance > total) {
          distance -= step
          document.body.scrollTop = distance
          setTimeout(smoothUp, 10)
        } else {
          document.body.scrollTop = total
        }
      }
    },
    currentStick () {
      const {dishId} = 1
      const cateContent = document.querySelectorAll('.cate-content')
      const _this = this
      cateContent.forEach(function (v, i) {
        if (v.id === dishId) {
          _this.scrollTop = v.offsetTop
        }
      })
    }
  },
  mounted () {
    window.addEventListener('scroll', this.menu)
    const _this = this
    setTimeout(function () {
      _this.currentStick()
      const rightItem = document.querySelectorAll('.cate-item')
      var length = rightItem.length
      var height = rightItem[length - 1].offsetHeight
      var scrollHeight = document.querySelectorAll('.cate-menu-wrapper')[0].offsetHeight
      if (height < scrollHeight) {
        rightItem[length - 1].style.height = scrollHeight + 'px'
      }
      var arr = []
      rightItem.forEach(function (v, i) {
        arr.push({top: v.offsetTop, height: v.offsetHeight, index: i})
      })
      _this.itemVal = arr
      const cateList = document.querySelectorAll('.cate-list')[0]
      cateList.addEventListener('scroll', _this.onScroll)
      _this.container = cateList
    }, 500)
  },
  created () {
  }
}
</script>
<style>
  *{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .segmentation:nth-child(1){
    margin-top: 20px;
  }
  .segmentation{
    width: 100%;
    padding-top: 16px;
    padding: 0 0px;
  }
  .segmentation p:nth-child(1){
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #2E3E4C;
    letter-spacing: 0;
    font-weight: 600;
    line-height: 25px;
  }
  .segmentation p:nth-child(1) span{
    display: inline-block;
    width: 2px;
    height: 14px;
    background: #FE7C1E;
    margin-right: 4px;
  }
  .segmentation p:nth-child(2){
    width: 100%;
    height: 1px;
    background: #F5F5F5;
    margin: 10px 0;
    padding:0;
  }
  .p-l-4{
    padding-left: 4px;
  }
  .tab-bodys{
    height: auto;
    width: 100%;
    position: relative;
    background: #FFFFFF;
  }
  .tab-surround{
    padding-top: 0px;
    width: 100%;
    position: relative;
/*    overflow: auto;*/
  }
  body .tab-txt .cate-item{
    width: 100%;
    padding: 0 16px;
  }
  .tab-txt div.err-img {
    width: 180px;
    height: 180px;
    margin: 0 auto;
    padding-top: 33%;
  }
  .nav-tab{
    width: 100%;
    height: 54px;
    line-height: 44px;
    background: #fff;
    z-index: 1;
  }
  .nav-tab ul{
    width: 100%;
  }
  .nav-tab li{
    width: 25%;
    text-align: center;
    float: left;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #2E3E4C;
    letter-spacing: 0;
    position: relative;
  }
  .nav-tab li span{
    width: 46%;
    height: 2px;
    background: #FFFFFF;
    display: inline-block;
    position: absolute;
    left: 27%;
    bottom: 0;
  }
  .nav-tab li.active span{
    background: rgba(254,124,30,1);
  }
  .nav-tab li.active{
    color:rgba(254,124,30,1);
  }
  .panelcp-l-4 .allcomment {
    padding-bottom: 60px;
  }
  .fixeds {
    position: fixed;
    top: 44px;
    left: 0;
  }
  .four{
    min-height: 500px;
  }
</style>
