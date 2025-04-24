<script setup>
import { client } from '@/lib/contentful'

const { data: textes } = await useAsyncData('textes-home', async () => {
  const entry = await client.getEntry('6IqRjKT0Qd8qACmlIDYSkd')
  return entry.fields
})
</script>


<template>
  <img style="height: calc(100vh + 65px)" class="absolute w-full top-[-65px] filter brightness-60 object-cover"
    src="public/bateau.jpeg" alt="">
  <div class="reactive w-full h-screen top-[-65px]">
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-y-10">
      <h1 class="
          text-center
          welcomeTitle
          text-white
          text-4xl
          lg:text-6xl">
        {{ textes?.title }}
      </h1>
      <NuxtLink to="/contact" class="flex justify-center">
        <button class="
            boutonContact btn
            btn-outline
            rounded-full
            p-3 px-5
            lg:p-6 lg:px-10
            text-sm
            lg:text-lg
            text-white
            hover:bg-[oklch(45%_.24_277.023)]
            hover:border-[oklch(45%_.24_277.023)]">
          Nous contacter
        </button>
      </NuxtLink>
    </div>
  </div>
  <div class="flex justify-center mt-[-65px]">
    <div class="
        relative
        text-justify
        w-5/6
        mt-10 mb-10
        bg-gray-200
        p-7 lg:p-15
        text-base
        lg:text-lg">
      <p class="guillemets absolute top-[-18px] lg:top-[-25px] left-[2px] text-8xl lg:text-9xl text-zinc-600">"</p>
      <img class="
        float-left
        w-70
        h-70
        object-cover
        p-7 pb-11 lg:pr-7 lg:pt-0 lg:pb-7 lg:pl-0" src="../public/michel.jpeg" />
      <p class="whitespace-pre-line">{{ textes?.presentation }}</p>
      <p class="guillemets absolute right-[5px] bottom-[-75px] lg:bottom-[-100px] text-8xl lg:text-9xl text-zinc-600">"
      </p>
    </div>
  </div>
</template>