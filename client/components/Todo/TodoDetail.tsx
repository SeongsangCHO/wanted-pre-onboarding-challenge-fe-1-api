import { TodoItem } from "@api/responseType";
import todoApis from "@api/todos";
import UpdateTodoForm from "@components/Form/UpdateTodoForm";
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

  const deleteTodoMutation = useMutation({
    mutationKey: ["deleteTodo", id],
    mutationFn: () => todoApis.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["getTodos"]);
      router.push("/");
    },
  });

  const handleDelete = () => {
    deleteTodoMutation.mutate();
  };

  if (!todoDetail || isLoading || !copyTodo) return <div>loading</div>;
  console.log(todoDetail);

  return (
    <div className="max-h-[400px] min-h-[400px] flex flex-col">
      <div className="flex flex-row justify-end gap-2 mb-4">
        {!isUpdatable && (
          <button
            className="p-2 bg-blue-500 rounded-md text-white"
            onClick={() => {
              setIsUpdatable(true);
            }}
          >
            Update
          </button>
        )}
        <button
          className="p-2 bg-red-500 rounded-md text-white"
          onClick={handleDelete}
        >
          delete
        </button>
      </div>
      {!isUpdatable && (
        <div className="border-t border-b grow">
          <div className="flex justify-between border-b items-center">
            <h1 className="text-2xl break-all">{todoDetail.data.title}</h1>
            <span>{new Date(todoDetail.data.createdAt).toDateString()}</span>
          </div>
          <div className="text-xs flex justify-end mt-1">
            <span>
              Updated: {new Date(todoDetail.data.updatedAt).toDateString()}
            </span>
          </div>
          <p className="break-all mt-4">{todoDetail.data.content}</p>
        </div>
      )}

      {isUpdatable && (
        <UpdateTodoForm
          {...{
            id,
            queryClient,
            copyTodo,
            setCopyTodo,
            setIsUpdatable,
          }}
        />
      )}
    </div>
  );
};

export default TodoDetail;
