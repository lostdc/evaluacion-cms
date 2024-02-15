// Definir un tipo para la respuesta del servidor
export type ApiResponse<T> = {
  status: string;
  message: string;
  data: T; 
  code: number;
};

export type Category = {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
};

export type Tag = {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
};

export type User = {
  id: number;
  name: string;
}

export type Post = {
  id: number;
  category_id: number;
  author_id: number;
  title: string;
  content: string;
  category: Category;
  user: User;
  tags: Tag[];
  imageUrl?: string;
}




export type JsonResponseMessage = {
  status: string,
  message: string,
  data?: [] | null,
  code: number
}

