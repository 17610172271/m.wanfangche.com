<template>
    <div class="nav-header">
      <div class="nav-header-left">
        <a class="nav-header-back" href="javascript:" @click="goBack">
          <img src="../../img/icon_back.png">
          &nbsp;</a>
      </div>
      <h1 class="nav-header-title">
        <slot></slot>
      </h1>
      <div class="nav-header-right">
        <a class="nav-header-more"></a>
      </div>
    </div>
</template>
<script>
export default {
  methods: {
    goBack: function () {
      this.$router.go(-1)
    }
  }
}
</script>
