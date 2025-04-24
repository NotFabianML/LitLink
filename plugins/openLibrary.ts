// plugins/openLibrary.ts
import { defineNuxtPlugin } from '#app'
import openLibraryService from '~/services/openLibraryService'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('openLibrary', openLibraryService)
})
