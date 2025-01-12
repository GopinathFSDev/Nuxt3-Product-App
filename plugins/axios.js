import axios from 'axios'

export default defineNuxtPlugin(() => {
  const apiClient = axios.create({
    baseURL: 'https://67821e44c51d092c3dce4cc3.mockapi.io',
    timeout: 10000
  })

  return {
    provide: {
      axios: apiClient,
    },
  }
})