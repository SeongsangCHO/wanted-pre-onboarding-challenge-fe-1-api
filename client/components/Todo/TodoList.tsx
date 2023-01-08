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
    <div>
      {todoList.data.map((todo) => {
        return (
          <div key={todo.id} onClick={() => handleViewTodoItem(todo.id)}>
            <h1>{todo.title}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
