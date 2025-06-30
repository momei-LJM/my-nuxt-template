import { defineStore } from 'pinia'

export const useBaseStore = defineStore('use', () => {
  const user = ref({
    name: 'ljm',
  })

  const changeName = () => {
    user.value.name = 'ljm2'
  }
  return { user, changeName }
})
