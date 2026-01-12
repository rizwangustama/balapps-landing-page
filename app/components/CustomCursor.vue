<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const cursorRef = ref(null)
const followerRef = ref(null)

const onMouseMove = (e: MouseEvent) => {
  const { clientX, clientY } = e
  
  // Move main dot instantly
  gsap.to(cursorRef.value, {
    x: clientX,
    y: clientY,
    duration: 0,
    ease: 'none'
  })

  // Move follower with delay
  gsap.to(followerRef.value, {
    x: clientX,
    y: clientY,
    duration: 0.15,
    ease: 'power2.out'
  })
}

const onHoverStart = () => {
  gsap.to(followerRef.value, {
    scale: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(220, 38, 38, 0.5)', 
    duration: 0.3,
    mixBlendMode: 'difference'
  })
}

const onHoverEnd = () => {
  gsap.to(followerRef.value, {
    scale: 1,
    backgroundColor: 'transparent',
    border: '1px solid white',
    duration: 0.3,
    mixBlendMode: 'normal'
  })
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  
  // Add listeners to interactive elements
  const links = document.querySelectorAll('a, button, input, textarea')
  links.forEach(link => {
    link.addEventListener('mouseenter', onHoverStart)
    link.addEventListener('mouseleave', onHoverEnd)
  })

  // Observer for dynamic content
  const observer = new MutationObserver((mutations) => {
    const newLinks = document.querySelectorAll('a, button, input, textarea')
    newLinks.forEach(link => {
        // Simple check to avoid double binding (could be improved)
        link.removeEventListener('mouseenter', onHoverStart)
        link.removeEventListener('mouseleave', onHoverEnd)
        link.addEventListener('mouseenter', onHoverStart)
        link.addEventListener('mouseleave', onHoverEnd)
    })
  })
  
  observer.observe(document.body, { childList: true, subtree: true })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
})
</script>

<template>
  <div class="pointer-events-none fixed inset-0 z-9999 overflow-hidden hidden md:block mix-blend-difference">
    <!-- Main Dot -->
    <div 
      ref="cursorRef"
      class="absolute top-0 left-0 w-2 h-2 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(220,38,38,0.8)]"
    ></div>

    <!-- Follower Ring -->
    <div 
      ref="followerRef"
      class="absolute top-0 left-0 w-8 h-8 border border-white rounded-full -translate-x-1/2 -translate-y-1/2 transition-colors duration-300"
    ></div>
  </div>
</template>

<style>
@media (min-width: 768px) {
  body {
    cursor: none;
  }
  a, button, input, textarea {
    cursor: none;
  }
}
</style>
