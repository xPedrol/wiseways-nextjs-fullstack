// Defina a URL base
const BASE_URL = "https://api.exemplo.com";

// Função personalizada para fazer requisições com a URL base
export default function cfetch(
  endpoint: string | URL | globalThis.Request,
  options?: RequestInit,
  token?: string
) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
  };
  if (!options) {
    options = {};
  }
  if (!options.headers) {
    options.headers = {};
  }

  Object.assign(options.headers, headers);

  if (token) {
    if (options.headers instanceof Headers) {
      options.headers.set("Authorization", `Bearer ${token}`);
    } else {
      Object.assign(options.headers, { Authorization: `Bearer ${token}` });
    }
  }

  return fetch(url, options);
}
