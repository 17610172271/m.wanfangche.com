<template>
  <popup v-model="popupShow" @on-hide="onPopupHide" @on-show="onPopupShow" :is-transparent="true">
    <div class="popup-container">
      <div class="clear popup-header text-lg backtime">
        <a class="btn text-muted pull-left padder-v text-lg" @click="onHide(false)">取消</a>
        <a class="btn text-default pull-right padder-v text-lg" @click="onHide(true)">确定</a>
        <div class="text-center padder-v picktime">取还车时间</div>
      </div>
      <div class="clear picker-info text-muted">
        <div class="col-xs-5 left" @click="showPicker('pickup_picker')">
          <div class="row" :class="{'active': pickupPicker.show}">
            <div class="text-lg left-title">取车</div>
            <div class="date-txt">
            {{pickupPicker.value[0] | formatTime('YYYY/MM/DD')}}
            {{pickupPicker.value[1]}}:{{pickupPicker.value[2]}}
            </div>
            <div class="border-mask"></div>
          </div>
        </div>
        <div class="col-xs-2 text-center">
          <div class="row">
            <div class="total-day-sm text-center">
              <div class="total-day-underline-muted text-muted">{{dateTime || 1}}天</div>
            </div>
          </div>
        </div>
        <div class="col-xs-5 right" @click="showPicker('return_picker')">
          <div class="row"  :class="{'active': returnPicker.show}">
            <div class="text-lg right-title">还车</div>
            <div class="date-txt">
              {{returnPicker.value[0] | formatTime('YYYY/MM/DD')}}
              {{returnPicker.value[1]}}:{{returnPicker.value[2]}}
            </div>
            <div class="border-mask"></div>
          </div>
        </div>
      </div>
      <picker
      class="picker-custom"
      v-show="pickupPicker.show"
      :data="pickupPicker.list"
      v-model="pickupPicker.value"
      @on-change="onPickupPickerChange"
      :fixed-columns="0"
      :column-width="[ 3 / 5, 1 / 5 ]"></picker>
      <picker
      class="picker-custom"
      v-show="returnPicker.show"
      :data="returnPicker.list"
      v-model="returnPicker.value"
      @on-change="onReturnPickerChange"
      :fixed-columns="0"
      :column-width="[ 3 / 5, 1 / 5 ]"></picker>
  </div>
  </popup>
</template>
<script>
import { Popup, Picker } from 'vux'
// import value2name from '../../filters/value2name'
// import name2value from '../../filters/name2value'
import formatTime from '../../filters/format-time'
import getDateRange from '../../tools/date/range'
import getNumberRange from '../../tools/number/range'
import today from '../../tools/date/today'

const date2array = function (d) {
  return [formatTime(d, 'YYYY-MM-DD'), formatTime(d, 'HH'), formatTime(d, 'mm')]
}

const array2date = function (a) {
  return a[0] + ' ' + a[1] + ':' + a[2]
}

