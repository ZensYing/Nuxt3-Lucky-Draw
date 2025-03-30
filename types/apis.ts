// types/api.ts
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface ApiResponse {
  status: number
  body: any
  headers: Record<string, string>
}

export interface RequestConfig {
  method: HttpMethod
  url: string
  headers?: Record<string, string>
  body?: any
}