import api from "./api-instance";
import { GetTodoByID, GetTodos } from "./responseType";

class TodoApis {
  getTodos = (): Promise<GetTodos> => {
    return api.getWithToken(`/todos`);
  };
  getTodoById = (id: string): Promise<GetTodoByID> => {
    return api.getWithToken(`/todos/${id}`);
  };
  createTodo = (body: { title: string; content: string }) => {
    return api.postWithToken(`/todos`, body);
  };
  updateTodo = (id: string, body: { title: string; content: string }) => {
    return api.putWithToken(`/todos/${id}`, body);
  };
  deleteTodo = (id: string) => {
    return api.deleteWithToken(`/todos/${id}`);
  };
}
const todoApis = new TodoApis();
export default todoApis;
