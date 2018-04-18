<template>
  <div class="wrapper">
    <div class="block">
      <image-group :list="images" :col="col"></image-group>
    </div>

    <div>
      列：<a class="btn" @click="setCol(i)" v-for="i in 6">{{i}}</a>
    </div>
    
    <h3>Props</h3>
    <table class="table">
      <thead>
        <tr class="text-muted">
          <th>Name</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>list</td>
          <td>Array | String</td>
          <td></td>
          <td>图片列表</td>
        </tr>
        <tr>
          <td>col</td>
          <td>Number</td>
          <td>3</td>
          <td>默认显示的列数</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <div class="panel">
      <pre><code>import {ImageGroup} from '@/components'</code></pre>
    </div>
  </div>
</template>

<script>
import {ImageGroup} from '@/components'

const images = [
  'http://img01.wanfangche.com/public/upload/201712/27/5a42fb086c62c.jpg',
  'http://img01.wanfangche.com/public/upload/201712/27/5a42fb0aa594f.jpg',
  'http://img01.wanfangche.com/public/upload/201712/27/5a42fb0cd99ff.jpg',
  'http://img01.wanfangche.com/public/upload/201712/27/5a42fb09e107e.jpg',
  'http://img01.wanfangche.com/public/upload/201712/27/5a42fb095e4e2.jpg',
  'http://img01.wanfangche.com/public/upload/201712/27/5a42fb0cef936.jpg',
  'http://img01.wanfangche.com/public/upload/201712/27/5a42fb0b8818d.jpg',
  'http://img01.wanfangche.com/public/upload/201712/27/5a42fb0ad7260.jpg',
  'http://img01.wanfangche.com/public/upload/201712/27/5a42fb099a7de.jpg'
]

export default {
  components: {
    ImageGroup
  },
  data: () => ({
    images: [],
    col: 3,
    code: '<image-group :list="images" :col="5"></image-group>'
  }),
  methods: {
    setCol (i) {
      this.col = i
    }
  },
  mounted () {
    setTimeout(() => {
      this.images = images
    }, 100)
  }
}
</script>
