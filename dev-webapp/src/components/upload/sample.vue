<template>
  <div class="example-simple">
    <div class="upload">
      <ul>
        <li v-for="(file, index) in files" :key="file.id">
          <div>
            <img v-if="file.thumb" :src="file.thumb" width="200" height="auto" />
            <span v-else>No Image</span>
          </div>
          <div>
            <a class="dropdown-item" href="#" @click.prevent="$refs.upload.remove(file)">Remove</a>
          <span>{{file.name}}</span> -
          <span>{{file.size | formatSize}}</span> -
          <span v-if="file.error">{{file.error}}</span>
          <span v-else-if="file.success">success</span>
          <span v-else-if="file.active">active</span>
          <span v-else></span> - 
          <span>{{file.progress}}%</span>
          </div>
        </li>
      </ul>
      <div class="example-btn">
        <file-upload
          class="btn btn-custom"
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
          v-model="files"
          @input-filter="inputFilter"
          @input-file="inputFile"
          ref="upload">
          <i class="fa fa-picture-o"></i>
          Select Files
        </file-upload>
        <button type="button" class="btn btn-custom" v-if="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true">
          <i class="fa fa-cloud-upload" aria-hidden="true"></i>
          Start Upload
        </button>
        <button type="button" class="btn btn-danger"  v-else @click.prevent="$refs.upload.active = false">
          <i class="fa fa-stop" aria-hidden="true"></i>
          Stop Upload
        </button>
        <button type="button" class="btn btn-custom" @click.prevent="$refs.upload.clear()">
          <i class="fa fa-trash"></i> Clear Files
        </button>
      </div>
      <div>
       <div class="checkbox">
          <label class="i-checks">
            <input type="checkbox" v-model="automatic">
            <i class="fa" :class="automatic ? 'fa-check' : 'fa-times'"></i> 
            Automatic Upload ?
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FileUpload from '@/components/upload'

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
    accept: 'image/png,image/gif,image/jpeg,image/webp',
    multiple: true,
    drop: false,
    dropDirectory: false,
    size: 1024 * 1024 * 10,
    thread: 1,
    automatic: false
  }),
  methods: {
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
          console.log('success', newFile)
          console.log('active:', this.$refs.upload.uploaded)
        }

        // Uploaded successfully
        if (newFile.success !== oldFile.success) {
          console.log('uploaded', this.$refs.upload.uploaded)
        }
      }

      if (!newFile && oldFile) {
        // remove
        console.log('remove', oldFile)
      }

      // Automatic upload
      if (this.automatic) {
        if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
          if (!this.$refs.upload.active) {
            this.$refs.upload.active = true
          }
        }
      }
    }
  }
}
</script>
