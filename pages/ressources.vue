<script setup>
const { $contentful } = useNuxtApp()

useHead({
  title: 'Odicé - Ressources gratuites | Aide à l’immigration',
  meta: [
    {
      name: 'description',
      content: 'Accédez à des documents gratuits préparés par Odicé : guides pratiques, fiches d’information, listes de questions, et ressources utiles pour préparer vos démarches en France.'
    },
    { property: 'og:title', content: 'Odicé - Guides & documents' },
    { property: 'og:description', content: 'Téléchargez des ressources fiables créées par Odicé pour faciliter votre projet d’installation en France.' },
    { property: 'og:url', content: 'https://odispe.fr/ressources' }
  ]
})

const lang = useLang()
const defaultLocale = 'en-US'

const ressources = ref([])

async function fetchRessources(locale) {
  try {
    // 1. Localized request
    const localized = await $contentful.getEntries({
      content_type: 'ressources',
      locale
    })

    // 2. Default request (for non-localized fields)
    const defaults = await $contentful.getEntries({
      content_type: 'ressources',
      locale: defaultLocale
    })

    // 3. Fusion
    ressources.value = localized.items.map(ressource => {
      const defaultRessource = defaults.items.find(
        s => s.sys.id === ressource.sys.id
      )

      return {
        ...ressource,
        fields: {
          ...ressource.fields,
          pictogram: defaultRessource?.fields?.pictogram,
          document: defaultRessource?.fields?.document
        }
      }
    })
  } catch (err) {
    console.error('❌ Resource recovery error:', err)
  }
}

const message = computed(() =>
  lang.value === 'fr' ? 'Des ressources arriveront prochainement !' : 'Resources will arrive soon !'
)

// Initial load
onMounted(() => {
  fetchRessources(lang.value)
})

// Refresh on lang change
watch(lang, (newLang) => {
  fetchRessources(newLang)
})
</script>

<template>
  <div class="flex justify-center items-center mt-10 mb-10">
    <div v-if="ressources.length === 0">
      {{ message }}
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 justify-items-center">
      <div v-for="ressource in ressources" :key="ressource.sys.id" class="card bg-white w-9/10 lg:w-96 shadow-sm">
        <figure>
          <img class="h-40 scale-150 object-cover"
          :src="`https:${ressource.fields.pictogram.fields.file.url}`"
          :alt="ressource.fields.pictogram.fields.title || 'Ressource image'" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ ressource.fields.title }}</h2>
          <p>{{ ressource.fields.description }}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">
              <a :href="`https:${ressource.fields.document.fields.file.url}`" download>
                <font-awesome-icon icon="fa-solid fa-download" class="text-base mt-1" />
              </a>
            </button>
            <button class="btn btn-primary">
              <a :href="`https:${ressource.fields.document.fields.file.url}`" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon icon="fa-solid fa-eye" class="text-base mt-1" />
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>