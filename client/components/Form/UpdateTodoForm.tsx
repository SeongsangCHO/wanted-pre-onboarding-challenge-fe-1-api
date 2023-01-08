import { TodoItem } from "@api/responseType";
import todoApis from "@api/todos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import Form from "./Form";

interface UpdateTodoFormProps {
  queryClient: ReturnType<typeof useQueryClient>;
  copyTodo: TodoItem;
  setCopyTodo: React.Dispatch<React.SetStateAction<TodoItem>>;
  setIsUpdatable: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

const UpdateTodoForm = ({
  queryClient,
  copyTodo,
  setCopyTodo,
  setIsUpdatable,
  id,
}: UpdateTodoFormProps) => {
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

  return (
    <Form
      onSubmit={() => updateTodoMutation.mutate(id)}
      className="flex flex-col gap-2"
    >
      <h1>Update Todo</h1>
      <input
        className="rounded-md p-2"
        value={copyTodo.title}
        onChange={(e) => setCopyTodo((p) => ({ ...p, title: e.target.value }))}
        required
      />
      <textarea
        className="rounded-md p-2 mt-2"
        value={copyTodo.content}
        onChange={(e) =>
          setCopyTodo((p) => ({ ...p, content: e.target.value }))
        }
        required
      />
      <div className="flex justify-end mt-2 gap-2">
        <Form.SubmitButton>Done</Form.SubmitButton>
        <button
          onClick={() => setIsUpdatable(false)}
          className="bg-white text-black p-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </Form>
  );
};

export default UpdateTodoForm;
