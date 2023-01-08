export interface LoginResponse {
  message: string;
  token: string;
}

export interface SignUpResponse {
  message: string;
  token: string;
}

export interface DeleteTodo {
  data: null;
}

export interface Data {
  title: string;
  content: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateTodo {
  data: Data;
}

export interface CreateTodo {
  data: Data;
}

export interface GetTodoByID {
  data: Data;
}

export interface GetTodos {
  data: Data[];
}
