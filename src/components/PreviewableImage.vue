<template>
  <div class="previewable-image" :style="[{ width, height }, imgStyleVars]">
    <img
      :src="src"
      :alt="alt"
      :class="[
        'previewable-image__inner',
        { 'previewable-image__preview': hasPreviewList },
      ]"
      @click="handleImgView"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs, watch } from 'vue'
import type { PropType } from 'vue'
import Viewer from 'viewerjs'
import type {
  PreviewableSrcListItem,
  ViewerOptions,
  CustomViewerTitle,
  PreviewableSrcObject,
  ViewerViewEvent,
} from '~~/types'

import 'viewerjs/dist/viewer.css'
import { computed } from 'vue'

export default defineComponent({
  name: 'PreviewableImage',
  props: {
    width: {
      type: String,
    },
    height: {
      type: String,
    },
    src: {
      type: String,
    },
    alt: {
      type: String,
    },
    fit: {
      type: String,
      default: 'fill',
    },
    previewSrcList: {
      type: Array as PropType<PreviewableSrcListItem[]>,
      default: () => [],
    },
    viewerOptions: {
      type: Object as PropType<ViewerOptions>,
    },
    viewerTitle: {
      type: Function as PropType<CustomViewerTitle>,
    },
  },
  emits: ['switch'],
  setup(props, { emit }) {
    const { previewSrcList } = toRefs(props)

    const imgStyleVars = computed(() => {
      return {
        '--img-object-fit': props.fit,
      }
    })

    const hasPreviewList = computed(
      () => previewSrcList.value && previewSrcList.value.length > 0
    )

    const finalPreviewSrcList = computed<PreviewableSrcObject[]>(() => {
      if (hasPreviewList.value) {
        return previewSrcList.value.map((v) => {
          return {
            src: typeof v === 'string' ? v : v.src,
            alt: typeof v === 'string' ? v : v.alt,
          }
        })
      }

      return []
    })

    const currentViewerIndex = ref(0)
    const PreviewListLength = computed(() => previewSrcList.value.length || 0)

    const createPreviewableImages = () => {
      const wrapper = document.createElement('div')

      finalPreviewSrcList.value.forEach((v) => {
        const img = new Image()

        img.src = v.src
        img.alt = v.alt || ''

        wrapper.appendChild(img)
      })

      wrapper.addEventListener('view', (e) => {
        const ev = e as unknown as ViewerViewEvent
        currentViewerIndex.value = ev.detail.index

        emit('switch', currentViewerIndex.value, viewer.value)
      })

      return wrapper
    }

    const viewer = ref<Viewer>()

    const titleFunc = computed(() => {
      if (props.viewerTitle) {
        return (img: PreviewableSrcObject) => {
          return (props.viewerTitle as CustomViewerTitle)(img, {
            index: currentViewerIndex.value,
            total: PreviewListLength.value,
          })
        }
      }

      return (img: PreviewableSrcObject) => {
        return `${img.alt} [${currentViewerIndex.value + 1}/${
          PreviewListLength.value
        }]`
      }
    })

    const finalViewerOptions = computed<ViewerOptions>(() => {
      return Object.assign(
        {
          title: titleFunc.value,
        },
        props.viewerOptions
      )
    })

    const createViewer = () => {
      if (!hasPreviewList.value) return

      viewer.value = new Viewer(
        createPreviewableImages(),
        finalViewerOptions.value
      )
    }

    watch(
      previewSrcList,
      () => {
        createViewer()
      },
      {
        deep: true,
      }
    )

    const handleImgView = () => {
      viewer.value?.view()
    }

    const init = () => {
      createViewer()
    }

    onMounted(() => {
      init()
    })

    return {
      currentViewerIndex,
      PreviewListLength,
      finalPreviewSrcList,
      imgStyleVars,
      viewer,
      handleImgView,
      hasPreviewList,
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
    width: 100%;
    height: 100%;
    object-fit: var(--img-object-fit);
  }

  &__preview {
    cursor: pointer;
  }
}
</style>
