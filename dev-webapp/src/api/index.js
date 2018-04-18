export const BASE_URL = '/server/rental/public' // 租赁业务接口

export const FEED_MODULE = '../../community/public' // 房车圈接口

// 房车圈
export const feed = {
  auth: FEED_MODULE + 'common/auth',
  list: FEED_MODULE + '/index/feed',
  detail: FEED_MODULE + '/post/info',
  add: FEED_MODULE + '/post/create', // 发布
  like: FEED_MODULE + '/post/credit', // 点赞
  commentLike: FEED_MODULE + '/post/replyCredit', // 评论点赞
  likeList: FEED_MODULE + '/post/creditList', // 点赞列表
  adv: '../../../static/mock/feed_home_adv.json',
  comments: FEED_MODULE + '/post/content',
  reply: FEED_MODULE + '/post/reply',
  follow: FEED_MODULE + '/relation/follow', // 加关注|取消关注
  delete: FEED_MODULE + '/post/del',
  myMessage: FEED_MODULE + '/notify/nlist',
  myFeed: FEED_MODULE + '/user/postlist',
  userFeed: FEED_MODULE + '/user/postlist',
  myFaq: FEED_MODULE + '/user/wdpostlist',
  myFans: FEED_MODULE + '/user/fans',
  newMessageNumber: FEED_MODULE + 'user/getUserNotifyNum',
  userInfo: FEED_MODULE + '/user/info',
  userFans: FEED_MODULE + '/user/fans',
  sendmsg: FEED_MODULE + '/common/sendmsg', // 发送验证码
  checkMsg: FEED_MODULE + '/common/checkmsg', // 手机验证
  userFollow: FEED_MODULE + '/user/follow',
  down: FEED_MODULE + '/common/checkVersion'
}

// 营地
export const camp = {
  list: FEED_MODULE + '/camp/list', // 营地列表
  detail: FEED_MODULE + '/camp/info', // 营地详情
  imgList: FEED_MODULE + '/camp/imgList', // 营地图集
  putError: FEED_MODULE + '/camp/putError', // 营地纠错
  collect: FEED_MODULE + '/camp/collect', // 营地收藏
  myCamp: FEED_MODULE + '/camp/myCamp', // 我的营地
  replyList: FEED_MODULE + '/camp/replyList',
  replyCredit: FEED_MODULE + '/camp/replyCredit',
  reply: FEED_MODULE + '/camp/reply',
  replyInfo: FEED_MODULE + '/camp/replyInfo',
  share: FEED_MODULE + '/camp/shareCamp',
  comdel: FEED_MODULE + '/camp/delReply'
}

// 问答
export const faq = {
  list: FEED_MODULE + '/wdpost/feed',
  detail: FEED_MODULE + '/wdpost/info',
  add: FEED_MODULE + '/wdpost/create',
  comments: FEED_MODULE + '/wdpost/content',
  tags: FEED_MODULE + '/topic/tlist',
  follow: FEED_MODULE + '/wdpost/follow',
  reply: FEED_MODULE + '/wdpost/reply',
  digg: FEED_MODULE + '/wdpost/digg',
  search: FEED_MODULE + '/wdpost/search'
}

// 话题
export const topic = {
  list: FEED_MODULE + 'topic/tlist',
  detail: FEED_MODULE + 'topic/index',
  feed: FEED_MODULE + 'topic/posts'
}

// 租赁业务
export const rental = {
  auth: FEED_MODULE + 'common/auth',
  account: FEED_MODULE + 'common/auth',
  upload: 'common/upload',
  common: {
    currentLocation: 'city/city/getCode' // 根据坐标获取城市
  },
  order: {
    submit: 'Account/Login',
    list: 'user/order/list',
    detail: 'order/order/find',
    cancel: 'common/valicode',
    find: 'user/order/find',
    log: 'User/Account/validateTel'
  },
  adv: {
    list: 'adv/adv/list',
    detail: '',
    hotCity: 'topcontent/topcontent/find',
    hotRv: ''
  },
  rv: {
    list: 'rv/rv/list',
    detail: 'rvcomment/rvcomment/list',
    info: 'rv/rv/find',
    fee: 'rvinfo/rvinfo/find',
    find: 'rvcomment/rvcomment/find',
    add: 'user/rvcomment/add',
    dateprice: 'rvdateprice/rvdateprice/list',
    hotlist: 'rv/rv/hotLists',
    wxcode: 'common/wechatSign',
    hotStoreList: 'rv/rv/hotAgencylist'
  },
  comment: {
    list: '',
    detail: 'user/answer/add',
    add: 'order/order/add'
  },
  store: {
    detail: 'store/store/find',
    server: 'store/store/extraList',
    list: 'store/store/goodsList'
  },
  city: {
    list: 'city/city/list',
    forReturn: 'rvtakeback/rvtakeback/list'
  },
  user: {
    list: 'User/User/find',
    detail: 'User/User/find',
    add: 'user/answer/add',
    remove: 'user/order/cancel',
    register: 'common/sendcode', // h5接口
    useradd: 'User/Account/add',
    detection: 'User/Account/validateTel',
    fastlogin: 'Account/fastLogin',
    update: FEED_MODULE + 'user/setting',
    updAvatar: 'User/User/updAvatar',
    updatePwd: 'User/User/updatePwd',
    wechatLogin: 'User/Account/wechatLogin',
    wechatAuth: 'User/Account/wechatAuth',
    bindTel: FEED_MODULE + '/user/bangtel',
    bindWechat: FEED_MODULE + '/user/bangwechat',
    notifyNum: FEED_MODULE + 'user/getUserNotifyNum',
    notifyList: FEED_MODULE + 'notify/nlist',
    brandList: FEED_MODULE + 'common/brandList',
    modelList: FEED_MODULE + 'common/rvTypeList',
    carCertify: FEED_MODULE + 'user/authRv',
    editCertify: FEED_MODULE + 'user/editAuthRv',
    detailCertify: FEED_MODULE + 'user/rvInfo'
  },
  pay: {
    open: 'Pay/Pay/getunionid',
    pay: 'Pay/Pay/payment'
  },
  agency: {
    home: 'agency/index',
    list: 'agency/rvList',
    find: 'agency/find',
    citylist: 'agency/cityList'
  }
}

export default {
  BASE_URL,
  FEED_MODULE,
  ...rental,
  feed,
  faq,
  topic,
  camp
}
