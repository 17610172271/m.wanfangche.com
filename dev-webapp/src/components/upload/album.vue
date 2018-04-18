<template>
<div class="j-album-upload">
  <div class="view-box">
    <div class="view-item" v-for="(file, index) in files" :key="file.id">
      <div class="view-item-container" @click="previewImage(file)">
      <img class="image-thumb"  :class="{'image-thumb-v': file.width > file.height}" v-if="file.thumb" :src="file.thumb"/>
      <div class="j-album-process" v-if="!file.success" :style="{height: (100-file.progress) * .82 + 'px'}">
        {{file.progress}}%
      </div>
      </div>

      <a class="remove-btn" href="#" @click.prevent="$refs.upload.remove(file)"><i class="fa fa-times"></i></a>
    </div>
    <div class="view-item select-button-container" v-show="files.length < 9">
      <div class="view-item-container">
            <file-upload
      class="select-button text-muted"
      :post-action="postAction"
      :extensions="extensions"
      :accept="accept"
      :multiple="multiple"
      :drop="drop"
      :drop-directory="dropDirectory"
      :size="size"
      :thread="thread"
      :headers="headers"
      :data="data"
      :max-length="maxLength"
      :preload="preload"
      v-model="files"
      @input-filter="inputFilter"
      @input-file="inputFile"
      ref="upload">
        <div class="select-button-inner">
          <img src="../../assets/camera_default@2x.png">
          <p>选择图片</p>
        </div>
      </file-upload>
      </div>
    </div>
  </div>
  <div>
  </div>
  </div>
</div>
</template>

<script>
import FileUpload from './file-upload'

export default {
  components: {
    FileUpload
  },
  data: () => ({
    files: [],
    headers: {},
    data: {},
    postAction: '/server/community/public/common/upload',
    extensions: 'gif,jpg,jpeg,png,webp',
    accept: 'image/*',
    multiple: true,
    drop: false,
    dropDirectory: false,
    size: 1024 * 1024 * 10,
    thread: 9,
    automatic: true,
    maxLength: 9,
    preload: true
  }),
  methods: {
    previewImage (file) {
      if (window.WeixinJSBridge) {
        window.WeixinJSBridge.invoke('imagePreview', {
          'urls': this.files.map(file => {
            return file.response.data ? file.response.data[0].filename + '_large' : undefined
          }),
          'current': file.response.data ? file.response.data[0].filename + '_large' : false
        })
      }
    },

    inputFilter (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Before adding a file
        // 添加文件前
        // Filter system files or hide files
        // 过滤系统文件 和隐藏文件
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent()
        }

        // Filter php html js file
        // 过滤 php html js 文件
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent()
        }
      }

      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        // Create a blob field
        // 创建 blob 字段
        newFile.blob = ''
        let URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.blob = URL.createObjectURL(newFile.file)
        }

        // Thumbnails
        // 缩略图
        newFile.thumb = ''
        if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
          newFile.thumb = newFile.blob
        }
      }
    },

    inputFile (newFile, oldFile) {
      if (newFile && !oldFile) {
        // add
        // console.log('add', newFile)
      }
      if (newFile && oldFile) {
        // update
        // console.log('update', newFile)

        if (newFile.active && !oldFile.active) {
          // beforeSend

          // min size
          if (newFile.size >= 0 && this.minSize > 0 && newFile.size < this.minSize) {
            this.$refs.upload.update(newFile, { error: 'size' })
          }
        }

        if (newFile.progress !== oldFile.progress) {
          // progress
        }

        if (newFile.error && !oldFile.error) {
          // error
        }

        if (newFile.success && !oldFile.success) {
          // success
          // console.log('success', newFile.response.data)
          this.emitInput()
        }

        // Uploaded successfully
        if (newFile.success !== oldFile.success) {
        }
      }

      if (!newFile && oldFile) {
        // remove
        this.emitInput()
      }

      // Automatic upload
      if (this.automatic) {
        if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
          if (!this.$refs.upload.active) {
            this.$refs.upload.active = true
          }
        }
      }
    },
    // 绑定返回的数据
    emitInput () {
      let rel = []
      rel = this.files.map(file => {
        return file.response.data ? file.response.data[0].filename : undefined
      })
      this.$emit('input', rel)
    },

    // 清空数据
    clear () {
      this.$refs.upload.clear()
    }
  }
}
</script>
<style type="scss">
.j-album-upload .view-box {
  position: relative;
  list-style: none;
  display: block;
  width: 100%;
  padding: 4px 0;

}
.j-album-upload .view-box::before{
  content: ' ';
  display: table;
}
.j-album-upload .view-box::after{
  content: ' ';
  clear: both;
  display: table;
}
.j-album-upload .view-item {
  position: relative;
  float: left;
  display: table-cell;
  width: 78px;
  height: 82px;
  background-color:  #eee;
  text-align: center;
  margin: 4px 4px;
  vertical-align: middle;
}
.j-album-upload .view-item-container{
  position: relative;
  width: 100%;
  height: 82px;
  overflow: hidden;
}
.j-album-upload .image-thumb{
  width: 100%;
  height: auto;
}
.j-album-upload .image-thumb.image-thumb-v {
  width: auto;
  height: 82px;
}

.j-album-upload .view-item.select-button-container {
  background-color: transparent;
  border: 1.5px dashed #C8D1DC;
  border-radius: 4px;
  text-align:center;
  cursor: pointer;
}
.j-album-upload .select-button.file-uploads {
  line-height: 2.5em;
  cursor: pointer;
  display: block;
  font-size: 12px;
  touch-action: manipulation;
  user-select: none;
}
.j-album-upload .select-button.file-uploads input[type="file"]{
  height: 82px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: 99;
  width: 80px;
}
.j-album-upload .select-button.file-uploads::before{
  content: '';
  display: table;  
}
.j-album-upload .select-button.file-uploads::after {
  content: '';
  display: table;
  clear: both;
}
.j-album-upload .select-button-inner {
  width: 100%;
  height: 82px;
  display: block;
  text-align: center;
  cursor: pointer;
  clear: both;
}
.j-album-upload .select-button-inner img{
  width: 34px;
  height: 26px;
  margin-top: 15px;
}

.remove-btn {
  position: absolute;
  top: -7px;
  right: -6px;
  background: #FE7C1E;
  color: #fff;
  width: 20px;
  height: 20px;
  border-radius: 50% 50%;
}
.j-album-process {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background: rgba(0,0,0, .75);
  font-size: 12px;
  color: #fff;
}
</style>
