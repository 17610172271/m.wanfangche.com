<template>
    <div class="nav-header">
      <div class="nav-header-left">
        <a class="nav-header-back" href="javascript:" @click="goBack">
          <img src="../../assets/icon_back.png">
          &nbsp;</a>
      </div>
      <h1 class="nav-header-title">
        <slot></slot>
      </h1>
      <div class="nav-header-right">
        <a class="nav-header-more"></a>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    to: {
      type: Object
    }
  },
  methods: {
    goBack: function () {
      window.history.length < 2 && this.to ? this.$router.push(this.to) : this.$router.go(-1)
    }
  }
}
</script>
<style>
  .nav-header{
  width: 100%;
  table-layout: fixed;
  position: absolute;
  top: 0px;
  z-index: 100;
  padding: 2px 0;
  box-sizing: border-box;
  background-color: #fff;
  height: 44px;
  overflow: hidden;
  display: block;
}
.nav-header-left{
  height: 18px;
  left:18px;
  position: absolute;
  font-size:14px;
  line-height: 44px;
  top: 0;
  display: inline-block;
}
.nav-header-left::after,
.nav-header-left::before{
  content: "";
  display: block;
  clear:both;
}
.nav-header-back{
  content: " ";
  padding:10px 20px;
  margin: -10px -20px;
  color:#2E3E4C;
}
.nav-header-back img{
  height: 100%;
  background:
}

.nav-header-title,
.nav-header h1{
  margin: 0 88px;
  line-height: 40px;
  text-align: center;
  height: 40px;
  font-size: 18px;
  font-weight: 400;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0;
  font-family: 'PingFangSC-Medium'
}
.nav-header .nav-header-right{
  position: absolute;
  font-size: 14px;
  right: 18px;
  margin: 0;
  padding: 0;
  height: 18px;
  line-height: 44px;
  top: 0;
  display: inline-block;
}
.nav-header-more{
  content: " ";
  padding:10px 20px;
  margin: -10px -20px;
  color:#2E3E4C;
}

</style>
