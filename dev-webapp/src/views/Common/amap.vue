<template>
  <div class="amap-container1" style="height:100%;">
    <a class="camp-goback" href="javascript:" @click="goBack">
      <img src="../../assets/icon_back.png" width="11px">
    </a>
    <!-- <el-amap vid="amapDetail" :center="mapCenter" :zoom="12" class="amap-demo" :events="events">
      <el-amap-marker :position="marker" :icon="icon"></el-amap-marker>
    </el-amap> -->
    <marker-amap v-model="mapCenter" :zoom="zoom" :bigIcon="icon"></marker-amap>
  </div>
</template>
<script>
  import markerAmap from '@/components/amap/marker-amap'
  export default {
    components: {
      markerAmap
    },
    data: function () {
      return {
        mapCenter: [116.477416, 39.913117],
        marker: [116.477416, 39.913117],
        icon: 'http://img01.wanfangche.com/public/upload/201802/06/5a79303d478f7.png?x-oss-process=style/large',
        zoom: 12
      }
    },
    methods: {
      getData () {
        let self = this
        setTimeout(function () {
          self.mapCenter = [self.$route.query.lng, self.$route.query.lat]
        }, 20)
      },
      editIcon () {
        let images = [
          'http://img01.wanfangche.com/public/upload/201802/08/5a7bbd46514f5.png?x-oss-process=style/large',
          'http://img01.wanfangche.com/public/upload/201802/06/5a79303d478f7.png?x-oss-process=style/large',
          'http://img01.wanfangche.com/public/upload/201802/08/5a7bbd466fbf7.png?x-oss-process=style/large',
          'http://img01.wanfangche.com/public/upload/201802/08/5a7bbd4671dd2.png?x-oss-process=style/large',
          'http://img01.wanfangche.com/public/upload/201802/08/5a7bbd4659555.png?x-oss-process=style/large',
          'http://img01.wanfangche.com/public/upload/201802/08/5a7bbd4659d74.png?x-oss-process=style/large'
        ]
        this.icon = images[this.$route.query.type]
      },
      goBack () {
        this.$router.go(-1)
      }
    },
    created () {
      this.getData()
      this.editIcon()
    }
  }
</script>
<style scoped>
  .amap-container {
    height: 100%;
  }
</style>
