import todoApis from "@api/todos";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

interface TodoListProps {}

const TodoList = ({}: TodoListProps) => {
  const router = useRouter();
  const { data: todoList, isLoading } = useQuery({
    queryKey: ["getTodos"],
    queryFn: () => todoApis.getTodos(),
    initialData: { data: [] },
  });

  const handleViewTodoItem = (id: string) => {
    router.push(`/todo/${id}`);
  };

  if (isLoading) return <div>loading</div>;
  return (
    <div className="flex flex-col gap-4 mt-2 max-h-96 overflow-y-scroll p-2">
      {todoList.data.map((todo) => {
        return (
          <div
            key={todo.id}
            onClick={() => handleViewTodoItem(todo.id)}
            className="cursor-pointer hover:bg-stone-500 p-2 rounded-md transition duration-200 ease-in-out"
          >
            <div className="flex flex-row justify-between">
              <h1 className="max-w-xs overflow-x-auto text-ellipsis break-all">
                {todo.title}
              </h1>
              <span>{new Date(todo.createdAt).toDateString()}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
