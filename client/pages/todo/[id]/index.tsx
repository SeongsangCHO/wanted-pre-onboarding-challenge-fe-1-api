import TodoDetail from "@components/Todo/TodoDetail";
import TodoList from "@components/Todo/TodoList";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";

const TodoDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  if (typeof id !== "string") return <div>404</div>;
  return (
    <div>
      <TodoDetail {...{ id,queryClient }} />
      <TodoList />
    </div>
  );
};

export default TodoDetailPage;