export default {
  components: {
    Popup,
    Picker
  },
  filters: {
    formatTime
  },
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    show: Boolean,
    active: {
      type: String,
      default: 'pickup_datetime'
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
  },
  methods: {
    onHide (type) {
      this.popupShow = false // set show value to false
      if (type) {
        this.closeType = true // accept piker value change, and set pupup value to piker value
        this.currentPickerValue = this.getPickerValue()
      }
      if (!type) {
        this.closeType = false
        if (typeof this.value === 'object') {
          this.pickerValue = this.currentPickerValue
        }
      }
    },
    showPopup () {
      this.popupShow = true
    },
    onPopupShow (type) {
      this.closeType = false // reset close type to false
      this.showPicker(this.active)
      this.$emit('on-show')
    },
    onPopupHide (val) {
      this.$emit('show', () => { return true })
      this.$emit('on-hide', this.closeType)
    },
    onPickupPickerChange (val) {
      var pick = new Date(val[0] + 'T' + val[1] + ':' + val[2]).getTime()
      val[0] = formatTime(pick + 86400000 * this.dateTime, 'YYYY-MM-DD')
      this.returnPicker.value = val
    },
    onReturnPickerChange (val) {
      this.DateDiff()
    },
    showPicker (which) {
      if (which === 'return_picker') {
        this.pickupPicker.show = false
        this.returnPicker.show = true
      } else {
        this.returnPicker.show = false
        this.pickupPicker.show = true
      }
    },
    getPickerValue () {
      return [array2date(this.pickupPicker.value), array2date(this.returnPicker.value)]
    },
    noTime () {
      var pick = new Date(this.pickupPicker.value[0] + 'T' + this.pickupPicker.value[1] + ':' + this.pickupPicker.value[2]).getTime()
      var retu = new Date(this.returnPicker.value[0] + 'T' + this.returnPicker.value[1] + ':' + this.returnPicker.value[2]).getTime()
      if (retu <= pick) {
        this.pickupPicker.value[0] = formatTime(retu - 86400000, 'YYYY-MM-DD')
        var time = this.pickupPicker.value
        this.pickupPicker.value = time
        this.dateTime = 1
      }
    },
    DateDiff () {
      var oDate1, oDate2
      var pick = this.pickupPicker.value[0] + 'T' + this.pickupPicker.value[1] + ':' + this.pickupPicker.value[2]
      var retu = this.returnPicker.value[0] + 'T' + this.returnPicker.value[1] + ':' + this.returnPicker.value[2]
      oDate1 = new Date(pick).getTime()
      oDate2 = new Date(retu).getTime()
      this.dateTime = parseInt(Math.ceil((oDate2 - oDate1) / 1000 / 60 / 60 / 24))
      this.noTime()
    },
    getPickerListPrice (startDate, endDate, dateprice) {
      if (!startDate || !endDate) {
        return []
      }
      const datesNames = getDateRange(startDate, endDate, 'MM月DD日 周E')
      const datesValues = getDateRange(startDate, endDate, 'YYYY-MM-DD')
      const hours = getNumberRange(0, 23)
      const minutes = getNumberRange(0, 59, 2)
      for (var key in dateprice) {
        if (dateprice[key].is_reserve === '1' || dateprice[key].is_occupy === '1') {
          dateprice[key].text = '<span class="price prices">&nbsp;&nbsp;已租&nbsp;&nbsp;<span>'
        } else {
          dateprice[key].text = '<span class="price">&nbsp;￥' + parseInt(dateprice[key].price) + '&nbsp;&nbsp;<span>'
        }
      }
      return [datesNames.map((one, index) => {
        return {
          name: one + '' + dateprice[index].text,
          value: datesValues[index]
        }
      }), hours, minutes]
    },
    getPickerList (startDate, endDate) {
      if (!startDate || !endDate) {
        return []
      }
      const datesNames = getDateRange(startDate, endDate, 'MM月DD日 周E')
      const datesValues = getDateRange(startDate, endDate, 'YYYY-MM-DD')
      const hours = getNumberRange(0, 23)
      const minutes = getNumberRange(0, 59, 2)

      return [datesNames.map((one, index) => {
        return {
          name: one,
          value: datesValues[index]
        }
      }), hours, minutes]
    }
  },
  created () {
    if (typeof this.show !== 'undefined') {
      this.showValue = this.show
    }
    this.DateDiff()
    this.pickupPicker.list = this.getPickerList(today(1), today(180))
    this.returnPicker.list = this.getPickerList(today(1), today(180))
  },
  watch: {
    currentPickerValue (val) {
      this.$emit('on-change', val)
      this.$emit('input', val)
      // this.pickupPicker.value = val
    },
    value (val) {
      this.currentValue = val
    },
    show (val) {
      this.popupShow = val
    },
    data (val) {
      this.pickupPicker.list = this.getPickerListPrice(today(1), today(180), val)
      this.returnPicker.list = this.getPickerListPrice(today(1), today(180), val)
    }
  },
  data () {
    return {
      pickupPicker: {
        show: true,
        list: [],
        value: date2array(this.value[0])
      },
      returnPicker: {
        show: false,
        list: [],
        value: date2array(this.value[1])
      },
      pickerValue: this.value,
      currentPickerValue: this.value, // 记录当前Picker的值，当选择"取消"时用于重置Picker的值
      popupShow: false, // popup 开关
      closeType: false, // popup 关闭的方式, false: 取消, true: 确定
      dateTime: 0
    }
  },
  mounted () {
  }
}
</script>
<style lang="less">

.picker-custom{
  background-color: #ddd;
  .scroller-indicator{
    // background-image:linear-gradient(to bottom, #f5f5f5, #f5f5f5, transparent, transparent),
    //   linear-gradient(to top, #f5f5f5, #f5f5f5, transparent, transparent);
    background-image: none;
    z-index: 4;
    background-color: #fff;
    height: 44px;
    top: 90px;
  }
  .scroller-component{
    //transform:perspective(800px) rotateX(45deg);
    height: 228px;
    .scroller-mask {
      background-color: #f5f5f5;
      background-image: none;
      border: 0;
    }
  }
  .scroller-content{
    z-index: 5;
    top: 5px;

  }
  .vux-flexbox-item:first-child{
    .scroller-indicator{
      border-left:4px solid #FE7C1E;
    }
    .scroller-item{
      padding-left:20px;
      text-align: left;
    }
  }
  .scroller-item{
    font-size: 14px;
    transition: all 0.1s ease-in;
    // color: #8D9DB0;
    height: 44px;
    line-height: 44px;
    color: #8D9DB0;
  }
  .scroller-item-selected{
    transition: all 0.1s ease-in;
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #2E3E4C;
    letter-spacing: 0;
    line-height: 40px;
  }
  .scroller-mask{
   //  z-index:4;
   // // background-image: none;
   //  background-image: linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.75) 90%, rgba(255,255,255,0) 90%,rgba(255,255,255,0) 100%), linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0.75) 90%, rgba(255,255,255,0) 90%,rgba(255,255,255,0) 100%);
  }
  .price {
  background: rgba(254, 124, 30, 0.1);
  border-radius: 100px;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #FE7C1E;
  letter-spacing: 0;
  margin-left: 8px;
  vertical-align: top;
  
  }
  .price.prices{
    background:#EAECEE;
    color:#C8D1DC;
  }
}

.picker-info{
  height:64px;
  position: relative;
  padding-top: 10px;
   .left{
    text-align: right;
    .border-mask{
      right: 4.5rem;
    };
    .active {
      .border-mask{
        display: block;
      }
    }
  }
  .right{
    text-align: left;
    .border-mask{
      left: 4.5rem
    };
    .active{
      .border-mask{
        display: block;
      }
    }
  }
  .row{
    padding-bottom:5px;
  }
  .active{
    color:#FE7C1E;
  }
  .border-mask{
    width: 20px;
    height: 3px;
    background-color: #FE7C1E;
    bottom: 0;
    position: absolute;
    display: none;
  }
  .left-title{
    padding-right: 40px;
    padding-top:12px;
  }
  .right-title{
    padding-left: 40px;
    padding-top:12px;
  }
}
.popup-container .backtime {
  padding-top: 11px;
}
.picktime {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #2E3E4C;
  letter-spacing: 0;
}
</style>
