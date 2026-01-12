<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps<{}>()

const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const cardsRef = ref<HTMLElement[]>([])
const specialRef = ref<HTMLElement | null>(null)

const registrationTiers = [
  {
    title: 'First 100 Racers',
    price: 'Rp 600.000',
    details: 'Limited Time Offer',
    active: false,
    highlight: false
  },
  {
    title: 'Phase 1',
    date: '12 Oct - 20 Oct 2025',
    price: 'Rp 650.000',
    active: true, 
    highlight: true
  },
  {
    title: 'Phase 2',
    date: '21 Oct - 01 Nov 2025',
    price: 'Rp 700.000',
    active: false,
    highlight: false
  },
  {
    title: 'Last Call',
    date: '02 Nov - 06 Nov 2025',
    price: 'Rp 750.000',
    active: false,
    highlight: false
  }
]

const specialCategories = [
  {
    name: 'FFA (Free For All)',
    price: 'Rp 1.000.000',
    icon: 'heroicons:fire-20-solid'
  },
  {
    name: 'Paddock Tent 5x5',
    price: 'Rp 1.500.000',
    icon: 'heroicons:home-modern-20-solid'
  }
]

onMounted(() => {
  if (!sectionRef.value) return

  gsap.fromTo(headerRef.value, 
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: headerRef.value,
        start: 'top 80%',
      }
    }
  )

  const cards = gsap.utils.toArray('.registration-card')
  
  gsap.fromTo(cards,
    { y: 100, opacity: 0, scale: 0.9 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: ".cards-container",
        start: 'top 75%',
      }
    }
  )

  const specialCards = gsap.utils.toArray('.special-card')
  gsap.fromTo(specialCards,
    { x: -50, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.special-container',
        start: 'top 85%',
      }
    }
  )
})
</script>

<template>
  <section id="registration-info" ref="sectionRef" class="py-24 bg-zinc-900 relative overflow-hidden">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-red-900/20 via-zinc-900 to-zinc-950"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl opacity-30 pointer-events-none">
       <div class="absolute top-0 left-1/4 w-72 h-72 bg-red-600/20 rounded-full blur-[100px]"></div>
       <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-red-800/10 rounded-full blur-[100px]"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div ref="headerRef" class="text-center mb-16">
        <h2 class="text-red-500 font-bold tracking-[0.2em] uppercase text-sm mb-3">Join the Race</h2>
        <h3 class="text-4xl md:text-5xl font-black italic tracking-tighter text-white">
          REGISTRATION <span class="text-white/40">INFO</span>
        </h3>
      </div>

      <div class="cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div 
          v-for="(tier, index) in registrationTiers" 
          :key="index"
          class="registration-card relative group"
        >
          <div 
            class="h-full bg-white/5 backdrop-blur-xl border-t border-l border-white/10 rounded-2xl p-6 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
            :class="[
              tier.highlight 
                ? 'border-red-500/50 shadow-[0_0_50px_-10px_rgba(220,38,38,0.3)] scale-105 z-10 bg-linear-to-b from-red-900/10 to-transparent' 
                : 'border-white/5 hover:border-red-500/50 hover:bg-white/10 hover:shadow-[0_20px_40px_-5px_rgba(220,38,38,0.15)] hover:-translate-y-2 hover:scale-[1.02] active:scale-95'
            ]"
          >

            <div v-if="tier.highlight" class="absolute top-0 right-0">
               <div class="bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider shadow-[0_0_15px_rgba(220,38,38,0.6)]">
                 Open Now
               </div>
            </div>

            <h4 class="text-lg font-bold text-white mb-2 italic tracking-tight uppercase group-hover:text-red-400 transition-colors duration-300">{{ tier.title }}</h4>
            <p v-if="tier.date" class="text-xs text-zinc-400 mb-6 font-mono border border-white/5 px-2 py-1 rounded group-hover:border-red-500/30 group-hover:bg-red-500/5 transition-colors">{{ tier.date }}</p>
            <p v-else class="text-xs text-red-400 mb-6 font-mono border border-red-500/20 px-2 py-1 rounded bg-red-500/5">{{ tier.details }}</p>
            
            <div class="mt-auto">
              <span class="text-3xl font-black text-white tracking-tighter block mb-1 group-hover:scale-110 transition-transform duration-300 origin-bottom">{{ tier.price }}</span>
              <span class="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold group-hover:text-zinc-300 transition-colors">Registration Fee</span>
            </div>

            <div class="w-full h-1 bg-zinc-700/50 mt-6 rounded-full overflow-hidden">
              <div class="h-full bg-red-600 rounded-full group-hover:shadow-[0_0_10px_rgba(220,38,38,0.8)] transition-all duration-300" :style="{ width: `${25 * (index + 1)}%` }"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Special Categories -->
      <div class="special-container max-w-4xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            v-for="(item, index) in specialCategories" 
            :key="index"
            class="special-card bg-white/5 backdrop-blur-xl border-t border-l border-white/10 p-6 rounded-2xl flex items-center justify-between group hover:border-red-500/50 hover:bg-white/10 hover:shadow-[0_10px_30px_-5px_rgba(239,68,68,0.2)] hover:-translate-y-1 transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
          >
             <div class="flex items-center gap-4">
               <div class="w-12 h-12 rounded-full bg-red-900/20 flex items-center justify-center border border-red-500/20 group-hover:border-red-500 group-hover:bg-red-600 group-hover:text-white text-red-500 transition-all duration-300">
                  <Icon :name="item.icon" class="w-6 h-6" />
               </div>
               <div class="text-left">
                 <h4 class="text-white font-bold italic tracking-tight text-lg">{{ item.name }}</h4>
                 <p class="text-zinc-500 text-xs uppercase tracking-wider font-semibold">Special Category</p>
               </div>
             </div>
             <div class="text-right">
               <span class="text-2xl font-black text-white tracking-tighter block">{{ item.price }}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
