<template>
  <div>
    <a @click="showComment"> <i class="fa fa-comment-o"></i> <slot></slot> </a>
    <div class="comment-modal-container" :class="classObj" ref="commentModalContainer">
      <input type="" name="">
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    isOpen: false
  }),
  computed: {
    classObj () {
      return {
        'open': this.isOpen
      }
    }
  },
  methods: {
    showComment () {
      this.isOpen = true
    }
  }
}
</script>

<style>
.comment-modal-container {
  display: none;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: #f8f8f8;
}
.comment-modal-container.open {
  display: block;
}
</style>
