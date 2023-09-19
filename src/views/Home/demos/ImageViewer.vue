<template>
  <div class="">
    <ImageViewer
      v-model="showViewer"
      v-model:current-preview-index="currentIndex"
      :preview-src-list="srcList"
      :viewer-title="viewerTitle"
      @switch="handleSwitch"
    />

    <button @click="showViewer = true">Show image viewer</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ImageViewer } from '@/lib/main'
import type { CustomViewerTitle, ViewerSwitchEvent } from '@@/types'

const srcList = [
  'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
  'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
  'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
]

const viewerTitle: CustomViewerTitle = (img, { index, total }) => {
  console.log('img:', img)
  return `${img.alt} (${index + 1}/${total})`
}

const handleSwitch: ViewerSwitchEvent = (index, viewer) => {
  console.log('on switch:', index, viewer)
}

const currentIndex = ref(0)

const showViewer = ref(false)
</script>
