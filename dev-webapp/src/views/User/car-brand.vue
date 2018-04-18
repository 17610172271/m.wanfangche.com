<template>
  <div class="car-brand" v-show="list">
    <div class="car-certify-header1">
      选择品牌
      <a class="car-brand-back" href="javascript:" @click="goBack">
        <img src="../../assets/icon_back.png">
      </a>
    </div>
    <div class="car-brand-container padder-md bg-white">
      <ul class="brand-rank">
        <li v-for="(item, index) in rankList" @click="jump(index)">{{item}}</li>
      </ul>
      <div class="brand-sort-container" id="brand-sort-container">
        <ul class="brand-content-item" v-for="(item, index) in list" v-show="item.length > 0">
          <li class="text-bold text-xlg">{{index}}</li>
          <li @click="goModel(model)" v-for="model in item">
            <div class="brand-item-icon">
              <img v-if="model.logo" :src="model.logo | ossResize('avatar')" width="100%" height="100%" alt="">
              <div v-else class="brand-item-img">logo</div>
            </div>
            {{model.name}}
          </li>
        </ul>
        <ul class="brand-content-item">
          <li class="text-bold text-xlg">其他</li>
          <li @click="addOther">其他品牌<span class="icon icon-input-expansion text-xs text-icongray pull-right m-t-25"></span></li>
        </ul>
      </div>
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
        list: '',
        rankList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      }
    },
    methods: {
      getData () {
        this.axios.get(api.user.brandList)
        .then(response => {
          if (response.data.code === 1) {
            this.list = response.data.data
          }
        })
      },
      goBack () {
        this.$emit('brandClose')
      },
      goModel (item) {
        this.$router.replace({name: 'car_certify', query: {process: 2, id: item.id, name: item.name}})
      },
      addOther () {
        this.$router.replace({name: 'car_certify', query: {process: 3}})
      },
      jump (index) {
        const cateItem = document.querySelectorAll('.brand-content-item')
        let total = cateItem[index].offsetTop - 44
        let distance = document.getElementsByClassName('car-brand-container')[0].scrollTop // 获取到顶部的距离(this.container便是.cate-list,为了方便存起来了)
        let step = total / 50
        if (total > distance) {
          smoothDown()
        } else {
          let newTotal = distance - total
          step = newTotal / 50
          smoothUp()
        }
        function smoothDown () {
          if (distance < total) {
            distance += step
            document.getElementsByClassName('car-brand-container')[0].scrollTop = distance
            setTimeout(smoothDown, 10)
          } else {
            document.getElementsByClassName('car-brand-container')[0].scrollTop = total
          }
        }
        function smoothUp () {
          if (distance > total) {
            distance -= step
            document.getElementsByClassName('car-brand-container')[0].scrollTop = distance
            setTimeout(smoothUp, 10)
          } else {
            document.getElementsByClassName('car-brand-container')[0].scrollTop = total
          }
        }
      },
      initData () {
        this.getData()
      }
    },
    created () {
      this.initData()
    }
  }
</script>
<style>
  .car-certify-container,
  .car-brand,
  .car-brand-container {
    height: 100%;
  }
</style>
