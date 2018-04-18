<template>
	<div class="cost-body app-container">
		<nav-header>基本费用</nav-header>
		<div class="cost-head">
			<p><span>{{day}}天</span><!-- <span>已执行7天优惠</span> --></p>
			<p>￥<span>{{price}}</span></p>
		</div>
		<div class="cost-list">
			<ul>
				<li v-for="item in list"><time>{{item.r_date | date}}</time><span>￥{{item.price | parseInt}}</span></li>
			</ul>
		</div>
	</div>
</template>
<script>
import { Alert } from 'vux'
import NavHeader from '../Common/Navheader.vue'
import api from '@/api'
import formatTime from '@/filters/format-time'
export default {
  components: {
    Alert,
    NavHeader
  },
  filters: {
    parseInt (value) {
      var str = value + ''
      var arr = str.split('.')
      if (arr[1] === '00' || arr[1] === '') {
        return arr[0] * 1
      } else {
        return str.indexOf('.') === -1 ? arr[0] * 1 : str.substring(0, str.indexOf('.') + 3)
      }
    },
    date (value) {
      var arr = formatTime(value, 'MM-DD').split('-')
      return arr[0] + '月' + arr[1] + '日'
    }
  },
  data () {
    return {
      list: [],
      price: 0,
      day: 0
    }
  },
  created () {
   //  this.axios.get(api.rv.info, {params: {id: this.$route.query.id, s_date: this.$route.query.s_date, e_date: this.$route.query.e_date}})
   // .then(response => {
   //   if (response.data.code === 200) {
   //     this.list = response.data.data.price_detail_list
   //     for (var i = 0; i < response.data.data.price_detail_list.length; i++) this.price += parseInt(response.data.data.price_detail_list[i].price)
   //     this.day = response.data.data.price_detail_list.length
   //   }
   // })
    this.axios.get(api.rv.dateprice, {
      params: {
        id: this.$route.query.id,
        s_date: this.$route.query.s_date,
        e_date: this.$route.query.e_date
      }
    })
    .then(response => {
      if (response.data.code === 200) {
        this.list = response.data.data.list
        for (var i = 0; i < response.data.data.list.length; i++) this.price += parseInt(response.data.data.list[i].price)
        this.day = response.data.data.list.length
      }
    })
  },
  methods: {}
}
</script>

