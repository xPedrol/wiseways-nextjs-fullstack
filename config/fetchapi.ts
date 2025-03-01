// Defina a URL base
const BASE_URL = 'https://api.exemplo.com'

// Função personalizada para fazer requisições com a URL base
export default async function cfetch(
  endpoint: string | URL | globalThis.Request,
  options?: RequestInit,
) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`
  const defaultHeaders = {
    'Content-Type': 'application/json',
  }
  const headers = { ...defaultHeaders, ...(options?.headers ?? {}) }
  return fetch(url, { ...options, headers })
}
