<template>
  <div class="">
  <div class="wrapper text-center" v-if="!list">
    加载中...
  </div>
  <div class="list-card" v-for="item in list">
    <router-link :to="{ name: 'rv_detail', params: { id: item.id}}">
    <div class="list-card-img">
      <img :src="item.img_cover + '?x-oss-process=image/resize,m_fill,h_290,w_690'">
    </div>
    <div class="list-card-heading">
      <div class="text-lg text-bold">
        {{item.title}}
      </div>
    </div>
    <div class="list-card-footer">
      <div class="pull-right">
        <span class="text-lg text-default">￥{{item.price}}</span>
        <span class="text-muted-lt text-thin">元/天 起</span>
      </div>
      <div class="text-muted-lt text-thin" >
        <span >可乘坐{{item.adult_passengers}}人</span>·<span>{{item.transmission_case == 1 ? '自动挡' : '手动挡'}}</span>·<span>{{item.actuation == 1 ? '汽油' : '柴油'}}</span>
      </div>
    </div>
    </router-link>
  </div>
  
  </div>
</template>
<script>
import api from '@/api'
import ScrollRefresh from '@/components/Refresh/HomeRefresh'

export default {
  data: () => ({
    list: null
  }),
  components: {
    ScrollRefresh
  },
  created () {
    this.$nextTick(() => {
      this.getRvList()
    })
  },
  methods: {
    getRvList () {
      this.axios.get(api.rv.hotlist, {params: {
        pickup_cityid: 110100
      }})
      .then(response => {
        if (response.data.code === 200) this.list = response.data.data.list
      })
    }
  }
}
</script>
<style lang="scss">

.list-card{
  padding: 5px 15px;
  line-height: 22px;
  margin-bottom: 10px;
  height:auto;
}
.list-card a {
  color: #2E3E4C;
}
.list-card-heading {
  margin-top: 4px;
  padding: 4px 0;
}
.list-card .list-card-img {
  width: 100%;
  overflow: hidden;
  max-height: 14rem;
  vertical-align: middle;
  border-radius: 4px 4px;
}
.list-card .list-card-img img {
  width: 100%;
}
.text-thin span{
  font-size:12px;
}
</style>
