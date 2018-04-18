<template>
  <div class="car-model">
    <div class="car-certify-header1">
      选择车型
      <a class="car-brand-back" href="javascript:" @click="goBack">
        <img src="../../assets/icon_back.png">
      </a>
    </div>
    <div class="car-brand-container padder-md bg-white">
      <div class="m-t model-title text-xlg text-bold">{{$route.query.name}}</div>
      <ul class="model-list text-lg">
        <li v-for="item in data" @click="setData(item)">{{item.name}}</li>
        <li v-if="!data" class="text-muted">暂无车型</li>
      </ul>
    </div>
  </div>
</template>
<script>
  import api from '@/api'
  export default {
    components: {
    },
    data () {
      return {
        data: ''
      }
    },
    methods: {
      getData () {
        this.axios.get(api.user.modelList, {
          params: {
            brand_id: this.$route.query.id
          }
        })
        .then(response => {
          if (response.data.code === 1) {
            this.data = response.data.data
          }
        })
      },
      setData (item) {
        item.brand_id = this.$route.query.id
        item.brand_name = this.$route.query.name
        this.$emit('carModel', item)
      },
      goBack () {
        this.$emit('modelClose')
      }
    },
    created () {
      this.getData()
    }
  }
</script>
<style>
  .car-model {
    height: 100%;
  }
  .model-title {
    height: 25px;
    line-height: 25px;
  }
  .model-list li {
    height: 57px;
    line-height: 56px;
    border-bottom: 1px solid #F5F5F5;
  }
</style>
