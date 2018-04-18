<template>

    <div class="preview">
      <div class="image-container"  v-for="(image, index) in files" :key="index" @click="photoAlbum(image.link, wximglist)">
        <div class="remove-btn">
          <a @click="removeImage(index)"><img src="../../../static/img/cha.png"/></a>
        </div>
        <div class="image" :class="{'image-up': !image.link}">
          <img :src="image.link | imageMiddle" v-show="image.link">
        </div>
      </div>
      <label class="album-upload" for="file[]">
        <input
        class="fileup-input"
        type="file"
        name="file[]"
        ref="input"
        :multiple="multiple"
        @change="onChange"
        >

        <div class="album-upload-btn padder-v padder padder-add fl_r">
          <img src="../../../static/img/photo.png"/>
          <p>添加照片</p>
        </div>

      </label>
    </div>

</template>
<script>
import { isJson } from '@/tools/util'
import { ossimage } from '@/config'

const imageMiddle = url => {
  return url ? url + '?x-oss-process=image/resize,m_fill,h_200,w_200' : null
}
export default {
  name: 'album-upload',
  filters: {
    imageMiddle
  },
  props: {
    value: {},
    multiple: {
      type: Boolean,
      default: true
    },
    cover: ''
  },
  data () {
    return {
      files: [],
      uploadFiles: [],
      coverImage: null,
      wximglist: [],
      isWx: null
    }
  },
  computed: {
    currentValue () {
      return JSON.stringify(this.files.map(file => {
        return file.link
      }))
    }
  },
  created () {
    var ua = window.navigator.userAgent.toLowerCase()
    if (ua.indexOf('micromessenger') > 0) {
      this.isWx = true
    } else {
      this.isWx = false
    }
    this.init(this.value)
  },
  methods: {
    photoAlbum (src, list) {
      if (this.isWx && src) {
        window.WeixinJSBridge.invoke('imagePreview', {
          'urls': list.map(src => {
            return src + ossimage.large + '_ytsy'
          }),
          'current': src
        })
      }
    },
    init (val) {
      if (val && isJson(val)) {
        this.files = JSON.parse(val).map(file => {
          return {
            link: file
          }
        })
      }
    },
    onChange (e) {
      for (var i = 0; i < this.$refs.input.files.length; i++) {
        let data = {
          link: ''
        }
        this.files.push(data)
        this.axios.upload(this.$refs.input.files[i]).then(response => {
          data.link = response.data.data.filename
          if (!this.coverImage) this.setCover(0)
          return this.currentValue
        })
      }
    },
    removeImage (index) {
      if (this.files[index].link === this.coverImage) this.setCover(0)
      this.files.splice(index, 1)
      if (this.files.length < 1) this.setCover(0)
    },
    setCover (index) {
      this.coverImage = this.files[index] ? this.files[index].link : null
      this.$emit('coverset', this.coverImage)
    }
  },
  watch: {
    currentValue (val) {
      console.log(val)
      this.$emit('input', this.currentValue)
    },
    value (val) {
      this.wximglist = JSON.parse(val)
      if (this.currentValue !== val) this.init(val)
    },
    cover (val) {
      this.coverImage = val
    },
    coverImage (val) {
      this.$emit('coverset', this.coverImage)
    }
  }
}
</script>
<style lang="scss">
$album-upload-width: 78px;
$album-upload-height: 78px;


.album-upload {
  width: $album-upload-width;
  height: $album-upload-height;


  .album-upload-btn {
    width: $album-upload-width;
    height: $album-upload-height;
    display: block;
    margin-left:5px;

    border: 1.5px dashed #C8D1DC;
    border-radius: 4px;

    text-align:center;
    cursor: pointer;
    clear: both;
    .wfc-icon-plus-thin{
      font-size: 52px;
      line-height: $album-upload-height;
    }
  }

  .fileup-input {
    height: 80px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: 99;
    width: 80px;
  }
}

.preview{
  position: relative;
  display: table;
  margin: 0 -5px;
  padding: 0 0 0 15px;
  float:left;
  .image-container{
    position: relative;
    float: left;
    margin: 5px 5px;
    display: inline-block;
    text-align: center;

    width: $album-upload-width;
    height: $album-upload-height;
    line-height: $album-upload-height;

    // border: 1.5px dashed #C8D1DC;
    border: 0;
    background: #f8f8f8;
    border-radius: 4px;
    .remove-btn {
      position: absolute;
      right: -10px;
      top: -10px;
      // background: rgba(46,62,76, .5);
      // background: rgba(255,255,255, .5);

      display: block;
      height: 20px;
      line-height: 20px;
      text-align: center;
    }
    .image {
      overflow: hidden;
      display: block;
    }
  }

  .image-container img {
    width:auto;
    height:80px;
  }
}

</style>
