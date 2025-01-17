import AuthHoc from "@components/AuthHOC";
import Layout from "@components/Layout";
import TodoDetail from "@components/Todo/TodoDetail";
import TodoList from "@components/Todo/TodoList";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";

const TodoDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  if (typeof id !== "string") return <></>;
  return (
    <div>
      <TodoDetail {...{ id, queryClient }} />
      <TodoList activeIdSegment={id} />
    </div>
  );
};

export default TodoDetailPage;

TodoDetailPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AuthHoc>
      <Layout>{page}</Layout>
    </AuthHoc>
  );
};
