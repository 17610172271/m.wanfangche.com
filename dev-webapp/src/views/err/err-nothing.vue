<template>
	<div>
		<nav-header class="bg-white">全部订单</nav-header>
		<div class="err-img">
			<img src="../../img/err-nothing.png" alt="" />
		</div>
		<div class="err-txt">
			<p>还没有订单</p>
			<p>快去体验旅行的乐趣吧</p>
		</div>
		<div class="err-btn">
			<button>发现</button>
		</div>
	</div>
</template>
<script>
	
import NavHeader from '../Common/Navheader'
	
export default {
  components: {
    NavHeader
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

