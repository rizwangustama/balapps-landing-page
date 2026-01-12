<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

// Import logos
import indomaretLogo from '~/assets/images/sponsors/indomaret.png'
import motoBalapLogo from '~/assets/images/sponsors/moto-balap.png'

const trackRef = ref(null)

const sponsors = [
  { name: 'Indomaret', img: indomaretLogo },
  { name: '', img: motoBalapLogo },
  { name: 'Nitro Boost', img: indomaretLogo },
  { name: 'Carbon Pro', img: motoBalapLogo },
]

const displaySponsors = [...sponsors, ...sponsors, ...sponsors, ...sponsors]

onMounted(() => {
  const totalWidth = trackRef?.value?.scrollWidth / 4 
  
  gsap.to(trackRef.value, {
    x: -totalWidth,
    duration: 30,
    ease: "none",
    repeat: -1,
  })
})
</script>

<template>
  <section id="sponsored-section" class="py-16 bg-black border-y border-white/5 overflow-hidden relative">
    <div class="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-black to-transparent z-10 pointer-events-none"></div>
    <div class="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-black to-transparent z-10 pointer-events-none"></div>

    <div class="container mx-auto px-4 mb-10 text-center">
      <p class="text-zinc-500 uppercase tracking-[0.3em] text-sm font-bold">Official Partners</p>
    </div>

    <div class="flex overflow-hidden relative select-none">
      <div ref="trackRef" class="flex items-center gap-20 min-w-max px-8">
        <div 
          v-for="(sponsor, index) in displaySponsors" 
          :key="index"
          class="relative group opacity-40 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0 cursor-pointer"
        >
           <div class="absolute inset-0 bg-red-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
           <img 
            :src="sponsor.img" 
            :alt="sponsor.name" 
            class="h-16 w-auto object-contain relative z-10 transform group-hover:scale-110 transition-transform duration-500" 
           />
        </div>
      </div>
    </div>
  </section>
</template>
