import TodoDetail from "@components/Todo/TodoDetail";
import TodoList from "@components/Todo/TodoList";
import { useRouter } from "next/router";
import React from "react";

const TodoDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== "string") return <div>404</div>;
  return (
    <div>
      <TodoDetail {...{ id }} />
      <TodoList />
    </div>
  );
};

export default TodoDetailPage;
