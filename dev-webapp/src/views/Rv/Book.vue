<template>
	<div class="bg-light rv-book" style="padding-bottom:0;">
  <loading-car v-show="!toLoad" class="middle"></loading-car>
    <navheader >填写信息</navheader>
    <popup v-model="certificate" class="certificate" style="height: auto;">
  			<ul>
  				<li @click="btnSelect(1)">中国驾照</li>
  				<li @click="btnSelect(2)">国际驾照</li>
  				<li @click="btnSelect(3)">香港驾照</li>
  			</ul>
        <ul>
          <li v-for="items in drivinglist" @click="btnDriving(items.value, items.name)">{{items.name}}</li>
        </ul>
  	</popup>
    <popup v-model="sex" class="certificate certificates" style="height: auto;">
        <ul>
          <li @click="btnSex('先生')">先生</li>
          <li @click="btnSex('女士')">女士</li>
        </ul>
    </popup>
  	<popup v-model="user" class="userlog" style="height: auto;">
        <h3>登陆</h3>
        <span class="remove"></span>
        <div class="user-body">
          <p><input type="text" placeholder="请输入手机号" /></p>
          <p><input type="text" /><span>获取验证码</span></p>
          <p><button>查询</button></p>
          <p><button>注册</button></p>
        </div>
    </popup>
    <div class="app-body app-container" style="background:#FFFFFF;padding:44px 0" v-show="toLoad">
      <div class="panel">
        <div class="panel-body">
              <div class="clear">
                <div class="pull-left thumb-md m-r"><img :src="rvData.img_cover | ossResize('small')"></div>
                <div class="clear">
                  <div class="title" style="font-family:PingFangSC-Semibold;">{{rvData.title}}</div>
                  <div class="text-muted m-b-sm h-gray">
                    <div class="text-muted">{{rvData.adult_passengers}}人·{{rvData.transmission_case.val}}·{{rvData.actuation.val}}</div>
                  </div>
                  <div class="thumb-sm"><img :src="rvData.logo | ossResize('avatar')" alt="..."></div>
                </div>
              </div>
              <div class="clear text-small text-muted padder-v">
                <div class="pull-right" style="padding:0;"><span>还车</span></div>
                <div class=""><span>取车</span></div>
              </div>
              <div class="row">
                <div class="col-xs-5">
                  <div class="text-lg m-r-minus">
                    {{pickup_date}}
                  </div>
                  <div class="">
                    {{pickup_date | formatTime('周E')}} {{pickup_time}}
                  </div>
                </div>
                <div class="col-xs-2 padder-xs">
                  <div class="row">
                     <div class="total-day-md text-center">
                        <div class="total-day-underline-muted text-muted">{{total_days}}天</div>
                      </div>
                    </div>
                </div>
                <div class="col-xs-5 text-right">
                  <div class="text-lg m-l-minus">
                    {{return_date}}
                  </div>
                  <div class="">
                    {{return_date | formatTime('周E')}} {{return_time}}
                  </div>
                </div>
              </div>
                <div class="row">
                <div class="col-xs-6">
                  <div class="text-muted">{{querys.picker_store}}</div>
                </div>
                <div class="col-xs-6">
                  <div class="text-muted text-right">{{querys.return_store}}</div>
                </div>
              </div>
            </div>
      </div>
      <div class="panel">
        <div class="panel-body">
          <ul class="list-group text-lg list-group-underline color-gray ">
            <li><h2>驾驶人信息</h2></li>
            <li class="list-group-item"><x-input label-width="6em" v-model="driver.name" title="驾驶人姓名" placeholder="必填"></x-input></li>
            <!-- <li  @click="certificatetype" class="list-group-item" style="padding:12px 0;">
              <label class="weui-label" style="display: inline-block; width:6em;">证件类型</label>
              <input  class="input-normal" v-model="driver.driver_license_name" disabled placeholder="中国驾照" ></input>
              <span style="color:#C9D0D8;margin-left:-4px; font-size:16px;" v-show="!islicence_type">{{driver.driver_license_name}}</span>
              <span style="color:#000;;margin-left:-4px; font-size:16px;" v-show="islicence_type">{{driver.driver_license_name}}</span>
              <i class="right-arrows icon-input-expansion"></i>
            </li> -->

            <li class="list-group-item" style="padding:14px 0;">
              <label class="weui-label" style="display: inline-block; width:6em;">证件类型
              </label>
               <popup-picker :placeholder="driver.driver_license_name || '中国驾照 C1'" :data="list3" :columns="2" v-model="value4" :show-name="true" class="certificatetype" value-text-align="left"></popup-picker>
               <i class="right-arrows icon-input-expansion"></i>
            </li>

            <li class="list-group-item" style="padding:14px 0;">
              <label class="weui-label" style="display: inline-block; width:6em;">生日
              </label>
              <datetime v-model="driver.birthday"  :min-year=1920 :max-year=2017 @on-change="changeTime" :placeholder="driver.birthday" class="birthday" :default-selected-value="driver.birthday || '2000-11-11'" placeholder="请选择"></datetime>
              <i class="right-arrows icon-input-expansion"></i>
            </li>
            <li><h2>联系人信息</h2></li>
            <li  @click="sextype" class="list-group-item" style="padding:12px 0;">
              <label class="weui-label" style="display: inline-block; width:6em;">称谓</label>
              <input  class="input-normal" v-model="driver.sex" disabled></input>
              <span style="color:#C9D0D8;margin-left:-4px; font-size:16px;" v-show="!sex_type">{{driver.sex}}</span>
              <span style="color:#000;;margin-left:-4px; font-size:16px;" v-show="sex_type">{{driver.sex}}</span>
              <!-- <span class="right-arrows">›</span> -->
              <i class="right-arrows icon-input-expansion"></i>
            </li>
            <li class="list-group-item"><x-input label-width="6em" v-model="driver.contact_name" title="姓名" placeholder="必填"></x-input></li>
            <li class="list-group-item" ><x-input label-width="6em" v-model="driver.phone"  title="手机号码" placeholder="预定后将收到短信通知" :max="11" :show-clear="false"></x-input></li>
            <li class="list-group-item" style="border-bottom:solid 1px #EDEDED;"><x-input :show-clear="false" label-width="6em"  v-model="driver.email" title="邮箱" placeholder="选填,接收订单变更信息"></x-input></li>
          </ul>
        </div>
      </div>
      
    
      
      <div class="panel" v-show="serverShow">
        <div class="panel-heading">
          <span class="text-lg padder-v server-head">门店额外服务</span>
        </div>
        <div class="panel-body weui-cell-custom " style="padding-top:15px;">
          <div class="servers" v-if="newServerList.one.length > 0">
            <p>上门送车</p>
            <server-btn :data="newServerList.one" v-model="serverOne"></server-btn>
          </div>
          <div  class="servers" v-if="newServerList.two.length > 0">
            <p>上门还车</p>
            <server-btn :data="newServerList.two" v-model="serverTwo"></server-btn>
          </div>
          <div class="servers" style="border-bottom:solid 1px #F5F5F5;height:auto; padding-bottom:10px;"  v-if="newServerList.three.length > 0">
            <p>房车管家(代驾)服务</p>
            <label v-for="(item, index) in newServerList.three">
              <span class="labelId" :class="{'labelIds': checkBox1}"></span>
              <input type="checkbox"  v-model="checkBox1" style="display:none;">
              <span class="orange">￥{{item.price | parseInt}}<span class="color-gray">/天</span></span>
              <div class="serverTxt">
              <p>{{item.description}}</p>
              </div>
            </label>
          </div>
          <div  class="servers" style="height:auto; padding-bottom:10px;" v-if="storeList.length > 0">
            <p>其他服务</p>
            <div style="position:relative;" v-for="(item, index) in storeList">
                <label >
                  <span class="labelId" :class="{'labelIds': item.ischeck}"></span>
                  <input type="checkbox"  v-model="item.ischeck" style="display:none;">
                  <span class="orange">￥{{item.price | parseInt}}<span class="color-gray" v-show="item.is_day === '1'">/天</span></span>
                  <div class="serverTxt serverTxts" @click="serverBtns(item)" :class="{'server-min-w': item.is_num === '1'}">
                  <p>{{item.goods_name}}</p>
                  </div>
                </label>
                <p class="count" v-show="item.is_num === '1'">
                  <button @click="subtract(item)">-</button>
                  <i>{{item.nums}}</i>
                  <button @click="increase(item)">+</button>
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <popup v-model="fee_popup_show" width="100%" height="auto" position="bottom" class="fixed-bottom-popup">
      <div class="panel">
        <div class="panel-heading">
          <div class="text padder-v">价格详情</div>
        </div>
        <div class="panel-body bg-light text-small">
        <div class="pull-right">线上支付</div>
          <div class="clear">项目</div>
        </div>
        <div class="panel-body">
          <ul class="list-group list-group-underline">
            <li class="list-group-item">
              <label class="label-title text-muted">基本费用</label>
              <span class="text-muted">{{total_days}}天</span>
              <div class="pull-right">
                <span class="text-default">￥{{total_prices}}</span>
              </div>
            </li>
            <li class="list-group-item" v-if="newListOne.value">
              <label class="label-title text-muted">上门送车</label>
              <span class="text-muted">￥{{newListOne.price | parseInt}}</span>
              <div class="pull-right">
                <span class="text-default">￥{{newListOne.price | parseInt}}</span>
              </div>
            </li>
            <li class="list-group-item" v-if="newListTwo.value">
              <label class="label-title text-muted">上门还车</label>
              <span class="text-muted">￥{{newListTwo.price | parseInt}}</span>
              <div class="pull-right">
                <span class="text-default">￥{{newListTwo.price | parseInt}}</span>
              </div>
            </li>
            <li class="list-group-item" v-if="checkBox1">
              <label class="label-title text-muted">房车管家(代驾)服务</label>
              <span class="text-muted">￥{{newServerList.three[0].price | parseInt}}x{{total_days}}天</span>
              <div class="pull-right">
                <span class="text-default">￥{{newServerList.three[0].price * total_days | parseInt}}</span>
              </div>
            </li>
            <li class="list-group-item" v-for="item in storeList" v-show="item.ischeck">
              <label class="label-title text-muted">{{item.goods_name}}</label>
              <span class="text-muted"><span v-show="item.is_num === '1'">*{{item.nums}}</span></span>
              <div class="pull-right">
                <span v-show="item.is_day === '1'">x{{total_days}}天</span>
                <span class="text-default w-20">￥{{item.price * (item.is_day === '1' ? total_days : 1) * (item.is_num === '1' ? item.nums : 1) | parseInt}}</span>
              </div>
            </li>
            <li class="list-group-item">
              <label class="label-title">订单总价</label>
              <div class="pull-right">
                <span class="text-default">￥{{total}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </popup>

    <div class="fixed-bottom-container" :style="examine" v-show="toLoad">
      <a class="fixed-bottom-container-left"  @click="toggleFeePopup">
        <label class="text-small text-normal">线上支付：</label>
        <span class="text-xlg text-dark">￥{{total}}</span>
        <div class="pull-right text-muted m-t-sm">
          <i class="glyphicon" :class="[fee_popup_show ? 'glyphicon-chevron-down' : 'glyphicon-chevron-up']"></i>
        </div>
      </a>
      <div class="fixed-bottom-container-right" >
        <button class="btn btn-lg btn-custom btn-block"  @click="btnSubmit">提交订单</button>
      </div>
    </div>
    <popup v-model="alertShow" class="reserve" style="height: 175px;">
      <div class="">
        <p>本车已经被预定</p>
        <p>将为您重新搜索相似车辆</p>
      </div>
      <router-link :to="{name: 'list', query: query}" class="reserve_btn">确定</router-link>
    </popup>
    <popup v-model="alertShows" class="reserves" style="height: 194px;">
      <div class="reserves_txt">
        原预定价格¥{{total / total_days | parseInt}}/日均发生变化
        更新后价格为¥{{alter_price}}/日均，
        您可以继续预定
      </div>
      <div class="btn_div">
        <span @click="noShow">取消</span>
        <span @click="goOn">继续</span>
      </div>
    </popup>
    <div class="loadEffect" v-if="isloding">
        <loading-popup></loading-popup>
    </div>
    <div class="add-back"  v-if="isloding"></div>
    <popup v-model="message" class="message" style="height: 56px;" :show-mask="false">
      <h2>{{messagetxt}}</h2>
    </popup>
  </div>
</template>

<script>
import Navheader from '../Common/Navheader'
import { XInput, Checklist, Popup, Alert, Datetime, PopupPicker } from 'vux'
import api from '@/api'
import formatTime from '@/filters/format-time'
import { mapGetters } from 'vuex'
import LoadingPopup from '@/components/loading/popup'
import ServerBtn from '@/components/server-button'
import LoadingCar from '@/components/loading/car'

export default {
  components: {
    Navheader,
    XInput,
    Checklist,
    Popup,
    Alert,
    LoadingPopup,
    ServerBtn,
    LoadingCar,
    Datetime,
    PopupPicker
  },
  filters: {
    parseInt (value) {
      var str = value + ''
      var arr = str.split('.')
      if (arr[1] === '00' || arr[1] === '') {
        return arr[0] * 1
      } else {
        return str.indexOf('.') === -1 ? arr[0] * 1 : str.substring(0, str.indexOf('.') + 3)
      }
    },
    formatTime
  },
  data () {
    return {
      order: {},
      querys: this.$route.query,
      driver: {
        name: '',
        phone: '',
        email: '',
        driver_license_class: '',
        driver_license_name: '中国驾照 C1',
        sex: '先生',
        contact_name: '',
        birthday: ''
      },
      islicence_type: false,
      fee_popup_show: false,
      insurance: ['人身保险', '财产保险'],
      checkBox1: false,
      checkBox2: false,
      checkList: false,
      checkList2: false,
      checkList3: false,
      checkList4: false,
      show2: false,
      message: false,
      messagetxt: '信息填写不完整',
      certificate: false,
      user: false,
      isloding: false,
      rv_data: {
        transmission_case: {
          val: ''
        },
        actuation: {
          val: ''
        },
        child_seats: {
          val: ''
        },
        address_list: [{
          pickup_city: '',
          pickup_name: '',
          return_city: '',
          return_name: ''
        }]
      },
      serverOne: null,
      serverTwo: null,
      total_prices: 0,
      total: 0,
      data: {
        rv_id: '',
        driver_name: '',
        driver_license_class: '',
        pickup_time: '',
        return_time: '',
        fee_rent_total: '',
        fee_child_seate: '',
        contact_email: '',
        extra_service: [],
        contact_name: '',
        driver_birthday: '',
        goods: []
      },
      alertShow: false,
      alertShows: false,
      alter_price: 0,
      issubmit: false,
      serverList: [],
      newServerList: {
        one: [],
        two: [],
        three: [],
        four: []
      },
      newListOne: {
        price: 0
      },
      newListTwo: {
        price: 0
      },
      extra_service: {
        one: [],
        two: [],
        three: [],
        four: []
      },
      serverShow: false,
      one: 0,
      two: 0,
      ones: 0,
      twos: 0,
      submitOne: true,
      toLoad: false,
      rvData: {
        img_cover: '',
        transmission_case: {
          val: ''
        },
        actuation: {
          val: ''
        }
      },
      drivinglist: [
        {value: 1, name: 'C1'},
        {value: 2, name: 'C2'},
        {value: 3, name: 'C3'},
        {value: 4, name: 'B1'},
        {value: 5, name: 'B2'},
        {value: 6, name: 'B3'},
        {value: 7, name: 'A1'},
        {value: 8, name: 'A2'},
        {value: 9, name: 'A3'}
      ],
      sex: false,
      sex_type: true,
      title4: '联动显示文字',
      list3: [{
        name: '中国驾照',
        value: 'china',
        parent: 0
      }, {
        name: '香港驾照',
        value: 'HK',
        parent: 0
      }, {
        name: '国际驾照',
        value: 'USA',
        parent: 0
      }, {
        name: 'C1',
        value: '1',
        parent: 'china'
      }, {
        name: 'C2',
        value: '2',
        parent: 'china'
      }, {
        name: 'C3',
        value: '3',
        parent: 'china'
      }, {
        name: 'B1',
        value: '4',
        parent: 'china'
      }, {
        name: 'B2',
        value: '5',
        parent: 'china'
      }, {
        name: 'B3',
        value: '6',
        parent: 'china'
      }, {
        name: 'A1',
        value: '7',
        parent: 'china'
      }, {
        name: 'A2',
        value: '8',
        parent: 'china'
      }, {
        name: 'A3',
        value: '9',
        parent: 'china'
      }, {
        name: '',
        value: '10',
        parent: 'HK'
      }, {
        name: '',
        value: '11',
        parent: 'USA'
      }],
      value4: [],
      storeList: [],
      servernum: 0,
      goods: []
    }
  },
  beforeRouteLeave (RvBook, RvDetail, next) {
    if (mapGetters.isLoggedin) {
      next({
        path: '/rv/' + RvBook.params.id,
        query: RvBook.query
      })
    } else {
      next()
    }
  },
  methods: {
    resetServerList (arr) {
      for (var i = 0; i < arr.length; i++) {
        arr[i].value = arr[i].id
        switch (arr[i].type) {
          case '2':
            this.newServerList.one.push(arr[i])
            break
          case '3':
            this.newServerList.two.push(arr[i])
            break
          case '4':
            this.newServerList.three.push(arr[i])
            break
        }
      }
    },
    toggleFeePopup () {
      this.fee_popup_show = !this.fee_popup_show
    },
    messagelack () {
      this.message = true
    },
    certificatetype () {
      this.certificate = true
    },
    sextype () {
      this.sex = true
    },
    userlog () {
      this.user = true
    },
    btnSex (name) {
      this.sex_type = true
      this.driver.sex = name
      this.sex = false
    },
    DateDiff () {
      var oDate1, oDate2, iDays
      oDate1 = new Date(formatTime(this.query.pickup_datetime, 'YYYY/MM/DD HH:mm:ss')).getTime()
      oDate2 = new Date(formatTime(this.query.return_datetime, 'YYYY/MM/DD HH:mm:ss')).getTime()
      iDays = parseInt(Math.ceil((oDate2 - oDate1) / 1000 / 60 / 60 / 24))
      return iDays
    },
    btnDriving (ind) {
      let name = 'C1'
      switch (parseInt(ind)) {
        case 1:
          name = 'C1'
          break
        case 2:
          name = 'C2'
          break
        case 3:
          name = 'C3'
          break
        case 4:
          name = 'B1'
          break
        case 5:
          name = 'B2'
          break
        case 6:
          name = 'B3'
          break
        case 7:
          name = 'A1'
          break
        case 8:
          name = 'A2'
          break
        case 9:
          name = 'A3'
          break
      }
      this.driver.driver_license_class = ind
      this.islicence_type = true
      if (ind > 0 && ind <= 9) {
        this.driver.driver_license_name = '中国驾照 ' + name
      } else if (ind === 11) {
        this.driver.driver_license_name = '国际驾照'
      } else if (ind === 10) {
        this.driver.driver_license_name = '香港驾照'
      }
      this.certificate = false
    },
    changeTime () {
      console.log(this.driver.birthday)
    },
    btnSubmit () {
      this.data.rv_id = parseInt(this.$route.params.id)
      this.data.driver_name = this.driver.name
      this.data.contact_name = this.driver.contact_name
      this.data.driver_license_class = this.driver.driver_license_class || 1
      this.data.contact_tel = parseInt(this.driver.phone)
      this.data.pickup_time = this.query.pickup_datetime
      this.data.return_time = this.query.return_datetime
      this.data.fee_rent_total = this.total_prices
      this.data.contact_email = this.driver.email || ''
      this.data.contact_appellation = this.driver.sex
      this.data.pickup_store_id = this.rvData.address_list[0].pickup_store_id
      this.data.return_store_id = this.rvData.address_list[0].return_store_id
      this.data.driver_birthday = this.driver.birthday
      window.localStorage.setItem('usermessage', JSON.stringify(this.driver))
      if (!(/^1[34578]\d{9}$/.test(this.driver.phone)) || this.driver.name.length <= 0 || this.driver.birthday.length <= 0) {
        this.messagetxt = '信息填写不完整'
        this.message = true
      } else if (this.driver.email.length > 0 && !(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/).test(this.driver.email)) {
        this.messagetxt = '请填写正确的邮箱'
        this.message = true
      } else {
        this.isloding = true
        for (var key in this.extra_service) {
          if (this.extra_service[key].length > 0) {
            this.data.extra_service.push(this.extra_service[key][0])
          }
        }
        for (var keys in this.storeList) {
          if (this.storeList[keys].ischeck) {
            this.data.goods.push({id: this.storeList[keys].id, num: this.storeList[keys].nums})
          }
        }
        if (this.submitOne) {
          this.submitOne = false
          this.axios.post(api.comment.add, this.data).then(response => {
            if (response.data.code === 200) {
              this.$router.replace({
                path: '/order/' + response.data.data + '/pay'
              })
              this.submitOne = true
              this.isloding = false
            } else if (response.data.code === 1508) {
              this.alertShow = true
              this.submitOne = true
              this.isloding = false
            } else if (response.data.code === 1521) {
              this.submitOne = true
              this.alertShows = true
              this.isloding = false
              this.alter_price = response.data.data.price
            } else {
              this.isloding = false
              this.messagetxt = response.data.msg
              this.message = true
            }
          })
        }
      }
    },
    noShow () {
      this.alertShows = false
    },
    goOn () {
      this.data.fee_rent_total = this.alter_price * this.total_days
      this.axios.post(api.comment.add, this.data)
      .then(response => {
        if (response.data.code === 200) {
          this.$router.replace({
            path: '/order/' + response.data.data + '/pay'
          })
        } else if (response.data.code === 1508) {
          this.alertShow = true
        } else if (response.data.code === 1521) {
          this.alertShows = true
          this.alter_price = response.data.data.price
        }
      })
    },
    submit () {
      this.issubmit ? this.issubmit = false : this.issubmit = true
      if (this.issubmit) {
        this.total = parseInt(this.total_prices + this.rv_data.child_seats_price * this.total_days)
      } else {
        this.total = this.total_prices
      }
    },
    getRvData () {
      this.axios.get(api.rv.info, {params: {id: this.$route.params.id, s_date: this.query.pickup_datetime, e_date: this.query.return_datetime}})
      .then(response => {
        this.rvData = response.data.data
        this.getPrice(response.data.data.price_detail_list)
        this.getServerList()
        this.getUserMessage()
      })
    },
    getServerList () {
      this.axios.get(api.store.server, {params: {store_id: this.rvData.address_list[0].pickup_store_id}}).then(response => {
        this.serverList = response.data.data.list
        if (response.data.data) {
          this.serverShow = true
          this.toLoad = true
          this.resetServerList(response.data.data.list)
        } else {
          this.serverShow = false
        }
      })
      this.axios.get(api.store.list, {params: {store_id: this.rvData.address_list[0].pickup_store_id}})
      .then(response => {
        if (response.data.code === 200) {
          if (response.data.data.list.length > 0) {
            this.serverAdd(response.data.data.list)
          }
        }
      })
    },
    serverAdd (arr) {
      for (var val of arr) {
        val.ischeck = false
        val.nums = 1
      }
      this.storeList = arr
    },
    getPrice (arr) {
      let price = 0
      for (var i = 0; i < arr.length; i++) {
        price += parseInt(arr[i].price)
      }
      this.total_prices = price
      this.total = price
    },
    getUserMessage () {
      var isLocal = JSON.parse(window.localStorage.getItem('usermessage'))
      if (isLocal) {
        this.driver.name = isLocal.name
        this.islicence_type = true
        this.driver.licence_type = isLocal.licence_type
        this.driver.phone = isLocal.phone
        this.driver.driver_license_class = isLocal.driver_license_class
        this.driver.driver_license_name = isLocal.driver_license_name
        this.driver.sex = isLocal.sex
        this.driver.contact_name = isLocal.contact_name
        this.driver.birthday = isLocal.birthday
        if (isLocal.email) {
          this.driver.email = isLocal.email
        }
      }
    },
    serverBtns (item) {
      if (!item.ischeck) {
        this.total += item.price * 1 * (item.is_num === '1' ? item.nums : 1) * (item.is_day === '1' ? this.total_days : 1)
      } else {
        this.total -= item.price * 1 * (item.is_num === '1' ? item.nums : 1) * (item.is_day === '1' ? this.total_days : 1)
      }
    },
    subtract (item) {
      if (item.nums <= 1) {
        item.nums = 1
      } else {
        item.nums--
        if (item.ischeck) {
          this.total -= item.price * 1 * (item.is_day === '1' ? this.total_days : 1)
        }
      }
    },
    increase (item) {
      item.nums ++
      if (item.ischeck) {
        this.total += item.price * 1 * (item.is_day === '1' ? this.total_days : 1)
      }
    }
  },
  created () {
    this.query = this.querya
    this.getRvData()
  },
  computed: {
    examine () {
      return {
        'z-index': this.fee_popup_show ? 506 : 1
      }
    },
    pickup_date () {
      return getFormatDate(this.query.pickup_datetime).substring(0, 10)
      // return this.query.pickup_datetime.substring(0, 11)
    },
    pickup_day () {
      return '周六'
    },
    pickup_time () {
      return this.query.pickup_datetime.substring(11, 17)
    },
    return_date () {
      return getFormatDate(this.query.return_datetime).substring(0, 10)
      // return this.query.return_datetime.substring(0, 11)
    },
    return_day () {
      return '周日'
    },
    return_time () {
      return this.query.return_datetime.substring(11, 17)
    },
    total_days () {
      return this.DateDiff()
    },
    ...mapGetters({
      isLoggedin: 'isLoggedin',
      isAgency: 'isAgency',
      querya: 'query'
    })
  },
  watch: {
    message (val) {
      if (val) {
        setTimeout(() => {
          this.message = false
        }, 1000)
      }
    },
    serverOne (val) {
      var ind = JSON.parse(val)
      var arr = []
      this.extra_service.one = []
      for (var i = 0; i < this.newServerList.one.length; i++) {
        arr.push(this.newServerList.one[i].value)
        if (ind === this.newServerList.one[i].value) {
          this.newListOne = this.newServerList.one[i]
          this.extra_service.one.push({id: ind})
          this.one = this.newListOne.price
        }
      }
      if (val === '-1') {
        this.extra_service.one = []
      }
      if (arr.indexOf(ind) === -1) {
        this.newListOne = {
          price: 0
        }
        this.one = 0
      }
    },
    serverTwo (val) {
      var ind = JSON.parse(val)
      var arr = []
      this.extra_service.two = []
      for (var i = 0; i < this.newServerList.two.length; i++) {
        arr.push(this.newServerList.two[i].value)
        if (ind === this.newServerList.two[i].value) {
          this.newListTwo = this.newServerList.two[i]
          this.extra_service.two.push({id: ind})
          this.two = this.newListTwo.price
        }
      }
      if (val === '-1') {
        this.extra_service.two = []
      }
      if (arr.indexOf(ind) === -1) {
        this.newListTwo = {
          price: 0
        }
        this.two = 0
      }
    },
    checkBox1 (val) {
      if (val) {
        this.total = this.total * 1 + this.newServerList.three[0].price * this.total_days
        this.extra_service.three.push({id: this.newServerList.three[0].value})
      } else {
        this.total = this.total * 1 - this.newServerList.three[0].price * this.total_days
        this.extra_service.three = []
      }
    },
    checkBox2 (val) {
      if (val) {
        this.total = this.total * 1 + this.newServerList.four[0].price * this.total_days
        this.extra_service.four.push({id: this.newServerList.four[0].value})
      } else {
        this.total = this.total * 1 - this.newServerList.four[0].price * this.total_days
        this.extra_service.four = []
      }
    },
    one (val) {
      this.total = this.total * 1 + val * 1 - this.ones * 1
      this.ones = val
    },
    two (val) {
      this.total = this.total * 1 + val * 1 - this.twos * 1
      this.twos = val
    },
    value4 (val) {
      let ind = parseInt(val[1])
      this.btnDriving(ind)
    }
  }
}
function getFormatDate (value) {
  return value.toLocaleString().replace(/年|月/g, '-').replace(/日/g, ' ')
}
</script>
<style>
.rv-book{
  padding-bottom: 100px;
}
.vux-x-input > .weui-cell__bd > .weui-input,
.vux-x-input > .weui-cell__primary > .weui-input{
  height: 100%;
  position: absolute;
  top:-2px;
  font-size: 16px;
}
.weui-check_label{
  font-size:14px;
}
.fixed-bottom-container{
  z-index: 502;
}
.float_l{
  float: right;
  font-size: 14px;
  line-height: 20px;
}
.float_l span{
  color: #FE7C1E;
}
.serve{
  width: 100%;
  height: 22px;
  line-height: 22px;
}
.weui-cell__ft{
  position: absolute;
  right: 0;
  top:-1px;
}
</style>
