<script setup lang="ts">
import logo from '~/assets/images/logo.png'

const menuItems = [
  { label: 'Race Categories', to: '#race-class' },
  { label: 'Info Registration', to: '#registration-info' },
  { label: 'Race Calendar', to: '#calendar-section' },
  { label: 'Official Partners', to: '#sponsored-section' },
  { label: 'Registration', to: 'https://balapps.id/registrasi', external: true }
]

const socials = [
  { name: 'Instagram', icon: 'simple-icons:instagram', url: '#' },
  { name: 'YouTube', icon: 'simple-icons:youtube', url: '#' },
  { name: 'Twitter', icon: 'simple-icons:twitter', url: '#' },
  { name: 'TikTok', icon: 'simple-icons:tiktok', url: '#' }
]
const toRegistration = () => {
  navigateTo('https://balapps.id/registrasi', { external: true })
}
const handleLinkClick = (to: string) => {
  if (to.startsWith('#')) {
    const { $lenis } = useNuxtApp()
    // @ts-ignore
    $lenis.scrollTo(to)
  }
}
</script>

<template>
  <footer class="bg-zinc-950 border-t border-white/5 relative overflow-hidden">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-zinc-950"></div>
    <div class="absolute -top-40 -left-40 w-96 h-96 bg-red-900/10 rounded-full blur-[128px] pointer-events-none"></div>
    <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-red-800/10 rounded-full blur-[128px] pointer-events-none"></div>
    <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>

    <div class="relative z-10 border-b border-white/5 bg-white/2 backdrop-blur-sm">
      <div class="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div>
          <h2 class="text-3xl md:text-4xl font-black italic text-white mb-2 uppercase tracking-tighter">
            SECURE YOUR SPOT <span class="text-red-600">ON THE GRID</span>
          </h2>
          <p class="text-zinc-500 max-w-lg font-medium">
            Registration is now open for the 2025 Season. Sign up today to compete in the ultimate night racing series.
          </p>
        </div>
        <div>
           <button @click="toRegistration" class="group relative px-8 py-4 bg-red-700 hover:bg-red-600 text-white font-bold text-lg -skew-x-12 transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] hover:-translate-y-1">
              <span class="block skew-x-12 tracking-wider group-hover:scale-105 transition-transform">REGISTRATION</span>
           </button>
        </div>
      </div>
    </div>

    <div class="relative z-10 pt-20 pb-12">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 mb-16">
          
          <div class="space-y-6 max-w-md">
            <div class="flex items-center gap-2">
                 <img :src="logo" alt="Logo" class="h-14 w-auto brightness-200 contrast-125" />
            </div>
            <p class="text-zinc-500 text-sm leading-relaxed font-medium">
              The premier night racing series in Jakarta. Pushing the limits of performance and style under the city lights.
            </p>
            <div class="flex gap-4">
              <a 
                v-for="social in socials" 
                :key="social.name"
                :href="social.url"
                class="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900 border border-white/5 text-zinc-400 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-300 group hover:shadow-[0_0_15px_rgba(220,38,38,0.5)]"
              >
                <Icon :name="social.icon" class="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          <div class="flex-1 w-full lg:w-auto flex justify-end">
            <ul class="flex flex-wrap lg:flex-nowrap gap-x-8 gap-y-4 justify-center lg:justify-end">
              <li v-for="link in menuItems" :key="link.label">
                <NuxtLink 
                  :to="link.to" 
                  :external="link.external" 
                  @click="handleLinkClick(link.to)"
                  class="text-zinc-400 font-bold uppercase tracking-wider text-sm hover:text-red-500 transition-colors relative group py-2"
                >
                  {{ link.label }}
                  <span class="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right group-hover:origin-left"></span>
                </NuxtLink>
              </li>
            </ul>
          </div>

        </div>

        <div class="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-600 uppercase tracking-widest font-bold">
          <p>&copy; {{ new Date().getFullYear() }} Super Night Race. All rights reserved.</p>
          <div class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 bg-red-800 rounded-full animate-pulse"></span>
              <span>Official Racing Series</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
