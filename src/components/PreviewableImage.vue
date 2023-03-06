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
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  toRefs,
  watch,
} from 'vue'
import type { PropType } from 'vue'
import Viewer from 'viewerjs'
import { useImageLazyload } from '@/composables/useImageLazyload'

import type {
  PreviewableSrcListItem,
  ViewerOptions,
  CustomViewerTitle,
  PreviewableSrcObject,
  PreviewableImageElement,
  ViewerViewEvent,
} from '~~/types'

function isPreviewableSrcString(
  previewSrcList: PreviewableSrcListItem[]
): previewSrcList is string[] {
  if (typeof previewSrcList[0] === 'string') return true
  return false
}

import 'viewerjs/dist/viewer.css'
import { computed } from 'vue'

export default defineComponent({
  name: 'PreviewableImage',
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
    // support v-model
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
      }
    )

    const viewer = ref<Viewer>()

    const imgStyleVars = computed(() => {
      return {
        '--img-object-fit': props.fit,
      }
    })

    const hasPreviewList = computed(
      () => previewSrcList.value && previewSrcList.value.length > 0
    )

    const finalPreviewSrcList = computed<PreviewableSrcObject[]>(() => {
      if (!hasPreviewList.value) return []

      if (isPreviewableSrcString(previewSrcList.value)) {
        return previewSrcList.value.map((v) => {
          return {
            src: v,
            alt: v,
          }
        })
      } else {
        return previewSrcList.value as PreviewableSrcObject[]
      }
    })

    const currentViewerIndex = computed({
      get() {
        return currentPreviewIndex.value
      },
      set(value: number) {
        emit('update:currentPreviewIndex', value)
      },
    })
    const PreviewListLength = computed(() => previewSrcList.value.length || 0)

    const createPreviewableImages = () => {
      const wrapper = document.createElement('div')

      finalPreviewSrcList.value.forEach((imgDesc) => {
        const img = new Image()

        Object.keys(imgDesc).forEach((k) => {
          ;(img as PreviewableImageElement)[k] = imgDesc[k]
        })

        wrapper.appendChild(img)
      })

      wrapper.addEventListener('view', (e) => {
        const ev = e as unknown as ViewerViewEvent
        currentViewerIndex.value = ev.detail.index

        emit('switch', currentViewerIndex.value, viewer.value)
      })

      return wrapper
    }

    const titleFunc = computed(() => {
      if (props.viewerTitle) {
        return (img: PreviewableImageElement) => {
          return (props.viewerTitle as CustomViewerTitle)(img, {
            index: currentViewerIndex.value,
            total: PreviewListLength.value,
          })
        }
      }

      return (img: PreviewableImageElement) => {
        return `${img.alt} (${currentViewerIndex.value + 1}/${
          PreviewListLength.value
        })`
      }
    })

    const finalViewerOptions = computed<ViewerOptions>(() => {
      return Object.assign(
        {
          title: titleFunc.value,
          zIndex: props.zIndex,
        },
        props.viewerOptions
      )
    })

    const createViewer = () => {
      if (!hasPreviewList.value) return

      // make sure the images in viewer could lazy load
      if (props.lazy && !lazyloadSuccess.value) return

      viewer.value = new Viewer(
        createPreviewableImages(),
        finalViewerOptions.value
      )
    }

    watch(
      [lazyloadSuccess, previewSrcList],
      () => {
        createViewer()
      },
      {
        deep: true,
      }
    )

    const handleImgView = () => {
      viewer.value?.view(currentViewerIndex.value)
    }

    const init = () => {
      createViewer()
    }

    onMounted(() => {
      init()
    })

    onUnmounted(() => {
      viewer.value?.destroy()
    })

    return {
      lazyloadTrigger,
      PreviewListLength,
      finalPreviewSrcList,
      imgStyleVars,
      viewer,
      handleImgView,
      hasPreviewList,
      lazySrc,
      lazyloading,
      lazyloadError,
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
