<p align="center">
  <a href="https://www.npmjs.org/package/vue-previewable-image">
    <img src="https://img.shields.io/npm/v/vue-previewable-image.svg">
  </a>
  <a href="https://npmcharts.com/compare/vue-previewable-image?minimal=true">
    <img src="https://img.shields.io/npm/dm/vue-previewable-image.svg">
  </a>
  <br>
</p>

# vue-previewable-image

A **previewable** image Vue component based on <a href="https://github.com/fengyuanchen/viewerjs" target="_blank">viewerjs</a>.

> TIPS: `vue-previewable-image` needs **Vue** verison to `2.7.0+`.

# Features

- Support preview image via `viewerjs`.
- Support image lazy load.

# Installation

```bash
# pnpm
$ pnpm add vue-previewable-image

# yarn
$ yarn add vue-previewable-image

# npm
$ npm i vue-previewable-image
```

# Usage

```vue
<template>
  <main>
    <PreviewableImage
      :current-preview-index.sync="currentIndex"
      :src="src"
      :preview-src-list="srcList"
      :viewer-title="viewerTitle"
      width="100px"
      @switch="handleSwitch"
    />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PreviewableImage } from 'vue-previewable-image'
import type { CustomViewerTitle, ViewerSwitchEvent } from 'vue-previewable-image'

const src =
  'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'

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
</script>

```

# Attributes

| Prop name | Description | Type | Available value  | Default value |
| :----: | :----: | :----: | :----: | :----: |
| `width` | The `img` container `width` | `string` | - | `undefined` |
| `height` | The `img` container `height` | `string` | - | `undefined` |
| `src` | The `img` 's `src` | `string` | - | `undefined` |
| `alt` | The `img` 's `alt` | `string` | - | `undefined` |
| `lazy` | Weather to enable image lazy load | `boolean` | - | `true` |
| `fit` | The `img` 's `object-ft` | `string` | `fill / contain / cover / none / scale-down` | `fill` |
| `previewSrcList` | Define your picture preview list  | `string[]` or `{ src: string; alt: string}[]` | - | `[]` |
| `currentPreviewIndex` | Current preview image shown index, support `.sync`  | `number` | - | `0` |
| `viewerOptions` | Define <a href="https://github.com/fengyuanchen/viewerjs" target="_blank">viewerjs Options</a> | - | - | `{}` |
| `viewerTitle`| Define viewer title. First argument is `HTMLImageElement` which is generated by `previewSrcList`, second argument is a object `{ index: number; total: number }` which record **current viewer index** and **previewable image count** | `Function` | - | `undefined` |



# Events

| Event name | Description | Callback arguments |
| :---: | :---: | :---: |
| `switch` | Emit when preview image switch. | `(index: number, viewer: Viewer) => void` |


# Slots

| Name | Description |
| :----: | :----: |
| `placeholder` | Define the placeholder content to display when image is not loaded |
| `error` |  Define the content to display when image load error |

# CHANGE LOG

SEE <a href="./CHANGELOG.md" target="_blank">CHANGE LOG</a>.