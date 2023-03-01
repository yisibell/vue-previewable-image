import type { Component } from 'vue'
import Viewer from 'viewerjs'

type ViewerType = typeof Viewer

type ViewerOptions = Viewer.Options

type ViewerOptionsTitle = Pick<ViewerOptions, 'title'>

type PreviewableSrcObject = {
  src: string
  alt?: string
}

type PreviewableSrcListItem = string | PreviewableSrcObject

interface ViewerViewEvent extends CustomEvent {
  detail: {
    index: number
  }
}

type CustomViewerTitle = (
  img: PreviewableSrcObject,
  detail: { index: number; total: number }
) => string

interface PreviewableImageProps {
  width?: string
  height?: string
  src: string
  alt?: string
  fit?: string
  previewSrcList?: PreviewableSrcListItem[]
  viewerOptions?: ViewerOptions
  viewerTitle?: CustomViewerTitle
}

type ViewerSwitchEvent = (index: number, viewer: ViewerType) => void

declare const PreviewableImage: Component<PreviewableImageProps>

export {
  PreviewableImage,
  Viewer,
  ViewerType,
  ViewerOptions,
  ViewerViewEvent,
  PreviewableSrcObject,
  PreviewableSrcListItem,
  ViewerOptionsTitle,
  CustomViewerTitle,
  ViewerSwitchEvent,
}
