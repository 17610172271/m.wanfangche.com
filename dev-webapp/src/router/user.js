const rs = path => {
  return resolve => require(['@/views/User/' + path], resolve)
}

export default {
  path: '/user',
  component: rs('index'),
  meta: {requireAuth: true},
  children: [
    {
      path: '',
      component: rs('Home'),
      name: 'user'
    },
    {
      path: 'order',
      component: rs('Order'),
      name: 'user_order'
    },
    {
      path: 'message',
      component: rs('Message'),
      name: 'user_message'
    },
    {
      path: 'messages',
      component: rs('Messages'),
      children: [
        {
          path: 'comments',
          component: rs('messages-comments'),
          name: 'messages_comments'
        },
        {
          path: 'thumb',
          component: rs('messages-thumb'),
          name: 'messages_thumb'
        },
        {
          path: 'notice',
          component: rs('messages-notice'),
          name: 'messages_notice'
        }
      ]
    },
    {
      path: 'feed',
      component: rs('feed'),
      name: 'user_feed'
    },
    {
      path: 'fans',
      component: rs('fans'),
      name: 'user_fans'
    },
    {
      path: 'follow',
      component: rs('follow'),
      name: 'user_follow'
    },
    {
      path: 'faq',
      component: rs('faq'),
      name: 'user_faq'
    },
    {
      path: 'faq_answer',
      component: rs('faq-answer'),
      name: 'user_faq_answer'
    },
    {
      path: 'faq_follow',
      component: rs('faq-follow'),
      name: 'user_faq_follow'
    },
    {
      path: 'setting',
      component: rs('Setting'),
      name: 'user_setting'
    },
    {
      path: 'setting/password',
      component: rs('password'),
      name: 'setting_password'
    },
    {
      path: 'setting/bind-tel',
      component: rs('bind-tel'),
      name: 'bind_tel'
    },
    {
      path: 'setting/edit-tel',
      component: rs('edit-tel'),
      name: 'edit_tel'
    },
    {
      path: 'setting/car-certify',
      component: rs('car-certify'),
      name: 'car_certify'
    },
    {
      path: 'camp',
      component: rs('camp'),
      name: 'user_camp'
    }
  ]
}
