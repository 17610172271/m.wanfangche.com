<template>
  <div class="car-certify-container">
    <div v-if="$route.query.process == 0">
      <div class="car-certify-header relative">
        <div class="car-certify-header1">
          爱车认证
          <a class="car-brand-back" href="javascript:" @click="goSetting">
            <img src="../../assets/icon_back.png">
          </a>
        </div>
        <div class="car-certify-help text-normal" @click="goHelp">?</div>
      </div>
      <ul class="car-certify-content padder-md bg-white text-lg">
        <li class="car-type" @click="goBrand">
          认证车型 <div class="pull-right tag-color max-width-260 over-omit" :class="{'text-sm':car_name.length > 6}">{{car_name.brand_name}} {{car_name.name}}<span class="icon icon-input-expansion text-xs text-icongray m-l"></span></div>
        </li>
        <li class="driver-permit">
          <div class="m-b">行驶本正本 <span class="tag-color text-sm">(必填)</span></div>
          <label class="car-certify-upload">
            <file-upload class="text-muted" v-model="driver_permit">
              <div class="driver-modal" v-show="driver_permit"></div>
              <div class="text-lt text-sm driver-upload-text" :class="{'text-white': driver_permit}">上传行驶本正本</div>
              <div class="select-photo text-md">选择照片</div>
            </file-upload>
          </label>
        </li>
        <li class="driver-permit">
          <div class="m-b">驾驶本正本 <span class="tag-color text-sm">(选填)</span></div>
          <label class="car-certify-upload">
            <file-upload class="text-muted" v-model="driver_licence">
              <div class="driver-modal" v-show="driver_licence"></div>
              <div class="text-lt text-sm driver-upload-text" :class="{'text-white': driver_licence}">上传驾驶本正本</div>
              <div class="select-photo text-md">选择照片</div>
            </file-upload>
          </label>
        </li>
        <li class="upload-example">
          <div class="text-sm tag-color m-b">房车家族不会通过任何渠道泄露您的个人信息请放心上传，拍摄规范和错误示例请点击右上角查看。</div>
          <div class="upload-example-container clear">
            <div class="upload-example-item pull-left">
              <div style="height: 122px;">
                <img src="https://img01.wanfangche.com/public/upload/201804/02/5ac1c1e516ef5.png?x-oss-process=style/middle" width="100%" height="100%" alt="行驶证">
              </div>
              <div class="upload-example-text">-行驶本示例-</div>
            </div>
            <div class="upload-example-item1 pull-left">
              <div style="height:122px;">
                <img src="https://img01.wanfangche.com/public/upload/201804/02/5ac1c1d09b457.png?x-oss-process=style/middle" width="100%" height="100%" alt="驾驶证">
              </div>
              <div class="upload-example-text">-驾驶本示例-</div>
            </div>
          </div>
        </li>
        <li class="car-certify-submit">
          <button @click="submit">提交资料</button>
        </li>
      </ul>
    </div>
    <div v-if="$route.query.process == 1" class="car-certify-container">
      <car-brand @brandClose="backHome"></car-brand>
    </div>
    <div v-if="$route.query.process == 2" class="car-certify-container">
      <car-model @modelClose="goBrand" @carModel="carModel"></car-model>
    </div>
    <div v-if="$route.query.process == 3" class="car-certify-container">
      <other-brand @modelClose="goBrand" @otherBrand="otherBrand"></other-brand>
    </div>
    <div v-if="$route.query.process == 4" class="car-certify-container">
      <certify-help @modelClose="backHome"></certify-help>
    </div>
    <!-- 提交认证后 -->
    <div v-if="$route.query.process >= 5" class="car-certify-container">
      <certified></certified>
    </div>
    <popup v-model="message" class="messages" style="height: 56px;" :show-mask="false">
      <h2>{{messageTit}}</h2>
    </popup>
  </div>
