import todoApis from "@api/todos";
import { useMutation, useQuery } from "@tanstack/react-query";

interface QueryProps {
  onSuccessCallback?: (param?: any) => void;
  onErrorCallback?: (param?: any) => void;
}

interface GetTodoByIdProps extends QueryProps {
  id: string;
}

const TodoQueries = {
  getTodoById: ({ id, onSuccessCallback, onErrorCallback }: GetTodoByIdProps) =>
    useQuery({
      queryKey: ["getTodoById", id],
      queryFn: () => todoApis.getTodoById(id),
      onSuccess: (res) => {
        onSuccessCallback && onSuccessCallback(res.data);
      },
      onError: (err) => {
        onErrorCallback && onErrorCallback(err);
      },
    }),
  getTodos: ({ onSuccessCallback, onErrorCallback }: QueryProps = {}) =>
    useQuery({
      queryKey: ["getTodos"],
      queryFn: () => todoApis.getTodos(),
      onSuccess: (res) => {
        onSuccessCallback && onSuccessCallback(res.data);
      },
      onError: (err) => {
        onErrorCallback && onErrorCallback(err);
      },
      initialData: { data: [] },
    }),
};

const TodoMutations = {
  deleteTodoById: ({ onSuccessCallback, onErrorCallback }: QueryProps) =>
    useMutation({
      mutationFn: (id: string) => todoApis.deleteTodo(id),
      onSuccess: (res) => {
        onSuccessCallback && onSuccessCallback(res);
      },
      onError: (err) => {
        onErrorCallback && onErrorCallback(err);
      },
    }),
};

export { TodoQueries, TodoMutations };
