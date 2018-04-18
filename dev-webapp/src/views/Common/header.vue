<template>
  <div class="top-header">
    <router-link :to="{name: 'feed'}" class="top-header-logo pull-left"><img width="100%" src="http://img01.wanfangche.com/public/upload/201803/05/5a9d0fd51ec71.png?x-oss-process=style/large" alt=""></router-link>
    <router-link :to="{name: 'feed'}" class="top-header-text link pull-right">首页</router-link>
  </div>
</template>
<style scoped>
  .top-header {
    width: 100%;
    height: 45px;
    background-color: #fff;
    line-height: 28px;
    padding: 9px 15px 8px;
    box-shadow: 0px 1px 6px 0px rgba(0,0,0,0.06);
    position: relative;
    z-index: 999;
  }
  .top-header-logo {
    width: 92px;
    height: 28px;
  }
</style>
