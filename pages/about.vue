<script setup>
const { $contentful } = useNuxtApp()

useHead({
  title: 'ODicé - Assistant immigration | Michel Droubay',
  meta: [
    {
      name: 'description',
      content: 'ODicé, fondée par Michel Droubay, propose un accompagnement spécialisé pour les personnes souhaitant s’installer durablement en France.'
    },
    { property: 'og:title', content: 'ODicé - Assistant immigration | Michel Droubay' },
    { property: 'og:description', content: 'Présentation de Michel Droubay et de la structure ODicé, spécialisée dans l’accompagnement à l’immigration en France.' },
    { property: 'og:url', content: 'https://odispe.fr' }
  ]
})

const lang = useLang()
const about = ref(null)
const route = useRoute()

async function fetchAbout(locale) {
  try {
    const entries = await $contentful.getEntries({
      content_type: 'about',
      locale
    })
    about.value = entries.items[0]?.fields || null
  } catch (err) {
    console.error('❌ "About" recovery error:', err)
  }
}

onMounted(() => {
  fetchAbout(lang.value)
  if (route.hash) {
    // Wait for the element to be well made
    setTimeout(() => {
      const el = document.querySelector(route.hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }
})

watch(lang, (newLang) => {
  fetchAbout(newLang)
})

const contactLabel = computed(() =>
  lang.value === 'fr' ? 'Nous contacter' : 'Contact us'
)

const serviceLabel = computed(() =>
  lang.value === 'fr' ? 'Nos services' : 'Our services'
)
</script>

<template>
  <div class="bg-gray-50">
    <section id="home">
      <img style="height: calc(100vh + 65px)" class="absolute w-full top-[-65px] filter brightness-80 object-cover"
      src="public/volcanIA2.png" alt="">
      <div class="reactive w-full h-screen top-[-65px]">
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-y-10">
          <h1 class="
              text-center
              welcomeTitle
              text-white
              text-4xl
              lg:text-6xl">
            {{ about?.title }}
          </h1>
          <div class="flex justify-center gap-5">
            <NuxtLink to="/contact" class="flex justify-center">
              <button class="
                  rounded-full
                  px-10
                  py-3
                  text-sm
                  lg:text-lg
                  font-semibold
                  text-white
                  border-1
                  hover:bg-[oklch(45%_.24_277.023)]
                  hover:border-[oklch(45%_.24_277.023)]
                  cursor-pointer">
                  {{ contactLabel }}
              </button>
            </NuxtLink>
            <NuxtLink to="/services" class="flex justify-center">
              <button class="
                  rounded-full
                  px-10
                  py-3
                  text-sm
                  lg:text-lg
                  font-semibold
                  text-white
                  border-1
                  hover:text-black
                  hover:bg-[#8FDA59]
                  hover:border-[#8FDA59]
                  cursor-pointer">
                  {{ serviceLabel }}
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section id="about" class="scroll-mt-[65px]">
      <div class="flex justify-center mt-[-65px]">
        <div class="
            relative
            text-justify
            w-5/6
            mt-20 mb-20
            bg-white
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
          <p class="whitespace-pre-line">{{ about?.presentation }}</p>
          <p class="guillemets absolute right-[5px] bottom-[-75px] lg:bottom-[-100px] text-8xl lg:text-9xl text-zinc-600">"
          </p>
        </div>
      </div>
    </section>
  </div>
</template>