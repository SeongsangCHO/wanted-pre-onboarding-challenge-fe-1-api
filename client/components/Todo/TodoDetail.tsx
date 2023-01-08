import todoApis from "@api/todos";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface TodoDetailProps {
  id: string;
}

const TodoDetail = ({ id }: TodoDetailProps) => {
  const { data: todoDetail, isLoading } = useQuery({
    queryKey: ["getTodoById", id],
    queryFn: () => todoApis.getTodoById(id),
  });
  if (!todoDetail || isLoading) return <div>loading</div>;
  console.log(todoDetail);
  return (
    <div>
      <h1>Detail</h1>
      <h1>{todoDetail.data.title}</h1>
      <p>{todoDetail.data.content}</p>
    </div>
  );
};

export default TodoDetail;
