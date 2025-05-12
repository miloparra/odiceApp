<script setup>
useHead({
  title: 'Odicé - Contact | Conseil en immigration avec Michel Droubay',
  meta: [
    {
      name: 'description',
      content: 'Prenez contact avec Michel Droubay via Odicé pour recevoir un accompagnement personnalisé selon votre situation administrative et vos démarches d’immigration.'
    },
    { property: 'og:title', content: 'Contactez Odicé - Michel Droubay' },
    { property: 'og:description', content: 'Formulaire de contact pour bénéficier de l’accompagnement juridique d’Odicé dans votre projet d’immigration en France.' },
    { property: 'og:url', content: 'https://odispe.fr/contact' }
  ]
})

const lang = useLang()

const contactLabel = computed(() =>
  lang.value === 'fr' ? 'Me contacter' : 'Contact me'
)
const birthLabel = computed(() =>
  lang.value === 'fr' ? 'Date de naissance' : 'Date of birth'
)
const arrivalLabel = computed(() =>
  lang.value === 'fr' ? 'Arrivée en France' : 'Arrival in France'
)
const sendButtonLabel = computed(() =>
  lang.value === 'fr' ? 'Envoyer' : 'Send'
)
const form = reactive({
  lastName: '',
  firstName: '',
  birthDate: '',
  landDate: '',
  situation: '',
  requestMotif: '',
  moreInfo: ''
})

const resetForm = () => {
  form.lastName = '',
    form.firstName = '',
    form.birthDate = '',
    form.landDate = '',
    form.situation = '',
    form.requestMotif = '',
    form.moreInfo = ''
}

const submitForm = async () => {
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: form
    })
    alert('Message envoyé !')
    resetForm()
  } catch (error) {
    alert('Erreur lors de l\'envoi du message')
  }
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-5 lg:gap-4">
    <div class="hidden lg:block col-span-2">
      <img class="w-full h-[calc(100vh-65px)] object-cover" src="./../public/toulouse2.jpg" alt="">
    </div>
    <form @submit.prevent="submitForm" class="flex justify-center items-center px-4 my-10 lg:my-0 lg:col-span-3">
      <div>
        <h1 class="text-center text-4xl pb-10">{{ contactLabel }}</h1>
        <div class="flex justify-center items-center">
          <div class="grid col-2 gap-5">
            <input v-model="form.lastName" type="text" class="border border-gray-300 rounded-full p-2 px-6 w-full"
              placeholder="Nom">
            <input v-model="form.firstName" type="text" class="border border-gray-300 rounded-full p-2 px-6 w-full"
              placeholder="Prenom">
            <div class="col-span-2 sm:col-span-1">
              <label for="with-corner-hint" class="block mb-1 ml-5 text-sm font-medium text-gray-700 w-full">{{ birthLabel }}</label>
              <input v-model="form.birthDate" type="date" id="with-corner-hint"
                class="border border-gray-300 rounded-full p-2 px-6 w-full">
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label for="with-corner-hint" class="block mb-1 ml-5 text-sm font-medium text-gray-700 w-full">{{ arrivalLabel }}</label>
              <input v-model="form.landDate" type="date" class="border border-gray-300 rounded-full p-2 px-6 w-full">
            </div>
            <input v-model="form.situation" type="text"
              class="col-span-2 border border-gray-300 rounded-full p-2 px-6 w-full"
              placeholder="Situation administrative">
            <input v-model="form.requestMotif" type="text"
              class="col-span-2 border border-gray-300 rounded-full p-2 px-6 w-full" placeholder="Motif de la demande">
            <textarea v-model="form.moreInfo" type="text"
              class="col-span-2 h-30 border border-gray-300 rounded-[20px] p-2 px-6 w-full"
              placeholder="Informations complémentaires"></textarea>
          </div>
        </div>
        <div class="flex justify-center mt-6">
          <button type="submit" class="btn btn-outline btn-primary rounded-full px-5">{{ sendButtonLabel }}</button>
        </div>
      </div>
    </form>
  </div>
</template>