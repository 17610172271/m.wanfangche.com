<template>
<div style="">
  <popup v-model="show" position="bottom"  :show-mask="false" style="height:96%;border-radius:4px 4px 0 0;position:fixed;max-height:700px;top:4.1%;">
    <div class="nav-header" style="position:fixed;top:4.2%;left:0;">
      <div class="nav-header-left">
        <a @click="show = false" class="nav-header-back text-default"><span class="city-down"></span>
        </a>
      </div>
      <h1 class="nav-header-title">热门城市</h1>
    </div>
    <div class="m-t-header" style="padding-top:44px;overflow-y:auto;height:90%;">
      <div class="wrapper bg-light" style="display:none;">
        当前定位城市: {{currentLocation.city}}
      </div>
      <div class="panel" style="min-height:700px;">
        <div class="panel-body text-lg">
          <div class="list-group list-group-underline list-group-lg" v-for="group in list">
            <div class="text-xlg" style="padding-top:20px;font-family:PingFangSC-Semibold;">{{group.letter}}</div>
            <div class="list-group-item city-cityname" style="padding:10px 0" v-for="city in group.citylist" @click="setCurrentCity(city)" v-if="city.city">
              {{city.city}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </popup>
</div>
</template>
<script>
import { Popup } from 'vux'
import api from '@/api'
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    value: null
  },
  components: {
    Popup
  },
  data: () => ({
    show: false,
    currentValue: {
      city: '',
      cityid: ''
    },
    currentLocation: {
      city: '定位中...',
      cityid: null
    },
    height: null
  }),
  computed: mapGetters({
    currentCity: 'currentCity',
    list: 'cityList'
  }),
  created () {
    this.height = 'height:' + document.documentElement.clientHeight + 'px'
    this.$nextTick(() => {
      this.getGeoLocation()
      this.initCityList()
    })
  },
  methods: {
    ...mapActions({
      save2store: 'saveCityList',
      saveCurrentCity: 'saveCurrentCity'
    }),
    initCityList () {
      if (!this.cityList) {
        this.getCityList()
      }
    },
    getCityList () {
      // 获取已开通城市列表
      this.axios.get(api.city.list).then(response => {
        if (response.data.code === 200) {
          var lists = response.data.data.list
          for (var key in lists) {
            for (var keys in lists[key].citylist) {
              if (lists[key].citylist[keys].is_open === '0') {
                lists[key].citylist[keys] = {}
              }
            }
          }
          this.save2store({ list: lists })
        }
      })
    },
    setCurrentCity (city) {
      this.show = false
      this.saveCurrentCity(city) // 保存当前选择城市到State
    },
    getGeoLocation () {
      // 获取当前定位城市
      navigator.geolocation.getCurrentPosition(position => {
        if (position.coords) {
          this.axios.get(api.common.currentLocation, {params: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }})
          .then(response => {
            if (response.data.code === 200) {
              this.currentLocation = response.data.data
            }
          })
        }
      }, error => {
        this.currentLocation = {
          city: '定位失败',
          cityid: null
        }
        return error
        // return Promise.reject(error)
      })
    },
    open () {
      this.show = true
    },
    close () {
      this.show = false
    },
    onOpen () {
      console.log('onOpen')
    },
    onClose () {
      console.log('onClose')
      this.$emit('on-close', this.currentValue)
    }
  },
  watch: {
    value (val) {
    },
    show (val) {
      this[val ? 'onOpen' : 'onClose']()
    }
  }
}
</script>
<style  scoped>
  .city-cityname{
    font-family: PingFangSC-Regular;
font-size: 16px;
color: #2E3E4C;
letter-spacing: 0;
  }
</style>
