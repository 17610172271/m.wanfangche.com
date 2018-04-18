<template>
  <div class="my-camp">
    <navheader>我的营地</navheader>
    <div class="mycamp-container">
      <ul class="mycamp-nav">
        <li @click="type=1" :class="{'link': type==1}">我的收藏<span v-show="type === 1"></span></li>
        <li @click="type=2" :class="{'link': type==2}">我的添加<span v-show="type === 2"></span></li>
      </ul>
      <p v-if="list.length < 1" class="no-data">没有更多数据</p>
      <div class="list-group list-group-underline list-group-lg">
        <router-link v-for="(item,index) in list" :key="index" :to="{name: 'camp_detail', params: {id: item.uuid}, query: {type: item.type}}" class="list-group-item"  >
          <div class="pull-left camp-imgcover m-r"><img :src="item.imgcover | ossResize('small')"></div>
          <div class="">
           <div class="title text-bolder over-omit camp-swiper-title">{{item.name}}</div>
           <div class="text-muted m-b-sm camp-t">
            <p class="camp-xing">
              <i v-for="items in xing" class="icon-camp-collection" :class="{'actives': items <= item.score}"></i>
            </p>
            <span v-if="item.price === -2">不详</span>
            <span v-else-if="item.price === -1">免费</span>
            <span v-else>{{item.price}}</span>
            <!-- <span class="camp-distance"><i></i>{{item.distance | distance}}</span> -->
          </div>
          <div class="clear">
            <div class="camp-list-item">
              <div class="camp-level-icon camp-level-icons pull-left" :class="{'color-camp2': item.type==1, 'color-park2': item.type==0, 'color-scenic2': item.type==2, 'color-food2': item.type==3, 'color-fix2': item.type==4, 'color-refuel2': item.type==5}"><span :class="{'icon-camp-camp': item.type==1, 'icon-camp-park': item.type==0, 'icon-camp-scenic': item.type==2, 'icon-camp-food': item.type==3, 'icon-camp-service': item.type==4, 'icon-camp-station': item.type==5}"></span></div>
              <div class="camp-level-txt camp-level-txts pull-left text-sm" :class="{'color-camp1': item.type==1, 'color-park1': item.type==0, 'color-scenic1': item.type==2, 'color-food1': item.type==3, 'color-fix1': item.type==4, 'color-refuel1': item.type==5}">{{item.scale}}</div>
              </div>
              <span v-show="type==1" class="icon-camp-collection text-xxlg pull-right m-r-lg"  @click.prevent="collectBtn(item)"></span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
  <popup v-model="isAlert" width="100%" height="auto" position="bottom" class="deals collect" :show-mask="false">
    {{dealTxt}}
  </popup>
  </div>
</template>
<script>
  import api from '@/api'
  import { Popup } from 'vux'
  import Navheader from '../Common/Navheader'
  export default {
    components: {
      Navheader,
      Popup
    },
    data: () => ({
      list: '',
      page: 1,
      xing: [1, 2, 3, 4, 5],
      type: 1,
      dealTxt: '',
      isAlert: false,
      iscollect: 0
    }),
    methods: {
      getList () {
        this.axios.get(api.camp.myCamp, {
          params: {
            type: this.type,
            size: 10,
            page: this.page
          }
        })
        .then(response => {
          if (response.data.code === 1) {
            this.list = response.data.data
            this.list = this.list.map(val => {
              return {
                iscollect: 0,
                ...val
              }
            })
          } else if (response.data.msg === '找不到更多数据') {
            this.list = []
          }
        })
      },
      collectBtn (item) {
        this.axios.post(api.camp.collect, {id: item.id})
        .then(response => {
          if (response.data.code === 1) {
            this.isAlert = true
            this.dealTxt = response.data.data
            if (response.data.data === '收藏成功') {
              item.iscollect = 0
            } else if (response.data.data === '收藏已取消') {
              item.iscollect = 1
              this.getList()
            }
          } else {
            this.isAlert = true
            this.dealTxt = '收藏失败'
          }
        })
      }
    },
    created () {
      this.getList()
    },
    watch: {
      type (val) {
        this.getList()
      },
      isAlert (val) {
        if (val) {
          setTimeout(() => {
            this.isAlert = false
          }, 1000)
        }
      }
    }
  }
</script>
<style>
  .my-camp {
    background-color: #fff;
    min-height: 100%;
  }
  .mycamp-container {
    margin-top: 44px;
  }
  .camp-level-icon.camp-level-icons{
    border-radius: 2px 0 0 2px;
    height: 22px;
    line-height: 24px;
  }
  .camp-level-txt.camp-level-txts{
    border-radius: 0 2px 2px 0;
    margin-left: 0;
    height: 22px;
  }
</style>
