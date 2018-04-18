<template>
  <div class="car-model">
    <div class="car-certify-header1">
      添加其他品牌
      <a class="car-brand-back" href="javascript:" @click="goBack">
        <img src="../../assets/icon_back.png">
      </a>
    </div>
    <div class="car-brand-container padder-md bg-white">
      <div class="other-brand-item m-t-lg text-lg">
        <input type="text" placeholder="请填写房车品牌" v-model="rv_brand">
      </div>
      <div class="other-brand-item m-t-lg text-lg">
        <input type="text" placeholder="请填写该房车品牌车型" v-model="rv_model">
      </div>
    </div>
    <div class="other-brand-submit"><button :class="{'bg-color': rv_brand && rv_model}" class="text-xlg" @click="submit">添加品牌</button></div>
  </div>
</template>
<script>
  // import api from '@/api'
  export default {
    components: {
    },
    data () {
      return {
        rv_brand: '',
        rv_model: ''
      }
    },
    methods: {
      goBack () {
        this.$emit('modelClose')
      },
      submit () {
        this.$emit('otherBrand', {
          brand_name: this.rv_brand,
          rv_type_name: this.rv_model
        })
      }
    }
  }
</script>
<style>
  .car-model {
    height: 100%;
  }
  .other-brand-item {
    height: 44px;
  }
  .other-brand-item input {
    width: 100%;
    height: 100%;
    background-color: #f8f8f8;
    border-radius: 4px;
    padding: 11px 12px;
    border: 0;
  }
  .other-brand-submit {
    padding: 20px;
    position: fixed;
    width: 100%;
    height: 84px;
    left: 0;
    bottom: 0;
  }
  .other-brand-submit button {
    width: 100%;
    height: 44px;
    background-color: #FE9815;
    border-radius: 4px;
    border: 0;
    line-height: 44px;
    text-align: center;
    color: #fff;
    background-color: rgba(254, 152, 21, 0.5);
  }
  .other-brand-submit button:focus {
    border: none;
    outline: none;
  }
</style>
