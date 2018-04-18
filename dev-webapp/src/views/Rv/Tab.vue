<template>
  <div class="tab-bodys">
     <div class="menu-title-item nav-tab">
        <ul>
        <li v-for="(item,index) in menuList" @click="jump(index)" :class="isActive === index ? 'active' : ''">
          {{item}}
          <span></span>
        </li>
        </ul>
     </div>
     <div class="tab-surround cate-list" :scrollTop.prop="scrollTop">
       <div class="tab-txt cate-translate-container">
       <div class="one cate-item rv-detail-tab-container panel-body">
       <div class="segmentation"><p><span></span>图文详情aaaa</p><p></p></div>
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
       
       
       
       <div class="four cate-item cate-menu-wrapper" style="padding:0 5px 0 15px;">
       <div class="segmentation"><p><span></span>乘客评价</p><p></p></div>
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
            <div class="panel-body" v-if="tabdata.four">
              <a class="btn btn-block" @click="goEvaluate">查看全部评价</a>
            </div>
          </div>
       </div>
     </div>
     </div>
  </div>
</template>
<script>
import { isJson } from '@/tools/util'
import CommentList from '../Comment/List'

export default {
  components: {
    isJson,
    CommentList
  },
  props: {
    tabdata: {
      one: '',
      two: '',
      three: '',
      list: {},
      evaluateListid: ''
    }
  },
  data () {
    return {
      scrollTop: '',
      menuList: [
        '图文详情',
        '租车须知',
        '费用说明',
        '租客评价'
      ],
      isActive: 0
    }
  },
  methods: {
    goEvaluate () {
      this.$router.push({
        name: 'rv_comment',
        params: {id: this.tabdata.evaluateListid}
      })
    },
    jump (index) {
      const cateItem = document.querySelectorAll('.cate-item')
      let total = cateItem[index].offsetTop
      let distance = this.container.scrollTop // 获取到顶部的距离(this.container便是.cate-list,为了方便存起来了)
      let step = total / 50
      this.isActive = index // 菜单列表显示当前样式
      const _this = this
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
          _this.scrollTop = distance
          setTimeout(smoothDown, 10)
        } else {
          _this.scrollTop = total
        }
      }
      function smoothUp () {
        if (distance > total) {
          distance -= step
          _this.scrollTop = distance
          setTimeout(smoothUp, 10)
        } else {
          _this.scrollTop = total
        }
      }
    },
    onScroll () {
      var _this = this
      // document.querySelectorAll('.tab-bodys')[0].style.top = 0
      _this.itemVal.forEach(function (obj, i) {
        _this.scrollTop = _this.container.scrollTop
        if (_this.scrollTop >= obj.top && _this.scrollTop < (obj.top + obj.height - 10)) {
          _this.isActive = obj.index
        }
      })
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
    const _this = this
    setTimeout(function () {
      // _this.currentStick()
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
    margin-top: 57px;
  }
  .segmentation{
    width: 100%;
    height: auto;
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
    width: 100%;
    height: 100%;
    position: relative;
  }
  .tab-surround{
    padding-top: 0px;
    width: 100%;
    position: relative;
    height: 100%;
    overflow: auto;
  }
  body .tab-txt .cate-item{
    width: 100%;
    padding: 0 16px;
  }
  .tab-txt div.err-img {
    width: 140px;
    height: 140px;
    margin: 0 auto;
    padding-top: 33%;
  }
  .tab-txt{
    position: absolute;
    width: 100%;
  }
  .nav-tab{
    width: 100%;
    height: 44px;
    line-height: 44px;
    position: absolute;
    left: 0;
    top: 0;
    background: #fff;
    z-index: 1;
  }
  .nav-tab ul{
    width: 100%;
    height: 100%;
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
    background: #FE7C1E;
  }
  .nav-tab li.active{
    color: #FE7C1E;
  }
</style>
