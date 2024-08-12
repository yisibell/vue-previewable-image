<template>
  <div
    ref="lazyloadTrigger"
    class="previewable-image"
    :style="[{ width, height }, imgStyleVars]"
  >
    <div v-if="lazy && lazyloading" class="previewable-image__placeholder">
      <slot name="placeholder">Loading...</slot>
    </div>
    <div v-else-if="lazy && lazyloadError" class="previewable-image__error">
      <slot name="error">Load Error</slot>
    </div>
    <img
      v-else
      :src="lazySrc"
      :alt="alt"
      :referrerpolicy="referrerPolicy"
      :class="[
        'previewable-image__inner',
        { 'previewable-image__preview': hasPreviewList },
      ]"
      @click="handleImgView"
    />

    <ImageViewer
      v-if="initViewer"
      v-model="showImageViewer"
      :current-preview-index.sync="currentViewerIndex"
      :preview-src-list="previewSrcList"
      :viewer-options="viewerOptions"
      :viewer-title="viewerTitle"
      :z-index="zIndex"
      @switch="handleSwitch"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, computed } from 'vue'
import { useImageLazyload } from '@/composables/useImageLazyload'
import ImageViewer from './ImageViewer.vue'
import type { PropType } from 'vue'
import type {
  PreviewableSrcListItem,
  ViewerOptions,
  CustomViewerTitle,
  ViewerType,
} from '~~/types'

import 'viewerjs/dist/viewer.css'

export default defineComponent({
  name: 'PreviewableImage',
  components: {
    ImageViewer,
  },
  props: {
    width: {
      type: String,
      default: undefined,
    },
    height: {
      type: String,
      default: undefined,
    },
    src: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
    referrerPolicy: {
      type: String,
      default: undefined,
    },
    fit: {
      type: String,
      default: 'fill',
    },
    zIndex: {
      type: [Number, String],
      default: 2015,
    },
    previewSrcList: {
      type: Array as PropType<PreviewableSrcListItem[]>,
      default: () => [],
    },
    currentPreviewIndex: {
      type: Number,
      default: 0,
    },
    viewerOptions: {
      type: Object as PropType<ViewerOptions>,
      default: () => ({}),
    },
    viewerTitle: {
      type: Function as PropType<CustomViewerTitle>,
      default: undefined,
    },
    lazy: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['switch', 'update:currentPreviewIndex', 'load', 'error'],
  setup(props, { emit }) {
    const { previewSrcList, currentPreviewIndex } = toRefs(props)

    const imgStyleVars = computed(() => {
      return {
        '--img-object-fit': props.fit,
      }
    })

    const {
      lazySrc,
      lazyloadTrigger,
      lazyloading,
      lazyloadError,
      lazyloadSuccess,
    } = useImageLazyload(
      props.src,
      props.lazy,
      (e) => {
        emit('load', e)
      },
      (e) => {
        emit('error', e)
      },
    )

    const hasPreviewList = computed(
      () => previewSrcList.value && previewSrcList.value.length > 0,
    )

    const initViewer = computed(() => {
      if (!hasPreviewList.value) return false
      // make sure the images in viewer could lazy load
      if (props.lazy && !lazyloadSuccess.value) return false

      return true
    })

    const showImageViewer = ref(false)

    const handleImgView = () => {
      if (hasPreviewList.value) {
        showImageViewer.value = true
      }
    }

    const currentViewerIndex = computed({
      get() {
        return currentPreviewIndex.value
      },
      set(value: number) {
        emit('update:currentPreviewIndex', value)
      },
    })

    const handleSwitch = (index: number, viewer: ViewerType) => {
      emit('switch', index, viewer)
    }

    return {
      lazyloadTrigger,
      imgStyleVars,
      hasPreviewList,
      lazySrc,
      lazyloading,
      lazyloadError,
      lazyloadSuccess,
      showImageViewer,
      handleImgView,
      currentViewerIndex,
      handleSwitch,
      initViewer,
    }
  },
})
</script>

<style lang="scss">
.previewable-image {
  display: inline-block;
  position: relative;
  overflow: hidden;

  &__inner {
    object-fit: var(--img-object-fit);
  }

  &__preview {
    cursor: pointer;
  }

  &__error,
  &__placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #c0c4cc;
    vertical-align: middle;
  }

  &__inner,
  &__error,
  &__placeholder {
    width: 100%;
    height: 100%;
    background: #f5f7fa;
  }
}
</style>
