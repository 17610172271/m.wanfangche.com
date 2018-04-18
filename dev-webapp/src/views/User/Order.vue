<template>
  <div class="bg-light">
      <div class="nav-header">
            <div class="nav-header-left">
              <a class="nav-header-back" href="javascript:" @click="goBack">
                <img src="../../img/icon_back.png">
                &nbsp;</a>
            </div>
            <h1 class="nav-header-title">
              全部订单
            </h1>
            <div class="nav-header-right">
              <a class="nav-header-more"></a>
            </div>
          </div>
      <div class="app-body app-container bg-light">
        <order-list  class="padder-v"></order-list>
      </div>
  </div>
</template>
<script>
import Navheader from '../Common/Navheader'
import OrderList from '../../components/Order/List'

export default {
  components: {
    Navheader,
    OrderList
  },
  data () {
    return {
      order_list: []
    }
  },
  methods: {
    goBack () {
      this.$router.replace('/user')
    }
  },
  created () {
  }
}
</script>
