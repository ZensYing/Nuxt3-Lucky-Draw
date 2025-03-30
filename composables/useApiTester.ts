// composables/useApiTester.ts
import { ref } from 'vue'
import type { ApiResponse, RequestConfig } from '~/types/apis'
import axios from 'axios'

export const useApiTester = () => {
  const response = ref<ApiResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const sendRequest = async (config: RequestConfig) => {
    loading.value = true
    error.value = null
    
    try {
      const axiosResponse = await axios({
        method: config.method,
        url: config.url,
        headers: config.headers,
        data: config.body
      })
      
      response.value = {
        status: axiosResponse.status,
        body: axiosResponse.data,
        headers: axiosResponse.headers as Record<string, string>
      }
    } catch (err: any) {
      error.value = err.message
      response.value = null
    } finally {
      loading.value = false
    }
  }

  return {
    response,
    loading,
    error,
    sendRequest
  }
}