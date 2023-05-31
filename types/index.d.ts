import type { Component } from 'vue'
import Viewer from 'viewerjs'

type ViewerType = Viewer

type ViewerOptions = Viewer.Options

type ViewerOptionsTitle = Pick<ViewerOptions, 'title'>

interface PreviewableSrcObject extends Record<string | number, any> {
  src: string
  alt?: string
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
  referrerPolicy?: string
  fit?: string
  lazy?: boolean
  zIndex?: boolean | string
  previewSrcList?: PreviewableSrcListItem[]
  currentPreviewIndex?: number
  viewerOptions?: ViewerOptions
  viewerTitle?: CustomViewerTitle
}

interface ImageViewerProps {
  modelValue?: boolean
  zIndex?: boolean | string
  previewSrcList?: PreviewableSrcListItem[]
  currentPreviewIndex?: number
  viewerOptions?: ViewerOptions
  viewerTitle?: CustomViewerTitle
}

type ViewerSwitchEvent = (index: number, viewer: ViewerType) => void

declare const PreviewableImage: Component<{}, {}, {}, PreviewableImageProps>
declare const ImageViewer: Component<{}, {}, {}, ImageViewerProps>

interface PreviewableImageOptions {
  componentName?: string
  defaultViewerOptions?: ViewerOptions
}

export {
  PreviewableImage,
  ImageViewer,
  Viewer,

  // types
  PreviewableImageOptions,
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
