<template>
  <div  class="app-body app-container">
    <!-- <input type="text" class="home-city-input" v-model="city_pickup" @click="onShow" disabled=""> -->
    <a class="city-picker-btn" @click="onShow">{{city_pickup}}</a>
    <div class="full-popup">
    <popup v-model="city_pickup_show" height="100%" width="100%" position="right" class="bg-white" @on-show="onShow" @on-hide="onHide" @on-change="onChange">
      <div class="nav-header">
        <div class="nav-header-left">
          <a class="nav-header-back" href="javascript:" @click="onHide()">
            <img src="../../img/icon_back.png">
            &nbsp;</a>
        </div>
        <h1 class="nav-header-title">
          <span class="">选择城市</span>
        </h1>
        <div class="nav-header-right">
          <a class="nav-header-more"></a>
        </div>
      </div>
      <div class="wrap">
        <search
          placeholder="搜索城市名"
           @result-click="resultClick"
           @on-change="getResult"
           :results="results"
           v-model="searchKey"
           position="absolute"
           auto-scroll-to-top top="44px"
           @on-focus="onFocus"
           @on-cancel="onCancel"
           @on-submit="onSubmit"
           ref="search"></search>
         <div>
           <div class="panel">
             <div class="panel-heading text-lg">热门城市</div>
             <div class="panel-body">
               <div class="row btn-cell">
                 <div class="col-xs-4" v-for="city in hot_city_list">
                   <div class="row btn-cell-item"><a href="javascript:" class="btn btn-default" @click="setCity(city)">{{city}}</a></div>
                 </div>
               </div>
            </div>
           </div>
           <div class="panel">
             <div class="panel-body text-lg">
               <div class="list-group list-group-underline list-group-lg" v-for="group in city_list">
                 <div class="text-xlg">{{group.init}}</div>
                 <a class="list-group-item" v-for="city in group.list" @click="setCity(city)">
                   {{city}}
                 </a>
               </div>
             </div>
           </div>
        </div>
      </div>
    </popup>
    </div>
  </div>
</template>

<script>
import { Popup, Search } from 'vux'

const hotCityList = [
  '北京', '上海', '广州', '深圳', '海南', '北京', '上海', '广州', '深圳', '海南', '北京', '上海', '广州', '深圳', '海南'
]

const cityList = [
  {init: 'A', name: 'A', list: ['安庆', '安顺', '安阳', '鞍山', '阿苏客', '阿卡贝拉']},
  {init: 'F', name: 'F', list: ['福州', '佛山', '福州', '佛山', '福州', '佛山', '福州', '佛山']}
]

export default {
  components: {
    Popup,
    Search
  },
  props: {
    initCity: {
      type: String,
      default: '北京'
    },
    value: String
  },
  data () {
    return {
      city_pickup: this.initCity,
      city_pickup_show: false,
      results: [],
      searchKey: '',
      hot_city_list: hotCityList,
      city_list: cityList
    }
  },
  methods: {
    setFocus () {
      this.$refs.search.setFocus()
    },
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      this.results = val ? getResult(this.value) : []
    },
    onSubmit () {
      this.$vux.toast.show({
        type: 'text',
        position: 'top',
        text: 'on submit'
      })
    },
    onFocus () {
    },
    onCancel () {
    },
    onShow () {
      this.city_pickup_show = true
    },
    onHide (city) {
      this.city_pickup_show = false
    },
    onChange () {

    },
    setCity (city) {
      this.city_pickup = city || this.initCity
      this.$emit('on-change', this.city_pickup)
      this.city_pickup_show = false
    }
  }
}
function getResult (val) {
  let rs = []
  for (let i = 0; i < 8; i++) {
    rs.push({
      title: ` ${i + 1} : ${val}  `,
      other: i
    })
  }
  return rs
}
</script>

<style>
.bg-white{
  background: #fff;
}
.btn-cell{
  padding: 0 10px;
}
.btn-cell .btn{
  background: #f5f5f5;
  border: none;
  width: 100%;
  color: #2E3E4C;
}
.btn-cell .btn-cell-item{
  padding: 5px 0;
  margin: 0 -10px;
}
.home-city-input{
  color:#2F4266;
  display: block;
  width: 100%;
  border:none;
  font-size:20px;
  line-height: 28px;
  padding: 10px 0;
  border-bottom:1px solid #EDEDED;
  font-family: 'PingFangSC-Semibold';
  background: #fff;
}
.city-picker-btn{
  color:#2F4266;
  display: block;
  font-family: 'PingFangSC-Semibold';
  font-size:20px;
  padding: 10px 0;
  line-height: 28px;
  border-bottom: 1px solid #EDEDED;
  background: #fff;
}
</style>
