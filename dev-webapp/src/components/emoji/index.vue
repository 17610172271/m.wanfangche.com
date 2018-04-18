<template>
  <div class="popup-modal" v-if="popupShow">
    <div class="popup-modal-mask" @click="popupShow = !popupShow"></div>
    <div class="popup-container">
      <div class="emoji-container clear">
        <ul class="emoji-list block clear pull-left">
          <li v-for="item in emoji" v-html="item" @click="insertEmoji">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      value: false
    },
    data: () => ({
      popupShow: this.value,
      emoji: ['&#x1f44a;', '&#x1f44c;', '&#x1f44d;', '&#x1f44e;', '&#x1f44f;', '&#x270a;', '&#x270c;', '&#x1f60d;', '&#x1f60f;', '&#x1f61d;', '&#x1f62d;', '&#x1f602;', '&#x1f603;', '&#x1f609;', '&#x1f612;', '&#x1f618;', '&#x1f621;', '&#x1f624;', '&#x1f630;', '&#x1f631;', '&#x1f633;', '&#x1f637;', '&#x2764;']
    }),
    methods: {
      // 插入表情符
      insertEmoji (e) {
        this.$emit('insert', e.target.innerHTML)
        // this.popupShow = false
      }
    },
    watch: {
      value (val) {
        this.popupShow = val
      },
      popupShow (val) {
        this.$emit('input', val)
      }
    }
  }
</script>
<style scoped>
.popup-modal-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  display: block;
  background: rgba(0,0,0, 0);
  z-index: 0;
}
.popup-modal {
  height: 220px;
}
.popup-container {
  position: absolute;
  left: 0;
  top: 110px;
  width: 100%;
  z-index: 1;
}
.emoji-container {
  position: relative;
  background: #fff;
}
.emoji-list {
  list-style: none;
  display: table;
  padding: 15px 3.5%;
  height: 200px;
  background-color: #fff;
}
.emoji-list li {
  display: inline-block;
  width: 16.66%;
  text-align: center;
  padding:0;
  font-size: 30px;
  height: 45px;
  line-height: 45px;
}
.emoji-list li:nth-child(8n+1) {
  padding-left: 0;
}
</style>
