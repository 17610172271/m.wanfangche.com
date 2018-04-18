<template>
  <div class="image-group">
    <!-- 单图显示 -->
    <div v-if="imageList && imageList.length === 1" @click="albumView(imageList[0], imageList)">
      <img v-if="imageList[0]" :src="imageList[0] + '_middle'">
    </div>
    <!-- /单图显示 -->

    <!-- 多图显示 -->
    <div v-if="imageList && imageList.length > 1">
      <div class="image-group-item-container" v-for="item in imageList" :style="objStyle">
        <div class="image-group-item"  @click="albumView(item, imageList)">
          <img v-if="item" :src="item + '_small'">
        </div>
      </div>
    </div>
    <!-- /多图显示 -->
  </div>
</template>

<script>
export default {
  props: {
    list: null,
    col: {
      type: Number,
      default: 3
    }
  },
  data: () => ({
    imageList: [],
    width: '33.333333%',
    height: 'auto'
  }),

  computed: {
    objStyle () {
      return {
        width: this.width + 'px',
        height: this.height + 'px'
      }
    }
  },

  methods: {
    initHeight () {
      this.width = this.$el.clientWidth / this.col
      this.height = this.width
    },
    initList () {
      if (typeof this.list === 'string') {
        this.imageList = this.list.split(',')
      } else if (typeof this.list === 'object') {
        this.imageList = this.list
      } else {
      }
    },
    // 微信相册
    albumView (src, list) {
      if (window.WeixinJSBridge) {
        window.WeixinJSBridge.invoke('imagePreview', {
          'urls': list.map(src => {
            return src + '?x-oss-process=style/large'
          }),
          'current': src + '?x-oss-process=style/large'
        })
      }
    }
  },

  mounted () {
    this.initHeight()
    this.initList()
  },
  watch: {
    col (val) {
      this.initHeight()
    },
    list (val) {
      this.initList()
    }
  }
}
</script>
<style>
.image-group {
  line-height: 1;
  display: block;
}
.image-group-item {
  margin: 0 2px;
  display: block;
}
.image-group .image-group-item-container {
  padding: 0 0;
  margin: -1px 0;
  overflow: hidden;
  display: inline-block;
  vertical-align: center;
}
.image-group img {
  width: 100%;
}
</style>
