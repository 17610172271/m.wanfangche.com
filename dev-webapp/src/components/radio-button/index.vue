<template>
  <div class="check-button-group">
    <div class="col-xs" v-for="data in dataList">
      <label class="check-button"   :class="{active: isChecked(currentValue, data.value)}">
      <input type="radio" v-model="currentValue" :value="data.value">
      <div>
        {{data.name}}
      </div>
    </label>
    </div>
    
  </div>
</template>

<script>
import { looseEqual } from '@/tools/util'

export default {
  props: {
    data: {},
    value: '',
    name: '',
    buttonClass: ''
  },
  data: () => ({
    currentValue: this.value,
    dataList: this.data
  }),
  created () {
    this.currentValue = this.value
    this.dataList = this.data
  },
  methods: {
    isChecked (a, b) {
      return looseEqual(a, b)
    }
  },
  watch: {
    data (val) {
      this.dataList = this.data
    },
    value (val) {
      this.currentValue = val
    },
    currentValue (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss">
  $check-button-width:  130px;

  .check-button {
    width: $check-button-width;
    line-height: 1.5em;
    font-size: 14px;
    background: #F5F5F5;
    border-radius: 4px;
    padding: 8px 5px;
    text-align: center;
    color: #2E3E4C;
    cursor:pointer;
    transition: .02s ease;

    input {
      display:none;
    }
  }
  .check-button div{
    z-index:55;
  }

  .check-button.active {
    background:#FEEFE5;
    color: #FE7C1E;
  }
</style>
