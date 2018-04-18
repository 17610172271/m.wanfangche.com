<template>
  <div  class="app-container" style="background:#FFFFFF;">
      <nav-header>选择城市</nav-header>
      <div class="app-body">
         <div class="panel">
           <div class="panel-body text-lg">
             <div class="list-group list-group-underline list-group-lg m-top-20" v-for="group in list" >
               <a class="list-group-item" style="padding-top:10px;color:#2E3E4C;"  @click="setSelectedCity(group.city,group.cityid)" v-if="group.city">
                 {{group.city}}
               </a>
             </div>
           </div>
         </div>
    </div>
  </div>
</template>

<script>
import NavHeader from '../Common/Navheader'
import api from '@/api'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    NavHeader
  },
  data () {
    return {
      list: []
    }
  },
  computed: {
    ...mapGetters({
      query: 'query'
    })
  },
  methods: {
    ...mapActions([
      'saveQuery'
    ]),
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
    getlist () {
      this.axios.get(api.agency.citylist, {params: {id: this.$route.query.id}})
      .then(response => {
        if (response.data.code === 200) {
          this.list = response.data.data
        }
      })
    }
  },
  created () {
    this.getlist()
  }
}
</script>

<style scoped>

</style>
