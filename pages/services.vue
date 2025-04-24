<script setup>
import { client } from '@/lib/contentful'

const services = ref([])

onMounted(async () => {
  const res = await client.getEntries({
    content_type: 'services'
  })
  services.value = res.items
})
</script>

<template>
  <div class="flex justify-center items-center mt-10 mb-10">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 justify-items-center">
      <div v-for="service in services" :key="service.sys.id" class="card bg-base-100 w-9/10 lg:w-96 shadow-sm">
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