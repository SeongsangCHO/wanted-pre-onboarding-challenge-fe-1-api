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

export interface TodoItem {
  title: string;
  content: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateTodo {
  data: TodoItem;
}

export interface CreateTodo {
  data: TodoItem;
}

export interface GetTodoByID {
  data: TodoItem;
}

export interface GetTodos {
  data: TodoItem[];
}
