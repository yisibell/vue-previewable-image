# Image Viewer Component

# Usage

```vue
<template>
  <main>
    <ImageViewer
      v-model="showViewer"
      :current-preview-index.sync="currentIndex"
      :preview-src-list="srcList"
      :viewer-title="viewerTitle"
      @switch="handleSwitch"
    />

    <button @click="handleShowImageViewer">show viewer</button>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ImageViewer } from 'vue-previewable-image'
import type { CustomViewerTitle, ViewerSwitchEvent } from 'vue-previewable-image'

const srcList = [
  'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
  'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
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
const handleShowImageViewer = () => {
  showViewer.value = true
}
</script>

```

# Attributes

| Prop name | Description | Type | Available value  | Default value |
| :----: | :----: | :----: | :----: | :----: |
| `vModel` | Showing or hide image viewer | `boolean` | - | `false` |
| `zIndex` | Define the CSS `z-index` value of the viewer in modal mode | `number` or `string` | - | `2015` |
| `previewSrcList` | Define your previewable image list  | `string[]` or `{ src: string; alt: string}[]` | - | `[]` |
| `currentPreviewIndex` | Current preview image shown index, support `.sync`  | `number` | - | `0` |
| `viewerOptions` | Define <a href="https://github.com/fengyuanchen/viewerjs" target="_blank">viewerjs Options</a> | - | - | `{}` |
| `viewerTitle`| Define viewer title. First argument is `HTMLImageElement` which is generated by `previewSrcList`, second argument is a object `{ index: number; total: number }` which record **current viewer index** and **previewable image count** | `Function` | - | `undefined` |


# Events

| Event name | Description | Callback arguments |
| :---: | :---: | :---: |
| `switch` | Emit when preview image switch. | `(index: number, viewer: Viewer) => void` |