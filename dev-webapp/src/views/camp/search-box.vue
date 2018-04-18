<template>
  <div class="el-vue-search-box-container"
       @keydown.up="selectTip('up')"
       @keydown.down="selectTip('down')">
    <form action="" class="search-box-wrapper search-box-wrappers" @submit.prevent>
      <input type="search"
        v-model="keyword"
        @keyup.enter="search"
        @input="autoComplete"
        placeholder="请输入要搜索的地名"
        autofocus="autofocus">
      <span class="search-btn" @click="goBack()">取消</span>
    </form>
    <div class="search-tips" v-show="tips.length > 0">
      <ul>
        <li v-for="(tip, index) in tips"
          :key="index"
          @click="changeTip(tip)"
          @mouseover="selectedTip=index"
          :class="{'autocomplete-selected': index === selectedTip}">
            <i class="icon-camp-address"></i>
            <p class="p-one"><span v-html="tip.names"></span> <a class="pull-right href-navigation" :href="'https://t.m.wanfangche.com/browser?name=' + tip.name + '%20&lng=' + tip.location.lng + '&lat=%20' + tip.location.lat"><i class="icon-camp-navigation text-muted"></i></a></p>
            <p class="p-two"><span>{{tip.typecode | serach}}</span>{{tip.district}}-{{tip.address}}</p>
          </li>
      </ul>
    </div>
  </div>
</template>
<style lang="less">
  .el-vue-search-box-container {
    position: relative;
    width: 360px;
    height: 45px;
    background: #fff;
    box-shadow: 0 2px 2px rgba(0,0,0,.15);
    border-radius: 2px 3px 3px 2px;
    z-index: 10;
    .search-box-wrapper {
      position: absolute;
      display: flex;
      align-items: center;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      input {
        flex: 1;
        height: 20px;
        line-height: 20px;
        letter-spacing: .5px;
        font-size: 14px;
        text-indent: 10px;
        box-sizing: border-box;
        border: none;
        outline: none;
      }
      .search-btn {
        width: 45px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        cursor: pointer;
      }
    }
    .search-tips {
      position: absolute;
      top: 100%;
      border: 1px solid #dbdbdb;
      background: #FFF;
      overflow: auto;
      ul {
        padding: 0;
        margin: 0;
        li {
          height: 40px;
          line-height: 40px;
          box-shadow: 0 1px 1px rgba(0,0,0,.1);
          padding: 0 10px;
          cursor: pointer;
        }
      }
    }
  }
</style>
<script>
import { maptype } from '@/config/index'
export default {
  props: ['searchOption', 'onSearchResult', 'events', 'default'],
  data () {
    return {
      keyword: this.default || '',
      destination: '',
      tips: [],
      selectedTip: -1,
      loaded: false,
      arrs: maptype
    }
  },
  filters: {
    serach (val) {
      var ind = parseInt(val)
      var arrs = maptype
      let str = ''
      for (var key in arrs) {
        if (arrs[key].value === ind) {
          str = arrs[key].name + '  '
        }
      }
      return str
    }
  },
  mounted () {
    this.loaded = true
    this._onSearchResult = this.onSearchResult
    // register init event
    this.events && this.events.init && this.events.init({
      autoComplete: this._autoComplete,
      placeSearch: this._placeSearch
    })
  },
  computed: {
    _autoComplete () {
      return new AMap.Autocomplete(this.searchOption || {})
    },
    _placeSearch () {
      return new AMap.PlaceSearch(this.searchOption || {})
    },
    overstriking (name) {
      console.log(name)
    }
  },
  methods: {
    autoComplete () {
      this.selectedTip = -1
      if (!this.keyword || !this._autoComplete) return
      if (this.keyword.split(' ').length === 2) {
        this.destination = this.keyword.split(' ')[1] === '' ? this.keyword.split(' ')[0] : this.keyword.split(' ')[1]
      } else {
        this.destination = this.keyword
      }
      this.searchOption.city = this.keyword.split(' ')[0]
      this._autoComplete.search(this.destination, (status, result) => {
        if (status === 'complete') {
          this.tips = result.tips
          for (var key of this.tips) {
            if (key.name.indexOf(this.destination) !== -1) {
              var str = key.name
              key.names = str.replace(new RegExp('(' + this.destination + ')', 'ig'), '<strong>' + this.destination + '</strong>')
            }
          }
        }
      })
    },
    search () {
      this.$emit('complete', false)
      this.tips = []
      if (!this._placeSearch) return
      if (this.keyword.split(' ').length === 2) {
        this.destination = this.keyword.split(' ')[1] === '' ? this.keyword.split(' ')[0] : this.keyword.split(' ')[1]
      } else {
        this.destination = this.keyword
      }
      this.searchOption.city = this.keyword.split(' ')[0]
      this._placeSearch.search(this.destination, (status, result) => {
        if (result && result.poiList && result.poiList.count) {
          let {poiList: {pois}} = result
          let LngLats = pois.map(poi => {
            poi.lat = poi.location.lat
            poi.lng = poi.location.lng
            this.$router.replace({name: 'camp_search', query: {search: this.keyword}})
            return poi
          })
          this._onSearchResult(LngLats)
        } else if (result.poiList === undefined) {
          throw new Error(result)
        }
      })
      document.activeElement.blur()
    },
    changeTip (tip) {
      this.keyword = tip.name
      this.search()
    },
    selectTip (type) {
      if (type === 'up' && this.selectedTip > 0) {
        this.selectedTip -= 1
        this.keyword = this.tips[this.selectedTip].name
      } else if (type === 'down' && this.selectedTip + 1 < this.tips.length) {
        this.selectedTip += 1
        this.keyword = this.tips[this.selectedTip].name
      }
    },
    init () {
      let _this = this
      if (this.$route.query.search) {
        this.keyword = this.$route.query.search
        this.search()
      }
      setTimeout(function () {
        _this.setheight()
      }, 100)
    },
    setheight () {
      let num = document.documentElement.clientHeight
      var box = document.getElementsByClassName('search-tips')[0]
      box.style.height = num - 48 + 'px'
    },
    goBack () {
      this.$router.replace({
        name: 'camp'
      })
    }
  },
  created () {
    this.init()
  },
  watch: {
    keyword (val) {
      if (val.length <= 0) {
        this.tips = []
      }
    }
  }
}
</script>
