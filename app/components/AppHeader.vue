<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import logo from '~/assets/images/logo.png'

const isOpen = ref(false)
const isScrolled = ref(false)
const menuOverlayRef = ref(null)
const menuItemsRef = ref(null)

const menuLinks = [
  { label: 'Race Categories', to: '#race-class' },
  { label: 'Info Registration', to: '#registration-info' },
  { label: 'Race Calendar', to: '#calendar-section' },
  { label: 'Official Partners', to: '#sponsored-section' },
  { label: 'Registration', to: 'https://balapps.id/registrasi', external: true }
]

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(isOpen, (newVal) => {
  if (newVal) {
    // Open Animation
    gsap.set(menuOverlayRef.value, { display: 'flex' })
    
    const tl = gsap.timeline()
    
    // 1. Reveal Background
    tl.fromTo(menuOverlayRef.value,
      { yPercent: -100 },
      { yPercent: 0, duration: 0.8, ease: 'power4.inOut' }
    )
    
    // 2. Stagger Text
    tl.fromTo('.menu-link-item',
      { y: 100, opacity: 0, rotateX: -45 },
      { 
        y: 0, 
        opacity: 1, 
        rotateX: 0,
        duration: 0.8, 
        stagger: 0.1, 
        ease: 'power3.out' 
      },
      '-=0.3'
    )

  } else {
    // Close Animation
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(menuOverlayRef.value, { display: 'none' })
      }
    })

    // 1. Fade out text
    tl.to('.menu-link-item', {
      y: -50,
      opacity: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: 'power2.in'
    })

    // 2. Slide up background
    tl.to(menuOverlayRef.value, {
      yPercent: -100,
      duration: 0.6,
      ease: 'power4.inOut'
    }, '-=0.2')
  }
})

const handleLinkClick = (to: string) => {
  if (typeof to === 'string' && to.startsWith('#')) {
    const { $lenis } = useNuxtApp()
    // @ts-ignore
    $lenis.scrollTo(to)
  }
  isOpen.value = false
}
</script>

<template>
  <header 
    class="fixed top-0 left-0 w-full z-100 transition-all duration-300"
    :class="[
      isScrolled && !isOpen ? 'bg-zinc-950/80 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'
    ]"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        
        <!-- Logo -->
        <NuxtLink to="/" class="relative z-102 transition-opacity duration-300 hover:opacity-80">
          <img :src="logo" alt="Logo" class="h-10 md:h-12 w-auto" :class="{ 'invert-0': isOpen }" />
        </NuxtLink>

        <!-- Menu Toggle Button -->
        <button 
          @click="toggleMenu"
          class="relative z-102 group flex flex-col items-end gap-1.5 p-2 hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
        >
           <div class="w-8 h-0.5 bg-white transition-all duration-300" :class="{ 'rotate-45 translate-y-2': isOpen }"></div>
           <div class="w-6 h-0.5 bg-white transition-all duration-300 group-hover:w-8" :class="{ 'opacity-0': isOpen }"></div>
           <div class="w-4 h-0.5 bg-white transition-all duration-300 group-hover:w-8" :class="{ '-rotate-45 -translate-y-2 w-8': isOpen }"></div>
        </button>

      </div>
    </div>
  </header>

  <!-- Full Screen Menu Overlay -->
  <div 
    ref="menuOverlayRef"
    style="display: none;"
    class="fixed inset-0 z-101 flex flex-col items-center justify-center bg-zinc-950 text-white overflow-hidden"
  >
    <!-- Close Button (Explicit) -->
    <button 
      @click="isOpen = false"
      class="absolute top-8 right-8 z-110 p-2 hover:opacity-80 transition-opacity group"
    >
       <div class="relative w-8 h-8">
         <span class="absolute top-1/2 left-0 w-full h-0.5 bg-white rotate-45 transform transition-transform group-hover:bg-red-500"></span>
         <span class="absolute top-1/2 left-0 w-full h-0.5 bg-white -rotate-45 transform transition-transform group-hover:bg-red-500"></span>
       </div>
    </button>

    <!-- Background Texture -->
    <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[150px] pointer-events-none"></div>

    <nav class="container mx-auto px-4 relative z-10 text-center">
       <ul class="space-y-6 md:space-y-8">
         <li v-for="item in menuLinks" :key="item.label" class="overflow-hidden">
            <div class="menu-link-item transform perspective-1000">
              <NuxtLink 
                :to="item.to"
                :external="item.external"
                class="block text-4xl md:text-6xl lg:text-7xl font-black italic uppercase tracking-tighter text-transparent bg-clip-text bg-text-white bg-linear-to-b from-white to-zinc-400 hover:to-red-500 transition-all duration-300 hover:scale-105"
                @click="handleLinkClick(item.to)"
              >
                {{ item.label }}
              </NuxtLink>
            </div>
         </li>
       </ul>
    </nav>

    <!-- Footer Info in Menu -->
    <div class="absolute bottom-12 left-0 w-full text-center menu-link-item">
       <p class="text-zinc-500 text-sm uppercase tracking-widest font-bold">2025 Season Registration Open</p>
    </div>
    <!-- Footer Info in Menu -->
    <div class="absolute bottom-12 left-0 w-full text-center menu-link-item">
       <p class="text-zinc-500 text-sm uppercase tracking-widest font-bold">2025 Season Registration Open</p>
    </div>
  </div>
</template>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
</style>
