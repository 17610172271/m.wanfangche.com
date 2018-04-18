<template>
  <div class="camp-detail" id="camp-detail">
    <div class="no-data-page" v-if="campData">
      <div class="no-data-text">此地停业或搬迁<br>再看看附近其他的吧</div>
      <div class="camp-detail-back" @click="goBack">返回</div>
    </div>
    <div v-if="!campData" style="height:100%;float:left;width:100%;">
      <transition name="fade">
      <div>
      <div class="camp-detail-banner">
        <a class="camp-goback" href="javascript:" @click="goBack">
          <img src="../../assets/icon_back_white.png" width="11px">
        </a>
        <img :src="data.imgcover | ossResize('squareLarge')" width="100%" height="100%" alt="" @click="imgBtn()">
        <div class="camp-detail-banner-b" @click="imgBtn()"></div>
        <div class="camp-detail-banner-t"></div>
        <div class="camp-detail-title" @click="imgBtn()">
          <div class="text-xxlg text-bolder">{{data.name}}</div>
        </div>
        <div class="photo-num" @click="imgBtn()">
          <i class="icon-camp-photo text-md"></i> &nbsp;{{imgList.length || 0}}张图片
        </div>
        <div class="adb-head">
          <i class="icon-camp-Wrong btn-h" @click="goRecovery()"></i><i class="icon-camp-share btn-h" @click="goShare"></i>
        </div>
      </div>
      <div class="camp-info-container">
        <div class="camp-level">
          <div class="camp-level-icon camp-level-icons pull-left" :class="{'color-camp2': data.type==1, 'color-park2': data.type==0, 'color-scenic2': data.type==2, 'color-food2': data.type==3, 'color-fix2': data.type==4, 'color-refuel2': data.type==5}"><span :class="{'icon-camp-camp': data.type==1, 'icon-camp-park': data.type==0, 'icon-camp-scenic': data.type==2, 'icon-camp-food': data.type==3, 'icon-camp-service': data.type==4, 'icon-camp-station': data.type==5}"></span></div>
          <div class="camp-level-txt camp-level-txts pull-left text-sm" :class="{'color-camp1': data.type==1, 'color-park1': data.type==0, 'color-scenic1': data.type==2, 'color-food1': data.type==3, 'color-fix1': data.type==4, 'color-refuel1': data.type==5}">{{data.scale}}</div>
          <div class="camp-score-icon pull-left text-sm camp-xing" style="margin-top:3px;">
            <i v-for="items in xing" class="icon-camp-collection" :class="{'actives': items <= data.score}"></i>
          </div>
          <div class="camp-score pull-left text-sm" style="margin-top:2px;">&nbsp;{{ data.score }}</div>
          <div class="text-sm text-thin m-t-xsm pull-right" v-show="data.distance" style="color:rgba(161,178,191,1);">距您：{{data.distance | distance}}</div>
        </div>
        <div class="camp-introduce" v-if="introduce && introduce.length>0">
          <h3 class="text-lg text-bold">介绍</h3>
          <p class="text-thin text-md text-thins">
            <text-view v-model="introduce" type="simple"></text-view>
            <span v-show="introduce && introduce.length >= 65"><span v-show="isUp==1">...</span> <a href="javascript:;" class="blue" v-show="isUp==1" @click="isUp=2">&nbsp;展开</a> <a href="javascript:;" class="blue" v-show="isUp==2" @click="isUp=1">&nbsp;收起</a></span></p>
          <div class="camp-video" v-show="data.video">
            <video-view :src="data.video" allowfullscreen></video-view>
          </div> 
        </div>
        <div class="camp-service">
          <h3 class="text-lg text-bold">服务</h3>
          <div class="text-sm text-silver m-t-16">基础服务</div>
          <ul class="ser-list">
            <li v-for="item in service">
              <p><img :src="item.icon | ossResize('small')" alt="" width="24px"></p>
              <p class="over-omit camp-detail-icontxt" :class="{'color-no-service': item.is_choice==0}">{{item.name}}</p>
            </li>
          </ul>
          <div v-show="(service.length > 6) && $route.query.type==1">
            <div class="text-sm text-silver m-t-16 m-b-12" v-if="data.feature_service">特色娱乐服务</div>
            <ul class="ser-list">
              <li v-for="item in data.feature_service">
                <p><img :src="item.icon | ossResize('small')" alt="" width="24px"></p>
                <p class="over-omit camp-detail-icontxt" :class="{'color-no-service': item.is_choice==0}">{{item.name}}</p>
              </li>
            </ul>
          </div>
          <div class="look-all-service" v-show="data.service && data.service.length > 5 && service.length < 6" @click="lookAllService">查看全部服务</div>
        </div>
        <div class="camp-opentime">
          <h3 class="text-lg text-bold">营业时间</h3>
          <div class="camp-open-time text-md">{{data.open_date | date}} {{data.open_time || ''}}</div>
        </div>
        <div class="camp-fees">
          <h3 class="text-lg text-bold">收费标准</h3>
          <div class="text-md" v-show="$route.query.type!=2">{{data.price === -2?'不了解':(data.price===-1?'免费':data.price)}}
          </div>
          <div class="text-md camp-detail-price1" v-show="$route.query.type==2">
            <span class="bgcolor-icon text-center text-xs">旺季</span>
            <span class="bgcolor-txt1">{{data.busy_price === -2?'不了解':(data.busy_price===-1?'免费':data.busy_price)}}；</span>
            <span class="bgcolor-icon1 text-center text-xs m-l-lg">淡季</span>
            <span class="bgcolor-txt1">{{data.price === -2?'不了解':(data.price===-1?'免费':data.price)}}</span>
          </div>
        </div>
        <div class="">
          <div class="amap-page-container">
            <marker-amap v-model="mapCenter" :zoom="zoom" :bigIcon="bigIcon" name="mapBtn" ref="productImage" ></marker-amap>
            <div class="map-modal" @click="goAllmap"></div>
            <div class="go-navigation">
              <div type="text" class="navigation-ipt"><span v-show="data.country">{{data.country}} ‧ </span>{{data.address}}</div>
              <a class="navigation-btn text-md text-bolder pull-right" :href="'https://m.wanfangche.com/browser?name=' + data.name + '%20&lng=' + data.lng + '&lat=%20' + data.lat + '&type=' + data.type + '&id=' + data.uuid">导航</a>
            </div>
          </div>
        </div>
        <div v-show="data.telephone" class="camp-tel">
          <h3 class="text-lg text-bold">联系电话</h3>
          <div class="text-md" @click="tel(data.telephone)">{{data.telephone}} <span class="icon-camp-phone pull-right text-bold text-lg padder-sm"></span></div>
        </div>
        <div v-show="data.email" class="camp-tel">
          <h3 class="text-lg text-bold">E-MAIL</h3>
          <div class="text-md">{{data.email}} <span class="icon-mail pull-right text-xlg padder-sm"></span></div>
        </div>
        <div class="camp-website" v-show="data.website">
          <h3 class="text-lg text-bold">网址</h3>
  <!--         <div class="text-md"><a class="a-none" :href="'http://' + data.website" target="_blank">{{data.website}}</a></div> -->
          <div class="text-md"><a class="a-none" :href="'https://wanfangche.com/redirect/?url=' + data.website" target="_blank">{{data.website}}</a></div>
        </div>
        <div class="camp-source" v-if="data.author">
          <h3 class="text-lg text-bold">来源</h3>
          <div class="source-info clear relative">
            <div class="source-info-avatar pull-left"><img :src="data.author.avatar | ossResize('avatar')" alt="" width="100%"></div>
            <div class="is-certify" v-if="data.author.isrv == 1">
              <img src="https://img01.wanfangche.com/public/upload/201804/13/5ad0552c60b29.png?x-oss-process=style/large" alt="认证车主" width="100%" height="100%">
            </div>
            <div class="source-name pull-left">
              <div class="source-info-name text-md text-bold">{{data.author.nickname}}</div>
              <div class="source-info-time text-sm">于{{data.created_at | time}}提交</div>
            </div>
          </div>
        </div>
        <div class="camp-comments">
          <h3 class="text-lg text-bold">玩友留言</h3>
          
            <div class="camp-comments-item relative" v-for="item in commentList">
              <div class="is-certify" v-if="item.author.isrv == 1">
                <img src="https://img01.wanfangche.com/public/upload/201804/13/5ad0552c60b29.png?x-oss-process=style/large" alt="认证车主" width="100%" height="100%">
              </div>
              <div class="camp-comments-avatar">
                <router-link class="link-avatar" :to="{name: 'u_home', params: {u_id: item.author.id}}">
                  <img :src="item.author.avatar | ossResize('avatar')" alt="">
                </router-link>
              </div>
              <div class="camp-comments-infos">
                <div class="camp-comments-info text-md text-bold"><router-link :to="{name: 'u_home', params: {u_id: item.author.id}}"><span class="text-lt">{{item.author.nickname}}</span></router-link>
                  <span class="pull-right camp-detail-thumb" :class="{'lileactive': item.is_credit}" @click="likeBtn(item)" style="z-index:222;">
                    <span class="fd-thumb-o-up" :class="{'active': item.is_credit}"></span> 
                    <span class="text-center camp-detail-thumbnum text-light" v-show="item.credit_num > 0">{{item.credit_num || 0}}</span>
                    <span class="text-center camp-detail-thumbnum camp-detail-thumbnum1 text-sm text-light" v-show="item.credit_num == 0">赞</span>
                  </span>
                </div>
                <router-link :to="{name: 'comment-info', params: {id: item.id}, query: {camp_id: data.id}}">
                <div class="camp-comments-content text-md">{{item.content}}</div>
                <div class="camp-comments-img text-md" v-show="item.imgpath.length > 0">
                  <div class="m-b-8" v-for="src in item.imgpath">
                    <img :src="src | ossResize('small')" alt="">
                  </div>
                </div>
                <div class="camp-comments-others text-sm">
                  <span class="camp-xing" v-show="item.score > 0">
                    <i v-for="items in xing" class="icon-camp-collection" :class="{'actives': items <= item.score}"></i>
                  </span> <span>{{item.publish_time}} · </span><span>回复TA</span>
                </div>
                <div class="camp-comments-reply" v-if="item.reply">
                  <div class="camp-reply-item text-md" v-for="items in item.reply">
                    <router-link class="text-bolder text-normal" :to="{name: 'u_home', params: {u_id: items.author.id}}">{{items.author.nickname}}:</router-link>
                    <span>{{items.content}}</span>
                  </div>
                </div>
                </router-link>
              </div>
            </div>
          
          <router-link :to="{name: 'comment_list', params: {id: data.id}}" class="camp-go-allcomments" v-show="commentSize > 3">查看全部评论 ({{commentSize}})</router-link>
          <a class="none-txt" v-show="commentSize === 0">暂无评论</a>
        </div>
        <div class="camp-recommend clear" v-show="recommendList.length > 0">
          <h3 class="text-lg text-bold">附近推荐</h3>
          <div class="camp-recommends">
            <div class="camp-recommend-item" v-for="item in recommendList" @click="goCamp(item.uuid)">
              <div class="recommend-item-img">
                <img :src="item.imgcover | ossResize('small')" alt="">
              </div>
              <div class="recommend-item-distance text-sm">距此地{{item.distance | distance}}</div>
              <div class="recommend-item-name text-md text-bolder">{{item.name}}</div>
              <div class="recommend-item-score camp-xing camp-score-icon">
                <i v-for="items in xing" class="icon-camp-collection" :class="{'actives': items <= item.score}"></i>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <div class="camp-comments-ipt">
        <div class="pull-left" @click="goCom()">
          <span class="fd-comment text-xxlg"></span><br>评论
        </div>
        <div class="pull-left">
          <span class="icon-camp-add-photo text-xxlg" @click="goUp()"></span><br>传图片
        </div>
        <div class="pull-left" @click="collectBtn()">
          <span class="icon-camp-collected text-xxlg" :class="{'actives': data.iscollect === 1}"></span><br>收藏
        </div>
      </div>
      </div>
      </transition>
      <popup v-model="isAlert" width="100%" height="auto" position="bottom" class="deals collect" :show-mask="false">
        {{dealTxt}}
      </popup>

      <loading-car v-show="!toLoad" class="middle" style="z-index:999;"></loading-car>
      <div v-show="!toLoad" style="position:fixed;width:100%;height:100%;background:#FFFFFF;z-index:998;top:0;left:0;"></div>

      <transition name="fade">
        <div class="camp-swiper" v-if="isImg">
          <swiper :list="imgList" v-on:imgShow="imgBtn" :ind="data.id"></swiper>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
  import api from '@/api'
  import { Popup } from 'vux'
  import swiper from './img-swiper'
  import { isJson } from '@/tools/util'
  import markerAmap from '@/components/amap/marker-amap'
  import wx from 'weixin-js-sdk'
  import config from '@/config'
  import {removeHtmlTab} from '@/filters'
  // import switchIcon from '@/tools/camp-service'
  import LoadingCar from '@/components/loading/car'
  import TextView from '@/components/text-view'
  import { mapGetters } from 'vuex'
  import { VideoView } from '@/components'
  export default {
    filters: {
      time (val) {
        var arr = val.split(' ')[0].split('-')
        return arr[0] + '年' + arr[1] + '月' + arr[2] + '日'
      },
      date (val) {
        if (val) {
          if (val === '8') {
            return '每天'
          } else if (val === '9') {
            return '工作日'
          } else {
            var arr = val.split(',')
            var str = []
            for (var key of arr) {
              switch (key) {
                case '1':
                  str.push('一')
                  break
                case '2':
                  str.push('二')
                  break
                case '3':
                  str.push('三')
                  break
                case '4':
                  str.push('四')
                  break
                case '5':
                  str.push('五')
                  break
                case '6':
                  str.push('六')
                  break
                case '7':
                  str.push('日')
                  break
              }
            }
            return '每周' + str.join('、')
          }
        } else {
          return ''
        }
      }
    },
    components: {
      Popup,
      swiper,
      isJson,
      LoadingCar,
      TextView,
      markerAmap,
      VideoView
    },
    computed: {
      ...mapGetters({
        isLoggedin: 'isLoggedin',
        navigation: 'navigation'
      })
    },
    data: function () {
      // let self = this
      return {
        data: {
          id: 0
        },
        mapCenter: [],
        bigIcon: 'http://img01.wanfangche.com/public/upload/201802/06/5a79303d478f7.png',
        campData: false,
        introduce: '',
        service: [],
        offset: [-32, -70],
        xing: [1, 2, 3, 4, 5],
        isAlert: false,
        dealTxt: '',
        isUp: 0,
        dragEnable: false,
        zoom: 12,
        zoomEnable: false,
        recommendList: [],
        recommendInd: 2,
        commentList: [],
        commentSize: 0,
        imgList: [],
        isImg: false,
        toLoad: false,
        address: ''
      }
    },
    methods: {
      getData () {
        this.toLoad = false
        document.body.scrollTop = 0
        this.axios.get(api.camp.detail, {
          params: {
            uuid: this.$route.params.id,
            user_lng: this.navigation ? this.navigation.user_lng : null,
            user_lat: this.navigation ? this.navigation.user_lat : null
          }
        })
        .then(response => {
          if (response.data.code === 1) {
            this.data = response.data.data
            this.initWechat(this.data)
            this.toLoad = true
            this.recommendList = this.data.nearlist
            this.data.imgcover = this.data.imgcover || 'http://img01.wanfangche.com/public/upload/201802/07/5a7a9b23a81d1.png'
            this.service = this.data.service.slice(0, 5)
            this.mapCenter = [1.11, 2.222]
            this.mapCenter = [this.data.lng, this.data.lat]
            this.address = this.data.address
            this.init()
            this.getImgList()
          } else {
            this.campData = true
          }
        })
      },
      goAllmap () {
        this.$router.push({name: 'allAmap', query: {lng: this.data.lng, lat: this.data.lat, type: this.data.type}})
      },
      goShare () {
        this.$router.push({name: 'camp_share', query: {id: this.data.id, u_id: this.data.uuid}})
      },
      goBack () {
        window.history.length ? this.$router.push({name: 'camp'}) : this.$router.go(-1)
      },
      tel (phone) {
        window.location.href = 'tel:' + phone
      },
      collectBtn () {
        if (this.isLoggedin) {
          this.axios.post(api.camp.collect, {id: this.data.id})
          .then(response => {
            if (response.data.code === 1) {
              this.isAlert = true
              this.data.iscollect === 1 ? this.data.iscollect = 0 : this.data.iscollect = 1
              this.dealTxt = response.data.data
            } else {
              this.isAlert = true
              this.data.iscollect = 0
              this.dealTxt = '收藏失败'
            }
          })
        } else {
          this.$router.push({
            name: 'user_login'
          })
        }
      },
      lookAllService () {
        this.service = this.data.service
      },
      goRecovery () {
        this.$router.push({
          name: 'camp_recovery',
          params: {id: this.data.id},
          query: {type: this.data.type}
        })
      },
      goCom () {
        if (this.isLoggedin) {
          this.$router.push({
            name: 'camp_comment',
            params: {id: this.data.id},
            query: {type: this.data.type}
          })
        } else {
          this.$router.push({
            name: 'user_login'
          })
        }
      },
      init () {
        // this.getCamp(this.recommendInd)
        this.getComment()
        this.setheight()
      },
      getCamp (ind) {
        let _this = this
        function getData (ind) {
          _this.axios.get(api.camp.list, {params: {type: ind, lng: _this.data.lng, lat: _this.data.lat}})
          .then(response => {
            if (response.data.code === 1) {
              for (var key of response.data.data) {
                if (_this.recommendList.length < 5) {
                  _this.recommendList.push(key)
                }
              }
            } else {
              if (_this.recommendList.length < 5) {
                if (_this.recommendInd < 5) {
                  _this.recommendInd++
                  getData(_this.recommendInd)
                }
              }
            }
          })
        }
        getData(ind)
      },
      getComment () {
        this.axios.get(api.camp.replyList, {params: {id: this.data.id, page: 1, size: 3}})
        .then(response => {
          if (response.data.code === 1) {
            this.commentList = response.data.data.list
            this.commentSize = response.data.data.count
            for (var key of this.commentList) {
              if (key.reply && key.reply.length > 3) {
                key.reply = key.reply.slice(0, 3)
              }
              if (key.imgpath) {
                key.imgpath = key.imgpath.split(',')
              }
            }
          }
        })
      },
      likeBtn (item) {
        if (this.isLoggedin) {
          if (item.is_credit) {
            this.axios.post(api.camp.replyCredit, {id: item.id})
            .then(response => {
              if (response.data.code === 1) {
                item.is_credit = false
                this.isAlert = true
                item.credit_num--
                this.dealTxt = '点赞已取消'
              }
            })
          } else {
            this.axios.post(api.camp.replyCredit, {id: item.id})
            .then(response => {
              if (response.data.code === 1) {
                item.is_credit = true
                this.isAlert = true
                item.credit_num++
                this.dealTxt = '点赞成功'
              }
            })
          }
        } else {
          this.$router.push({
            name: 'user_login'
          })
        }
      },
      goUp () {
        this.$router.push({
          name: 'add_img',
          params: {
            id: this.data.id
          }
        })
      },
      getImgList () {
        this.axios.get(api.camp.imgList, {params: {id: this.data.id}})
        .then(response => {
          if (response.data.code === 1 && response.data.data.list) {
            this.imgList = response.data.data.list
          }
        })
      },
      imgBtn () {
        this.isImg ? this.isImg = false : this.isImg = true
      },
      // jump () {
      //   const cateItem = document.querySelectorAll('.camp-comments')
      //   let total = cateItem[0].offsetTop
      //   let distance = document.body.scrollTop + 120 // 获取到顶部的距离(this.container便是.cate-list,为了方便存起来了)
      //   let step = total / 30
      //   if (this.commentSize > 0) {
      //     if (total > distance) {
      //       smoothDown()
      //     } else {
      //       let newTotal = distance - total
      //       step = newTotal / 30
      //       smoothUp()
      //     }
      //   }
      //   function smoothDown () {
      //     if (distance < total) {
      //       distance += step
      //       document.body.scrollTop = distance
      //       setTimeout(smoothDown, 10)
      //     } else {
      //       document.body.scrollTop = total
      //     }
      //   }
      //   function smoothUp () {
      //     if (distance > total) {
      //       distance -= step
      //       document.body.scrollTop = distance
      //       setTimeout(smoothUp, 10)
      //     } else {
      //       document.body.scrollTop = total
      //     }
      //   }
      // },
      goCamp (ind) {
        this.$router.push({
          name: 'camp_detail',
          params: {id: ind}
        })
      },
      setheight () {
        var box = document.getElementsByClassName('camp-detail-banner')[0]
        let num = document.documentElement.clientWidth
        box.style.height = num + 'px'
      },
      // 微信分享
      initWechat (data) {
        var url = window.sessionStorage.getItem('initUrl') || window.location.href
        var targetUrl = window.location.href

        this.axios.post(api.rv.wxcode, {url: url})
        .then(response => {
          if (response.data.code === 200) {
            wx.config({
              debug: false,
              appId: response.data.data.appid,
              timestamp: response.data.data.timestamp,
              nonceStr: response.data.data.noncestr,
              signature: response.data.data.signature,
              jsApiList: [
                'onMenuShareAppMessage',
                'onMenuShareTimeline'
              ]
            })
            wx.ready(() => {
              // 发送给朋友
              let content = removeHtmlTab(data.name).substring(0, 30)
              wx.onMenuShareAppMessage({
                title: content,
                desc: removeHtmlTab(data.introduce).substring(0, 30) || removeHtmlTab(data.address).substring(0, 30),
                link: targetUrl,
                imgUrl: data.imgcover + '_small' || config.feedShareImage,
                // imgUrl: (data.video && data.video.split('&wfc_poster=').length > 1) ? data.video.split('&wfc_poster=')[1] : (data.img.length > 0 ? data.img[0] + '_small' : config.feedShareImage),
                // ? data.img[0] ? data.img[0] + '_small' : config.feedShareImage,
                success: function (res) {
                },
                cancel: function (res) {
                }
              })
              // 朋友圈
              wx.onMenuShareTimeline({
                title: content,
                link: targetUrl,
                imgUrl: data.imgcover + '_small' || config.feedShareImage,
                // data.img[0] ? data.img[0] + '_small' : config.feedShareImage
                success: function (res) {
                },
                cancel: function (res) {
                }
              })
            })
            wx.error(function (res) {
            })
          }
        })
      },
      editIcon () {
        let images = [
          'http://img01.wanfangche.com/public/upload/201802/08/5a7bbd46514f5.png?x-oss-process=style/large',
          'http://img01.wanfangche.com/public/upload/201802/06/5a79303d478f7.png?x-oss-process=style/large',
          'http://img01.wanfangche.com/public/upload/201802/08/5a7bbd466fbf7.png?x-oss-process=style/large',
          'http://img01.wanfangche.com/public/upload/201802/08/5a7bbd4671dd2.png?x-oss-process=style/large',
          'http://img01.wanfangche.com/public/upload/201802/08/5a7bbd4659555.png?x-oss-process=style/large',
          'http://img01.wanfangche.com/public/upload/201802/08/5a7bbd4659d74.png?x-oss-process=style/large'
        ]
        this.bigIcon = images[this.$route.query.type]
      }
    },
    created () {
      this.editIcon()
      this.getData()
      setTimeout(function () {
        window.scrollTo(0, 0)
      }, 200)
    },
    watch: {
      '$route': ['getData', 'getComment'],
      isAlert (val) {
        if (val) {
          setTimeout(() => {
            this.isAlert = false
          }, 1000)
        }
      },
      isUp (val) {
        if (val === 1) {
          this.introduce = this.data.introduce.substr(0, 65)
        } else if (val === 2) {
          this.introduce = this.data.introduce
        }
      },
      data (val) {
        let self = this
        if (val.introduce && val.introduce.length > 65) {
          setTimeout(function () {
            self.introduce = val.introduce.slice(0, 65)
            self.isUp = 1
          }, 1000)
        } else {
          self.introduce = val.introduce
        }
      }
    }
  }
</script>
<style scoped>
  .camp-detail .amap-page-container {
    height: 194px;
    position: relative;
  }
  .camp-level-icon.camp-level-icons{
    border-radius: 2px 0 0 2px;
  }
  .camp-level-txt.camp-level-txts{
    border-radius: 0 2px 2px 0;
    margin-left: 0;
  }
</style>
