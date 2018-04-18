<template>
  <div class="wrapper">
    <album-upload v-model="images"></album-upload>
    <div>
      {{images}}
    </div>
  </div>
  
</template>

<script>
import {AlbumUpload} from '@/components'

export default {
  components: {
    AlbumUpload
  },
  data: () => ({
    images: []
  })
}

</script>
