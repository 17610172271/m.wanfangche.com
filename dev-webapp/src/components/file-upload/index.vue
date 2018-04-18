<template>
  <label class="file-upload">
    <div class="fileup-btn relative">
      <div v-if="loading" class="upload-tips">上传中...</div>
      <div v-show="!loading" class="upload-tips"><slot></slot></div>
      <img v-if="currentValue" v-show="!loading" :src="currentValue | ossResize('middle')">
    </div>

    <input
      class="fileup-input"
      type="file"
      name="file"
      ref="input"
      accept="image/*"
      @change="onChange"
      >

  </label>
</template>

<script>

export default {
  props: {
    value: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      currentValue: this.value,
      loading: false
    }
  },
  methods: {
    onChange (e) {
      if (this.$refs.input.files[0]) {
        // this.currentValue = undefined
        this.loading = true
        this.axios.upload(this.$refs.input.files[0])
        .then(response => {
          this.loading = false
          if (response.data.data) {
            this.currentValue = response.data.data.filename
          }
        })
        .catch(error => {
          this.loading = false
          return Promise.reject(error)
        })
      }
    }
  },
  watch: {
    currentValue (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.currentValue = val
    }
  }
}
</script>
<style lang="scss">
.upload-tips {
  width: 100%;
  height: 234px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 666;
  line-height: 234px;
}
label.file-upload {
  display: table;
  margin-bottom: 0px;
  width: 100%;
  height:100%;
}
.fileup-btn{
  width: 100%;
  height: 234px;
  line-height: 192px;
  text-align:center;
  cursor: pointer;
  overflow: hidden;
}
.fileup-btn img{
  width: 100%;
}
.fileup-btn input,
.fileup-input {
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
  width: 0.1px;
}

.error .fileup-btn {
  border-color: rgba(254, 124, 30, 1);
}
</style>
