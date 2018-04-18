# query-nav

## 说明

在一些列表应用中，我们希望通过 路由的query来区分当前导航位置，

例如 `/article?status=all`

该组件就是解决列表内单个级别路由切换的问题

## 示例

```
<template>
  <div>
    <query-nav v-model="navList"></query-nav>
  </div>
</template>

<script>
import {QueryNav} from '@/components'

const navList = [
  {name: 'article', status: 'all', title: '全部'},
  {name: 'article', status: 'published', title: '已发布'},
  {name: 'article', status: 'draft', title: '草稿'},
  {name: 'article', status: 'sticked', title: '置顶'},
  {name: 'article', status: 'recommended', title: '推荐'},
  {name: 'article', status: 'plan', title: '定时'}
]
export default {
  components: {
    QueryNav
  },
  data: () => ({
    navList: navList
  })
}
</script>
```


