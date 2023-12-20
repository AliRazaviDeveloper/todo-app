import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "../../utility/server";
import { ITodos } from "../../types/todo";

export type TCreateFormTodo = {
  title: string;
  description: string;
  date?: string;
  status?: number;
};

const createTodo = (data: TCreateFormTodo) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("date", new Date().toISOString());
  formData.append("status", String(3));
  return api.post("/todos", formData);
};

export const useCreateTodo = () => {
  const { mutateAsync, error, isError, isSuccess, isPending } = useMutation<
    AxiosResponse<{ data: ITodos }>,
    unknown,
    TCreateFormTodo
  >({
    mutationFn: (payload) => createTodo(payload),
  });

  return {
    mutateAsync,
    error,
    isError,
    isSuccess,
    isPending,
  };
};

export default useCreateTodo;
