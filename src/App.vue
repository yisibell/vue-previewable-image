<template>
  <main>
    <PreviewableImage
      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      width="100px"
      :preview-src-list="srcList"
      :viewer-title="viewerTitle"
      @switch="handleSwitch"
    />
  </main>
</template>

<script setup lang="ts">
import type { CustomViewerTitle, ViewerSwitchEvent } from '~~/types'

import PreviewableImage from '@/components/PreviewableImage.vue'

const srcList = [
  'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
  'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
]

const viewerTitle: CustomViewerTitle = (img, { index, total }) => {
  return `${img.alt} (${index + 1}/${total})`
}

const handleSwitch: ViewerSwitchEvent = (index, viewer) => {
  console.log(index, viewer)
}
</script>
