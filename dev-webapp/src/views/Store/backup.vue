<template>
  <div id="store-detail" class="app-container">
    <navheader class="bg-light" style="background:#f5f5f5;">商家详情</navheader>
    <div class="store">
      <div class="panel">
        <div class="panel-body store-info">
          <div class="row">
            <div class="col-xs-4">
              <img :src="agency_logo" width="100%">
            </div>
            <div class="col-xs-8">
              <div class="text-xlg">{{ agencyData.name }}</div>
            </div>
          </div>
       </div>
      </div>
      <div class="panel">
        <div class="panel-body">
          <div class="info-block">
            <span>商家简介：</span>
            <span><p>{{agencyData.sort_name}}</p></span>
          </div>
          <div class="info-block">
            <span>商家网址：</span>
            <span><a :href="'http://' + agencyData.website" target="view_window">{{agencyData.website}}</a></span>
          </div>
       </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navheader from '../Common/Navheader'
import api from '@/api'
export default {
  components: {
    Navheader
  },
  data () {
    return {
      agency: this.getStoreInfo(),
      data: {},
      agency_logo: '',
      agency_id: '',
      agencyData: {}
    }
  },
  filters: {
    formatTelLink: function (tel) {
      return 'tel:' + tel.toString()
    }
  },
  methods: {
    getStoreInfo () {
      return {
        name: 'Apollo',
        logo: 'https://oixyh3u6e.qnssl.com/livingearth/livingearth.png',
        store: {
          id: 1,
          name: '丽江-古城店',
          phone_number: '18600001111',
          open_at: '09:00',
          close_at: '22:00',
          address: '丽江市古城区七河镇三义村丽大路与机场一级路交口'
        }
      }
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.axios.get(api.store.detail, {params: {store_id: parseInt(this.$route.params.id)}})
        .then(response => {
          if (response.data.code === 200) {
            this.data = response.data.data
            this.agency_id = response.data.data.agency_id
            this.axios.get(api.order.agency, {params: {agency_id: parseInt(this.agency_id)}})
                 .then(response => {
                   if (response.data.code === 200) {
                     this.agencyData = response.data.data
                     this.agency_logo = response.data.data.logo
                   }
                 })
          }
        })
  }
}
</script>
<style lang="less">
.store {
  min-height:667px;
  padding:54px 10px 10px;
  background-color:#f5f5f5;
  .info-block {
    padding:15px;
    position:relative;
    overflow:hidden;
    span {
      display:inline-block;
      &.cont {
        position: absolute;
        right: 47px;
        left: 87px;
        top: 5px;
      }
    }
    em {
      float:right;
      img {
        width:20px;
        height:20px;
      }
    }
  }
  .store-info {
    [class*=col-] {
      &:first-child {
        text-align:center;
      }
      img {
        height:100%;
        width:auto;
      }
      padding:10px;
      height:80px;
      overflow:hidden;
      div {
        &:first-child {
          padding:5px 0;
        }
      }
    }
  }
}
</style>
