<script setup>
const { $contentful } = useNuxtApp()

useHead({
  title: 'ODicé - Services | Immigration en France',
  meta: [
    {
      name: 'description',
      content: 'ODicé propose un accompagnement complet : demandes de visa, régularisation, titres de séjour, naturalisation, droit de la famille, et autres démarches liées à l’immigration.'
    },
    { property: 'og:title', content: 'ODicé - Services d’accompagnement' },
    { property: 'og:description', content: 'Découvrez les services proposés par ODicé pour vous aider dans vos démarches administratives et migratoires en France.' },
    { property: 'og:url', content: 'https://odispe.fr/services' }
  ]
})

const lang = useLang()
const defaultLocale = 'en-US'

const servicesIntroduction = ref(null)

async function fetchServicesIntroduction(locale) {
  try {
    const entries = await $contentful.getEntries({
      content_type: 'servicesIntroduction',
      locale
    })
    servicesIntroduction.value = entries.items[0]?.fields || null
  } catch (err) {
    console.error('❌ "Services Introduction" recovery error:', err)
  }
}

const services = ref([])

async function fetchServices(locale) {
  try {
    // 1. Localized request
    const localized = await $contentful.getEntries({
      content_type: 'services',
      locale
    })

    // 2. Default request (for non-localized fields)
    const defaults = await $contentful.getEntries({
      content_type: 'services',
      locale: defaultLocale
    })

    // 3. Fusion
    services.value = localized.items
      .sort((a, b) => (a.fields.order ?? 0) - (b.fields.order ?? 0))
      .map(service => {
        const defaultService = defaults.items.find(
          s => s.sys.id === service.sys.id
        )

        return {
          ...service,
          fields: {
            ...service.fields,
            pictogram: defaultService?.fields?.pictogram
          }
        }
      })
  } catch (err) {
    console.error('❌ Services recovery error:', err)
  }
}

// Initial load
onMounted(() => {
  fetchServices(lang.value)
  fetchServicesIntroduction(lang.value)
})

// Refresh on lang change
watch(lang, (newLang) => {
  fetchServices(newLang)
  fetchServicesIntroduction(lang.value)
})

const contactLabel = computed(() =>
  lang.value === 'fr' ? 'Nous contacter' : 'Contact us'
)

const contactQuestion = computed(() =>
  lang.value === 'fr' ? 'Vous souhaitez optimiser vos démarches d’immigration professionnelle ?' : 'Do you want to optimize your professional immigration procedures?'
)
</script>

<template>
  <div class="bg-gray-50">
    <div class="px-5 lg:px-60 py-10">
      <div class="mb-10 p-5 flex justify-center lg:text-xl text-justify whitespace-pre-line">
        {{ servicesIntroduction?.introduction }}
      </div>
      <div v-for="service in services" :key="service.sys.id">
        <div class="collapse collapse-plus bg-base-100 border border-base-300 mb-2">
          <input type="radio" name="my-accordion-3" checked="checked" />
          <div class="collapse-title">
            <div class="serviceTitle text-xl font-medium mb-1">{{ service.fields.title }}</div>
            <div class="font-normal">{{ service.fields.shortDescription }}</div>
          </div>
          <div class="collapse-content flex justify-center items-center">
            <div class="flex md:w-2/3 my-3 md:my-6 md:mr-24">
              <img class="hidden md:block h-38 object-cover mr-10 mr rounded-full"
              :src="`https:${service.fields.pictogram.fields.file.url}`"
              :alt="service.fields.pictogram.fields.title || 'Service image'" />
              <div class="text-justify">{{ service.fields.longDescription }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10 p-5 flex justify-center lg:text-xl text-center">
        {{ contactQuestion }}
      </div>
      <NuxtLink to="/contact" class="flex justify-center pb-10">
        <button class="
            rounded-full
            px-10
            py-3
            text-sm
            lg:text-lg
            font-semibold
            text-[oklch(45%_.24_277.023)]
            border-2
            border-[oklch(45%_.24_277.023)]
            hover:text-white
            hover:bg-[oklch(45%_.24_277.023)]
            cursor-pointer
            transition-colors duration-300 ease-in-out">
            {{ contactLabel }}
        </button>
      </NuxtLink>
    </div>
  </div>
</template>