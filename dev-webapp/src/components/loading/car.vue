<template>
  <div class="loading-rv">
    <div class="loading-rv-bg">
      <div class="loading-rv-sand"></div>
      <div class="loading-rv-cloud1"></div>
      <div class="loading-rv-cloud2"></div>
      <div class="loading-rv-cloud3"></div>
      <div class="loading-rv-mountain"></div>
      <div class="loading-rv-tree1"></div>
      <div class="loading-rv-car-container">
        <div class="loading-rv-wheel-mark"></div>
        <div class="loading-rv-car">
          <div class="loading-rv-wheel loading-rv-wheel-front"></div>
          <div class="loading-rv-wheel loading-rv-wheel-back"></div>
        </div>
        <div class="loading-rv-car-shadow"></div>
      </div>
      <div class="loading-rv-tree2"></div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({

  })
}
</script>
<style lang="scss">
.loading-rv {
  text-align: center;
}
.loading-rv-bg {
  width: 160px;
  height: 160px;
  overflow: hidden;
  // background: url(../../assets/loading/background@3x.png) no-repeat;
  background: rgba(143,237,255, .2);
  background-size: 160px 160px;
  display: inline-block;
  border-radius: 50%;
  position: relative;
}
.loading-rv-sand {
  width: 320px;
  height: 75px;
  overflow: hidden;
  background: url(../../assets/loading/sand@3x.png) repeat-x;
  background-size: 160px 75px;
  position: absolute;
  bottom: 0;
  animation:loading-rv-sand-move 1.2s infinite linear;
}
.loading-rv-cloud1 {
  width: 15px;
  height: 10px;
  background: url(../../assets/loading/cloud1@3x.png) no-repeat;
  background-size: 15px 10px;
  overflow: hidden;
  position: absolute;
  top: 40px;
  left: 30px;
  // animation:loading-rv-cloud-move-round 2s infinite ease;
  // animation:loading-rv-cloud1-move 15s infinite linear;
}
.loading-rv-cloud2 {
  width: 28px;
  height: 13px;
  background: url(../../assets/loading/cloud2@3x.png) no-repeat;
  background-size: 28px 13px;
  overflow: hidden;
  position: absolute;
  top: 22px;
  left: 73px;
  // animation:loading-rv-cloud2-move 10s infinite linear;
}
.loading-rv-cloud3 {
  width: 17px;
  height: 10px;
  background: url(../../assets/loading/cloud3@3x.png) no-repeat;
  background-size: 17px 10px;
  overflow: hidden;
  position: absolute;
  top: 55px;
  left: 114px;
  // animation:loading-rv-mountain-move 20s infinite linear;
}
.loading-rv-tree1 {
  width: 10px;
  height: 12px;
  background: url(../../assets/loading/tree1@3x.png) no-repeat;
  background-size: 10px 12px;
  overflow: hidden;
  position: absolute;
  // left: 13px;
  bottom: 60px;
  animation:loading-rv-tree1-move 2.5s infinite linear;
}
.loading-rv-tree2 {
  width: 20px;
  height: 24px;
  background: url(../../assets/loading/tree2@3x.png) no-repeat;
  background-size: 20px 24px;
  overflow: hidden;
  position: absolute;
  // left: 100px;
  bottom: 23px;
  animation:loading-rv-tree2-move 1s infinite linear;
}
.loading-rv-mountain {
  background: url(../../assets/loading/mountain@3x.png) no-repeat;
  background-size: 84px 42px;
  width: 84px;
  height: 42px;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 48px;
  animation:loading-rv-mountain-move 2s infinite linear;
}
.loading-rv-car-container {
  height: 46px;
  width: 89px;
  position: absolute;
  left: 26px;
  bottom: 37px;
  animation:loading-rv-move1 5s infinite ease-in-out;
}
.loading-rv-car {
  height: 46px;
  width: 89px;
  background: url(../../assets/loading/car@3x.png) no-repeat;
  background-size: 89px 46px;
  position: absolute;
  left: 0;
  top: 0;
  animation:loading-rv-move .5s infinite linear;
}
.loading-rv-car-shadow {
  width: 80px;
  height: 5px;
  background: rgba(0,0,0, .15);
  border-radius: 3px;
  bottom: 0;
  left: 4px;
  position: absolute;
}
.loading-rv-wheel {
  width: 12px;
  height: 12px;
  overflow: hidden;
  position: absolute;
  bottom: 1px;
  background: url(../../assets/loading/wheel@3x.png) no-repeat;
  background-size: 12px 12px;
  animation:loading-rv-wheel .4s infinite linear;
}
.loading-rv-wheel-mark {
  width: 120px;
  height: 4px;
  background: url(../../assets/loading/sandtwo.png) no-repeat;
  background-size: 120px 4px;
  overflow: hidden;
  position: absolute;
  left: -46px;
  bottom: 0;
  opacity: .7;
}
.loading-rv-wheel-front {
  left: 14px;
}
.loading-rv-wheel-back {
  left: 67px;
}
@keyframes loading-rv-wheel{

0%{
  transform:rotate(0deg);
}
100%{
  transform:rotate(360deg);
}
}
@keyframes loading-rv-move{

0%{
  top: 0;
}
50% {
  top: -1px;
}
100%{
  top: 0;
}
}
@keyframes loading-rv-move1{

0%{
  left: 26px;
}
20% {
  left: 26px;
}
50% {
  left: 56px;
}
80% {
  left: 26px;
}
100%{
  left: 26px;
}
}
@keyframes loading-rv-sand-move {
  0% {
    left: 0;
  }
  100% {
    left: -160px;
  }
}
@keyframes loading-rv-cloud-move-round {
  0% {
    left: 150px;
  }
  100% {
    left: -15px;
  }
}
@keyframes loading-rv-cloud1-move {
  0% {
    left: 150px;
  }
  100% {
    left: -15px;
  }
}
@keyframes loading-rv-cloud2-move {
  0% {
    left: 140px;
  }
  100% {
    left: -28px;
  }
}
@keyframes loading-rv-cloud3-move {
  0% {
    left: 130px;
  }
  100% {
    left: 20px;
  }
}
@keyframes loading-rv-mountain-move {
  0% {
    left: 160px;
  }
  100% {
    left: -84px;
  }
}
@keyframes loading-rv-tree1-move {
  0% {
    right: -90px;
  }
  100% {
    right: 260px;
  }
}
@keyframes loading-rv-tree2-move {
  0% {
    left: 140px;
  }
  100% {
    left: -20px;
  }
}
</style>
