// En el archivo js/helpers/utils.ts
import { ApiResponse, Category, Tag, JsonResponseMessage, Post } from '../types/types';

type FetchOptions = RequestInit & {
  body?: Record<string, unknown>;
};

export const fetchWithAuth = (url: string, options: FetchOptions = {}, useFormData: boolean = false): Promise<Response> => {
  const token = localStorage.getItem('token');

  // Configuración inicial de la petición Fetch.
  let headers = {
    'Authorization': `Bearer ${token}`,
  };

  // Configurar headers y body para peticiones con FormData de manera diferente
  if (!useFormData) {
    headers['Content-Type'] = 'application/json';
  }

  // Si el cuerpo de la petición no es FormData, se convierte a JSON.
  let body = options.body;
  if (!useFormData && options.body && typeof options.body === 'object') {
    body = JSON.stringify(options.body);
  }

  // Preparar la configuración final de la petición
  const config: RequestInit = {
    ...options,
    headers,
    body: useFormData ? options.body : body,
  };

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


// Actualizar detalles de un post
export const updatePostDetails = async (postId: string, formData: FormData): Promise<JsonResponseMessage> => {
  try {
    const response = await fetchWithAuth(`/api/posts/${postId}`, {
      method: 'PUT',
      body: formData,
      headers: {}, // Se sobreescribe el Content-Type predeterminado para permitir FormData
    }, true); // El tercer parámetro indica si se está utilizando FormData

    const jsonResponse: JsonResponseMessage = await response.json();
    if (!response.ok) {
      throw new Error(jsonResponse.message || 'Error actualizando los detalles del post');
    }
    return jsonResponse;
  } catch (error) {
    console.error('Error actualizando los detalles del post:', error);
    throw error; // O manejar el error de manera que se prefiera
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



export const deletePost = async (categoryId: number) => {
  const response = await fetchWithAuth(`/api/posts/${categoryId}`, {
    method: 'DELETE',
  });
  return response;
};