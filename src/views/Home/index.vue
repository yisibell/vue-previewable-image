<template>
  <main class="home">
    <DemoPanel title="Basic Usage" :initial-expand="true">
      <template #description>
        Using
        <code class="language-markup"> {{ `<PreviewableImage />` }} </code>
        component. Click to preview the image.
      </template>

      <PreviewableImageDemo />

      <template #code>
        <pre class="language-markup">
          <code>{{ formatLibName(PreviewableImageDemoCode)  }}</code>
        </pre>
      </template>
    </DemoPanel>

    <DemoPanel title="ImageViewer Usage" :initial-expand="false">
      <template #description>
        Using
        <code class="language-markup"> {{ `<ImageViewer />` }} </code>
        component.
      </template>

      <ImageViewerDemo />

      <template #code>
        <pre class="language-markup">
          <code>{{ formatLibName(ImageViewerDemoCode)  }}</code>
        </pre>
      </template>
    </DemoPanel>

    <DemoPanel title="Image Lazy Loading" :initial-expand="false">
      <template #description>
        Set
        <code class="language-markup"> lazy </code> to
        <code class="language-markup"> true </code> (default) to enable image
        lazy loading.
      </template>

      <ImageLazyLoadDemo />

      <template #code>
        <pre class="language-markup">
          <code>{{ formatLibName(ImageLazyLoadDemoCode)  }}</code>
        </pre>
      </template>
    </DemoPanel>
  </main>
</template>

<script lang="ts" setup>
import { formatLibName } from '@/utils'
import { onMounted } from 'vue'
import prismjs from 'prismjs'
import PreviewableImageDemo from './demos/PreviewableImage.vue'
import PreviewableImageDemoCode from './demos/PreviewableImage.vue?raw'

import ImageViewerDemo from './demos/ImageViewer.vue'
import ImageViewerDemoCode from './demos/ImageViewer.vue?raw'

import ImageLazyLoadDemo from './demos/ImageLazyLoad.vue'
import ImageLazyLoadDemoCode from './demos/ImageLazyLoad.vue?raw'

onMounted(() => {
  prismjs.highlightAll()
})

defineOptions({
  name: 'HomeView',
})
</script>

<style lang="scss" scoped>
.home {
  width: 1000px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 16px 0;
}
</style>
