import api from "./api-instance";

class TodoApis {
  getTodos = () => {
    return api.getWithToken(`/users/todos`);
  };
  getTodoById = (id: string) => {
    return api.getWithToken(`/users/todos/${id}`);
  };
  createTodo = (body: { title: string; content: string }) => {
    return api.postWithToken(`/users/todos`, body);
  };
  updateTodo = (id: string, body: { title: string; content: string }) => {
    return api.putWithToken(`/users/todos/${id}`, body);
  };
  deleteTodo = (id: string) => {
    return api.deleteWithToken(`/users/todos/${id}`);
  };
}
const todoApis = new TodoApis();
export default todoApis;
