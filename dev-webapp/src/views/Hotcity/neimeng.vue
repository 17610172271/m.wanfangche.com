<template>
  <div class="app-body app-container">
      <div class="head">
        <div class="back">
          <a href="javascript:" @click="goBack">
          <img src="../../assets/icon_back_white.png"></a>
        </div>
        <div class="font">
          <span class="china">&nbsp;中国</span><br>
          <span class="yunnan">内蒙古</span><br>
          <span>&nbsp;Өвөр&nbsp;Монгол</span>
        </div>
      </div>
      <div class="info">
        <div class="content">
          <p>内蒙古自治区土地总面积占全国12.3%，横跨东北、华北、西北三大区。有大面积的原始森林，是国家重要的森林基地之一，被誉为"祖国的绿色宝库"。内蒙古景点颇多，著名的有呼伦贝尔、鄂尔多斯、鄂伦春、腾格里沙漠、大兴安岭等，草原、湖泊、沙漠、森林，加上特色的蒙古包和流动的牛羊群，可谓是一步一景。</p>
        </div>
        <div class="best-time">
          <h3 class="margin-b10"><span class="greenline"></span> &nbsp;&nbsp;最佳旅行时间</h3>
          <p>四季皆可，夏季最佳 (每年6月至8月）</p>

        </div>
        <div class="playdays">
          <h3 class="margin-b10"><span class="greenline"></span> &nbsp;&nbsp;建议游玩天数</h3>
          <p>内蒙地广人稀，一般距离中心城市较远，建议 5~6 天时间为宜。</p>
        </div>
        <div class="languages">
          <h3 class="margin-b10"><span class="greenline"></span> &nbsp;&nbsp;语言</h3>
          <p>蒙古语、汉语普通话、晋语</p>
        </div>
        <div class="hot-destination">
          <h3 class="margin-b10"><span class="greenline"></span> &nbsp;&nbsp;热门目的地</h3>
          <ul>
            <li class="group1">呼伦贝尔</li>
            <li class="group2">阿尔山</li>
            <li class="group3">额济纳旗</li>
            <li class="group4">乌兰布统</li>
          </ul>
        </div>
        <div class="cam-info">
          <h3 class="margin-b10"><span class="greenline"></span> &nbsp;&nbsp;营地信息</h3>
          <ul>
            <li>
              <h5>内蒙古大兴安岭房车、自驾车露营基地</h5>
              <p>地址：内蒙古自治区根河源国家湿地公园</p>
              <p>电话：0470-5292368</p>
            </li>
            <li>
              <h5>内蒙古呼伦湖自驾车营地</h5>
              <p>地址：内蒙古自治区呼伦贝尔市新巴尔虎左旗</p>
              <p>电话：暂无</p>
            </li>
            <li>
              <h5>内蒙古巴丹吉林沙漠露营地</h5>
              <p>地址：内蒙古自治区的西部阿拉善右旗巴丹吉林沙漠</p>
              <p>电话：0483-8358566</p>
            </li>
            <li>
              <h5>内蒙古乌日斯草原房车露营地</h5>
              <p>地址：内蒙古自治区阿拉善乌日斯草原文化旅游区</p>
              <p>电话：暂无</p>
            </li>
            <li>
              <h5>内蒙古阿尔山国家森林公园鹿鸣湖露营地</h5>
              <p>地址：内蒙古自治区兴安盟阿尔山市阿尔山国家森林公园内</p>
              <p>电话：400-6482-400  OR  18648247961</p>
            </li>
            <li>
              <h5>内蒙古“朵日纳”蒙古风情园浩瀚综合露营地</h5>
              <p>地址：内蒙古自治区呼和浩特市蒙古风情园昭君路3公里处</p>
              <p>电话：13604713167</p>
            </li>
            <li>
              <h5>内蒙古清风房车营地</h5>
              <p>地址：内蒙古呼和浩特市新城区大青山太伟高尔夫度假村院内</p>
              <p>电话：18047112228</p>
            </li>
            <li>
              <h5>内蒙古华宇房车营地</h5>
              <p>地址：内蒙古包头市达茂旗拉穆仁镇草原景区</p>
              <p>电话：18647220506</p>
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
