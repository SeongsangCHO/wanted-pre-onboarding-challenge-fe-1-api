import todoApis from "@api/todos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import Form from "./Form";

interface CreateTodoFormProps {}

const CreateTodoForm = ({}: CreateTodoFormProps) => {
  const queryClient = useQueryClient();
  const [todo, setTodo] = React.useState<{ title: string; content: string }>({
    title: "",
    content: "",
  });

  const createTodoMutation = useMutation({
    mutationKey: ["createTodo"],
    mutationFn: () =>
      todoApis.createTodo({ title: todo.title, content: todo.content }),
    onSuccess: () => {
      queryClient.invalidateQueries(["getTodos"]);
      setTodo({ title: "", content: "" });
    },
  });

  return (
    <Form
      onSubmit={() => createTodoMutation.mutate()}
      className="flex flex-col"
    >
      <h1>Add Todo</h1>
      <input
        className="rounded-md p-2"
        placeholder="What's your todo?"
        name="title"
        value={todo.title}
        onChange={(e) => setTodo((p) => ({ ...p, title: e.target.value }))}
        required
      />
      <textarea
        className="rounded-md p-2 mt-2"
        placeholder="Todo content"
        name="content"
        value={todo.content}
        onChange={(e) => setTodo((p) => ({ ...p, content: e.target.value }))}
        required
      />
      <div className="flex justify-end mt-2">
        <Form.SubmitButton className="px-4">Add</Form.SubmitButton>
      </div>
    </Form>
  );
};

export default CreateTodoForm;
