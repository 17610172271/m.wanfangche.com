<template>
  <div class="app">
  </div>
</template>

<script>
import {isWechat, isIOS} from '@/tools/device'

export default {
  data () {
    return {
    }
  },
  methods: {
    initCurrentUrl () {
      if (isWechat() && isIOS()) window.sessionStorage.setItem('initUrl', window.location.href)
    }
  },
  created () {
    console.log(1)
    this.$router.replace({
      name: 'feed'
    })
  }
}
</script>
