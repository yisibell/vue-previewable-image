import { onMounted, onUnmounted, ref } from 'vue'

export const useImageLazyload = (src: string, lazy = true) => {
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

            lazyImg.addEventListener('load', () => {
              target.classList.add('lazy-loaded')
              lazyloaded.value = true
              lazySrc.value = src
              lazyloadSuccess.value = true
              lazyloading.value = false
            })

            lazyImg.addEventListener('error', () => {
              target.classList.add('lazy-loaded')
              lazyloaded.value = true
              lazyloadError.value = true
              lazyloading.value = false
            })

            lazyImg.src = src
          }
        })
      },
      {
        threshold: [1],
      }
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
