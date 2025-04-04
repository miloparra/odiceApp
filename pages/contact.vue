<template>
  <div class="grid grid-cols-2 gap-4">
    <div>
      <img class="w-full h-[calc(100vh-65px)] object-cover" src="./../public/toulouse2.jpg" alt="">
    </div>
    <form @submit.prevent="submitForm">
      <h1 class="text-center text-4xl p-10">Contact me</h1>
      <div class="flex justify-center items-center">
        <div class="grid col-2 gap-5">
          <input v-model="form.lastName" type="text" class="border border-gray-300 rounded-full p-2 px-6" placeholder="Nom">
          <input v-model="form.firstName" type="text" class="border border-gray-300 rounded-full p-2 px-6" placeholder="Prenom">
          <div>
            <label for="with-corner-hint" class="block mb-1 ml-5 text-sm font-medium text-gray-700">Date de naissance</label>
            <input v-model="form.birthDate" type="date" id="with-corner-hint" class="border border-gray-300 rounded-full p-2 px-6">
          </div>
          <div>
            <label for="with-corner-hint" class="block mb-1 ml-5 text-sm font-medium text-gray-700">Arrivée en France</label>
            <input v-model="form.landDate" type="date" class="border border-gray-300 rounded-full p-2 px-6">
          </div>
          <input v-model="form.situation" type="text" class="col-span-2 border border-gray-300 rounded-full p-2 px-6" placeholder="Situation administrative">
          <input v-model="form.requestMotif" type="text" class="col-span-2 border border-gray-300 rounded-full p-2 px-6" placeholder="Motif de la demande">
          <textarea v-model="form.moreInfo" type="text" class="col-span-2 h-50 border border-gray-300 rounded-[20px] p-2 px-6" placeholder="Informations complémentaires"></textarea>
        </div>
      </div>
      <div class="flex justify-center mt-6">
        <button type="submit" class="btn btn-outline btn-primary rounded-full px-5">Envoyer</button>
      </div>
    </form>
  </div>
</template>

<script setup>
const form = reactive({
  lastName: '',
  firstName: '',
  birthDate: '',
  landDate: '',
  situation: '',
  requestMotif: '',
  moreInfo: ''
})

const submitForm = async () => {
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: form
    })
    alert('Message envoyé !')
  } catch (error) {
    alert('Erreur lors de l\'envoi du message')
  }
}
</script>