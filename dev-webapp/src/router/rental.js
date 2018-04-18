import List from '@/views/List'
import Rv from '@/views/Rv'
import Pay from '@/views/Pay'
import RvDetail from '@/views/Rv/Detail'
import RvComment from '@/views/Rv/Comment'
import RvAlbum from '@/views/Rv/Album'
import RvMeta from '@/views/Rv/Meta'
import RvBook from '@/views/Rv/Book'
import Comment from '@/views/Comment'
import CommentAlbum from '@/views/Comment/Album'
import Order from '@/views/Order'
import OrderDetail from '@/views/Order/Detail'
import OrderComment from '@/views/Order/Comment'
import OrderPay from '@/views/Order/Pay'
import OrderEvaluate from '@/views/Order/Evaluate'
import OrderWechat from '@/views/Pay/Wechat'
import OrderAlipay from '@/views/Pay/Alipay'
import Page from '@/views/Page'
import City from '@/views/City'
import OpenOrder from '@/views/Open/Order'
import Store from '@/views/Store'
import Agency from '@/views/agency'
import Album from '@/views/Album'
import Errfour from '@/views/err'
import cost from '@/views/cost'
import ErrEmpty from '@/views/err/err-empty'
import ErrNothing from '@/views/err/err-nothing'
import Yunnan from '@/views/Hotcity/yunnan'
import Neimeng from '@/views/Hotcity/neimeng'
import store from '@/store'
import Refresh from '@/demo/refresh'
import rental from '@/views/Home'
import AgencyCity from '@/views/city/ag-city'
import Agreement from '@/views/User/agreement'
import Download from '@/views/download'

// const rs = path => {
//   return resolve => require(['@/views/' + path], resolve)
// }

export default [
  {
    path: '/agreement',
    component: Agreement,
    name: 'agreement'
  },
  {
    path: '/download',
    component: Download,
    name: 'download'
  },
  {
    path: '/city',
    component: City,
    name: 'city'
  },
  {
    path: '/rental',
    component: rental,
    name: 'rental'
  },
  {
    path: '/refreshs',
    component: Refresh,
    name: 'refresh'
  },
  {
    path: '/err',
    component: Errfour,
    name: 'err'
  },
  {
    path: '/cost/',
    component: cost,
    name: 'cost'
  },
  {
    path: '/errempty',
    component: ErrEmpty,
    name: 'errempty'
  },
  {
    path: '/errnothing',
    component: ErrNothing,
    name: 'errnothing'
  },
  {
    path: '/list',
    component: List,
    name: 'list'
  },
  {
    path: '/pay',
    component: Pay,
    children: [
      {
        path: 'wechat',
        component: OrderWechat,
        name: 'pay_wechat'
      },
      {
        mode: 'history',
        path: 'alipay',
        component: OrderAlipay,
        name: 'pay_alipay'
      }
    ]
  },
  {
    path: '/rv/:id',
    component: Rv,
    children: [
      {
        path: '',
        component: RvDetail,
        name: 'rv_detail'
      },
      {
        path: 'comment',
        component: RvComment,
        name: 'rv_comment'
      },
      {
        path: 'meta',
        component: RvMeta,
        name: 'rv_meta'
      },
      {
        path: 'album',
        component: RvAlbum,
        name: 'rv_album'
      },
      {
        path: 'book',
        component: RvBook,
        name: 'rv_book',
        beforeEnter: (to, from, next) => {
          if (!store.getters.isLoggedin) {
            next({
              name: 'rv_detail',
              query: to.query,
              params: to.params
            })
          } else {
            next()
          }
        }
      }
    ]
  },
  {
    path: '/comment/:id',
    component: Comment,
    name: 'comment',
    children: [
      {
        path: 'album',
        component: CommentAlbum,
        name: 'comment_album'
      }
    ]
  },
  {
    path: '/order/:id',
    component: Order,
    children: [
      {
        path: '',
        component: OrderDetail,
        name: 'order_detail'
      },
      {
        path: 'comment',
        component: OrderComment,
        name: 'order_comment'
      },
      {
        path: 'pay',
        component: OrderPay,
        name: 'order_pay'
      },
      {
        path: 'evaluate',
        component: OrderEvaluate,
        name: 'order_evaluate'
      }
    ]
  },
  {
    path: '/open_order',
    component: OpenOrder,
    name: 'open_order'
  },
  {
    path: '/store/:id',
    component: Store,
    name: 'store'
  },
  {
    path: '/agency/:id',
    component: Agency,
    name: 'agency'
  },
  {
    path: '/page',
    component: Page,
    name: 'page'
  },
  {
    path: '/album/:id',
    component: Album,
    name: 'album'
  },
  {
    path: '/yunnan',
    component: Yunnan,
    name: 'yunnan'
  },
  {
    path: '/neimeng',
    component: Neimeng,
    name: 'neimeng'
  },
  {
    path: '/agnecycity',
    component: AgencyCity,
    name: 'agencyCity'
  }
]
