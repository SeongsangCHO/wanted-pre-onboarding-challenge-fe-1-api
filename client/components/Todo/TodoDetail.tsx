import { TodoItem } from "@api/responseType";
import todoApis from "@api/todos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

interface TodoDetailProps {
  id: string;
  queryClient: ReturnType<typeof useQueryClient>;
}
const INITIAL_TODO: TodoItem = {
  title: "",
  content: "",
  id: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const TodoDetail = ({ id, queryClient }: TodoDetailProps) => {
  const router = useRouter();
  const [copyTodo, setCopyTodo] = React.useState<TodoItem>(INITIAL_TODO);
  const [isUpdatable, setIsUpdatable] = React.useState<boolean>(false);

  const { data: todoDetail, isLoading } = useQuery({
    queryKey: ["getTodoById", id],
    queryFn: () => todoApis.getTodoById(id),
    onSuccess(res) {
      setCopyTodo(res.data);
    },
  });

  const updateTodoMutation = useMutation({
    mutationKey: ["updateTodo", id],
    mutationFn: (id: string) =>
      todoApis.updateTodo(id, {
        title: copyTodo.title,
        content: copyTodo.content,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["getTodoById", id]);
      queryClient.invalidateQueries(["getTodos"]);
      setIsUpdatable(false);
    },
  });
  const deleteTodoMutation = useMutation({
    mutationKey: ["deleteTodo", id],
    mutationFn: () => todoApis.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["getTodos"]);
      router.push("/");
    },
  });

  const handleUpdate = () => {};
  const handleDelete = () => {
    deleteTodoMutation.mutate();
  };

  if (!todoDetail || isLoading || !copyTodo) return <div>loading</div>;
  console.log(todoDetail);

  return (
    <div>
      <button
        onClick={() => {
          isUpdatable
            ? updateTodoMutation.mutate(todoDetail.data.id)
            : setIsUpdatable(true);
        }}
      >
        update
      </button>
      <button onClick={() => setIsUpdatable(false)}>update Cancel</button>
      <button onClick={handleDelete}>delete</button>
      <h1>Detail</h1>
      <div>
        {!isUpdatable && (
          <>
            <h1>{todoDetail.data.title}</h1>
            <p>{todoDetail.data.content}</p>
          </>
        )}
      </div>
      {isUpdatable && (
        <>
          <input
            value={copyTodo.title}
            onChange={(e) =>
              setCopyTodo((p) => ({ ...p, title: e.target.value }))
            }
          />
          <input value={copyTodo.content} />
        </>
      )}
    </div>
  );
};

export default TodoDetail;
