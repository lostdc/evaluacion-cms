// En el archivo js/helpers/utils.ts

type FetchOptions = RequestInit & {
  body?: Record<string, unknown>;
};

export const fetchWithAuth = (url: string, options: FetchOptions = {}): Promise<Response> => {
  const token = localStorage.getItem('token');

  // Configuración inicial de la petición Fetch.
  const config: RequestInit = {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  // Si el cuerpo de la petición es un objeto, conviértelo en una cadena JSON.
  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    config.body = JSON.stringify(options.body);
  }

  // Realiza la petición Fetch y retorna el objeto Response.
  return fetch(url, config);
};