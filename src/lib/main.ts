import PreviewableImage from '@/components/PreviewableImage.vue'
import ImageViewer from '@/components/ImageViewer.vue'
import Viewer from 'viewerjs'
import type { App } from 'vue'
import type { PreviewableImageOptions } from '~~/types'

const install = (Vue: App, option?: PreviewableImageOptions) => {
  const finalOption = Object.assign(
    {
      componentName: PreviewableImage.name,
      defaultViewerOptions: {},
    },
    option
  )

  Vue.component(finalOption.componentName, PreviewableImage)

  Viewer.setDefaults(finalOption.defaultViewerOptions)
}

export { PreviewableImage, ImageViewer, Viewer }

export default {
  install,
}
