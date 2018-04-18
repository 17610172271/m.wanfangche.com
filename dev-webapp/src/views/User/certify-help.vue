<template>
  <div class="certify-help-container">
    <div class="car-certify-header1">
      认证说明
      <a class="car-brand-back" href="javascript:" @click="goBack">
        <img src="../../assets/icon_back.png">
      </a>
    </div>
    <div class="car-brand-container padder-md bg-white text-lg text-normal">
      <p class="m-t-lg">未来认证车主可享受房车家族商城的专属折扣商品。日后还会有更多特权陆续上线，比如认证车主发表的内容或者签到获得的奖励较普通用户将会翻倍，敬请期待。</p>
      <h3 class="m-t-lg text-bold">上传资料说明：</h3>
      <p class="m-t-md">行驶证所有人必须与驾驶证姓名一致。 若车辆登记在亲人名下且其没有驾驶证，可在驾驶证一栏上传行驶证所有人的身份证，或者仅上传行驶证也可申请认证。 若车辆登记在公司名下，可在驾驶证一栏上传登记公司的营业执照，或者仅上传行驶证也可申请认证。 若上传的行驶证已被认证，我们提供申诉渠道：提供行驶证、与行驶证所有人为同一人的身份证或者驾驶证，购车发票或者汽车保单（至少三项材料），玩房车昵称和绑定手机号码。发送到邮箱（shenhe@wanfangche.com），工作人员会在三天内核实信息。若信息正确会通过您的认证并撤销其他账号上的车辆认证。 除车辆报废或转卖外无法删除认证信息。若您的车辆已经报废或转让，请您发送您的房车家族昵称、绑定手机号号码、车辆转让买卖合同或车辆过户或车辆报废证明（三项任提供一个即可），发送到玩房车邮箱（shenhe@wanfangche.com），我们核实情况后会立即做出处理。 房车家族不会通过任何渠道泄露您的个人信息，请您放心上传。</p>
      <h3 class="m-t-lg text-bold">拍摄规范：</h3>
      <p class="m-t-md">请将行驶证和驾驶证正对摄像头并充满取景框，保证光线充足文字清晰，拍摄时无抖动。 由于行驶证和驾驶证外层过塑容易反光，拍摄时请取下保护套避免反光出现。 仅需上传行驶证和驾驶证正页，无需连同副页一起拍摄上</p>
      <div class="upload-example-container clear m-t-md">
        <div class="upload-example-item2 pull-left">
          <div style="height: 122px;">
            <img src="http://img01.wanfangche.com/public/upload/201804/03/5ac326f06bc01.png?x-oss-process=style/large" width="100%" height="100%" alt="行驶证">
          </div>
        </div>
        <div class="upload-example-item22 pull-left">
          <div style="height:122px;">
            <img src="http://img01.wanfangche.com/public/upload/201804/03/5ac326f044f49.png?x-oss-process=style/large" width="100%" height="100%" alt="驾驶证">
          </div>
        </div>
      </div>
      <div style="height:128px;" class="m-t-md">
        <img src="http://img01.wanfangche.com/public/upload/201804/03/5ac326f0bae28.png?x-oss-process=style/large" alt="驾驶证" width="100%" height="100%">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {
    },
    data () {
      return {
      }
    },
    methods: {
      goBack () {
        this.$emit('modelClose')
      }
    }
  }
</script>
