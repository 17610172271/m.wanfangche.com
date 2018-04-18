<template>
  <!--tabbar start-->
  <div class="nav-footer">
    <div class="footer-tabbar">
       <router-link :to="{name: 'feed'}" class="tabbar-item">
        <div class="tabbar-item-icon-text">
          <span class="icon-feed-normal icon-default"></span>
          <span class="icon-feed-selected icon-active">
          <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span>
          </span>
         </div>
         <p class="tabbar-item-label"><span>房车圈</span></p>
       </router-link>
       <router-link :to="{name: 'camp'}" class="tabbar-item">
        <div class="tabbar-item-icon-text">
          <span class="icon-camp-camp_normal icon-default" style="color:#8D9DB0;"></span>
          <span class="icon-camp-camp__selected icon-active" style="color:#8D9DB0;">
            <span class="path1"></span><span class="path2"></span>
          </span>
         </div>
         <p class="tabbar-item-label"><span>营地</span></p>
       </router-link>
       <router-link :to="{name: 'faq'}" class="tabbar-item">
        <div class="tabbar-item-icon-text">
          <span class="icon-qa-normal icon-default"></span>
          <span class="icon-qa-selected icon-active">
          <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span>
          </span>
         </div>
         <p class="tabbar-item-label"><span>问答</span></p>
       </router-link>
       <router-link :to="{name: 'rental'}" class="tabbar-item" exact>
        <div class="tabbar-item-icon-text">
          <span class="icon-rantel-normal icon-default">
          <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span>
          </span>
          <span class="icon-rantel-selected icon-active">
          <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span>
          </span>
         </div>
         <p class="tabbar-item-label"><span>租车</span></p>
       </router-link>
       <router-link :to="{name: 'user'}" class="tabbar-item">
        <div class="tabbar-item-icon-text">
          <span class="icon-personal-normal icon-default"></span>
          <span class="icon-personal-selected icon-active">
          <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span>
          </span>
         </div>
         <p class="tabbar-item-label"><span>我的</span></p>
       </router-link>
    </div>
  </div>
  <!--/tabar end-->
</template>
<style>
body .nav-footer{
  display: block;
  width: 100%;
  position: fixed;
  table-layout: fixed;
  bottom: 0;
  z-index: 1000;
  background-color: #fff;
  box-shadow: 0 1px 0 0 rgba(237,237,237,.5) inset;
  height: 1.17rem;
  max-width: 750px;
}
.footer-tabbar{
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.tabbar-item{
  display: block;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  font-size: 0;
  color: #8D9DB0;
  text-align: center;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  width: 100%;
}
.tabbar-item:hover {
  color: #FE7C1E;
}
.tabbar-item-on{
  color: #FE7C1E;
}
.tabbar-item-icon{
  position: relative;
  display: inline-block;
  width: 2.4rem;
  height: 1.5rem;
  overflow: hidden;
}
.tabbar-item-icon-text {
  position: relative;
  display: inline-block;
  width: .64rem;
  height: .64rem;
  overflow: hidden;
  font-size: .64rem;
  line-height: .64rem;
  overflow: hidden;
  margin-top: 3px;
}
.tabbar-item-icon-text > span:before {
  position: absolute;
  top: 1px;
  left: 0px;
}
.tabbar-item-icon-text .icon-qa-selected {
  position: absolute;
  top: 1px;
  left: 0px;
}
.tabbar-item.router-link-active {
  color: #FE7C1E;
}
.tabbar-item.router-link-active .icon-default,
.icon-active{
  display: none;
}

.tabbar-item.router-link-active .icon-active {
  display: inline-block;
}


.tabbar-item-icon img{
  width: 100%;
  height: 100%;
}
.tabbar-item-label{
  text-align: center;
  font-size: 12px;
  line-height: .37rem;
  margin-top:1px;
}
</style>
