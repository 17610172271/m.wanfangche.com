<template>
  <div>

  <div class="app-container" style="background:#FFFFFF;">
  <baner></baner>
  <div class="home-content">
    <!-- tab start-->
    <div class="tab">
      <div class="tab-body">
        <div class="box-heading text-muted text-small">取车城市</div>
        <div class="block m-b">
          <router-link class="city-picker-btn" :to="{ name: 'city', query: {type: 1}}" style="color:#2F4266;">{{query.pickup_city}}</router-link>
        </div>
        <div class="box-heading text-muted text-small">还车城市</div>
        <div class="block">
          <router-link class="city-picker-btn" :to="{ name: 'city', query: {type: 2}}" style="color:#2F4266;">{{query.return_city}}</router-link>
        </div>
        <div class="row block date-select-panel">
          <div class="col-xs-4 b-b padder-v">
            <div class="row" @click="showDatetimePicker('pickup_picker')">
                <div class="text-muted text-small m-b">取车时间</div>
                <div class="text-lger date">{{query.pickup_datetime | formatTime('MM月DD日')}}</div>
                <div>{{query.pickup_datetime | formatTime('周E')}}{{query.pickup_datetime | formatTime('HH:mm')}}</div>
            </div>
          </div>
          <div class="col-xs-4">
            <div class="row">
              <div class="total-day text-center">
                <div class="total-day-underline text-muted">{{dateTime || 1}}天</div>
              </div>
            </div>
          </div>
          <div class="col-xs-4">
            <div class="row b-b padder-v text-right"  @click="showDatetimePicker('return_picker')">
                <div class="text-muted text-small m-b">还车时间</div>
                <div class="text-lger date">{{query.return_datetime | formatTime('MM月DD日')}}</div>
                <div>{{query.return_datetime | formatTime('周E')}} {{query.return_datetime | formatTime('HH:mm')}}</div>
            </div>
          </div>
        </div>

        <div class="padder-v-lg">
          <a @click="onSubmit" class="btn btn-lg btn-block btn-custom">搜索</a>
        </div>
      </div>
    </div>
    <!-- /tab -->

    <!--图片-->
    <imgscoller :list="query"></imgscoller>
    <!--/图片-->

  </div>
  </div>

  <date-picker
  class="popup-custom"
  v-model="datePickerValue"
  :show="datePickerShow"
  :active="datePickerActive"
  @on-hide="onDatePickerHide"
  @on-change="onDatePickerChange"></date-picker>

   <!-- 底导航 -->
    <tabbar active="rental"></tabbar>
    <!-- /底导航 -->
</div>
</template>

<script>
import Baner from './Baner'
import Imgscoller from './Imgscroller'
import Tabbar from '../Tabbar'
import DatePicker from './date-picker'
import formatTime from '@/filters/format-time'
// import today from '@/tools/date/today'

import api from '@/api'

export default {
  name: 'home',
  components: {
    Baner,
    Tabbar,
    Imgscoller,
    DatePicker
  },
  filters: {
    formatTime
  },
  data () {
    return {
      title: 'home',
      query: {},
      datePickerActive: 'pickup_datetime',
      datePickerShow: false,
      dateTime: 0,
      pickerCity: ''
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
      }
    }
  },
  created () {
    this.query = this.$store.state.messageData
    this.dateTime = this.DateDiff()
    this.axios.get(api.adv.hotCity)
    .then(response => {
      // console.log(response)
    })
  },
  methods: {
    showDatetimePicker (type) {
      this.datePickerActive = type
      this.datePickerShow = true
    },
    onDatePickerShow () {
    },
    onDatePickerHide () {
      this.datePickerShow = false
      this.dateTime = this.DateDiff()
    },
    onDatePickerChange (val) {
      this.query.pickup_datetime = val[0]
      this.query.return_datetime = val[1]
    },
    onSubmit () {
      this.$router.push({name: 'list', query: this.query})
    },
    DateDiff () {
      var oDate1, oDate2, iDays
      oDate1 = new Date(formatTime(this.query.pickup_datetime, 'YYYY/MM/DD HH:mm:ss')).getTime()
      oDate2 = new Date(formatTime(this.query.return_datetime, 'YYYY/MM/DD HH:mm:ss')).getTime()
      iDays = parseInt(Math.ceil((oDate2 - oDate1) / 1000 / 60 / 60 / 24))
      return iDays
    }
  },
  watch: {
    picker (val) {
    }
  }
}

</script>
<style>
  .popup-custom{
    background-color: inherit;
    padding: 0 5px;
  }
  .popup-custom .popup-container{
    background: #fff;
    border-radius: 4px 4px 0 0;
  }
</style>
