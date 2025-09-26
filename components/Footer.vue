<script setup>
const lang = useLang()

const legalNoticesLabel = computed(() =>
  lang.value === 'fr' ? 'Mentions légales' : 'Legal Notices'
)

const privatePolicyLabel = computed(() =>
  lang.value === 'fr' ? 'Politique de confidentialité' : 'Personal Data Policy'
)
</script>

<template>
    <div class="
            flex flex-col lg:flex-row 
            justify-center items-center
            text-sm lg:text-base
            space-y-2 lg:space-y-0 lg:space-x-10
            w-full
            h-30
            shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]
            z-50">
        <NuxtLink to="/legalMentions" class="hover:underline">{{ legalNoticesLabel }}</NuxtLink>
        <p class="hidden lg:block">|</p>
        <NuxtLink to="/confidentiality" class="hover:underline">{{ privatePolicyLabel }}</NuxtLink>
    </div>
</template>