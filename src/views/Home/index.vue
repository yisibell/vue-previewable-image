<template>
  <main class="home">
    <div class="home-header">
      <h1 class="home-header__title">Vue Previewable Image</h1>
      <p class="home-header__sub-title">
        A previewable image Vue component based on viewerjs.
      </p>
    </div>

    <div class="home-demos">
      <div class="home-demos__item">
        <div class="home-demos__title">
          1. Using
          <code class="language-markup"> {{ `<PreviewableImage />` }} </code>
          component.
        </div>
        <div class="home-demos__code">
          <pre class="language-markup">
            <code>{{ formatLibName(PreviewableImageDemoCode)  }}</code>
          </pre>
        </div>
        <div class="home-demos__preview"><PreviewableImageDemo /></div>
      </div>

      <div class="home-demos__item">
        <div class="home-demos__title">
          2. Using
          <code class="language-markup"> {{ `<ImageViewer />` }} </code>
          component.
        </div>
        <div class="home-demos__code">
          <pre class="language-markup">
            <code>{{ formatLibName(ImageViewerDemoCode)  }}</code>
          </pre>
        </div>
        <div class="home-demos__preview"><ImageViewerDemo /></div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import 'prismjs'
import PreviewableImageDemo from './demos/PreviewableImage.vue'
import PreviewableImageDemoCode from './demos/PreviewableImage.vue?raw'
import ImageViewerDemo from './demos/ImageViewer.vue'
import ImageViewerDemoCode from './demos/ImageViewer.vue?raw'
import { formatLibName } from '@/utils'
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
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

.home-header {
  margin-bottom: 100px;
  &__title {
    text-align: center;
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-size: 40px;
    color: var(--text-color--primary);
  }

  &__sub-title {
    text-align: center;
    color: var(--text-color--secondary);
    font-size: 20px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
      sans-serif;
    padding: 12px 200px;
  }
}

.home-demos {
  &__title {
    color: var(--text-color--secondary);
    font-size: 18px;
    padding: 10px 0;
  }

  &__item {
    margin-bottom: 16px;
  }
}
</style>
