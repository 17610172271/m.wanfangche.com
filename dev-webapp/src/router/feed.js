const rs = path => {
  return resolve => require(['@/views/' + path], resolve)
}

export default [
  {
    path: '/add_feed',
    component: rs('feed/add'),
    name: 'feed_add',
    meta: {requireAuth: true}
  },
  {
    path: '/feed',
    component: rs('feed/index'),
    children: [
      {
        path: '',
        component: rs('feed/home'),
        name: 'feed',
        meta: {keepAlive: true}
      },
      {
        path: 'follow',
        component: rs('feed/follow'),
        name: 'feed_follow',
        meta: {keepAlive: true}
      },
      {
        path: 'topic/:t_id',
        component: rs('feed/topic'),
        name: 'feed_topic',
        meta: {keepAlive: true}
      },
      {
        path: 'k/:key',
        component: rs('feed/topic-redirect'),
        name: 'feed_topic_redirect'
      },
      {
        path: 'u/:u_id',
        component: rs('feed/user'),
        name: 'feed_user',
        meta: {keepAlive: true}
      },
      {
        path: 'list',
        component: rs('feed/list'),
        name: 'feed_list',
        meta: {keepAlive: true}
      },
      // {
      //   path: 'add',
      //   component: rs('feed/add'),
      //   name: 'feed_add'
      // },
      {
        path: ':id/detail',
        component: rs('feed/detail'),
        name: 'feed_detail'
      },
      {
        path: ':id/thumup',
        component: rs('feed/thumb'),
        name: 'feed_thumb'
      },
      {
        path: ':id/album',
        component: rs('feed/album'),
        name: 'feed_album'
      },
      {
        path: 'message',
        component: rs('feed/message'),
        name: 'feed_message'
      }
    ]
  },
  {
    path: '/faq',
    component: rs('faq/index'),
    children: [
      {
        path: '',
        component: rs('faq/home'),
        name: 'faq'
      },
      {
        path: 'list',
        component: rs('faq/list'),
        name: 'faq_list'
      },
      {
        path: 'add',
        component: rs('faq/add'),
        name: 'faq_add',
        meta: {requireAuth: true}
      },
      {
        path: ':id/detail',
        component: rs('faq/detail'),
        name: 'faq_detail'
      },
      {
        path: ':id/album',
        component: rs('faq/album'),
        name: 'faq_album'
      },
      {
        path: 'search',
        component: rs('faq/search'),
        name: 'faq_search'
      }
    ]
  },
  {
    path: '/camp',
    component: rs('camp/index'),
    children: [
      {
        path: '',
        component: rs('camp/home'),
        name: 'camp'
      },
      {
        path: 'search',
        component: rs('camp/search'),
        name: 'camp_search'
      },
      {
        path: 'detail/:id',
        component: rs('camp/detail'),
        name: 'camp_detail'
      },
      {
        path: 'recovery/:id',
        component: rs('camp/recovery'),
        name: 'camp_recovery'
      },
      {
        path: 'comment/:id',
        component: rs('camp/comment'),
        name: 'camp_comment'
      },
      {
        path: 'list/:id',
        component: rs('camp/list'),
        name: 'comment_list'
      },
      {
        path: 'upimg/:id',
        component: rs('camp/add-img'),
        name: 'add_img'
      },
      {
        path: 'info/:id',
        component: rs('camp/comment-detail'),
        name: 'comment-info'
      },
      {
        path: 'share',
        component: rs('camp/share'),
        name: 'camp_share'
      }
    ]
  },
  {
    path: '/browser',
    component: rs('Common/browser'),
    name: 'browser'
  },
  {
    path: '/amap',
    component: rs('Common/amap'),
    name: 'allAmap'
  },
  {
    path: '/topic',
    component: rs('topic/index'),
    children: [
      {
        path: '',
        component: rs('topic/home'),
        name: 'topic'
      },
      {
        path: 'k/:key',
        component: rs('topic/key'),
        name: 'topic_key'
      },
      {
        path: ':id',
        component: rs('topic/list'),
        name: 'topic_feed'
      }
    ]
  },
  {
    path: '/ufans/:u_id',
    component: rs('u/fans'),
    name: 'u_fans'
  },
  {
    path: '/ufollow/:u_id',
    component: rs('u/follow'),
    name: 'u_follow'
  },
  {
    path: '/u/:u_id',
    component: rs('u/index'),
    children: [
      {
        path: '',
        component: rs('u/home'),
        name: 'u_home'
      },
      {
        path: 'feed/:id',
        component: rs('u/feed-detail'),
        name: 'u_feed_detail'
      }
    ]
  }
]
