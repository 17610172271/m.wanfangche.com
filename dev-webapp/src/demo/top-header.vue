<template>
    <div class="nav-header">
      <div class="nav-header-left">
        <a class="nav-header-back" href="javascript:" @click="goBack">
          <img src="../assets/icon_back.png">
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
  methods: {
    goBack: function () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
  .nav-header{
  width: 100%;
  table-layout: fixed;
  position: absolute;
  top: 0px;
  z-index: 100;
  padding: 2px 0;
  box-sizing: border-box;
  background-color: #fff;
  clear:both;
}
.nav-header-left{
  height: 18px;
  left:18px;
  position: absolute;
  font-size:18px;
  line-height: 44px;
  top: 0;
  display: inline-block;
}
.nav-header-left:after,
.nav-header-left:before{
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
  top: 14px;
  display: block;
  font-size: 14px;
  line-height: 21px;
  color: #ccc;
  right: 15px;
  margin: 0;
  padding: 0;
}
.nav-header-right a{
  margin-left: 8px;
  margin-right: 0;
  float: left;
  color: #ccc;
}

</style>
