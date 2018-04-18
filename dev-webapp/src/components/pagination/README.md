# 分页组件

pagination

## 说明

会自动在路由后加入 `?page=1` 参数，并保持原来路由中的query内容

## props

|name|type|defalut|description|
|---|---|---|---|

## 示例
```
<template>
  <div>
    <div class="text-center m-t-lg m-b-lg">
      <pagination></pagination>
    </div>
  </div>
</template>

<script>
import {Pagination} from '@/components'

export default {
  components: {
    Pagination
  }
}
</script>
```
