<template>
  <div>
    <div class="wrapper">
      <h3>City Picker</h3>
      <div class="">
        <!-- 当前定位城市: -->
      </div>
      <div class="">
        当前城市：<a @click="openCityPicker">{{currentCity.city}}</a>
      </div>
    </div>
    <city-picker v-model="cityPickerValue" ref="cityPicker"></city-picker>
  </div>
</template>
<script>
import { CityPicker } from '@/components'
import {mapGetters} from 'vuex'

export default {
  components: {
    CityPicker
  },
  data: () => ({
    cityPickerValue: null
  }),
  computed: mapGetters(['currentCity']),
  methods: {
    openCityPicker () {
      this.$refs['cityPicker'].open()
    }
  }
}
</script>
<style lang="scss">
</style>
