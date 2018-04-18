<template>
  <div id="page">
    <navheader>CMS Page </navheader>
    <div class="app-body">
      CMS page 2
    </div>
    <!-- <tabbar active="rental"></tabbar> -->
  </div>
</template>
<script>
import Navheader from '../Common/Navheader'
import Tabbar from '../Tabbar'

export default {
  name: 'page',
  components: {
    Tabbar,
    Navheader
  },
  data () {
    return {

    }
  }
}
</script>
