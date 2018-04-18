<template>
  <div  class="app-container" style="background:#FFFFFF;">
      <nav-header>{{page_title}}</nav-header>
      <div class="app-body">
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
           ref="search"
           style="background:#FFFFFF;"
           ></search>
         <div>
           <div class="panel" v-if="hotlist.length !== 0">
             <div class="panel-heading text-lg m-top-20" style="font-family:PingFangSC-Semibold">热门城市</div>
             <div class="panel-body">
               <div class="row btn-cell">
                 <div class="col-xs-4" v-for="hotcity in hotlist">
                   <div class="row btn-cell-item"><a href="javascript:" class="btn btn-default" @click="setSelectedCity(hotcity.city,hotcity.id)" style="color:#2E3E4C;">{{hotcity.city}}</a></div>
                 </div>
               </div>
            </div>
           </div>
           <div class="panel">
             <div class="panel-body text-lg">
               <div class="list-group list-group-underline list-group-lg m-top-20" v-for="group in list" >
                 <div class="text-xlg" style="font-family:PingFangSC-Semibold">{{group.letter}}</div>
                 <a class="list-group-item" style="padding-top:10px;color:#2E3E4C;" v-for="city in group.citylist" @click="setSelectedCity(city.city,city.cityid)" v-if="city.city">
                   {{city.city}}
                 </a>
               </div>
             </div>
           </div>
        </div>
    </div>
  </div>
</template>

<script>
import { Search } from 'vux'
import NavHeader from '../Common/Navheader'
import api from '@/api'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    Search,
    NavHeader
  },
  data () {
    return {
      results: [],
      searchKey: '',
      city_list: this.getCityList(),
      articles: [],
      list: [],
      hotlist: []
    }
  },
  computed: {
    page_title () {
      return this.$route.query.type === '1' ? '选择城市' : '选择城市'
    },
    ...mapGetters({
      query: 'query'
    })
  },
  methods: {
    ...mapActions([
      'saveQuery'
    ]),
    setFocus () {
      this.$refs.search.setFocus()
    },
    resultClick (item) {
    },
    getResult (val) {
      this.getlist(val)
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
    onCitySelected (city) {

    },
    getCityList () {
    },
    setSelectedCity (city, cityid) {
      if (this.$route.query.type === 1) {
        this.query.pickup_city = city
        this.query.pickup_id = cityid
        this.saveQuery({query: this.query})
      } else {
        this.query.return_city = city
        this.query.return_id = cityid
        this.saveQuery({query: this.query})
      }
      this.$router.go(-1)
    },
    hotCityList (list) {
      this.hotlist = []
      for (var key in list) {
        for (var keys = 0; keys < list[key].citylist.length; keys++) {
          if (list[key].citylist[keys].ishot === '1') {
            this.hotlist.push({city: list[key].citylist[keys].city, id: list[key].citylist[keys].cityid})
          }
          if (list[key].citylist[keys].is_open === '0') {
            list[key].citylist[keys] = {}
          }
        }
        if (list[key].citylist.length <= 0) {
          delete list[key]
        }
      }
    },
    getlist () {
      if (this.$route.query.type === 2) {
        this.axios.get(api.city.forReturn, {params: {pickup_cityid: parseInt(this.$store.state.messageData.pickup_id) || ''}})
         .then(response => {
           if (response.data.code === 200) {
             this.list = response.data.data.list
           }
         })
      } else {
        this.axios.get(api.city.list)
        .then(response => {
          if (response.data.code === 200) {
            this.list = response.data.data.list
            this.hotCityList(response.data.data.list)
          }
        })
      }
    }
  },
  created () {
    if (this.$route.query.type === 2) {
      this.axios.get(api.city.forReturn, {params: {pickup_cityid: parseInt(this.$store.state.messageData.pickup_id) || ''}})
       .then(response => {
         if (response.data.code === 200) {
           this.list = response.data.data.list
         }
       })
    } else {
      this.axios.get(api.city.list)
      .then(response => {
        if (response.data.code === 200) {
          this.list = response.data.data.list
          this.hotCityList(response.data.data.list)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