</template>
<script>
  import api from '@/api'
  import Navheader from '../Common/Navheader'
  import FileUpload from '@/components/file-upload'
  import CarBrand from './car-brand'
  import CarModel from './car-model'
  import OtherBrand from './other-brand'
  import CertifyHelp from './certify-help'
  import certified from './certified'
  import { Popup } from 'vux'
  export default {
    components: {
      Navheader,
      FileUpload,
      CarBrand,
      CarModel,
      OtherBrand,
      CertifyHelp,
      certified,
      Popup
    },
    data () {
      return {
        driver_permit: '',
        driver_licence: '',
        messageTit: '',
        message: false,
        id: '',
        failure_reason: '',
        brand_name: '',
        other_brand_name: '',
        other_brand_model: '',
        car_name: {
          id: null,
          name: '请选择',
          brand_id: null,
          brand_name: null
        }
      }
    },
    methods: {
      carModel (item) {
        this.car_name = item
        this.backHome()
      },
      otherBrand (val) {
        this.other_brand_name = val.brand_name
        this.other_brand_model = val.rv_type_name
        this.car_name.brand_name = val.brand_name
        this.car_name.name = val.rv_type_name
        this.backHome()
      },
      submit () {
        if (this.id) {
          // 爱车认证 修改 其他品牌
          if (this.other_brand_name) {
            this.axios.post(api.user.editCertify, {
              type: 2,
              id: this.id,
              brand_name: this.other_brand_name,
              rv_type_name: this.other_brand_model,
              driving_license: this.driver_permit,
              drivers_license: this.driver_licence
            }).then(response => {
              if (response.data.code === 1) {
                this.$router.replace({name: 'car_certify', query: {process: 5}})
              } else {
                this.message = true
                this.messageTit = response.data.msg
              }
            })
          } else {
            // 爱车认证 修改 正常
            this.axios.post(api.user.editCertify, {
              id: this.id,
              type: 1,
              brand_id: this.car_name.brand_id,
              rv_id: this.car_name.id,
              driving_license: this.driver_permit, // 行驶证
              drivers_license: this.driver_licence // 驾驶证
            })
            .then(response => {
              if (response.data.code === 1) {
                this.$router.replace({name: 'car_certify', query: {process: 5}})
              } else {
                // 请求错误
                this.message = true
                this.messageTit = response.data.msg
              }
            })
          }
        } else {
          if (this.other_brand_name) {
            // 爱车认证  新增 其他品牌
            this.axios.post(api.user.carCertify, {
              type: 2,
              brand_name: this.other_brand_name,
              rv_type_name: this.other_brand_model,
              driving_license: this.driver_permit,
              drivers_license: this.driver_licence
            }).then(response => {
              if (response.data.code === 1) {
                this.$router.replace({name: 'car_certify', query: {process: 5}})
              } else {
                this.message = true
                this.messageTit = response.data.msg
              }
            })
          } else {
            // 爱车认证  新增 正常
            this.axios.post(api.user.carCertify, {
              type: 1,
              brand_id: this.car_name.brand_id,
              rv_id: this.car_name.id,
              driving_license: this.driver_permit, // 行驶证
              drivers_license: this.driver_licence // 驾驶证
            })
            .then(response => {
              if (response.data.code === 1) {
                this.$router.replace({name: 'car_certify', query: {process: 5}})
              } else {
                // 请求错误
                this.message = true
                this.messageTit = response.data.msg
              }
            })
          }
        }
      },
      goBrand () {
        this.$router.replace({name: 'car_certify', query: {process: 1}})
      },
      backHome () {
        this.$router.replace({name: 'car_certify', query: {process: 0}})
      },
      goHelp () {
        this.$router.replace({name: 'car_certify', query: {process: 4}})
      },
      goSetting () {
        this.$router.push({name: 'user_setting'})
      },
      editData () {
        if (this.$route.query.process === 6) {
          this.driver_permit = this.$route.query.driving_license
          this.driver_licence = this.$route.query.drivers_license
          this.id = this.$route.query.id
          this.failure_reason = this.$route.query.failure_reason
          this.brand_name = this.$route.query.brand_name
          this.car_name.id = this.$route.query.rv_id
          this.car_name.name = this.$route.query.rv_type_name
          this.car_name.brand_id = this.$route.query.brand_id
        }
      }
    },
    created () {
      this.editData()
    },
    watch: {
      message (val) {
        if (val) {
          setTimeout(() => {
            this.message = false
          }, 1000)
        }
      },
      '$route': 'editData'
    }
  }
</script>
<style>
.car-certify-container .fileup-btn {
  line-height: 180px;
}
</style>
