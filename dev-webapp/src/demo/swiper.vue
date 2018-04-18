<template>
  <div>
  	<div @click="btn" style="width:300px;height:500px;background:red;">
  		<img class="images" src="http://img01.wanfangche.com/public/upload/201710/26/1508995567554.jpg" alt="">
  	</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imglist: ['http://img01.wanfangche.com/public/upload/201710/26/1508995567554.jpg', 'http://img01.wanfangche.com/public/upload/201710/26/1508995567554.jpg'],
      img: 'http://img01.wanfangche.com/public/upload/201710/26/1508995567554.jpg'
    }
  },
  methods: {
    btn () {
      window.WeixinJSBridge.invoke('imagePreview', {
        'urls': this.imglist,
        'current': this.img
      })
    }
  }
}
</script>
