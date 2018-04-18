<template>
  <div class="app-body app-container">
      <div class="head">
        <div class="back">
          <a href="javascript:" @click="goBack">
          <img src="../../assets/icon_back_white.png"></a>
        </div>
        <div class="font">
          <span class="china">&nbsp;中国</span><br>
          <span class="yunnan">云南</span><br>
          <span >&nbsp;YUN&nbsp;NAN</span>
        </div>
      </div>
      <div class="info">
        <div class="content">
          <p>云南位于中国西南的边陲，简称云（滇），省会昆明。在全境8个地级市和8个自治州中，按照旅游资源的分布，基本可以分为4个大的区域。</p><br>
          <p>西北地区目前是云南旅行最热门的区域，大理、丽江、香格里拉、泸沽湖等人气景点不仅环绕着绝美的高山风光，每年都有不少游客来此体验富有情调的古镇生活。</p><br>
          <p>滇中及东北部地区以省会昆明为中心，周边的石林、抚仙湖、罗平油菜花田都很值得一看。</p><br>
          <p>南部地区不仅有颇富风情的西双版纳，还有蜚声国际的元阳哈尼族梯田，以及因节目《爸爸去哪儿》走红的普者黑，和被称为真实的“世外桃源”的坝美。</p><br>
          <p>西部地区主要是在缅甸边境一线的宝山、德宏和怒江。这里的景点相对比较小众，但绝对精彩，腾冲地热温泉、和顺古镇、银杏村、三江并流、异域气质的边贸小镇瑞丽等等对于云南深度旅行者来说都是不容错过的。</p>
        </div>
        <div class="best-time">
          <h3 class="margin-b10"><span class="greenline"></span> &nbsp;&nbsp;最佳旅行时间</h3>
          <p>2-4月&nbsp;&nbsp;适合去 罗平、西双版纳；</p>
          <p>5-8月&nbsp;&nbsp;适合去 滇西北和西南、丽江、香格里拉、普者黑、坝美；</p>
          <p>9-11月&nbsp;&nbsp;适合去 大理洱海、怒江、腾冲；</p>
          <p>12-1月&nbsp;&nbsp;适合去 西双版纳、元阳梯田；</p>
        </div>
        <div class="playdays">
          <h3 class="margin-b10"><span class="greenline"></span> &nbsp;&nbsp;建议游玩天数</h3>
          <p>以昆明为中心，4~7天可尽兴；两个以上大区需8~15天；</p>
        </div>
        <div class="languages">
          <h3 class="margin-b10"><span class="greenline"></span> &nbsp;&nbsp;语言</h3>
          <p>汉语普通话、西南官话</p>
        </div>
        <div class="hot-destination">
          <h3 class="margin-b10"><span class="greenline"></span> &nbsp;&nbsp;热门目的地</h3>
          <ul>
            <li class="group1">丽江古城</li>
            <li class="group2">大理古城</li>
            <li class="group3">束河古镇</li>
            <li class="group4">香格里拉</li>
          </ul>
        </div>
        <div class="cam-info">
          <h3 class="margin-b10"><span class="greenline"></span> &nbsp;&nbsp;营地信息</h3>
          <ul>
            <li>
              <h5>云南丽江格拉丹帐篷营地</h5>
              <p>地址：云南省丽江市黎明乡格拉丹草原</p>
              <p>电话：0888-5122828 OR 0519-87980000</p>
            </li>
            <li>
              <h5>云南嗔池睡美人房车露营地</h5>
              <p>地址：云南省昆明市西山区</p>
              <p>电话：0871-68422553</p>
            </li>
            <li>
              <h5>云南史迪威公路房车露营地</h5>
              <p>地址：云南省保山市隆阳区史迪威公路</p>
              <p>电话：13888100613</p>
            </li>
            <li>
              <h5>云南大理地热国际房车露营地</h5>
              <p>地址：云南省大理市</p>
              <p>电话：18387230503</p>
            </li>
            <li>
              <h5>云南西双版纳傣族园房车露营地</h5>
              <p>地址：云南省西双版纳傣族自治州景洪市橄榄坝</p>
              <p>电话：0691-2504601 OR 13808817088</p>
            </li>
            <li>
              <h5>云南昆明中国兵器房车温泉中心</h5>
              <p>地址：云南省昆明市滇池国家旅游度假区内</p>
              <p>电话：0871-64332098 OR 64332066</p>
            </li>
            <li>
              <h5>云南罗平航空房车露营地</h5>
              <p>地址：云南省罗平县城罗平油菜花节主会场西侧</p>
              <p>电话：0874-8269888 OR 1883569888</p>
            </li>
            <li>
              <h5>云南大理洱海兰林阁房车露营地</h5>
              <p>地址：大理白族自治区大理市</p>
              <p>电话：0872-2519106</p>
            </li>
            <li>
              <h5>云南滇池海埂城市房车微露营地</h5>
              <p>地址：云南省昆明市西山区</p>
              <p>电话：0871-64311056</p>
            </li>
          </ul>
        </div>
      </div>
      
   </div>   
