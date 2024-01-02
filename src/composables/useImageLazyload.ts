import { onMounted, onUnmounted, ref } from 'vue'

export const useImageLazyload = (
  src: string,
  lazy = true,
  errorCallback?: (e: Event) => void,
  loadCallback?: (e: Event) => void,
) => {
  const lazyloadTrigger = ref<HTMLElement>()
  const lazySrc = ref('')
  const lazyloadSuccess = ref(false)
  const lazyloadError = ref(false)
  const lazyloaded = ref(false)
  const lazyloading = ref(false)

  const ob = ref<IntersectionObserver>()

  const createIntersectionObserver = () => {
    ob.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((v) => {
          const { intersectionRatio, target } = v

          if (
            intersectionRatio > 0 &&
            !target.classList.contains('lazy-loaded')
          ) {
            const lazyImg = new Image()

            lazyloading.value = true

            lazyImg.addEventListener('load', (e: Event) => {
              target.classList.add('lazy-loaded')
              lazySrc.value = src
              lazyloaded.value = true
              lazyloadSuccess.value = true
              lazyloadError.value = false
              lazyloading.value = false

              loadCallback && loadCallback(e)
            })

            lazyImg.addEventListener('error', (e: Event) => {
              target.classList.add('lazy-loaded')
              lazyloaded.value = true
              lazyloadError.value = true
              lazyloadSuccess.value = false
              lazyloading.value = false

              errorCallback && errorCallback(e)
            })

            lazyImg.src = src
          }
        })
      },
      {
        threshold: [1],
      },
    )

    lazyloadTrigger.value && ob.value.observe(lazyloadTrigger.value)
  }

  onMounted(() => {
    if (lazy) {
      createIntersectionObserver()
    } else {
      lazySrc.value = src
    }
  })

  onUnmounted(() => {
    lazyloadTrigger.value && ob.value?.unobserve(lazyloadTrigger.value)
  })

  return {
    lazySrc,
    lazyloadSuccess,
    lazyloadError,
    lazyloaded,
    lazyloading,
    lazyloadTrigger,
  }
}
