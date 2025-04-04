<template>
  <div class="grid grid-cols-2 gap-4">
    <div>
      <img class="w-full h-[calc(100vh-65px)] object-cover" src="./../public/toulouse2.jpg" alt="">
    </div>
    <div>
      <h1 class="text-center text-4xl p-10">Contact me</h1>
      <div class="flex justify-center items-center">
        <div class="grid col-2 gap-5">
          <input type="text" class="border border-gray-300 rounded-full p-2 px-6" placeholder="Nom">
          <input type="text" class="border border-gray-300 rounded-full p-2 px-6" placeholder="Prenom">
          <div>
            <label for="with-corner-hint" class="block mb-1 ml-5 text-sm font-medium text-gray-700">Date de naissance</label>
            <input type="date" id="with-corner-hint" class="border border-gray-300 rounded-full p-2 px-6">
          </div>
          <div>
            <label for="with-corner-hint" class="block mb-1 ml-5 text-sm font-medium text-gray-700">Arrivée en France</label>
            <input type="date" class="border border-gray-300 rounded-full p-2 px-6">
          </div>
          <input type="text" class="col-span-2 border border-gray-300 rounded-full p-2 px-6" placeholder="Situation actuelle">
          <input type="text" class="col-span-2 border border-gray-300 rounded-full p-2 px-6" placeholder="Motif de la demande">
          <textarea type="text" class="col-span-2 h-50 border border-gray-300 rounded-[20px] p-2 px-6" placeholder="Informations complémentaires"></textarea>
        </div>
      </div>
      <div class="flex justify-center mt-6">
        <button class="btn btn-outline btn-primary rounded-full px-5">Envoyer</button>
      </div>
    </div>
  </div>
</template>