<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import heroBg from '~/assets/images/hero-bg-1.jpg?url'

const titleRef = ref(null)
const subheaderRef = ref<HTMLElement | null>(null)
const subtitleRef = ref(null)
const ctaRef = ref(null)
const carRef = ref(null)
const bgImageRef = ref(null)
const glow1Ref = ref(null)
const glow2Ref = ref(null)

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.from(titleRef.value, {
    y: 100,
    opacity: 0,
    duration: 1,
    delay: 0.2
  })
  .from(subtitleRef.value, {
    y: 50,
    opacity: 0,
    duration: 1
  }, '-=0.6')
  .from(ctaRef.value, {
    y: 20,
    opacity: 0,
    duration: 0.8
  }, '-=0.6')


  gsap.to(bgImageRef.value, {
    scale: 1.05,
    duration: 10,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })

  gsap.to(glow1Ref.value, {
    x: 50,
    y: -50,
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })
  gsap.to(glow2Ref.value, {
    x: -30,
    y: 30,
    duration: 7,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 1
  })

  gsap.to(titleRef.value, {
    textShadow: '0 0 20px rgba(255,255,255,0.3)',
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })

  // Smooth Text Cycle Animation
  const words = ["Night Race Street", "Underground Circuit", "Midnight Velocity"]
  let wordIndex = 0
  
  const cycleText = () => {
    const element = subheaderRef.value
    if (!element) return

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(cycleText, 2500)
      }
    })

    // Fade out and move up
    tl.to(element, {
      y: -20,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.in',
      onComplete: () => {
        // Change text while invisible
        wordIndex = (wordIndex + 1) % words.length
        if (element) {
          const nextWord = words[wordIndex]
          if (nextWord) element.innerText = nextWord
        }
      }
    })
    
    // Set set initial position for entry (move down)
    tl.set(element, { y: 20 })

    // Fade in and move to center
    tl.to(element, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out'
    })
  }

  // Start sequence with a delay
  setTimeout(cycleText, 2000)
})

const onRegistration = () => {
  navigateTo('https://balapps.id/registrasi', { external: true })
}

const onCategories = () => {
  const { $lenis } = useNuxtApp()
  // @ts-ignore
  $lenis.scrollTo('#race-class')
}
</script>

<template>
  <section id="hero-section" class="relative h-screen min-h-[900px] flex items-center overflow-hidden">
    <div class="absolute inset-0 z-0 overflow-hidden">
       <img ref="bgImageRef" :src="heroBg" class="w-full h-full object-cover opacity-80 scale-100 will-change-transform" alt="Red Sports Car Background" />
       <div class="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/40"></div>
       
       <div ref="glow1Ref" class="absolute -bottom-20 -right-20 w-60 h-60 bg-red-600/30 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>
       <div ref="glow2Ref" class="absolute top-20 left-10 w-40 h-40 bg-red-500/20 blur-[80px] rounded-full mix-blend-screen pointer-events-none"></div>
    </div>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="max-w-2xl">
          <div ref="titleRef" class="overflow-hidden">
             <h2 ref="subheaderRef" class="text-xl md:text-2xl font-bold text-red-600 tracking-[0.2em] mb-4 uppercase h-8">
              Night Race Street
             </h2>
             <h1 class="text-5xl md:text-8xl font-black leading-none mb-6 italic tracking-tighter">
              SUPER <br />
              <span class="text-transparent bg-clip-text bg-linear-to-r from-white to-gray-400">NIGHT RACE</span>
            </h1>
          </div>
         
          <p ref="subtitleRef" class="text-xl md:text-2xl text-gray-300 mb-8 font-light tracking-wide">
            With <span class="text-white font-semibold">Star Night Race Series</span>
          </p>
          
          <div ref="ctaRef" class="flex gap-4">
            <button @click="onRegistration" class="px-8 py-4 text-lg font-bold bg-red-700 hover:bg-red-600 text-white rounded-none -skew-x-12 hover:-skew-x-12 transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)]">
              <span class="skew-x-12 inline-block">REGISTRATION</span>
            </button>
            <button @click="onCategories" class="px-8 py-4 text-lg font-bold text-white border border-white/20 hover:bg-white/10 rounded-none -skew-x-12 transition-all backdrop-blur-sm">
               <span class="skew-x-12 inline-block">CATEGORIES</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
