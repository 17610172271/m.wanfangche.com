<template>
  <album-upload></album-upload>
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
