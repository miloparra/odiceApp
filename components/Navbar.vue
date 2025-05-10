<script setup>
import { useRoute } from 'vue-router'
import { onMounted, onUnmounted, ref, computed } from 'vue'
import fullLogoW from '@/public/logo/fullLogoW.png';
import fullLogoB from '@/public/logo/fullLogoB.png';
const route = useRoute()
const lang = useLang()

function changeLang(locale) {
    lang.value = locale
    useCookie('lang').value = locale
}

const aboutTab = computed(() =>
  lang.value === 'fr' ? 'Qui suis-je ?' : 'Who am I ?'
)

const resourcesTab = computed(() =>
  lang.value === 'fr' ? 'Ressources' : 'Resources'
)

const scrolled = ref(false)
const threshold = 80 // px before the fond change

const handleScroll = () => {
  scrolled.value = window.scrollY > threshold
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const isTranparentTheme = computed(() => {
  return route.path === '/about' && !scrolled.value
})

const navbarClasses = computed(() => isTranparentTheme.value ? 'bg-transparent' : 'bg-white shadow-sm')
const logoSrc = computed(() => isTranparentTheme.value ? fullLogoW : fullLogoB)
const textColorClass = computed(() => isTranparentTheme.value ? 'text-white font-medium' : 'text-black')
</script>

<template>
    <div class="navbar sticky top-0 z-50 transition-colors duration-1000" :class="navbarClasses">
        <div class="navbar-start">
            <div class="dropdown">
                <div tabindex="0" role="button" class="btn btn-ghost lg:hidden" :class="textColorClass">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li>
                        <NuxtLink to="/about">{{ aboutTab }}</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/services">Services</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/ressources">{{ resourcesTab }}</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/contact">Contact</NuxtLink>
                    </li>
                </ul>
            </div>
            <NuxtLink to="/about">
                <img class="w-20 lg:w-27 ml-2" :src="logoSrc" alt="Logo" />
            </NuxtLink>
        </div>
        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal px-1 space-x-10" :class="textColorClass">
                <li>
                    <NuxtLink to="/about" class="uppercase">{{ aboutTab }}</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/services" class="uppercase">Services</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/ressources" class="uppercase">{{ resourcesTab }}</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/contact" class="uppercase">Contact</NuxtLink>
                </li>
            </ul>
        </div>
        <div class="navbar-end">
            <a :class="['filter hover:filter hover:brightness-100 mr-4', lang === 'fr' ? '' : 'brightness-60']"
                @click="changeLang('fr')">
                <span class="fi fi-fr w-6 h-4 rounded-full"></span>
            </a>
            <a :class="['filter hover:filter hover:brightness-100 mr-4', lang === 'en-US' ? '' : 'brightness-60']"
                @click="changeLang('en-US')">
                <span class="fi fi-gb w-6 h-4 rounded-full"></span>
            </a>
        </div>
    </div>
</template>