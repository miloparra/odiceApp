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

    console.log(localized)
    console.log(defaults)

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
})

// Refresh on lang change
watch(lang, (newLang) => {
  fetchServices(newLang)
})
</script>

<template>
  <div class="flex justify-center items-center mt-10 mb-10">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 justify-items-center">
      <div v-for="service in services" :key="service.sys.id" class="card bg-white w-9/10 lg:w-96 shadow-sm">
        <figure>
          <img class="h-70 scale-150 object-cover"
          :src="`https:${service.fields.pictogram.fields.file.url}`"
          :alt="service.fields.pictogram.fields.title || 'Service image'" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ service.fields.title }}</h2>
          <p>{{ service.fields.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>