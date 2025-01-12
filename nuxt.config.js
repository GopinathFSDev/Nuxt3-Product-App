export default {
  css: ['vuetify/styles'],
  build: {
    transpile: ['vuetify'],
  },
  modules: [],
  plugins: [
    '~/plugins/vuetify.js',
    '~/plugins/axios.js'
  ],
  compatibilityDate: '2025-01-11',
};