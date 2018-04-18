const rs = path => {
  return resolve => require(['@/demo/' + path], resolve)
}

export default {
  path: '/demo',
  component: rs('index'),
  children: [
    {
      path: '',
      component: rs('home'),
      name: 'demo'
    },
    {
      path: 'image-group',
      component: rs('image-group'),
      name: 'image-group'
    },
    {
      path: 'feed',
      component: rs('feed'),
      name: 'demo-feed'
    },
    {
      path: 'feed/:id/detail',
      component: rs('feed-detail'),
      name: 'demo-feed-detail'
    },
    {
      path: 'go-back',
      component: rs('go-back'),
      name: 'go-back'
    },
    {
      path: 'page',
      component: rs('page'),
      name: 'demo-page'
    },
    {
      path: 'page-detail',
      component: rs('page-detail'),
      name: 'page-detail'
    },
    {
      path: 'location',
      component: rs('location'),
      name: 'location'
    },
    {
      path: 'wechat-share',
      component: rs('wechat-share'),
      name: 'wechat-share'
    },
    {
      path: 'upload',
      component: rs('upload'),
      name: 'upload'
    },
    {
      path: 'sample-upload',
      component: rs('sample-upload'),
      name: 'sample-upload'
    },
    {
      path: 'album-upload',
      component: rs('album-upload'),
      name: 'album-upload'
    },
    {
      path: 'calendar',
      component: rs('calendar'),
      name: 'calendar'
    },
    {
      path: 'calendar-price',
      component: rs('calendar-price'),
      name: 'calendar-price'
    },
    {
      path: 'city-picker',
      component: rs('city-picker'),
      name: 'city-picker'
    },
    {
      path: 'input-value',
      component: rs('input-value'),
      name: 'input-value'
    },
    {
      path: 'loading',
      component: rs('loading'),
      name: 'loading'
    },
    {
      path: 'modal',
      component: rs('modal'),
      name: 'modal'
    },
    {
      path: 'popup',
      component: rs('popup'),
      name: 'popup'
    },
    {
      path: 'scroll-refresh',
      component: rs('scroll-refresh'),
      name: 'scroll-refresh'
    },
    {
      path: 'video',
      component: rs('video'),
      name: 'video'
    },
    {
      path: 'swiper',
      component: rs('swiper'),
      name: 'swiper'
    },
    {
      path: 'map',
      component: rs('map'),
      name: 'map'
    },
    {
      path: 'amap',
      component: rs('amap'),
      name: 'amap'
    }
  ]
}
