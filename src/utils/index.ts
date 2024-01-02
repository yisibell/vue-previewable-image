export const formatLibName = (
  source: string,
  libName = 'vue-previewable-image',
) => {
  return source.replace('@/lib/main', libName).replace('@@/types', libName)
}
