<script setup>
import { client } from '@/lib/contentful'

const ressources = ref([])

onMounted(async () => {
  const res = await client.getEntries({
    content_type: 'ressources'
  })
  ressources.value = res.items
})
</script>

<template>
  <div class="flex justify-center items-center mt-10 mb-10">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 justify-items-center">
      <div v-for="ressource in ressources" :key="ressource.sys.id" class="card bg-base-100 w-9/10 lg:w-96 shadow-sm">
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