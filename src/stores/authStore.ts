import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/axiosClient'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token') || null)
  const user = ref<object | null>(null)
  const isAuthenticated = ref<boolean>(!!token.value)

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      const { token: jwtToken, user: userData } = response.data
      token.value = jwtToken
      user.value = userData
      isAuthenticated.value = true
      localStorage.setItem('token', jwtToken)
    } catch (error) {
      console.log('Error during login:', error)
      throw error
    }
  }
  const logout = () => {
    token.value = null
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('token')
  }

  return { token, user, isAuthenticated, login, logout }
})
