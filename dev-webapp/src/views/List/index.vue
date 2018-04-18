<template>
  <div style="background:#FFF; height:100%;" >
    <transition name="comprehensive">
    <div class="comprehensive" v-show="comprehensive">
      <p @click="btnComprehensive(' ', '综合排序')">综合排序</p>
      <p @click="btnComprehensive('sales', '销量最多')">销量最多</p>
      <p @click="btnComprehensive('score', '评分最高')">评分最高</p>
      <p @click="btnComprehensive('d_price', '价格从低到高')">价格从低到高</p>
      <p @click="btnComprehensive('a_price', '价格从高到低')">价格从高到低</p>
    </div>
    </transition>
    <div class="adds" v-show="comprehensive" @click="comprehensiveShow"></div>
    <navheader class="bg-white" style="position:fixed;">选择车型</navheader>
    <loading-car v-show="!toLoad" class="middle"></loading-car>
    <scroll-refresh :on-infinite="onInfinite"  :on-refresh="onRefresh"  v-show="listDataNull" class="app-container" style="background:#FFFFFF;" >
    <transition name="fade">

    <div  v-show="toLoad" class="">
    
      <div class="app-body" style="padding:0;">

        <!-- 租赁信息 -->
        <a v-show="toLoads">
        <div class="rental-info" >
          <div class="col-xs-5">
            <div class="rental-info-left"  @click="showDatetimePicker('pickup_picker')">
              <div class="lin-twenty">
                <span class="label">取</span>
                <span class="font-ce">{{query.pickup_city}}</span>
              </div>
              <div class="date-time padder-v-xs">{{query.pickup_datetime}}</div>
            </div>
          </div>
          <div class="col-xs-2">
            <div class="row">
              <div class="total-day-sm text-center">
                <div class="total-day-underline-muted text-muted">{{total_days}}天</div>
              </div>
            </div>
          </div>
          <div class="col-xs-5">
            <div class="rental-info-right" @click="showDatetimePicker('return_picker')">
              <div class="lin-twenty">
                <span class="label">还</span>
                <span class="font-ce">{{query.return_city}}</span>
              </div>
              <div class="date-time padder-v-xs">{{query.return_datetime}}</div>
            </div>
          </div>
        </div>
        </a>
        <!-- / 租赁信息

        筛选 -->
        <div class="filter-container" v-show="toLoads">
          <div class="btn-toolbar">
            <div class="btn-group btn-group-justified">
              <a class="btn text-normal" @click="comprehensiveShow">{{sortTxt}}
                <i class="glyphicon glyphicon-triangle-bottom text-small" v-if="!comprehensive"></i>
                <i class="glyphicon glyphicon-triangle-top text-small" v-else></i></a>
              <a class="btn text-normal" @click="onFilterPageShow">筛选 <i class="glyphicon glyphicon-filter text-small"></i></a>
            </div>
          </div>
          <div class="drop-down"></div>
        </div>



        <!-- / 筛选

        RV List -->
        <div class="panel rv-list-container">
          <div class="panel-body">
            <div class="list-group list-group-underline list-group-lg">
              <router-link v-for="rv in rvList" :key="rv.id" :to="{name: 'rv_detail', params: {id: rv.id}}" class="list-group-item"  >
                  <div class="pull-left thumb-md m-r"><img :src="rv.img_cover | ossResize('middle')">

                  </div>
                  <div class="clear">
                    <div class="title text-bolder">{{rv.title}}</div>
                    <div class="text-muted m-b-sm spangray">
                    <div class="thumb-sm" style="float:left;text-align:center; margin-right:3px;"><img :src="rv.logo | ossResize('avatar')" alt="..."></div>
                    <p>{{rv.adult_passengers | parseInt}}人·
                    <span v-if="rv.transmission_case === '1'">自动挡</span>
                    <span v-if="rv.transmission_case === '2'">手动挡</span>
                    <span v-if="rv.transmission_case === '3'">手/自动挡</span>·
                    <span v-if="rv.actuation === '1'">汽油</span>
                    <span v-if="rv.actuation === '2'">柴油</span>
                    <span v-if="rv.actuation === '3'">电力</span>
                    <span v-if="rv.actuation === '4'">混合动力</span></p>
                    </div>
                    <div class="right text-lg" style="padding-top:5px;">
                      <span class="text-default orange font-bold">￥{{rv.price | parseInt}}</span>/天
                    </div>
                  </div>
                  </router-link>
            </div>
          </div>
        </div>
      <!--   / RV List -->

      </div>
    </div>
    </transition>
    </scroll-refresh>

    <popup v-model="filter_page_show"  height="100%" width="80%" position="right" class="bg-white" >
        <div class="panel rv-list-filter-page-container" style="z-index:502">
          <div class="panel-heading">{{filter.f_8.name}}</div>
          <div class="panel-body">
            <div class="row btn-cell">
             <radio-button v-model="data.rvtype" :data="filter.f_8.item"></radio-button>
            </div>
          </div>
          <div class="panel-heading">{{filter.f_1.name}}</div>
          <div class="panel-body">
            <div class="row btn-cell">
              <!-- <div class="col-xs-4" v-for="item in filter.f_1.item">
                <div class="row btn-cell-item" v-model="btn_radio"><a class="btn btn-default">{{item.name}}</a></div>
              </div> -->
              <radio-button v-model="data.person" :data="filter.f_1.item"></radio-button>
            </div>
          </div>
          <div class="panel-heading">{{filter.f_2.name}}</div>
          <div class="panel-body">
            <div class="row btn-cell">
             <radio-button v-model="data.files" :data="filter.f_2.item"></radio-button>
            </div>
          </div>
          <div class="panel-heading">{{filter.f_3.name}}</div>
          <div class="panel-body">
            <div class="row btn-cell">
              <radio-button v-model="data.actuation" :data="filter.f_3.item"></radio-button>
            </div>
          </div>
          <div class="panel-heading">{{filter.f_7.name}}</div>
          <div class="panel-body">
            <div class="row btn-cell">
              <radio-button v-model="data.driver" :data="filter.f_7.item"></radio-button>
            </div>
          </div>
          <div class="panel-heading">{{filter.f_4.name}}</div>
          <div class="panel-body">
            <div class="row btn-cell">
             <radio-button v-model="data.serve" :data="filter.f_4.item" class="server"></radio-button>
            </div>
          </div>
          <div class="panel-heading" v-show="!isAgency">{{f_6.name}}</div>
          <div class="panel-body" v-show="!isAgency">
            <div class="row btn-cell">
             <img-button v-model="data.store" :data="f_6.item"></img-button>
            </div>
          </div>
        </div>
        <div class="b-t fixed-bottom">
          <div class="btn-group btn-group-justified">
            <a class="btn btn-lg btn-default btn-noradius" @click="onFilterPageHide">重置</a>
            <a class="btn btn-lg btn-custom btn-noradius" @click="onFilterPageSubmit">确定</a>
          </div>
        </div>
      </popup>
       <div v-if="!listDataNull" style="height:100%;">
        <div class="err-img" style="padding-top:33%;">
          <img src="../../img/err-empty.png" alt=""/>
        </div>
        <div class="err-txt" style="padding-top:40%;">
          <p>暂时找不到你想要的房车</p>
          <p>您可以更换时间或者更换商圈试试</p>
        </div>
        <div class="err-btn" v-show="!showList">
          <button @click="refresh">刷新</button>
        </div>
      </div>
      <date-picker
    class="popup-custom"
    v-model="datePickerValue"
    :show="datePickerShow"
    :active="datePickerActive"
    @on-hide="onDatePickerHide"
    @on-change="onDatePickerChange"></date-picker>
  </div>
