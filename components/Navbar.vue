<script setup>
import { useRoute } from 'vue-router'
import fullLogoW from '@/public/logo/fullLogoW.png';
import fullLogoB from '@/public/logo/fullLogoB.png';
const route = useRoute()
</script>

<template>
    <div class="navbar sticky top-0 z-50" :class="{
        'shadow-sm bg-white': route.path !== '/about'
    }">
        <div class="navbar-start">
            <div class="dropdown">
                <div tabindex="0" role="button" class="btn btn-ghost lg:hidden"
                    :class="{ 'text-white': route.path === '/about' }">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li>
                        <NuxtLink to="/about">Qui suis-je ?</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/services">Services</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/ressources">Ressources</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/contact">Contact</NuxtLink>
                    </li>
                </ul>
            </div>
            <NuxtLink to="/about"><img class="w-20 lg:w-27 ml-2" :src="route.path === '/about' ? fullLogoW : fullLogoB"
                    alt=""></NuxtLink>
        </div>
        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal px-1 space-x-10" :class="{
                'text-white font-semibold': route.path === '/about',
                'text-black': route.path !== '/about'
            }">
                <li>
                    <NuxtLink to="/about">QUI SUIS-JE ?</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/services">SERVICES</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/ressources">RESSOURSES</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/contact">CONTACT</NuxtLink>
                </li>
            </ul>
        </div>
        <div class="navbar-end">
            <a class="filter brightness-60 hover:filter hover:brightness-100 mr-4"><span
                    class="fi fi-fr w-6 h-4 rounded-full"></span></a>
            <a class="filter brightness-60 hover:filter hover:brightness-100 mr-4"><span
                    class="fi fi-gb w-6 h-4 rounded-full"></span></a>
            <a class="filter brightness-60 hover:filter hover:brightness-100 mr-4"><span
                    class="fi fi-es w-6 h-4 rounded-full"></span></a>
        </div>
    </div>
</template>