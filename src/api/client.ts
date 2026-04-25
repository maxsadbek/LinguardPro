import axios, {
  AxiosError,
  AxiosHeaders,
  isAxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios'
import { toast } from 'sonner'
import useUserStore from '@/stores/userStore'

export interface ApiError {
  message: string
  status: number
  success: boolean
}

function toApiError(error: unknown): ApiError {
  if (isAxiosError<ApiError>(error) && error.response) {
    return {
      message:
        error.response.data?.message ?? error.message ?? 'Server xatosi',
      status: error.response.status,
      success: false,
    }
  }

  return {
    message: "Tarmoq xatosi: serverga ulanib bo'lmadi",
    status: 0,
    success: false,
  }
}

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_URL ?? '',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        const token = useUserStore.getState().userToken?.accessToken

        if (!config.headers) {
          config.headers = new AxiosHeaders()
        }

        if (token) {
          config.headers.set('Authorization', `Bearer ${token}`)
        }

        return config
      },
      (error: unknown) => Promise.reject(toApiError(error))
    )

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiError>) => {
        const apiError = toApiError(error)

        if (error.response?.status === 401) {
          useUserStore.getState().actions.clearUserInfoAndToken()

          if (typeof window !== 'undefined') {
            window.location.href = '/sign-in'
          }
        }

        const message = String(error.response?.data?.message ?? '')
        const isStaticResourceNoise = message.includes('No static resource')

        if (error.response?.status === 500 && !isStaticResourceNoise) {
          toast.error("Server vaqtincha ishlamayapti, qaytadan urinib ko'ring")
        }

        return Promise.reject(apiError)
      }
    )
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config)
    return response.data
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data, config)
    return response.data
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config)
    return response.data
  }

  async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.patch(url, data, config)
    return response.data
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config)
    return response.data
  }
}

export const apiClient = new ApiClient()
export default apiClient
