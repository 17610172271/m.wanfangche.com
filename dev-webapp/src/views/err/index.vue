<template>
	<div>
		<div class="err-img">
			<img src="../../img/err-404.png" alt="" />
		</div>
		<div class="err-txt">
			<p>对不住！您要找的网页可能已经被删除、</p>
			<p>重命名、或暂时不可用！检查网址是否正确！</p>
		</div>
		<div class="err-btn" @click="submit">
			<button>返回首页</button>
		</div>
	</div>
</template>
<script>
import { Alert } from 'vux'
export default {
  components: {
    Alert
  },
  data () {
    return {
      alertShow: false
    }
  },
  methods: {
    submit () {
      this.$router.push('/')
    }
  }
}
</script>

