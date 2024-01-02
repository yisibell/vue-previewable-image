<template>
  <DemoHeader
    logo-text="VPI"
    title="Vue Previewable Image"
    :title-link="LINKS.repo"
    :right-links="rightLinks"
  >
  </DemoHeader>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { LINKS } from '@/settings'

const rightLinks = [
  { href: LINKS.repo, title: 'Documentation' },
  { href: LINKS.changelog, title: 'Changelog' },
  { href: LINKS.repo, title: 'Github' },
]
</script>
