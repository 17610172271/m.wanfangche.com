<template>
  <div class="loading-bottom">
    <div class="loading-bottom-img">&nbsp;</div>
    <span class="loading-bottom-text">加载中...</span>
  </div>
</template>
<style lang="scss">
  .loading-bottom {
    display: block;
    text-align: center;
    line-height: 1em;
    font-size: 14px;
  }
  .loading-bottom .loading-bottom-img {
    width: 15px;
    height: 15px;
    // overflow: hidden;
    display: inline-block;
    background: url(../../assets/loading-bottom@2x.png) no-repeat;
    background-size: 15px 15px;
    animation:circle 1s infinite linear;
    content: " ";
  }
   .loading-bottom .loading-bottom-img:before,
   .loading-bottom .loading-bottom-img:after{
     content: " ";
     clear: both;
   }
  .loading-bottom-text {
    margin-left: 5px;
    // display: inline-block;
  }
  .loading-bottom .loading-bottom-img img{
    width: 100%;
  }

 @keyframes circle{

0%{
  transform:rotate(0deg);
}
100%{
  transform:rotate(-360deg);
}
}

</style>
