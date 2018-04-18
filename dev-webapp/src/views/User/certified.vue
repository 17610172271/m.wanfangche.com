<template>
  <div class="certified">
    <div class="car-certify-header1">
      爱车认证
      <a class="car-brand-back" href="javascript:" @click="goBack">
        <img src="../../assets/icon_back.png">
      </a>
    </div>
    <div class="car-brand-container padder-md bg-white relative">
      <div class="car-certify-checking" v-if="$route.query.process == 5">
        <div class="car-checking-img">
          <img src="http://img01.wanfangche.com/public/upload/201804/03/5ac334df3288b.png?x-oss-process=style/middle" alt="">
        </div>
        <div class="text-md text-normal text-center car-checking-text text-bold">您的认证资料已提交</div>
        <div class="car-checking-text1 text-md text-center">我们将会在3个工作日内完成审核， 请耐心等候</div>
      </div>
      <div class="car-certify-checking" v-if="$route.query.process == 6">
        <div class="car-checking-img">
          <img src="http://img01.wanfangche.com/public/upload/201804/03/5ac334df3aaab.png?x-oss-process=style/middle" alt="">
        </div>
        <div class="text-md text-normal text-center car-checking-text text-bold">您的认证资料未通过审核</div>
        <div class="car-checking-text2 text-md text-center">原因：{{$route.query.failure_reason}}</div>
        <div class="car-recertify text-xlg text-bold text-center" @click="goHome">重新申请认证</div>
      </div>
      <div v-if="$route.query.process == 7">
        <div class="car-checking-success text-lg">
          认证车型 
          <div class="pull-right tag-color max-width-230 over-omit">
            <div class="brand-item-icon">
              <img :src="$route.query.logo | ossResize('avatar')" width="100%" height="100%" alt="">
            </div>
            {{$route.query.brand_name}}
            {{$route.query.rv_type_name}}
          </div>
        </div>
      </div>
      <div class="service-tel" @click="doTel">如需帮助，请联系<span class="blue">{{tel}}</span></div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {
    },
    data () {
      return {
        tel: '400-100-10010'
      }
    },
    methods: {
      goBack () {
        this.$router.push({name: 'user_setting'})
      },
      goHome () {
        this.$router.push({name: 'car_certify', query: {process: 0, type: 2}})
      },
      doTel () {
        window.location.href = 'tel:' + this.tel
      }
    }
  }
</script>
<style>
  .car-certify-checking {
    height: 221px;
    margin-top: 60px;
  }
  .car-checking-img {
    width: 120px;
    height: 120px;
    margin: 0 auto;
  }
  .car-checking-img img {
    width: 100%;
    height: 100%;
  }
  .car-checking-text {
    margin-top: 33px;
  }
  .car-checking-text1 {
    width: 219px;
    height: 40px;
    color: #C8D1DC;
    margin: 8px auto 0;
  }
  .car-checking-text2 {
    width: 266px;
    height: 20px;
    color: #C8D1DC;
    margin: 8px auto 0;
  }
  .car-recertify {
    color: #fff;
    background-color: #FE9815;
    margin: 80px auto 0;
    width: 280px;
    height: 44px;
    line-height: 44px;
    border-radius: 4px;
  }
  .car-checking-success {
    border-bottom: 1px solid #F5F5F5;
    height: 54px;
    line-height: 54px;
  }
</style>
