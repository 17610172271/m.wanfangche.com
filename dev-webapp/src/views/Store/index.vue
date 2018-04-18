<template>
  <div id="store-detail" class="app-container">
    <navheader class="bg-light" style="background:#f5f5f5;">门店详情</navheader>
    <div class="app-body store-bg">
      <div class="store padder store-bg" style="padding:20px 10px 0px">
      <div class="panel">
        <div class="panel-body store-info">
          <div class="row">
            <div class="col-xs-4">
              <img :src="agency_logo" width="100%">
            </div>
            <div class="col-xs-8">
              <div class="text-xlg">{{ data.name }}</div>
            </div>
          </div>
       </div>
      </div>

      <div class="panel">
        <div class="panel-body">
          <ul class="list-group list-group-unstyle list-group-lg">
            <li class="list-group-item">
              <label class="label-title text-muted">门店电话：</label>
              <span @click="tel"><a href="javascript:;">{{data.phone_number}}</a></span>
              <div  @click="tel" class="pull-right"><span class="icon-c icon-c-phone"></span></div>
            </li>
            <li class="list-group-item">
              <label class="label-title text-muted">营业时间：</label>
              <span>{{data.open_at}}-{{data.close_at}}</span>
            </li>
            <li class="list-group-item" @click="goMap()">
              <div class="pull-right m-l"><span class="icon-c icon-c-address"></span></div>
              <label class="label-title text-muted pull-left">门店地址：</label>
              <div class="table-cell">{{data.province}}{{data.county}}{{data.address}}</div>
            </li>
          </ul>
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
      agency_id: ''
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
        name: '',
        logo: '',
        store: {
          id: '',
          name: '',
          phone_number: '',
          open_at: '',
          close_at: '',
          address: ''
        }
      }
    },
    tel () {
      window.location.href = 'tel:' + this.data.phone_number
    },
    goMap () {
      window.location.href = 'http://map.wanfangche.com/?lng=' + this.data.lng + '&lat=' + this.data.lat + '&name=&nbsp;%25u5343%25u677E%25u575D'
    }
  },
  created () {
    this.axios.get(api.store.detail, {params: {store_id: parseInt(this.$route.params.id)}})
    .then(response => {
      if (response.data.code === 200) {
        this.data = response.data.data
        this.agency_id = response.data.data.agency_id
        this.axios.get(api.order.agency, {params: {agency_id: parseInt(this.agency_id)}})
             .then(response => {
               if (response.data.code === 200) {
                 this.agency_logo = response.data.data.logo
               }
             })
      }
    })
  }
}
</script>
<style>
#store-detail{
  min-height:667px;
  background-color: #f5f5f5;
}
.thumb-md.middle img{
  height: 100%;
  width: auto;
}
</style>
