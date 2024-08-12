<template>
  <div class="image-viewer"></div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  onMounted,
  onUnmounted,
  ref,
  toRefs,
  watch,
} from 'vue'
import type { PropType } from 'vue'
import type {
  PreviewableSrcListItem,
  ViewerOptions,
  CustomViewerTitle,
  PreviewableSrcObject,
  PreviewableImageElement,
  ViewerViewEvent,
} from '~~/types'
import Viewer from 'viewerjs'

function isPreviewableSrcString(
  previewSrcList: PreviewableSrcListItem[],
): previewSrcList is string[] {
  if (typeof previewSrcList[0] === 'string') return true
  return false
}

export default defineComponent({
  name: 'ImageViewer',
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    currentPreviewIndex: {
      type: Number,
      default: 0,
    },
    previewSrcList: {
      type: Array as PropType<PreviewableSrcListItem[]>,
      default: () => [],
    },
    viewerOptions: {
      type: Object as PropType<ViewerOptions>,
      default: () => ({}),
    },
    viewerTitle: {
      type: Function as PropType<CustomViewerTitle>,
      default: undefined,
    },
    zIndex: {
      type: [Number, String],
      default: 2015,
    },
  },
  emits: ['update:modelValue', 'update:currentPreviewIndex', 'switch'],
  setup(props, { emit }) {
    const { modelValue, previewSrcList, currentPreviewIndex } = toRefs(props)

    const hasPreviewList = computed(
      () => previewSrcList.value && previewSrcList.value.length > 0,
    )

    const viewer = ref<Viewer>()

    const handleImgView = () => {
      viewer.value?.view(currentViewerIndex.value)
    }

    watch(modelValue, (show: boolean) => {
      if (show) handleImgView()
    })

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

      wrapper.addEventListener('hidden', () => {
        emit('update:modelValue', false)
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
        props.viewerOptions,
      )
    })

    const createViewer = () => {
      if (!hasPreviewList.value) return

      viewer.value = new Viewer(
        createPreviewableImages(),
        finalViewerOptions.value,
      )

      if (modelValue.value) {
        handleImgView()
      }
    }

    const init = () => {
      createViewer()
    }

    watch(
      [() => props.previewSrcList, () => props.zIndex, titleFunc],
      () => {
        init()
      },
      { deep: true },
    )

    onMounted(() => {
      init()
    })

    onUnmounted(() => {
      viewer.value?.destroy()
    })

    return {
      hasPreviewList,
      PreviewListLength,
      finalPreviewSrcList,
      viewer,
      handleImgView,
    }
  },
})
</script>

<style lang="scss" scoped>
.image-viewer {
  display: inline-block;
}
</style>
