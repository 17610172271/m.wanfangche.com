<template>
  <div class="loading-popup">
    <div class="loading-popup-dot-container">
      <div class="loading-popup-dot loading-popup-dot1"></div>
      <div class="loading-popup-dot loading-popup-dot2"></div>
      <div class="loading-popup-dot loading-popup-dot3"></div>
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
.loading-popup {
  background: rgba(0,0,0, .4);
  width: 160px;
  height: 56px;
  overflow: hidden;
  border-radius: 4px 4px;
  display: table;
  text-align: center;
  margin: 0 auto;
}
.loading-popup-dot-container{
  display: table-cell;
  vertical-align: middle;
}
.loading-popup .loading-popup-dot {
  width: 8px;
  height: 8px;
  background: #FFF;
  display: inline-block;
  margin: 0 4px;
}
.loading-popup-dot1 {
  animation: show-dot1 .8s ease infinite;
}
.loading-popup-dot2 {
  animation: show-dot2 .8s ease infinite;
}
.loading-popup-dot3 {
  animation: show-dot3 .8s ease infinite;
}
@keyframes show-dot1 {
  0% {opacity: .5;}
  20% {opacity: .5}
  21% {opacity: 1}
  60% {opacity: 1}
  100% {opacity: .5}
}
@keyframes show-dot2 {
  0% {opacity: .5;}
  40% {opacity: .5}
  41% {opacity: 1}
  80% {opacity: 1}
  100% {opacity: .5}
}
@keyframes show-dot3 {
  0% {opacity: .5;}
  60% {opacity: .5}
  61% {opacity: 1}
  // 90% {opacity: 1}
  100% {opacity: 1}
}
</style>
