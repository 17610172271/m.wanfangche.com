<template>
  <div class="wfc__calendar">
      <div class="calendar-header">
        <div class="pull-right">
          <a class="btn" @click="reset">清除</a>
        </div>
        <div class="h-box">取车时间：<br>
          <span class="text-xlg">{{query.startDate}}</span>
        </div>
        <div class="h-box">还车时间:<br>
          <span class="text-xlg">{{query.endDate}}</span>
        </div>
        <div class="week-container">
          <ul>
            <li v-for="w in ['日', '一', '二', '三', '四', '五', '六']">{{w}}</li>
          </ul>
        </div>
      </div>
      <div class="calendar-body">
        <div  class="month-container" v-for="m in list">
          <div class="month-title">{{m.isOtherYear ? m.year + '年' : ''}}{{m.month + 1}}月</div>
          <ul>
            <li v-for="item in m.dates" 
                @click="onDateClick(item)" 
                :class="{active: item.isActive, 'is-previous': item.isPrevious, 'is-weekend':item.isWeekend, 'is-other-month': item.isOtherMonth}"
            >
              <div class="date-container">{{item.date}}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="calendar-footer">
        <div class="padder-v text-center">
          <a class="btn btn-custom btn-lg">保存</a>
        </div>
      </div>
  </div>
</template>
<script>
import calendar from '@/tools/date/calendar'

const query = {
  startDate: null,
  endDate: null,
  startTime: null,
  endTime: null
}

export default {
  data: () => ({
    list: calendar(0, 6),
    query: query,
    secondTime: false
  }),
  created () {
    this.initCalendar()
  },
  methods: {
    initCalendar () {
    },
    onDateClick (item) {
      if (!this.query.startDate || this.query.startDate >= item.value) {
        this.clear()
        this.query.startDate = item.value
      } else if (!this.secondTime) {
        this.secondTime = true
        this.query.endDate = item.value
      } else {
        this.secondTime = false
        this.clear()
        this.query.startDate = item.value
      }
      this.resetActive()
    },
    resetActive () {
      for (let m of this.list) {
        for (let item of m.dates) {
          if (item.value >= this.query.startDate && item.value <= this.query.endDate) {
            item.isActive = true
          } else if (item.value === this.query.startDate) {
            item.isActive = true
          } else {
            item.isActive = false
          }
        }
      }
    },
    clear () {
      this.secondTime = false
      this.query = {
        startDate: null,
        endDate: null,
        startTime: null,
        endTime: null
      }
    },
    reset () {
      this.clear()
      this.resetActive()
    }
  }
}
</script>
<style lang="scss">
.wfc__calendar {
  line-height: 1.5em;
  font-size: 14px;
  line-height: 1.5em;
  background: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  overflow: hidden;
}
.calendar-header {
  position:absolute;
  top:0;
  left: 0;
  right: 0;
  width: 100%;
  display: block;
  height: 120px;
  background: #f8f8f8;
}
.calendar-body {
  position:absolute;
  top: 120px;
  bottom: 60px;
  overflow-y: auto;
  transform: translate3d(0,0,0);
  overflow-scrolling: touch;
  -webkit-overflow-scrolling: touch;
}
.calendar-footer {
  position:absolute;
  bottom: 0;
  height: 60px;
  width: 100%;
  background: #f8f8f8;
}
.wfc__calendar .week-container {
  position: absolute;
  left: 0;
  width: 100%;
  bottom: 0;
  display: block;
  overflow: hidden;
}
.wfc__calendar .week-container ul {
  margin: 0 auto;
}
.wfc__calendar .week-container ul > li {
  width: 14.2857143%;
  float: left;
  text-align: center;
  padding: 5px 0;
  display: table-cell;
  vertical-align: middle;
  color: #8D9DB0;
}
.wfc__calendar .month-title {
  font-size: 30px;
  padding: 20px 10px;
  margin-bottom: 10px;
}
.wfc__calendar ul {
  list-style: none;
  width: 100%;
  display: table;
  margin-bottom: 0 auto;
}
.wfc__calendar .month-container ul > li {
  width: 14.2857143%;
  float: left;
  text-align: center;
  padding: 10px 0;
  min-height: 4rem;
  display: table-cell;
  vertical-align: middle;
}
.wfc__calendar .month-container ul > li.is-weekend {
  color: #8D9DB0;
}

.wfc__calendar .month-container ul > li.is-previous {
  color: #8D9DB0;
}
.wfc__calendar .month-container ul > li.is-other-month .date-container {
  display: none;
}
.wfc__calendar .month-container ul > li.active {
  background: #fff
}


.wfc__calendar .date-container {
  font-size: 16px;
  line-height: 36px;
  height: 36px;
  width: 36px;
  text-align: center;
  border-radius: 50% 50%;
  display: inline-block;
}
.wfc__calendar ul > li.active .date-container{
  background: #FE7C1E;
  color: #fff;
}
</style>
