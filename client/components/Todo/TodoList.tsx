import todoApis from "@api/todos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

interface TodoListProps {
  activeIdSegment?: string;
}

const TodoList = ({ activeIdSegment }: TodoListProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: todoList, isLoading } = useQuery({
    queryKey: ["getTodos"],
    queryFn: () => todoApis.getTodos(),
    initialData: { data: [] },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: (id: string) => todoApis.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["getTodos"]);
    },
  });

  const handleViewTodoItem = (id: string) => {
    router.push(`/todo/${id}`);
  };

  if (isLoading) return <div>loading</div>;
  return (
    <div className="flex flex-col gap-4 mt-2 max-h-96 overflow-y-scroll p-2">
      {todoList.data?.map((todo) => {
        return (
          <div
            key={todo.id}
            className={`cursor-pointer hover:bg-stone-500 p-2 rounded-md transition duration-200 ease-in-out
            ${activeIdSegment === todo.id && "bg-blue-900"}
            `}
          >
            <div className="flex flex-row justify-between">
              <h1 className="max-w-xs overflow-x-auto text-ellipsis break-all">
                {todo.title}
              </h1>
              <div className="flex flex-row gap-2 items-center">
                <button
                  onClick={() => handleViewTodoItem(todo.id)}
                  className="bg-blue-500 rounded-md p-2 text-white"
                >
                  View Detail
                </button>
                <button
                  onClick={() => deleteTodoMutation.mutate(todo.id)}
                  className="bg-red-500 rounded-md p-2 text-white"
                >
                  Delete
                </button>
                <span>{new Date(todo.createdAt).toDateString()}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
