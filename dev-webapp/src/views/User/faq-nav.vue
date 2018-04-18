<template>
  <ul class="nav-inline bg-white b-b  m-b-sm">
    <li class="">
      <router-link :to="{name: 'user_faq'}" replace>
        <span class=" text-xlg"><i class="fa fa-question-circle text-info"></i></span> 
        <span class="text-normal">我的提问</span>
      </router-link>
    </li>
    <li class="">
      <router-link :to="{name: 'user_faq_answer'}" replace>
        <span class=" text-xlg"><i class="fa fa-comment text-default"></i></span>
        <span class="text-normal">我的回答</span>
      </router-link>
    </li>
    <li class="">
      <router-link :to="{name: 'user_faq_follow'}" replace>
        <span class=" text-xlg"><i class="fa fa-eye text-success"></i></span>
        <span class="text-normal">我关注的</span>
      </router-link>
    </li>
  </ul>
</template>
