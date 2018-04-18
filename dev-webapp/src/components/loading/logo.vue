<template>
    <div class="loading-logo">
      <img src="/static/img/logo-loading.png">
    </div>
</template>
<style lang="scss">
.loading-logo {
  animation:circle .5s infinite linear;
  width: 40px;
  height: 40px;
  overflow: hidden;
  display: inline-block;
}
.loading-logo img {
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
