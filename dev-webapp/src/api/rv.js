// const rvList = [
//  { id: 1, title: '奔驰凯伦宾威', sub_title: '4人·自动挡·柴油', img: '../../static/img/rv-1.png', brand: '../../static/img/brand-1.png', fee: '568', fee_unit: '天', fee_currency: '￥' },
//  { id: 2, title: '奔驰凯伦宾威', sub_title: '4人·自动挡·柴油', img: '../../static/img/rv-1.png', brand: '../../static/img/brand-1.png', fee: '568', fee_unit: '天', fee_currency: '￥' },
//  { id: 3, title: '奔驰凯伦宾威', sub_title: '4人·自动挡·柴油', img: '../../static/img/rv-1.png', brand: '../../static/img/brand-1.png', fee: '568', fee_unit: '天', fee_currency: '￥' },
//  { id: 4, title: '奔驰凯伦宾威', sub_title: '4人·自动挡·柴油', img: '../../static/img/rv-1.png', brand: '../../static/img/brand-1.png', fee: '568', fee_unit: '天', fee_currency: '￥' },
//  { id: 5, title: '奔驰凯伦宾威', sub_title: '4人·自动挡·柴油', img: '../../static/img/rv-1.png', brand: '../../static/img/brand-1.png', fee: '568', fee_unit: '天', fee_currency: '￥' },
//  { id: 6, title: '奔驰凯伦宾威', sub_title: '4人·自动挡·柴油', img: '../../static/img/rv-1.png', brand: '../../static/img/brand-1.png', fee: '568', fee_unit: '天', fee_currency: '￥' },
//  { id: 7, title: '奔驰凯伦宾威', sub_title: '4人·自动挡·柴油', img: '../../static/img/rv-1.png', brand: '../../static/img/brand-1.png', fee: '568', fee_unit: '天', fee_currency: '￥' },
//  { id: 8, title: '奔驰凯伦宾威', sub_title: '4人·自动挡·柴油', img: '../../static/img/rv-1.png', brand: '../../static/img/brand-1.png', fee: '568', fee_unit: '天', fee_currency: '￥' },
//  { id: 9, title: '奔驰凯伦宾威', sub_title: '4人·自动挡·柴油', img: '../../static/img/rv-1.png', brand: '../../static/img/brand-1.png', fee: '568', fee_unit: '天', fee_currency: '￥' },
//  { id: 10, title: '奔驰凯伦宾威', sub_title: '4人·自动挡·柴油', img: '../../static/img/rv-1.png', brand: '../../static/img/brand-1.png', fee: '568', fee_unit: '天', fee_currency: '￥' },
//  { id: 11, title: '奔驰凯伦宾威', sub_title: '4人·自动挡·柴油', img: '../../static/img/rv-1.png', brand: '../../static/img/brand-1.png', fee: '568', fee_unit: '天', fee_currency: '￥' }
// ]

const rvDetail = {
  title: '顺旅 魅途版房车',
  sub_title: '4人·自动挡·柴油',
  rater: 4.3,
  brand_img: '../../static/img/brand-1.png',
  brand_name: '',
  comment_count: '156',
  transmission_case: '1',
  expenses_explain: '费用说明',
  notice: '租车须知',
  license_explain: '证件要求',
  img_cover: 'static/img/adv_1.png',
  brand_id: 10001,
  images: [{
    url: '/page',
    img: 'static/img/adv_1.png',
    title: ''
  }, {
    url: '/page',
    img: 'static/img/adv_2.png',
    title: ''
  }, {
    url: '/page',
    img: 'static/img/adv_1.png',
    title: ''
  }],
  fee_personal_insurance: '58',
  fee_property_insurance: '58',
  fee_gps: '58',
  fee_total: '1568',
  fee_average: '156.80'
}

import axios from 'axios'

export default {
  getList (cb) {
    return axios.get('/static/api/rv.json')
    // cb(axios.get('http://localhost:8080/static/data.json'))
    // setTimeout(() => cb(axios.get('http://localhost:8080/static/rv.json')), 10)
    // setTimeout(() => cb(rvList), 100)
  },
  getListCallback (callback) {
    axios.get('/static/rv.json').then(callback)
      // setTimeout(() => cb(axios.get('http://localhost:8080/static/rv.json')), 10)
  },
  getDetail (id, cb, errorCb) {
    setTimeout(() => {
      typeof (id) !== undefined
      ? cb(rvDetail)
      : errorCb({msg: 'error'})
    }, 100)
  }
}
