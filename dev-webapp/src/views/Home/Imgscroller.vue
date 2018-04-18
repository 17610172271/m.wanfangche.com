<template>
  <div class="m-t padder-v">
    <div class="panel">
      <div class="panel-heading text-xlg">
        热门城市
      </div>
      <div class="panel-body panel-bodys" style="overflow:hidden">
         <router-link :to="{name: 'yunnan'}" class="box1-item">
          <img src="../../../static/img/cite_banner_yunnan.jpg">
          </router-link>
        <router-link :to="{name: 'neimeng'}" class="box1-item">
          <img src="../../../static/img/cite_banner.jpg">
        </router-link>
      </div>
      </div>
      <div class="panel ">
      <div class="panel-heading text-xlg">
        热门车型
      </div>
      <div class="panel-body  panel-bodys">
          <router-link class="box2-item" :to="{name: 'rv_detail', params: {id: 1}, query:list}">
            <div class="img" style="height:auto;">
              <img src="../../../static/img/rv-1.png">
            </div>
            <p>奔驰凯伦宾威房车</p>
          </router-link>
          <router-link class="box2-item" :to="{name: 'rv_detail', params: {id: 2}, query:list}">
            <div class="img" style="height:auto;">
              <img src="../../../static/img/rv-2.png">
            </div>
            <p>梦之旅标准版</p>
          </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { Scroller } from 'vux'
import api from '@/api'

export default {
  name: 'imgscoller',
  components: {
    Scroller
  },
  props: {
    list: {}
  },
  data () {
    return {
      cityList: [],
      rvList: []
    }
  },
  created () {
    this.axios.get(api.adv.list)
    .then(response => {
      if (response.data.code === 200) {
        this.cityList = response.data.data.hot_city_list
      }
    })
  }
}
</script>
<style>
/*Image Scroller Box*/
.box1 {
  height: 128px;
  position: relative;
  width: 530px;
  text-align: center;
}
.box1-item {
  width: 96px;
  height: 128px;
  /*background-color: #8D9DB0;*/
  color: #fff;
  display:inline-block;
  margin-left: 10px;
  float: left;
  text-align: center;
  line-height: 128px;
  overflow: hidden;
}
.box1-item:first-child {
  margin-left: 0;
}

.box2 {
  height: 96px;
  position: relative;
  width: 775px;
  /*overflow: hidden;*/
  text-align: center
}
.box2-item{
  /*width: 145px;*/
  /*height: 96px;*/
  /*background-color: #8D9DB0;*/
  display:inline-block;
  margin-left: 10px;
  float: left;
  text-align: center;
  /*line-height: 96px;*/

}
.box2-item p{
  text-align: left;
  padding: 5px 0;
  color: #2E3E4C;
  line-height: 1em;
}
.box2-item .img{
  display: block;
  width: 145px;;
  height:96px;
  overflow: hidden;
  text-align: center;
}
.box2-item:first-child {
  margin-left: 0;
}
.box1-item img,
.box2-item .img img{
  height: 100%;
  width: auto;
}
</style>
