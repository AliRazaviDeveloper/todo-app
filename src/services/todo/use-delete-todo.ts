import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { IDeleteOutput } from "../../types/todo";
import api from "../../utility/server";

type TUseDeleteTodo = {
  mutateAsync: (variables: {
    id: number;
  }) => Promise<AxiosResponse<IDeleteOutput>>;
  error: unknown;
  isError: boolean;
  isSuccess: boolean;
};

const deleteTodo = (id: number) => api.delete<IDeleteOutput>(`/todos/${id}`);

export const useDeleteTodo = (): TUseDeleteTodo => {
  const { mutateAsync, error, isError, isSuccess } = useMutation({
    mutationFn: ({ id }: { id: number }) => deleteTodo(id),
  });

  return {
    mutateAsync,
    error,
    isError,
    isSuccess,
  };
};

export default useDeleteTodo;
