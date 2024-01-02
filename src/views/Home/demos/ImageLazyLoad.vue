<template>
  <div>
    <PreviewableImage
      v-model:current-preview-index="currentIndex"
      :src="src"
      :lazy="true"
      width="100px"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PreviewableImage } from '@/lib/main'

const src =
  'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'

const currentIndex = ref(0)
</script>
