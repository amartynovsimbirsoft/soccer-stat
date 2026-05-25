/* eslint-env node */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended' // 👈 Тут подтягиваются все правила Vue
  ],
  globals: {
    // 👇 Говорим ESLint, что эти функции существуют и их не нужно импортировать
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  },
  rules: {
    // На первое время можно отключить требование к имени компонента (чтобы не бесило)
    'vue/multi-word-component-names': 'off'
  }
}