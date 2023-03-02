import type { Component } from 'vue'
import Viewer from 'viewerjs'

type ViewerType = typeof Viewer

type ViewerOptions = Viewer.Options

type ViewerOptionsTitle = Pick<ViewerOptions, 'title'>

interface PreviewableSrcObject {
  src: string
  alt?: string
  [key: string | number]: any
}

interface PreviewableImageElement
  extends HTMLImageElement,
    PreviewableSrcObject {}

type PreviewableSrcListItem = string | PreviewableSrcObject

interface ViewerViewEvent extends CustomEvent {
  detail: {
    index: number
  }
}

type CustomViewerTitle = (
  imgElement: PreviewableImageElement,
  detail: { index: number; total: number }
) => string

interface PreviewableImageProps {
  width?: string
  height?: string
  src: string
  alt?: string
  fit?: string
  previewSrcList?: PreviewableSrcListItem[]
  currentPreviewIndex?: number
  viewerOptions?: ViewerOptions
  viewerTitle?: CustomViewerTitle
}

type ViewerSwitchEvent = (index: number, viewer: ViewerType) => void

declare const PreviewableImage: Component<{}, {}, {}, PreviewableImageProps>

export {
  PreviewableImage,
  Viewer,

  // types
  ViewerType,
  ViewerOptions,
  ViewerViewEvent,
  PreviewableSrcObject,
  PreviewableImageElement,
  PreviewableSrcListItem,
  ViewerOptionsTitle,
  CustomViewerTitle,
  ViewerSwitchEvent,
}
