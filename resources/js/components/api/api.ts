// En el archivo js/helpers/utils.ts
import { ApiResponse, Category, Tag, JsonResponseMessage, Post } from '../types/types';

type FetchOptions = RequestInit & {
  body?: Record<string, unknown>;
};

export const fetchWithAuth = (url: string, options: FetchOptions = {}, extraParams?: object): Promise<Response> => {
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

  let bodyObject = {};
  // Si el cuerpo de la petición es un objeto, prepáralo para incluirlo en la configuración
  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    bodyObject = options.body;
  }

  // Mezcla los parámetros adicionales si se proporcionan
  if (extraParams) {
    bodyObject = { ...bodyObject, ...extraParams };
  }

  // Convierte el objeto del cuerpo a una cadena JSON
  if (Object.keys(bodyObject).length > 0) {
    config.body = JSON.stringify(bodyObject);
  }

  // Realiza la petición Fetch y retorna el objeto Response.
  return fetch(url, config);
};



/* FUNCTIONS CATEGORIES */

export const loadCategories = async () => {
  const response = await fetchWithAuth('/api/categories');
  const data: ApiResponse<Category[]> = await response.json();
  if (response.ok) {
    return data.data;
  } else {
    console.error('Error cargando las categorías:', data.message);
    return [];
  }
};

export const createCategories = async (payload: any) => {
  const response = await fetchWithAuth(`/api/categories`, { 
    method: 'POST', 
    body: payload 
  });
  return response;
};


export const updateCategories = async (editingId: number, payload: any) => {
  const response = await fetchWithAuth(`/api/categories/${editingId}`, { 
    method: 'PUT', 
    body: payload 
  });
  return response;
};


export const deleteCategory = async (categoryId: number) => {
  const response = await fetchWithAuth(`/api/categories/${categoryId}`, {
    method: 'DELETE',
  });
  return response;
};





export const loadTags = async () => {
  const response = await fetchWithAuth('/api/tags');
  const data: ApiResponse<Tag[]> = await response.json();
  if (response.ok) {
    return data.data;
  } else {
    console.error('Error cargando las categorías:', data.message);
    return [];
  }
};




/* FUNCTIONS POSTS */
export const fetchPostDetails = async (postId: string): Promise<Post | null> => {
  try {
    const response = await fetchWithAuth(`/api/post/${postId}`);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse.data;
    }
    console.error('Error fetching post details');
    return null;
  } catch (error) {
    console.error('Error fetching post details:', error);
    return null;
  }
};

export const savePostDetails = async (postId: string, payload: { content: string, category_id: string, tags: Tag[] }): Promise<JsonResponseMessage> => {
  try {
    const response = await fetchWithAuth(`/api/post/${postId}`, {
      method: 'PUT', // o 'POST', dependiendo de si es una actualización o creación
      body: payload,
    });
    const jsonResponse: JsonResponseMessage = await response.json();
    if (!response.ok) {
      throw new Error(jsonResponse.message || 'Error saving post details');
    }
    return jsonResponse;
  } catch (error) {
    console.error('Error saving post details:', error);
    throw error; // O manejar el error de manera que se prefiera
  }
};
