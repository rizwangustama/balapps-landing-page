<script setup lang="ts">

const raceClasses = [
  {
    category: 'KELAS 201 METER',
    items: [
      { name: 'DR. 1 BRACKET 8 DTK', point: true },
      { name: 'DR. 2 BRACKET 8.5 DTK', point: false },
      { name: 'DR. 3 BRACKET 9 DTK', point: true },
      { name: 'DR. 4 BRACKET 9.5 DTK', point: false },
      { name: 'DR. 5 BRACKET 10 DTK', point: true },
      { name: 'DR. 6 BRACKET 10.5 DTK', point: false },
      { name: 'DR. 7 BRACKET 11 DTK', point: true },
      { name: 'DR. 8 BRACKET 11.5 DTK', point: false },
      { name: 'DR. 9 BRACKET 12 DTK', point: false },
      { name: 'DR. 10 PRO STREET DIESEL 2700 CC', point: false },
      { name: 'DR. 11 PRO MASTER DIESEL NON ENGINE SWAP', point: false },
      { name: 'DR. 12 SUPER DIESEL', point: false },
      { name: 'DR. 13 MONSTER DIESEL', point: false },
      { name: 'DR. 14 FFA 201M (FREE FOR ALL)', point: false },
      { name: 'DR. 15 ALL SEDAN TURBO 2WD MAX 2000 CC', point: false },
      { name: 'DR. 16 ALL SEDAN N/A MAX 2500 CC', point: false },
      { name: 'DR. 17 ALL SEDAN N/A 2700 CC', point: false },
      { name: 'DR. 18 ALL CARS 1500 CC TURBO FWD', point: false },
    ]
  },
  {
    category: 'KELAS 402 METER',
    items: [
      { name: 'DR. 19 BRACKET 12 DTK', point: false },
      { name: 'DR. 20 BRACKET 13 DTK', point: true },
      { name: 'DR. 21 BRACKET 13.5 DTK', point: false },
      { name: 'DR. 22 BRACKET 14 DTK', point: true },
      { name: 'DR. 23 BRACKET 14.5 DTK', point: false },
      { name: 'DR. 24 BRACKET 15 DTK', point: true },
      { name: 'DR. 25 BRACKET 15.5 DTK', point: false },
      { name: 'DR. 26 BRACKET 16 DTK', point: true },
      { name: 'DR. 27 BRACKET 16.5 DTK', point: false },
      { name: 'DR. 28 BRACKET 17 DTK', point: true },
      { name: 'DR. 29 BRACKET 17.5 DTK', point: false },
      { name: 'DR. 30 BRACKET 18 DTK', point: false },
      { name: 'DR. 31 ALL SEDAN N/A 2700 CC', point: false },
      { name: 'DR. 32 PRO STREET DIESEL 2700 CC', point: false },
      { name: 'DR. 33 PRO STREET DIESEL NON ENGINE', point: false },
      { name: 'DR. 34 MONSTER DIESEL', point: false },
      { name: 'DR. 35 FFA 402M (FREE FOR ALL)', point: false },
    ]
  }
]
</script>

<template>
  <section id="race-class" class="py-24 bg-zinc-950 relative overflow-hidden">
    <div class="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-80 h-80 bg-red-800/10 rounded-full blur-[100px] pointer-events-none"></div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="mb-20 text-center">
        <h2 class="text-red-500 font-bold tracking-[0.2em] uppercase text-sm mb-3">Professional Categories</h2>
        <h3 class="text-5xl md:text-6xl font-black italic tracking-tighter text-white">
          OFFICIAL <span class="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-red-700">RACE CLASSES</span>
        </h3>
        <p class="mt-4 text-zinc-400 max-w-2xl mx-auto">
          Choose your battleground. From bracket racing to free-for-all outlaw classes.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
        <div v-for="(category, index) in raceClasses" :key="index" class="space-y-8">
          <div class="flex items-center gap-4 mb-2">
            <div class="h-10 w-1.5 bg-linear-to-b from-red-500 to-red-800 rounded-full"></div>
            <h4 class="text-3xl font-bold italic text-white tracking-tight">{{ category.category }}</h4>
          </div>

          <div class="grid gap-3">
            <div 
              v-for="(item, idx) in category.items" 
              :key="idx"
              class="group relative overflow-hidden bg-zinc-900/40 hover:bg-zinc-800/80 border border-white/5 hover:border-red-500/50 p-4 rounded-xl transition-all duration-300 flex items-center justify-between backdrop-blur-sm"
            >
              <div class="absolute inset-0 bg-linear-to-r from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div class="relative flex items-center gap-4 z-10">
                <div class="w-2 h-2 rounded-full bg-zinc-700 group-hover:bg-red-500 transition-colors duration-300"></div>
                <span class="text-zinc-300 font-medium font-mono text-lg group-hover:text-white transition-colors duration-200 tracking-tight">
                  {{ item.name }}
                </span>
              </div>
              
              <div v-if="item.point" class="relative z-10">
                <div class="flex items-center gap-1.5 px-3 py-1 bg-red-500/10 rounded-full border border-red-500/20 group-hover:border-red-500/40 transition-colors">
                  <Icon name="heroicons:trophy-20-solid" class="w-3.5 h-3.5 text-red-500" />
                  <span class="text-[10px] uppercase font-bold text-red-400 tracking-wider">Point Series</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
