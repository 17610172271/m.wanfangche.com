<template>
  <div class="loading-road">
    <div class="loading-road-car2">
      <div class="loading-road-car2-lighter1"></div>
      <div class="loading-road-car2-lighter2"></div>
      <div class="loading-road-car2-back-window"></div>
      <div class="loading-road-car2-front-window"></div>

    </div>
    <div class="loading-road-dot-container1">
      <div class="loading-road-dot"></div>
      <div class="loading-road-dot"></div>
      <div class="loading-road-dot"></div>
      <div class="loading-road-dot"></div>
      <div class="loading-road-dot"></div>
      <div class="loading-road-dot"></div>
    </div>
    <div class="loading-road-dot-container2">
      <div class="loading-road-dot"></div>
      <div class="loading-road-dot"></div>
      <div class="loading-road-dot"></div>
      <div class="loading-road-dot"></div>
      <div class="loading-road-dot"></div>
      <div class="loading-road-dot"></div>
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
.loading-road {
  background: rgba(0,0,0, .4);
  width: 160px;
  height: 56px;
  overflow: hidden;
  border-radius: 4px 4px;
  display: table-cell;
  text-align: center;
  margin: 0 auto;
  vertical-align: middle;
  position: relative;
}
.loading-road-car {
  background: #FFF;
  width: 40px;
  height: 20px;
  position: absolute;
  top: 20px;
  left: 50px;
  animation: road-moving-car 5s linear infinite;
}

.loading-road-car2 {
  background: #FFF;
  width: 40px;
  height: 20px;
  position: absolute;
  top: 20px;
  left: 50px;
  border-radius: 5px 8px 8px 5px;
  animation: road-moving-car 5s linear infinite;
}
.loading-road-car2-lighter1,
.loading-road-car2-lighter2 {
  background: #fff;
  width: 2px;
  height: 4px;
  // border-radius: 2px 2px;
  // border-radius: 63px 63px 63px 63px / 108px 108px 72px 72px;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40% ;
  position: absolute;
}
.loading-road-car2-front-window {
  width: 8px;
  height: 16px;
  position: absolute;
  // background: rgba(66,81,127, 1);
  background: rgba(0,0,0, .3);
  right: 8px;
  top: 2px;
  border-radius: 4px 2px 2px 4px;
}
.loading-road-car2-back-window {
  width: 3px;
  height: 14px;
  position: absolute;
  background: rgba(0,0,0, .4);
  left: 5px;
  top:3px;
  border-radius: 5px 7px 7px 5px;
}
.loading-road-car2-lighter1{
  right: 10px;
  top: -2px;
}
.loading-road-car2-lighter2 {
  bottom: -2px;
  right: 10px;
}
@keyframes road-moving-car {
  0% {
    left: -40px;
  }
  100% {
    left: 200px;
  }
}
.loading-road-dot-container1,
.loading-road-dot-container2{
  display: flex;
  position: absolute;
  left: 0;
  top: 10px;
  animation: road-moving 1s linear infinite;
}
.loading-road-dot-container2 {
  top: 45px;
}
.loading-road .loading-road-dot {
  width: 40px;
  height: 4px;
  background: #FFF;
  display: inline-block;
  padding: 0 0;
  margin: 0 20px 0 0;
}

@keyframes road-moving {
  0% {
    left: 0
  }
  100% {
    left: -180px;
  }
}
</style>
