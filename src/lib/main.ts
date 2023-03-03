import PreviewableImage from '@/components/PreviewableImage.vue'
import Viewer from 'viewerjs'
import type { VueConstructor } from 'vue'
import type { PreviewableImageOptions } from '~~/types'

const install = (Vue: VueConstructor, option?: PreviewableImageOptions) => {
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

export { PreviewableImage, Viewer }

export default {
  install,
}