</template>

<script>
import { Popup } from 'vux'
import Navheader from '../Common/Navheader'
import api from '@/api'
import formatTime from '@/filters/format-time'
import CheckButtonGroup from '../../components/check-button-group'
import RadioButton from '../../components/radio-button'
import ImgButton from '@/components/img-button'
import RvList from '../Rv/List'
import LoadingCar from '@/components/loading/car'
import ScrollRefresh from '@/components/Refresh'
import { mapGetters } from 'vuex'
import DatePicker from '../Home/date-picker'

export default {
  name: 'list',
  components: {
    Navheader,
    Popup,
    CheckButtonGroup,
    RadioButton,
    RvList,
    ImgButton,
    LoadingCar,
    ScrollRefresh,
    DatePicker
  },
  filters: {
    parseInt: function (value) {
      return parseInt(value)
    }
  },
  data () {
    return {
      toLoad: false,
      rvList: [],
      filter_page_show: false,
      sortTxt: '综合排序',
      filter: {
        f_1: {name: '可载人数',
          item: [
              {name: '不限', value: 11},
              {name: '2人以上', value: 2},
              {name: '4人以上', value: 3},
              {name: '6人以上', value: 4}

          ]
        },
        f_2: {name: '手/自动挡',
          item: [
              {name: '不限', value: 11},
              {name: '手动挡', value: 2},
              {name: '自动档', value: 1},
              {name: '手动,自动', value: 3}
          ]
        },
        f_3: {name: '燃油',
          item: [
              {name: '不限', value: 11},
              {name: '汽油', value: 1},
              {name: '柴油', value: 2}
          ]
        },
        f_4: {name: '增值服务',
          item: [
              {name: '不限', value: 11},
              {name: '送车上门', value: 1},
              {name: '上门还车', value: 2},
              {name: '露营桌椅', value: 3},
              {name: '房车管家(代驾)服务', value: 4}
          ]
        },
        f_5: {name: '车辆配置',
          item: [
              {name: '厕所', value: 1},
              {name: '热水', value: 2},
              {name: '冰箱', value: 3},
              {name: '炉灶', value: 4},
              {name: '空调', value: 5},
              {name: '暖气', value: 6},
              {name: '儿童座椅', value: 7}
          ]
        },
        f_6: {name: '租车公司',
          item: []
        },
        f_7: {name: '驾照要求',
          item: [
              {name: '不限', value: 11},
              {name: 'C1', value: 2},
              {name: 'C2', value: 1},
              {name: 'B2', value: 3},
              {name: 'B1', value: 4},
              {name: 'A1', value: 7},
              {name: 'A2', value: 6},
              {name: 'A3', value: 5}
          ]
        },
        f_8: {name: '房车类型',
          item: [
              {name: '不限', value: 11},
              {name: '自行A型', value: 1},
              {name: '自行B型', value: 2},
              {name: '自行C型', value: 3},
              {name: '拖挂A型', value: 4},
              {name: '拖挂B型', value: 5},
              {name: '拖挂C型', value: 6},
              {name: '拖挂D型', value: 7}
          ]
        }
      },
      comprehensive: false,
      btn_radio: false,
      data: {
        person: '',
        actuation: '',
        serve: '',
        configuration: [],
        store: '',
        driver: '',
        rvtype: ''
      },
      arrs: [],
      formdata: '',
      coty: '',
      f_6: {name: '租车公司',
        item: []
      },
      getData: {
        s_date: null,
        e_date: null,
        pickup_cityid: null,
        return_cityid: null
      },
      showList: true,
      listDataNull: true,
      page: 1,
      toLoads: true,
      datePickerShow: false,
      datePickerActive: 'pickup_datetime',
      total_days: null,
      isAgency: false
    }
  },
  computed: {
    datePickerValue: {
      get: function () {
        return [
          this.query.pickup_datetime,
          this.query.return_datetime
        ]
      },
      set: function (newValue) {
        this.total_days = this.DateDiff()
      }
    },
    pickup_date () {
      // return getFormatDate(this.query.pickup_datetime).substring(5, 10)
      return this.query.pickup_datetime.substring(0, 11)
    },
    pickup_day () {
      return '周六'
    },
    pickup_time () {
      return this.query.pickup_datetime.substring(12, 17)
    },
    return_date () {
      return this.query.return_datetime.substring(5, 11)
    },
    return_day () {
      return '周日'
    },
    return_time () {
      return this.query.return_datetime.substring(12, 17)
    },
    ...mapGetters({
      querys: 'query'
    })
  },
  methods: {
    showDatetimePicker (type) {
      this.datePickerActive = type
      this.datePickerShow = true
    },
    onDatePickerChange (val) {
      this.query.pickup_datetime = val[0]
      this.query.return_datetime = val[1]
    },
    onDatePickerHide () {
      this.toLoad = false
      this.datePickerShow = false
      this.dateTime = this.DateDiff()
      this.getList()
    },
    onDatePickerShow () {
    },
    onInfinite (done) {
      this.page++
      this.axios.get(api.rv.list, {params: {
        s_date: this.query.pickup_datetime,
        e_date: this.query.return_datetime,
        pickup_cityid: parseInt(this.query.pickup_id),
        return_cityid: parseInt(this.query.return_id),
        size: 5,
        page: this.page
      }}).then(response => {
        if (response.data.code === 200) {
          if (!response.data.data) {
            done(true)
          } else {
            this.rvList.push.apply(this.rvList, response.data.data.list)
            done()
          }
        }
      })
    },
    onRefresh () {
      this.$router.go('')
    },
    getHotlist () {
      this.f_6.item = []
      this.f_6.item.push({name: '不限', value: 99})
      this.axios.get(api.rv.hotStoreList)
      .then(response => {
        if (response.data.code === 200) {
          for (var key in response.data.data.list) {
            this.f_6.item.push({name: response.data.data.list[key].sort_name, value: response.data.data.list[key].agency_id})
          }
        }
      })
      this.filter.f_6.item = this.f_6.item
    },
    onFilterPageShow () {
      this.filter_page_show = true
      this.comprehensive = false
    },
    goback () {
      this.$router.replace({
        name: 'home'
      })
    },
    onFilterPageHide () {
      this.data.person = ''
      this.data.files = ''
      this.data.store = ''
      this.data.actuation = ''
      this.data.driver = ''
      this.data.serve = ''
      this.data.rvtype = ''
      this.getHotlist()
      if (this.isAgency) {
        this.data.store = this.$route.query.id
      } else {
        this.data.store = 98
      }
    },
    onFilterPageSubmit () {
      this.filter_page_show = false
      this.data.person === 11 ? this.getData.adult_passengers = '' : this.getData.adult_passengers = this.data.person
      this.data.files === 11 ? this.getData.transmission_case = '' : this.getData.transmission_case = this.data.files
      this.data.actuation === 11 ? this.getData.actuation = '' : this.getData.actuation = this.data.actuation
      this.data.driver === 11 ? this.getData.driver_license_class = '' : this.getData.driver_license_class = this.data.driver
      this.switchServe(this.data.serve)
      this.data.store === 99 || this.data.store === 98 ? this.getData.agency_id = '' : this.getData.agency_id = parseInt(this.data.store)
      console.log(this.getData.agency_id)
      this.data.rvtype === 11 ? this.getData.type = '' : this.getData.type = this.data.rvtype
      this.axios.get(api.rv.list, {params: this.getData})
         .then(response => {
           if (response.data.code === 200) {
             this.rvList = response.data.data.list
             if (!response.data.data) {
               this.showList = false
               this.listDataNull = false
             }
           }
         })
    },
    refresh () {
      this.$router.go('')
    },
    comprehensiveShow () {
      this.comprehensive ? this.comprehensive = false : this.comprehensive = true
    },
    DateDiff () {
      var oDate1, oDate2, iDays
      oDate1 = new Date(formatTime(this.query.pickup_datetime, 'YYYY/MM/DD HH:mm:ss')).getTime()
      oDate2 = new Date(formatTime(this.query.return_datetime, 'YYYY/MM/DD HH:mm:ss')).getTime()
      iDays = parseInt(Math.ceil((oDate2 - oDate1) / 1000 / 60 / 60 / 24))
      return iDays
    },
    btnComprehensive (val, txt) {
      this.comprehensive = false
      this.sortTxt = txt
      this.axios.get(api.rv.list, {params: {
        s_date: this.query.pickup_datetime,
        e_date: this.query.return_datetime,
        pickup_cityid: parseInt(this.query.pickup_id),
        return_cityid: parseInt(this.query.return_id),
        sort: val,
        agency_id: this.isAgency ? this.$route.query.id : ''
      }})
       .then(response => {
         if (response.data.code === 200) {
           this.rvList = response.data.data.list
         }
       })
    },
    getList () {
      this.total_days = this.DateDiff()
      this.getData.s_date = this.query.pickup_datetime
      this.getData.e_date = this.query.return_datetime
      this.getData.pickup_cityid = parseInt(this.query.pickup_id)
      this.getData.return_cityid = parseInt(this.query.return_id)
      this.getHotlist()
      this.axios.get(api.rv.list, {params: {
        s_date: this.query.pickup_datetime,
        e_date: this.query.return_datetime,
        pickup_cityid: parseInt(this.query.pickup_id),
        return_cityid: parseInt(this.query.return_id),
        size: 5,
        page: this.page,
        agency_id: this.isAgency ? this.$route.query.id : ''
      }}).then(response => {
        if (response.data.code === 200) {
          if (!response.data.data) {
            this.listDataNull = false
          } else {
            this.rvList = response.data.data.list
          }
        }
        console.log(this.listDataNull)
        this.toLoad = true
      })
    },
    switchServe (ind) {
      switch (ind) {
        case 1:
          this.getData.support_deliver = 0
          break
        case 2:
          this.getData.support_return_at_home = 0
          break
        case 3:
          this.getData.support_return_at_another_place = 0
          break
        case 4:
          this.getData.butler_service = 0
          break
        case 11:
          this.getData.support_deliver = ''
          this.getData.support_return_at_another_place = ''
          this.getData.support_return_at_home = ''
          this.getData.butler_service = ''
          break
      }
    }
  },
  created () {
    this.query = this.querys
    if (this.$route.query.id) {
      this.isAgency = true
    }
    this.getList()
  },
  watch: {
  }
}
</script>
<style>
.rental-info{
  background: #F5F5F5;
  padding: 10px 15px;
  color: #8D9DB0;
  margin:0 0;
}
.rental-info .label{
  display: inline-block;
  padding: .2em 2px;
  font-weight: normal;
  line-height: 1;
  color: rgba(254,152,21,1);
  text-align: center;
  vertical-align: baseline;
  white-space: nowrap;
  border: none;
  font-size: 12px;
}
.rental-info .date-time{
  font-size: 12px;
}
.rental-info-left{
  text-align: right;
  margin: 0 -10px;
}
.rental-info-center{
  margin: 0 -5px;
  font-size:12px;
  padding: 8px 0;
  vertical-align: baseline;
  text-align: center;
}
.rental-info-right{
  margin: 0 -10px;
  text-align: left;
}
.rental-info-icon{
  position: absolute;
  display: inline-block;
  right: 5px;
  top: 0;
  line-height: 36px;
}

.filter-container{
  position: absolute;
  display: block;
  padding: 5px 15px;
  z-index: 2;
}

.rv-list-container{
  padding-top: 30px;
}
.rv-list-container .list-group-item .title{
  padding-bottom: 0px;
}
.rv-list-filter-page-container{
  padding: 15px 0 100px 0;
}
</style>
