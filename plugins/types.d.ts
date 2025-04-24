// plugins/types.d.ts
// plugins/types.d.ts
import { NuxtApp } from '#app'
import { AxiosInstance, AxiosResponse } from 'axios'
import type { Book } from '~/services/openLibraryService'
import type OpenLibraryService from '~/services/openLibraryService'

/**
 * Payloads y respuestas
 */
export interface SignupPayload {
  first_name: string
  last_name: string
  email: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  // cualquier otro campo que devuelva tu API de /users/:id
}

export interface Preferences {
  favorite_genres: string[]
  favorite_authors: string[]
  favorite_books: string[]
  preferred_format: string
}

export interface PreferencePayload {
  favorite_genres: string[]
  favorite_authors: string[]
  favorite_books: string[]
  preferred_format: string
}

export interface UserUpdatePayload {
  first_name?: string
  last_name?: string
  email?: string
}

declare module '#app' {
  interface NuxtApp {
    $api: import('axios').AxiosInstance
    $auth: {
      signup: (d: any) => Promise<any>
      login: (d: any) => Promise<any>
      me: () => Promise<any>
    }
    $pref: {
      get: () => Promise<AxiosResponse<Preferences>>
      create: (payload: PreferencePayload) => Promise<AxiosResponse<Preferences>>
      update: (payload: PreferencePayload) => Promise<AxiosResponse<Preferences>>
      remove: () => Promise<AxiosResponse<void>>
    }
    $user: {
      getById(id: string): Promise<{ data: any }>;
      update(id: string, payload: Record<string, any>): Promise<{ data: any }>;
      delete(id: string): Promise<void>;
    }
    $bookActions: {
      getAll(): Promise<AxiosResponse<any[]>>
      get(id: string): Promise<AxiosResponse<any>>
      create(payload: { book_id: string; swipe_action: string; status?: string }): Promise<AxiosResponse<any>>
      update(id: string, payload: { swipe_action?: string; status?: string }): Promise<AxiosResponse<any>>
      remove(id: string): Promise<AxiosResponse<void>>
    }
    $books: {
      search(query: string): Promise<AxiosResponse<any>>
      saved(): Promise<AxiosResponse<any[]>>
      recommend: (prefs: {
        likedBooks?: string[]
        genres?: string[]
        authors?: string[]
      }) => Promise<AxiosResponse<any[]>>
    }
    $openLibrary: typeof OpenLibraryService
  }
}
