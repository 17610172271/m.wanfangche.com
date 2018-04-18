<template>
  <div class="map-swiper map-swipers">
      <v-touch v-on:swipedown="onTap" class="box"  v-on:swipeup="onSwipeLeft">
      <div class="map-head" @click="onSwipeLeft" v-if="!intop">
        <span></span>
      </div>
      <div class="map-head" @click="onTap" v-if="intop">
        <span></span>
      </div>
      <div class="map-body map-bodya" v-show="!istop">
        <swiper :options="swiperOption">
          <swiper-slide style="float:left;height:108px;overflow-y:hidden; position:relative;" v-for="(item, index) in wximglist" :key="item.id" >
            111111
          </swiper-slide>
        </swiper>
      </div>
      <div class="map-body" v-show="istop">
          <p v-for="(item, index) in wximglist" >
            111111222
          </p>
      </div>
      </v-touch>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        swiperOption: {
          notNextTick: true,
          grabCursor: true,
          setWrapperSize: true,
          autoHeight: true,
          speed: 1000,
          autoplayDisableOnInteraction: false,
          initialSlide: 0
        },
        wximglist: [
          {
            title: '111111',
            id: 1
          },
          {
            title: '111111',
            id: 1
          },
          {
            title: '111111',
            id: 1
          }
        ],
        intop: false,
        istop: false
      }
    },
    methods: {
      disableTap () {
        this.$refs.tapper.disable('tap')
      },
      enableTap () {
        this.$refs.tapper.enable('tap')
      },
      onSwipeLeft () {
        this.istop = true
        var ins = document.querySelectorAll('.map-swiper')
        if (ins[0].offsetTop > 0) {
          smoothUp()
        }
        let _this = this
        function smoothUp () {
          if (ins[0].offsetTop > 45) {
            ins[0].style.top = ins[0].offsetTop - 20 + 'px'
            setTimeout(smoothUp, 10)
          } else {
            _this.intop = true
          }
        }
      },
      onTap () {
        this.istop = false
        var ins = document.querySelectorAll('.map-swiper')
        if (ins[0].clientHeight > 170) {
          smoothUp()
        }
        let _this = this
        function smoothUp () {
          if (ins[0].clientHeight > 170) {
            ins[0].style.top = ins[0].offsetTop + 20 + 'px'
            setTimeout(smoothUp, 10)
          } else {
            _this.intop = false
          }
        }
      }
    }
  }
</script>
<style>
.map-bodya{
  height: 96px;
}
</style>
