<template>
  <div class="loading-dot-size">
    <div class="loading-dot-size-circle1"></div>
    <div class="loading-dot-size-circle2"></div>
    <div class="loading-dot-size-circle3"></div>
  </div>
</template>
<style lang="scss">

.loading-dot-size {
  display: inline-block;
  width: 40px;
  height: 15px;
  position: relative;
}
.loading-dot-size .loading-dot-size-circle1,
.loading-dot-size .loading-dot-size-circle2,
.loading-dot-size .loading-dot-size-circle3 {
  border-radius: 50% 50%;
  position: absolute;
  opacity: 0;
  background: rgba(254,124,30, 1);
}
.loading-dot-size-circle1 {
  width: 12px;
  height: 12px;
  animation:animation_loading_dot_size_change .5s infinite ease-in-out alternate;
  top: 5px;
  left: 0;
}
.loading-dot-size-circle2 {
  width: 16px;
  height: 16px;
  animation:animation_loading_dot_size_change .5s infinite ease-in-out .2s alternate;
  top: 2.5px;
  left: 15px;
}
.loading-dot-size-circle3 {
  width: 20px;
  height: 20px;
  animation:animation_loading_dot_size_change .5s infinite ease-in-out .4s alternate;
  background: rgba(254,124,30, 1);
  top: 0;
  left: 35px;
}

@keyframes animation_loading_dot_size_change {
    0% {
        transform: scale(0);
        opacity: 0.0;
    }
    50% {
        transform: scale(0);
        opacity: 0.0;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes animation_loading_dot_size_change1 {
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
@keyframes animation_loading_dot_size_change2 {
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
@keyframes animation_loading_dot_size_change3 {
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
