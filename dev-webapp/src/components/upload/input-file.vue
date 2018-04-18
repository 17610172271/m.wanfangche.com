<template>
  <input
    type="file"
    :name="$parent.name"
    :id="$parent.inputId || $parent.name"
    :accept="$parent.accept"
    :capture="$parent.capture"
    @change="change"
    :webkitdirectory="$parent.directory && $parent.features.directory"
    :directory="$parent.directory && $parent.features.directory"
    :multiple="$parent.multiple && $parent.features.html5"
  />
</template>
<script>
/* eslint-disable */
export default {
  methods: {
    change(e) {
      this.$destroy()
      this.$parent.preload ? this.$parent.addInputFileWithPreload(e.target) : this.$parent.addInputFile(e.target)
      new this.constructor({
        parent: this.$parent,
        el: this.$el,
      })
    }
  }
}
/* eslint-enable */
</script>
