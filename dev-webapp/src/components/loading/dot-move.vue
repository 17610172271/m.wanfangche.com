<template>
    <div class="loading-dot-move">
      <div class="loading-dot-move-circle1"></div>
      <div class="loading-dot-move-circle2"></div>
    </div>
</template>
<style lang="scss">
.loading-dot-move {
  display: inline-block;
  width: 30px;
  height: 10px;
  overflow: hidden;
  position: relative;
}
.loading-dot-move .loading-dot-move-circle1,
.loading-dot-move .loading-dot-move-circle2 {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  overflow: hidden;
}
.loading-dot-move-circle1 {
  animation:loading_move_1 .8s infinite ease-out;
  background: rgba(254,124,30, 1);
  left: 0;
}
.loading-dot-move-circle2 {
  animation:loading_move_2 .8s infinite ease-out;
  background: rgba(0,152,255, 1);
  left: 30px;
}
@keyframes loading_move_1 {
0%{
  left: 0;
}
50% {
  left: 20px;
}
100% {
  left: 0;
}
}
@keyframes loading_move_2 {
  0%{
    left: 20px;
  }
  50% {
    left: 0px;
  }
  100% {
    left: 20px;
  }
}
</style>
