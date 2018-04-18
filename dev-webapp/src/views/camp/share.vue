<template>
  <div class="camp-share">
    <div class="form-add" v-show="!action">
      <div class="share-top clear">
        <div class="share-cancel pull-left text-lg text-thin" @click="goBack">取消</div>
        <div class="share-title pull-left text-lg text-bolder">转发到我的圈子</div>
        <div class="share-publish pull-left text-lg text-bolder link" @click="doSubmit">发布</div>
      </div>
      <div class="app-container-top feed-form">
        <div>
          <div>
            <div class="form-group" style="margin-top:5px;">
              <textarea class="on-top1 form-control style-none resize-none text-lg" rows="4" placeholder="刚刚发现一个好地方，分享给大家..." v-model="content" @focus="popupShow=false"></textarea>
            </div>
            <div class="block padder-v m-b b-b-light">
                <a class="btn btn-add-icon text-muted" @click="popupShow = !popupShow">
                  <i class="fd-emoji" style="color:#8A95A0;"></i>
                </a>
            </div>
            <emoji v-model="popupShow" @insert="insertEmoji"></emoji>
          </div>
        </div>
        <div class="share-info" v-show="data" style="border-radius:0;">

          <div class="pull-left share-info-img m-r"><img :src="data.imgcover | ossResize('small')" width="100%"></div>
          <div class="camp-list-item">
           <div class="text-md text-bolder share-info-name over-omit">{{data.name}}</div>
           <div class="text-muted m-b-sm share-info-others">
            <p class="camp-xing">
              <i v-for="items in xing" class="icon-camp-collection" :class="{'actives': items <= data.score}"></i>
            </p>
            <span v-if="data.price === -2">不详</span>
            <span v-else-if="data.price === -1">免费</span>
            <span v-else>{{data.price}}</span>
            <span class="camp-distance"><i></i>{{data.distance | distance}}</span>
          </div>
          <div class="camp-level-icon camp-level-icons pull-left" :class="{'color-camp2': data.type==1, 'color-park2': data.type==0, 'color-scenic2': data.type==2, 'color-food2': data.type==3, 'color-fix2': data.type==4, 'color-refuel2': data.type==5}"><span :class="{'icon-camp-camp': data.type==1, 'icon-camp-park': data.type==0, 'icon-camp-scenic': data.type==2, 'icon-camp-food': data.type==3, 'icon-camp-service': data.type==4, 'icon-camp-station': data.type==5}"></span></div>
          <div class="camp-norm camp-type-border" :class="{'color-camp1': data.type==1, 'color-park1': data.type==0, 'color-scenic1': data.type==2, 'color-food1': data.type==3, 'color-fix1': data.type==4, 'color-refuel1': data.type==5}">
            {{data.type | camptype}}
          </div>
        </div>
      </div>
      </div>
      <Modal ref="submitModal" class="text-center">
        <loading-dot-move></loading-dot-move>
      </Modal>
<!--       <div class="popup-modal" v-if="popupShow">
        <div class="popup-modal-mask" @click="popupShow = !popupShow"></div>
        <div class="popup-container">
          <div class="emoji-container">
          <ul class="emoji-list block clear">
            <li v-for="item in emoji" v-html="item" @click="insertEmoji">{{item}}</li>
          </ul>
          </div>
        </div>
      </div> -->
    </div>
    <popup v-model="isAlert" width="100%" height="auto" position="bottom" class="deals collect" :show-mask="false">{{dealTxt}}</popup>
  </div>
</template>

<script>
import {Modal, LoadingDotMove, Emoji} from '@/components'
import api from '@/api'
import {Popup} from 'vux'
import {topics} from '@/config'

export default {
  components: {
    Modal,
    LoadingDotMove,
    Popup,
    Emoji
  },
  data: () => ({
    topics: topics,
    data: '',
    dealTxt: '发布成功',
    isAlert: false,
    xing: [1, 2, 3, 4, 5],
    popupShow: false,
    emojiShow: false,
    content: '',
    action: null
  }),
  methods: {
    getData () {
      this.toLoad = false
      document.body.scrollTop = 0
      this.axios.get(api.camp.detail, {
        params: {
          uuid: this.$route.query.u_id
        }
      })
      .then(response => {
        if (response.data.code === 1) {
          this.data = response.data.data
        }
      })
    },
    // 清空数据
    emptyData () {
      this.content = ''
    },

    // 检查内容是否合法
    validate () {
      return this.content.length > 0
    },

    // 发布成功后直接跳会房车圈首页
    doSubmit () {
      if (this.validate()) {
        this.axios.post(api.camp.share, {
          id: parseInt(this.$route.query.id),
          content: this.content
        })
        .then(response => {
          if (response.data.code === 1) {
            this.emptyData()
            this.dealTxt = '发布成功'
            this.isAlert = true
            setTimeout(() => {
              this.$router.replace({name: 'camp_detail', params: {id: this.$route.query.u_id}})
            }, 1000)
          } else {
            this.dealTxt = response.data.msg
            this.isAlert = true
          }
        })
        .catch(error => {
          return Promise.reject(error)
        })
      } else {
      }
    },

    // 插入表情符
    insertEmoji (val) {
      this.content = this.content + val
    },

    // 直接返回列表页，不执行后退
    goBack () {
      this.$router.go(-1)
    }
  },
  created () {
    this.getData()
  },
  watch: {
    onSubmitting (val) {
      this.$refs.submitModal[val ? 'open' : 'close']()
    },
    isAlert (val) {
      if (val) {
        setTimeout(() => {
          this.isAlert = false
        }, 1000)
      }
    }
  }
}
</script>

<style>
.feed-form textarea,
.feed-form .preview{
  padding: 0 0;
}
.btn-add-icon {
  padding: 5px 5px;

  line-height: 18px;
  font-size: 24px;
}
.popup-modal {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  display: block;
  z-index: 200;
}
.popup-modal-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  display: block;
  background: rgba(0,0,0, 0);
  z-index: 0;
}
.popup-container {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 1;
}
.camp-share .popup-container {
  top: 210px;
}
.emoji-container {
  position: relative;
  background: #fff;
}
.emoji-list {
  list-style: none;
  display: table;
  margin: 0 0;
}
.emoji-list li {
  display: inline-block;
  width: 12.5%;
  text-align: center;
  padding: 10px 10px;
  font-size: 24px;
}
.share-info-img img{
  width: 100%;
}
</style>
