<template>
  <div class="app-container">
    <navheader class='fiex'>配置信息</navheader>
    <loading-car v-show="!toLoad" class="middle"></loading-car>
    <transition name="fade">
    <div class="app-body" style="padding-bottom:5px;"  v-show="toLoad">
      <div class="panel" v-for="m in list" :key="m.name" style="margin-bottom:13px;">
        <div class="panel-heading">
          <strong style="font-size:16px;">{{m.title}}</strong>
        </div>
        <div class="panel-body" style="padding-left:20px;">
          <ul class="list-group list-group-unstyle">
            <li class="list-group-item" v-for="item in m.items" :class="item.clas">
              <div class="pull-right">
                <!-- <span>{{item.value}}</span> -->
                <i class="glyphicon glyphicon-ok" v-if="item.val === '1'" style="top:1px;"></i>
                <i class="glyphicon icon-nothing" v-else-if="item.val === '0' || item.val === '' || item.val === null" style="top:1px;"></i>
                <i class="glyphicon" style="top:1px;" v-html="item.val" v-else>{{item.val}}</i>
              </div>
              
             <i class="allocation-icon" v-bind:class="item.icon"></i><span class="allocation-txt" style="top:9.5px;">{{item.title}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </transition>
  </div>
</template>
<script>
import Navheader from '../Common/Navheader'
import api from '@/api'
import LoadingCar from '@/components/loading/car'

export default {
  components: {
    Navheader,
    LoadingCar
  },
  filters: {
    parseInt (value) {
      var str = value + ''
      var arr = str.split('.')
      if (arr[1] === '00' || arr[1] === '') {
        return arr[0] * 1
      } else {
        return str.indexOf('.') === -1 ? arr[0] * 1 : str.substring(0, str.indexOf('.') + 3)
      }
    }
  },
  data () {
    return {
      toLoad: false,
      list: [
        {
          title: '基础信息',
          items: {
            coty: {
              title: '',
              clas: '',
              val: '年',
              icon: 'meta-icon-car-age'
            },
            transmission_case: {
              title: '',
              clas: '',
              val: '',
              icon: 'meta-icon-transmission'
            },
            actuation: {
              title: '',
              clas: '',
              val: '',
              icon: 'meta-icon-fuel'
            },
            fuel_consumption: {
              title: '',
              clas: '',
              val: 'L/100KM',
              icon: 'meta-icon-fuel-consumption'
            },
            driver_license_class: {
              title: '准假执照',
              clas: '',
              val: '',
              icon: 'meta-icon-driver-license'
            },
            water_tank: {
              title: '',
              clas: '',
              val: '&thinsp;L',
              icon: 'meta-icon-water'
            },
            fuel_tankage: {
              title: '',
              clas: '',
              val: '&thinsp;L',
              icon: 'meta-icon-fuel-tank-capacity'
            },
            battery: {
              title: '电池容量',
              clas: '',
              val: '&thinsp;mAH',
              icon: 'meta-icon-battery'
            }
          }
        },
        {
          title: '车辆尺寸',
          items: {
            height: {
              title: '',
              clas: '',
              val: '&thinsp;M',
              icon: 'meta-icon-vehicle-height'
            },
            inside_height: {
              title: '',
              clas: '',
              val: '&thinsp;M',
              icon: 'meta-icon-height-inside-he-car'
            },
            width: {
              title: '',
              clas: '',
              val: '&thinsp;M',
              icon: 'meta-icon-vehicle-width'
            },
            length: {
              title: '',
              clas: '',
              val: '&thinsp;M',
              icon: 'meta-icon-vehicle-length'
            }
          }
        },
        {
          title: '起居配置',
          items: {
            single_bed_4adult: {
              title: '',
              clas: '',
              val: '张',
              icon: 'meta-icon-bed'
            },
            double_bed_4adult: {
              title: '',
              clas: '',
              val: '张',
              icon: 'meta-icon-double-bed'
            },
            seat: {
              title: '座椅',
              clas: '',
              val: '个',
              icon: 'meta-icon-chair'
            },
            desk: {
              title: '',
              clas: '',
              val: '张',
              icon: 'meta-icon-table'
            }
          }
        },
        {
          title: '其他配置',
          items: {
            wash_room: {
              title: '',
              clas: '',
              val: '',
              icon: 'meta-icon-wc'
            },
            shower: {
              title: '淋浴',
              clas: '',
              val: '',
              icon: 'meta-icon-bathroom'
            },
            cooking_range: {
              title: '',
              clas: '',
              val: '',
              icon: 'meta-icon-stove'
            },
            firdge: {
              title: '',
              clas: '',
              val: '&thinsp;L',
              icon: 'meta-icon-refrigerator'
            },
            poll: {
              title: '',
              clas: '',
              val: '',
              icon: 'meta-icon-sink'
            },
            microwave_oven: {
              title: '',
              clas: '',
              val: '',
              icon: 'meta-icon-microwave'
            },
            sunshade: {
              title: '',
              clas: 'm-top',
              val: '',
              icon: 'meta-icon-awning'
            },
            screen_window: {
              title: '',
              clas: '',
              val: '',
              icon: 'meta-icon-window-screen'
            },
            bicycle_frame: {
              title: '',
              clas: '',
              val: '',
              icon: 'meta-icon-bicycle'
            },
            dvd: {
              title: '',
              clas: 'm-top',
              val: '',
              icon: 'meta-icon-tv'
            },
            satellite_antenna: {
              title: '',
              clas: '',
              val: '',
              icon: 'meta-icon-satellite'
            },
            power_brake: {
              title: '',
              clas: '',
              val: '',
              icon: 'meta-icon-generator'
            },
            train_air_conditioner: {
              title: '',
              clas: '',
              val: '',
              icon: 'meta-icon-car-air-conditioning'
            },
            parking_air_conditioner: {
              title: '',
              clas: '',
              val: '',
              icon: 'meta-icon-air-conditioning'
            },
            fuel_accelerator: {
              title: '',
              clas: '',
              val: '',
              icon: 'meta-icon-fuel-heating'
            }
          }
        }
      ],
      driverTxt: []
    }
  },
  methods: {
    driver (arr) {
      var stt = JSON.parse(arr)
      for (var i = 0; i < stt.length; i++) {
        switch (stt[i]) {
          case 1:
            this.driverTxt.push('C2')
            break
          case 2:
            this.driverTxt.push('C1')
            break
          case 3:
            this.driverTxt.push('B3')
            break
          case 4:
            this.driverTxt.push('B2')
            break
          case 5:
            this.driverTxt.push('B1')
            break
          case 6:
            this.driverTxt.push('A3')
            break
          case 7:
            this.driverTxt.push('A2')
            break
          case 8:
            this.driverTxt.push('A1')
            break
        }
      }
      this.list[0].items.driver_license_class.val = this.driverTxt.join(',')
    }
  },
  created () {
    this.axios.get(api.rv.fee, {params: {id: parseInt(this.$route.params.id)}})
    .then(response => {
      if (response.data.code === 200) {
        for (var key in response.data.data[0]) {
          for (var one in this.list) {
            for (var two in this.list[one].items) {
              if (key === two) {
                this.list[one].items[two].title = response.data.data[0][key].title
                this.list[one].items[two].val = response.data.data[0][key].val + this.list[one].items[two].val
                if (response.data.data[0][key].val === '0' || response.data.data[0][key].val === '' || response.data.data[0][key].val === null) {
                  this.list[one].items[two].val = '0'
                  this.list[one].items[two].clas = 'color-grays'
                }
                if (key === 'driver_license_class') {
                  this.driver(this.list[one].items[two].val)
                }
              }
            }
          }
        }
      }
      this.toLoad = true
    })
  }
}
</script>

<style src="../../css/metafont.css">
  
</style>
