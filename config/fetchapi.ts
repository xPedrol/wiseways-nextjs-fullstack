// Defina a URL base
const BASE_URL = 'https://api.exemplo.com'

// Função personalizada para fazer requisições com a URL base
export default function cfetch(
  endpoint: string | URL | globalThis.Request,
  options?: RequestInit,
) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`
  const headers = {
    'Content-Type': 'application/json',
  }
  if (!options) {
    options = {}
  }
  if (!options.headers) {
    options.headers = {}
  }

  Object.assign(options.headers, headers)

  return fetch(url, options)
}
