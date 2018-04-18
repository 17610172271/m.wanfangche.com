<template>
    <div class="loading-logo2">
    </div>
</template>
<style lang="scss">
.loading-logo2 {
  animation:circle .5s infinite linear;
  width: 40px;
  height: 40px;
  background: url(../../assets/loading/loading_2_6.png);
  background-size: 40px 40px;
  overflow: hidden;
  display: inline-block;
}
.loading-logo2 img {
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
