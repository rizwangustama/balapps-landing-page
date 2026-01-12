<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)

const rawEvents = [
  { title: "07 - 08 Februari 2025", description: "Super Street Night Race PIK 2 Series 1" },
  { title: "25 - 26 April 2025", description: "Super Street Night Race PIK 2 Series 1" },
  { title: "13 - 14 Juni 2025", description: "Super Street Night Race PIK 2 Series 1" },
  { title: "25 - 26 Juli 2025", description: "Super Street Night Race PIK 2 Series 1" },
  { title: "12 - 13 September 2025", description: "Super Street Night Race PIK 2 Series 1" },
  { title: "03 - 04 Oktober 2025", description: "Super Street Night Race PIK 2 Series 1" },
  { title: "07 - 08 November 2025", description: "Super Street Night Race PIK 2 Series 1" }
]

const events = rawEvents.map((e: { title: string; description: string }) => {
  const parts = e.title.split(' ')
  return {
    ...e,
    days: parts.slice(0, 3).join(' '), // "07 - 08"
    month: parts[3].substr(0, 3).toUpperCase(), // "FEB"
    fullMonth: parts[3], // "Februari"
    year: parts[4] // "2025"
  }
})

onMounted(() => {
  const cards = gsap.utils.toArray('.calendar-card')
  
  gsap.fromTo(cards, 
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 80%',
      }
    }
  )
})
</script>

<template>
  <section id="calendar-section" ref="sectionRef" class="py-32 bg-zinc-950 relative overflow-hidden">
    <div class="absolute inset-0 z-0">
        <div class="absolute top-0 right-[-10%] w-[50%] h-[50%] bg-red-900/20 blur-[150px] rounded-full"></div>
        <div class="absolute bottom-0 left-[-10%] w-[40%] h-[40%] bg-red-800/10 blur-[120px] rounded-full"></div>
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="mb-20">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
                <h2 class="text-red-500 font-bold tracking-[0.2em] uppercase mb-2">2025 Official Schedule</h2>
                <h3 class="text-5xl md:text-6xl font-black italic tracking-tighter text-white">
                RACE <span class="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-red-800">CALENDAR</span>
                </h3>
            </div>
            <div class="flex items-center gap-4 text-zinc-500">
                <Icon name="heroicons:map-pin" class="w-6 h-6 text-red-600" />
                <span class="text-lg font-medium opacity-80">PIK 2 Circuit, Jakarta</span>
            </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="(event, index) in events" 
          :key="index"
          class="calendar-card group relative bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 hover:border-red-600/50 transition-all duration-500 cursor-pointer overflow-hidden rounded-xl"
        >
          <div class="absolute inset-0 bg-linear-to-br from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative z-10 flex flex-col h-full justify-between">
            <div class="mb-6 flex justify-between items-start">
                <div class="flex flex-col">
                    <span class="text-4xl font-black italic text-white tracking-tighter group-hover:text-red-500 transition-colors duration-300">
                        {{ event.days }}
                    </span>
                    <div class="flex gap-2 items-center mt-1">
                        <span class="text-sm font-bold bg-red-600 text-white px-2 py-0.5 rounded uppercase tracking-wider">
                            {{ event.month }}
                        </span>
                        <span class="text-zinc-400 font-mono text-sm">{{ event.year }}</span>
                    </div>
                </div>
                <Icon name="ph:flag-checkered-fill" class="w-8 h-8 text-zinc-700 group-hover:text-white transition-colors duration-300" />
            </div>
            
            <div class="pt-6 border-t border-white/10 group-hover:border-white/20 transition-colors">
                <h4 class="text-lg font-bold text-zinc-300 group-hover:text-white leading-tight mb-2">
                    {{ event.description.replace('Super Street Night Race', '').trim() }}
                </h4>
                <p class="text-xs font-medium text-red-500 uppercase tracking-widest opacity-80 group-hover:opacity-100">Super Street Night Race</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-16 flex justify-center">
        <button class="px-8 py-4 text-lg font-bold text-white border border-white/20 hover:bg-red-600 hover:border-red-600 rounded-full transition-all duration-300 flex items-center gap-3 group">
            <span>DOWNLOAD SCHEDULE</span>
            <Icon name="heroicons:arrow-down-tray" class="w-5 h-5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </div>
  </section>
</template>
