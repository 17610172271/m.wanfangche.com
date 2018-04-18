<template>
  <div>
    <div class="col-xs" v-for="(item, index) in items">
        <label class="check-button " :class="{active: tempValue.indexOf(item.value) >= 0}" >
          <input type="checkbox" v-model="tempValue" :value="item.value">

          <div>{{item.name}}</div>
        </label>
    </div>
    
  </div>
</template>

<script>
import { isJson } from '@/tools/util'

export default {
  name: 'check-button-group',

  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      tempValue: this.value && isJson(this.value) ? JSON.parse(this.value) : [],
      items: this.data
    }
  },
  computed: {
    currentValue () {
      return JSON.stringify(this.tempValue)
    }
  },
  watch: {
    data () {
      this.tempValue = []
      this.items = this.data
    },
    tempValue (val) {
      this.$emit('input', this.currentValue)
    },
    value (val) {
      this.tempValue = this.value && isJson(this.value) ? JSON.parse(this.value) : -1
    }
  }
}
</script>

<style lang="scss">
  $check-button-width:  100%;
  .check-button {
    width: $check-button-width;
    line-height: 1.5em;
    font-size: 14px;
    background: #F8F8F8;
    border-radius: 4px;
    padding: 7px 8px;
    text-align: center;
    color: rgba(186, 194, 204, 1);
    cursor:pointer;
    transition: .02s ease;

    input {
      display:none;
    }
  }
  .col-xs {
    width:33%;
    float:left;
    padding-right:11px;
  }
  .check-button.active {
    color: #FE7C1E;
  }
</style>
