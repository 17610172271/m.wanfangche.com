<template>
	<div>
		<nav-header>评价</nav-header>
		<div class="app-body">
      <div class="media padder-v padder">
        <span class="pull-left">
          <img class="thumb-md" :src="order.image">
        </span>
        <div class="media-body padder-v padder">
          <div class="text-lg">整体评价</div>
          <div class="padder-v">
            <rater :max="5" v-model="comment.rater" active-color="#FE4848" :font-size="24" :margin="5"></rater>
          </div>
        </div>
      </div>
      <div class="clear padder-v padder">
        <p class="evaluate-input" rows="6">完美的旅行必须有好车的加持，第一次上路经过反复挑选，最后选了这辆。取车的时候由于特殊原因临时改成送车上门服务，工作人员特别热心的传授了很多可能出现的问题的解决方法完美的旅行必须有好车的加持，第一次上路经过反复挑选，最后选了这辆。取车的时候由于特殊原因临时改成送车上门服务，工作人员特别热心的传授了很多可能出现的问题
        </p>
      </div>
      <div class="padder-v padder padder-i">
      	<ul class="padder-u clear">
      		<li></li>
      		<li></li>
      		<li class="padder-l"></li>
      		<li class="padder-b"></li>
      	</ul>
      	<ul class="padder-u clear">
      		<li></li>
      		<li></li>
      		<li class="padder-l"></li>
      		<li class="padder-b"></li>
      	</ul>
      	<ul class="padder-u clear">
      		<li></li>
      	</ul>
      </div>
    </div>
	</div>
</template>

<script>
import NavHeader from '../Common/Navheader.vue'
import { Rater } from 'vux'

export default {
  components: {
    NavHeader,
    Rater
  },
  data () {
    return {
      comment: {
        content: '',
        images: [],
        order_id: 10001,
        rv_id: 10002,
        rater: 5
      },
      order: {
        image: '../../static/img/rv-1.png'
      }
    }
  }
}
</script>
<style>
	.nav-header{
		background-color: #F5F5F5;
	}
	.evaluate-input{
  	width: 100%;
  	font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #2E3E4C;
		letter-spacing: 0;
  }
  .comment-input::placeholder{
    color:#C8D1DC;
  }
</style>
