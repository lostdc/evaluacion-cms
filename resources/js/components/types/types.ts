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


export type Post = {
  id: number;
  title: string;
  category: {
      name: string;
  };
  user: {
      name: string;
  };
  tags: Tag[];
}

export type JsonResponseMessage = {
  status: string,
  message: string,
  data?: [] | null,
  code: 400
}

