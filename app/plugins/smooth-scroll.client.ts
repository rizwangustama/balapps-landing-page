import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin((nuxtApp) => {
    if (import.meta.server) return

    console.log(' initializing smooth scroll plugin...')

    try {
        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger)

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        })

        // Connect GSAP ScrollTrigger to Lenis
        lenis.on('scroll', ScrollTrigger.update)

        // Handle anchor links
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault()
                const id = anchor.getAttribute('href')
                if (id && id !== '#') {
                    lenis.scrollTo(id)
                }
            })
        })

        // Observer to handle dynamically added anchors (like in hydration)
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node instanceof HTMLElement) {
                            const anchors = node.querySelectorAll('a[href^="#"]')
                            anchors.forEach((anchor) => {
                                anchor.addEventListener('click', (e) => {
                                    e.preventDefault()
                                    const id = anchor.getAttribute('href')
                                    if (id && id !== '#') {
                                        lenis.scrollTo(id)
                                    }
                                })
                            })
                        }
                    })
                }
            })
        })

        observer.observe(document.body, { childList: true, subtree: true })

        // Add Lenis's requestAnimationFrame to GSAP's ticker
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })

        // Disable lag smoothing in GSAP to prevent jumps
        gsap.ticker.lagSmoothing(0)

        console.log('Smooth scroll initialized successfully')

        return {
            provide: {
                lenis
            }
        }
    } catch (error) {
        console.error('Failed to initialize smooth scroll:', error)
    }
})
