import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../../utility/server";

const EditTodo = (id: string, data: unknown) => api.put(`/todos/${id}`, data);

export const useEditTodoMutation = (id: string) => {
  const mutation = useMutation<unknown, unknown, unknown>({
    mutationFn: (payload) => EditTodo(id, payload),
    onSuccess: () => {
      toast.success("Update Successfully todo");
    },
  });

  return mutation;
};

export default useEditTodoMutation;
