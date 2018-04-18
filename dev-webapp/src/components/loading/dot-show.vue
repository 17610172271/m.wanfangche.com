<template>
  <div class="loading-dot-show">
    <div class="loading-dot-show-circle1"></div>
    <div class="loading-dot-show-circle2"></div>
    <div class="loading-dot-show-circle3"></div>
  </div>
</template>
<style lang="scss">

.loading-dot-show {
  display: inline-block;
  width: 40px;
  height: 15px;
  overflow: hidden;

  position: relative;
  // background: #fff;
}
.loading-dot-show .loading-dot-show-circle1,
.loading-dot-show .loading-dot-show-circle2,
.loading-dot-show .loading-dot-show-circle3 {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  overflow: hidden;
  opacity: 0;
  // box-shadow: 0 2px 2px 0 rgba(254,124,30, .5)
}
.loading-dot-show-circle1 {
  animation:animation_loading_show1 .4s infinite ease-in alternate;
  background: rgba(254,124,30, 1);
  left: 0;
}
.loading-dot-show-circle2 {
  animation:animation_loading_show2 .4s infinite ease-in .2s alternate;
  // background: rgba(0,152,255, 1);
  background: rgba(254,124,30, 1);
  left: 15px;
}
.loading-dot-show-circle3 {
  animation:animation_loading_show3 .4s infinite ease-in .4s alternate;
  // background: rgba(119,184,37, 1);
  background: rgba(254,124,30, 1);
  left: 30px;
}
@keyframes animation_loading_show1 {
0%{
  // left: 0;
  display: none;
  opacity: 0;
}
50% {
  // left: 20px;
}
100% {
  display: block;
  opacity: 1;
  // left: 0;
}
}
@keyframes animation_loading_show2 {
  0%{
    // left: 20px;
    opacity: 0;
  }
  50% {
    // left: 0px;
    // opacity: 0;
  }
  100% {
    // left: 20px;
    opacity: 1;
  }
}
@keyframes animation_loading_show3 {
  0%{
    // left: 40px;
    opacity: 0;
  }
  50% {
    // left: 50px;
  }
  100% {
    opacity: 1;
    // left: 40px;
  }
}
</style>
