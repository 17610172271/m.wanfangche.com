<template>
  <popup v-model="popupShow" @on-hide="onPopupHide" @on-show="onPopupShow" :is-transparent="true">
    <div class="popup-container">
      <div class="clear popup-header text-lg">
        <a class="btn text-muted pull-left padder-v text-lg" @click="onHide(false)">取消</a>
        <a class="btn text-default pull-right padder-v text-lg" @click="onHide(true)">确定</a>
        <div class="text-center padder-v">取还车时间</div>
      </div>
      <div class="row picker-info text-muted">
        <div class="col-xs-5 left">
          <div class="row active">
            <div class="text-lg left-title">取车</div>
            <div>{{pickerValue[0] | formatTime('YYYY/MM/DD')}} {{pickerValue[1]}}:{{pickerValue[2]}}</div>
            <div class="border-mask"></div>
          </div>
        </div>
        <div class="col-xs-2 text-center">
          <div class="row">
            <div class="total-day-sm text-center">
              <div class="total-day-underline-muted text-muted">8天</div>
            </div>
          </div>
        </div>
        <div class="col-xs-5 right">
          <div class="row">
            <div class="text-lg right-title">还车</div>
            <div>2017/06/07 10:00</div>
            <div class="border-mask"></div>
          </div>
        </div>
      </div>
      <picker
      class="picker-custom"
      v-if="pickupPickerShow"
      :data="pickupPickerList"
      v-model="pickupPickerValue"
      @on-change="onPickupPickerChange"
      :fixed-columns="0"
      :column-width="[ 2 / 3, 1 / 6 ]"></picker>
      <!-- <picker
      class="picker-custom"
      v-if="pickupPickerShow"
      :data="pickupPickerList"
      v-model="pickupPickerValue"
      @on-change="onPickupPickerChange"
      :fixed-columns="0"
      :column-width="[ 2 / 3, 1 / 6 ]"></picker> -->
  </div>
  </popup>
</template>
<script>
import { Popup, Picker } from 'vux'
import value2name from '../../filters/value2name'
// import name2value from '../../filters/name2value'
import formatTime from '../../filters/format-time'
import getDateRange from '../../tools/date/range'
import getNumberRange from '../../tools/number/range'

const getObject = function (obj) {
  return JSON.parse(JSON.stringify(obj))
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
      type: String,
      default () {
        return '2017-06-01 00:00'
      }
    },
    show: Boolean,
    data: {
      type: Array,
      default () {
        return []
      }
    },
    startDate: {
      type: String,
      default () {
        return '2017-06-01'
      }
    },
    endDate: {
      type: String,
      default () {
        return '2017-06-08'
      }
    }
  },
  computed: {
    list () {
      if (!this.startDate || !this.endDate) {
        return []
      }
      const datesNames = getDateRange(this.startDate, this.endDate, 'MM月DD日 周E')
      const datesValues = getDateRange(this.startDate, this.endDate, 'YYYY-MM-DD')
      const hours = getNumberRange(0, 23)
      const minutes = getNumberRange(0, 59, 2)
      return [datesNames.map((one, index) => {
        return {
          name: one,
          value: datesValues[index]
        }
      }), hours, minutes]
    },
    nameValue () {
      return value2name(this.currentValue, this.list)
    }
  },
  methods: {
    onHide (type) {
      this.popupShow = false // set show value to false
      if (type) {
        this.closeType = true // accept piker value change, and set pupup value to piker value
        // this.currentValue = getObject(this.pickerValue)
      }
      if (!type) {
        this.closeType = false
        if (this.value.length > 0) {
          // this.pickerValue = getObject(this.currentValue)
        }
      }
    },
    onPopupShow () {
      // reset close type to false
      this.closeType = false
      this.$emit('on-show')
    },
    onPopupHide (val) {
      if (this.value.length > 0) {
        // this.pickerValue = getObject(this.currentValue)
      }
      this.$emit('on-hide', this.closeType)
    },
    onPickerChange (val) {
      console.log(val)
      // if (JSON.stringify(this.currentValue) !== JSON.stringify(val)) {
      //   // if has value, replace it
      //   if (this.value.length) {
      //     const nowData = JSON.stringify(this.data)
      //     if (nowData !== this.currentData && this.currentData !== '[]') {
      //       this.pickerValue = getObject(val)
      //     }
      //     this.currentData = nowData
      //   } else { // if no value, stay quiet
      //     // if set to auto update, do update the value
      //   }
      // }
      // this.$emit('on-shadow-change', getObject(val))
    }
  },
  watch: {
    value (val) {
      if (JSON.stringify(val) !== JSON.stringify(this.pickerValue)) {
        this.pickerValue = getObject(val)
      }
    },
    currentValue (val) {
      this.$emit('on-change', getObject(val))
      this.$emit('input', getObject(val))
    },
    show (val) {
      this.popupShow = val
    }
  },
  data () {
    return {
      pickup:{
        pickerShow: false,
        pickerValue:this.value
      }
      pickerValue: ['2017-07-01', '03', '05'], // 初始化 piker 值
      currentValue: this.value, //
      // currentData: JSON.stringify(this.data), // used for detecting if it is after data change
      popupShow: false, // popup 开关
      closeType: false // popup 关闭的方式, false: 取消, true: 确定
    }
  }
}
</script>
<style lang="less">

.picker-custom{
  background-color: #f5f5f5;
  .scroller-indicator{
    background-image:linear-gradient(to bottom, #f5f5f5, #f5f5f5, transparent, transparent),
      linear-gradient(to top, #f5f5f5, #f5f5f5, transparent, transparent);
    // background-image: none;
    z-index: 2;
    background-color: #fff;
    // height: 44px;
  }
  .scroller-content{
    z-index: 3;
  }
  .vux-flexbox-item:first-child{
    .scroller-indicator{
      border-left:4px solid #FE7C1E;
    }
    .scroller-item{
      padding-left:3rem;
    }
  }
  .scroller-item{
    font-size: 14px;
    transition: all 0.1s ease-in;
    color: #8D9DB0;
    text-align: left;
    // height: 44px;
    // line-height: 44px;

  }
  .scroller-item-selected{
    font-size: 16px;
    transition: all 0.1s ease-in;
    color:#2E3E4C;
  }
  .scroller-mask{
    background-image: none;
    // background-image: linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.6)),linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0.6));
  }
}

.picker-info{
  line-height: 1.6em;
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
    padding-right: 4rem;
  }
  .right-title{
    padding-left: 4rem;
  }
}


</style>