</template>
<style scoped>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .app-body {
    background-color: #fff;
    padding: 0;
  }
  .head {
    background: url('../../assets/yunnan@2x.png') no-repeat ;
    height: 180px;
    background-size: cover;
    position: relative;
    
  }
  .back {
    width: 60px;
    height: 60px;
    position: absolute;
    left: 0;
    top: 0;
  }
  .back a {
    width: 60px;
    height: 60px;
    display: inline-block;
    padding: 20px;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    
  }
  .back a img {
    width: 8px;
    height: 15px;
    vertical-align: middle;
    position: absolute;
    top: 20px;
    left: 20px;
  }
  .font span {
    color: #fff;
  }
  .font span:first-child {
    font-size: 14px;
  }
  .font .yunnan {
    font-size: 26px;
    font-weight: 900;
  }
  .china {
    line-height: 26px;
  }
  .font span:last-child {
    font-size: 10px;
    opacity: 0.5;
  }
  .font {
    position: absolute;
    left: 24px;
    top: 90px;
  }
  .info {
    padding: 17px 15px;
    color: #333;
  }
  .info .content{
    width: 100%;
    background-color: #f5f5f5;
    padding: 22px 23px;
  }
  .info > div {
    margin-bottom: 31px;
  }
  .info .content p {
    text-indent: 2em;
    font-size: 12px;
    color: #000000;
    letter-spacing: 4px;
    line-height: 16px;
    margin-left: 0;
  }
  .info h3 {
    font-size: 14px;
    font-weight: 700;
    color: #333333;
    letter-spacing: 0;
    margin: 0;
    padding: 0;
    /*margin-bottom: 16px;*/
    line-height: 22px;
    position: relative;
  }
  .info .margin-b10 {
    margin-bottom: 14px;
  }
  .info .hot-destination h3 {
    margin-bottom: 17px;
  }
  .greenline {
    position: absolute;
    width: 2px;
    height: 18px;
    background-color: #77B825;
    left: 0;
    top: 2px;
  }
  .app-body .info p {
    margin-left: 10px;
    font-size: 12px;
  }
  .cam-info ul{
    padding-left: 10px;
  }
  .cam-info ul li {
    list-style: none; 
    margin-top: 10px;
  }
  .cam-info h5 {
    font-weight: 700;
    font-size: 12px;
    line-height: 17px;
  }
  .app-body .info .cam-info p {
    margin-left: 0;
  }
  .hot-destination ul li{
    padding: 9px 25px;
    color: #fff;
    font-weight: 700;
    font-size: 14px;
    margin-left: 10px;
    background-size: cover;
    height: 34px;
    border-radius: 6px;
    margin-top: 10px;
  }
  .hot-destination .group1 {
    background-image: url('../../assets/Group@2x.png');
  }
  .hot-destination .group2 {
    background-image: url('../../assets/Group2@2x.png');
  }
  .hot-destination .group3 {
    background-image: url('../../assets/Group3@2x.png');
  }
  .hot-destination .group4 {
    background-image: url('../../assets/Group4@2x.png');
  }
</style>
<script>
  export default {
    methods: {
      goBack: function () {
        this.$router.go(-1)
      }
    }
  }
</script>
